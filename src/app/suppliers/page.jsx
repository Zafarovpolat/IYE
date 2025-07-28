'use client';

import Image from 'next/image';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import styles from '../styles/Suppliers.module.css';
import Link from 'next/link';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Suppliers() {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isClientHovered, setIsClientHovered] = useState(false);
    const [isPreFooterHovered, setIsPreFooterHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isNewsMobile, setIsNewsMobile] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const hasAnimatedRef = useRef(false);
    const controls = useAnimation();
    const heroRef = useRef(null);
    const currentSectionIndexRef = useRef(0);
    const swiperRef = useRef(null);
    const [isOverflowAuto, setIsOverflowAuto] = useState(false);
    const targetOffsetRef = useRef(0);
    const [negativeMarginBottom, setNegativeMarginBottom] = useState(0);
    const [isSuccessModalOpen2, setIsSuccessModalOpen2] = useState(false); // New state for success modal
    const [focusedInputs, setFocusedInputs] = useState({});
    const [nameError, setNameError] = useState('');
    const [companyError, setCompanyError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [fileError, setFileError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false); // Новое состояние
    const [inputValues, setInputValues] = useState({
        name: '',
        company: '',
        phone: '',
        email: ''
    });

    const handleFocus = (inputName) => {
        setFocusedInputs(prev => ({ ...prev, [inputName]: true }));
    };

    const handleBlur = (inputName) => {
        if (!inputValues[inputName]) {
            setFocusedInputs(prev => ({ ...prev, [inputName]: false }));
        }

        if (inputName === 'phone') {
            validatePhone(inputValues.phone);
        } else if (inputName === 'email') {
            validateEmail(inputValues.email);
        }
    };

    const formatPhoneNumber = (value) => {
        // Удаляем все символы кроме цифр
        const numbers = value.replace(/\D/g, '');

        // Если начинается с 8, заменяем на 7
        let formattedNumbers = numbers;
        if (numbers.startsWith('8')) {
            formattedNumbers = '7' + numbers.slice(1);
        }

        // Если не начинается с 7, добавляем 7 в начало
        if (!formattedNumbers.startsWith('7') && formattedNumbers.length > 0) {
            formattedNumbers = '7' + formattedNumbers;
        }

        // Ограничиваем до 11 цифр (7 + 10 цифр номера)
        formattedNumbers = formattedNumbers.slice(0, 11);

        // Применяем маску +7 xxx xxx-xx-xx
        if (formattedNumbers.length >= 1) {
            let formatted = '+7';

            if (formattedNumbers.length > 1) {
                formatted += ' ' + formattedNumbers.slice(1, 4);
            }
            if (formattedNumbers.length > 4) {
                formatted += ' ' + formattedNumbers.slice(4, 7);
            }
            if (formattedNumbers.length > 7) {
                formatted += '-' + formattedNumbers.slice(7, 9);
            }
            if (formattedNumbers.length > 9) {
                formatted += '-' + formattedNumbers.slice(9, 11);
            }

            return formatted;
        }

        return value === '' ? '' : '+7 ';
    };

    const validateName = (name) => {
        if (!name.trim()) {
            setNameError('Пожалуйста, введите имя и фамилию');
            return false;
        }
        if (name.trim().length < 2) {
            setNameError('Имя должно содержать не менее 2 символов');
            return false;
        }
        setNameError('');
        return true;
    };

    const validateCompany = (company) => {
        if (!company.trim()) {
            setCompanyError('Пожалуйста, введите название компании');
            return false;
        }
        if (company.trim().length < 2) {
            setCompanyError('Название компании должно содержать не менее 2 символов');
            return false;
        }
        setCompanyError('');
        return true;
    };

    const validateEmail = (email) => {
        if (!email.trim()) {
            setEmailError('Пожалуйста, введите email');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Введите корректный email адрес');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validatePhone = (phone) => {
        const numbers = phone.replace(/\D/g, '');
        if (!phone.trim()) {
            setPhoneError('Пожалуйста, введите номер телефона');
            return false;
        }
        if (numbers.length < 11) {
            setPhoneError('Введите полный номер телефона');
            return false;
        }
        setPhoneError('');
        return true;
    };

    const validateFile = (file) => {
        if (!file) {
            setFileError('Пожалуйста, прикрепите коммерческое предложение');
            return false;
        }
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            setFileError('Файл должен быть в формате PDF или DOC');
            return false;
        }
        const maxSize = 10 * 1024 * 1024; // 10 MB
        if (file.size > maxSize) {
            setFileError('Файл не должен превышать 10 МБ');
            return false;
        }
        setFileError('');
        return true;
    };

    const handleChange = (inputName, value) => {
        if (inputName === 'phone') {
            const formattedPhone = formatPhoneNumber(value);
            setInputValues(prev => ({ ...prev, [inputName]: formattedPhone }));
            validatePhone(formattedPhone);
        } else if (inputName === 'file') {
            const file = value;
            setSelectedFile(file);
            validateFile(file);
        } else {
            setInputValues(prev => ({ ...prev, [inputName]: value }));
            if (inputName === 'name') validateName(value);
            else if (inputName === 'company') validateCompany(value);
            else if (inputName === 'email') validateEmail(value);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsFormSubmitted(true); // Устанавливаем, что форма была отправлена

        const isNameValid = validateName(inputValues.name);
        const isCompanyValid = validateCompany(inputValues.company);
        const isPhoneValid = validatePhone(inputValues.phone);
        const isEmailValid = validateEmail(inputValues.email);
        const isFileValid = validateFile(selectedFile);

        if (!isNameValid || !isCompanyValid || !isPhoneValid || !isEmailValid || !isFileValid) {
            return;
        }

        console.log('Form submitted:', { ...inputValues, file: selectedFile });
        setIsModalOpen(false);
        setIsSuccessModalOpen(true);
        setInputValues({
            name: '',
            company: '',
            phone: '',
            email: ''
        });
        setSelectedFile(null);
        setIsFormSubmitted(false); // Сбрасываем после успешной отправки

        setFocusedInputs({
            name: false,
            company: false,
            phone: false,
            email: false
        });
        setNameError('');
        setCompanyError('');
        setPhoneError('');
        setEmailError('');
        setFileError('');
    };

    const handleFormSubmit2 = (e) => {
        e.preventDefault();
        setIsFormSubmitted(true); // Устанавливаем, что форма была отправлена

        const isNameValid = validateName(inputValues.name);
        const isCompanyValid = validateCompany(inputValues.company);
        const isPhoneValid = validatePhone(inputValues.phone);
        const isEmailValid = validateEmail(inputValues.email);
        const isFileValid = validateFile(selectedFile);

        if (!isNameValid || !isCompanyValid || !isPhoneValid || !isEmailValid || !isFileValid) {
            return;
        }

        console.log('Form submitted:', { ...inputValues, file: selectedFile });
        setIsSuccessModalOpen2(true);
        setInputValues({
            name: '',
            company: '',
            phone: '',
            email: ''
        });
        setSelectedFile(null);
        setIsFormSubmitted(false); // Сбрасываем после успешной отправки

        setFocusedInputs({
            name: false,
            company: false,
            phone: false,
            email: false
        });
        setNameError('');
        setCompanyError('');
        setPhoneError('');
        setEmailError('');
        setFileError('');
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width <= 767);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [openItems, setOpenItems] = useState([0]); // First item open by default

    const toggleItem = (index) => {
        setOpenItems((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        document.body.style.overflowY = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflowY = 'scroll';
    };

    const closeSuccessModal = () => {
        setIsSuccessModalOpen(false);
        document.body.style.overflowY = 'scroll';
    };

    const closeSuccessModal2 = () => {
        setIsSuccessModalOpen2(false);
    };

    const faqItems = [
        {
            question: 'Какие документы нужны для начала сотрудничества?',
            answer: 'Поставщик должен предоставить сертификаты качества, декларации соответствия и другие документы по запросу.'
        },
        {
            question: 'Какие минимальные объёмы поставок?',
            answer: 'Мы анализируем качество продукции, соответствие стандартам и условия поставки. При необходимости проводим тестирование образцов.'
        },
        {
            question: 'Как проходит отбор новых поставщиков?',
            answer: 'Объём закупок зависит от категории продукции и спроса. Условия обсуждаются индивидуально.'
        }
    ];

    const partnersData = [
        {
            title: 'Соблюдение стандартов качества и сертификация продукции',
            info: 'Мы работаем только с сертифицированными поставщиками, чья продукция соответствует установленным требованиям безопасности и качества. Обязательны наличие сертификации (HACCP, ГОСТ, ISO) и строгий контроль на всех этапах производства',
        },
        {
            title: 'Гибкость в объёмах поставок',
            info: 'Объёмы закупок могут варьироваться в зависимости от спроса и сезонности. Важно, чтобы поставщик был готов оперативно увеличивать или снижать объёмы, обеспечивая бесперебойное снабжение без потери качества',
        },
        {
            title: 'Производство под собственной торговой маркой (СТМ)',
            info: 'Своевременная логистика — ключевой фактор успешного сотрудничества. Мы ожидаем от партнёров строгое соблюдение графиков поставок, точность в сроках и готовность к работе с нашими складами и логистическими требованиями',
        },
        {
            title: 'Эксклюзивные контракты',
            info: 'Мы регулярно проводим проверки соответствия продукции заявленным стандартам. Поставщики должны быть готовы к аудиту производственных процессов, инспекции складов, проверке документов и другим формам контроля качества.',
        },
    ];

    const rippleOrigin = {
        x: '100%',
        y: '100%',
    };

    // Variants for preFooter section partnerCard
    const preFooterCardBackgroundVariants = {
        initial: {
            backgroundColor: '#159F4A',
            backgroundImage: `radial-gradient(circle at ${rippleOrigin.x} ${rippleOrigin.y}, transparent 0%, transparent 0%)`,
        },
        hover: {
            backgroundColor: '#159F4A',
            backgroundImage: [
                `radial-gradient(circle at ${rippleOrigin.x} ${rippleOrigin.y}, #159F4A 0%, transparent 0%)`,
                `radial-gradient(circle at ${rippleOrigin.x} ${rippleOrigin.y}, #159F4A 50%, transparent 50%)`,
                `radial-gradient(circle at ${rippleOrigin.x} ${rippleOrigin.y}, #159F4A 100%, transparent 100%)`,
                `radial-gradient(circle at ${rippleOrigin.x} ${rippleOrigin.y}, #159F4A 150%, transparent 150%)`,
                `radial-gradient(circle at ${rippleOrigin.x} ${rippleOrigin.y}, #159F4A 200%, transparent 200%)`,
            ],
            transition: {
                backgroundImage: { duration: 0.4, ease: 'easeOut' },
                backgroundColor: { duration: 0.4, ease: 'easeOut' }
            }
        },
    };

    const preFooterPartnerTextVariants = {
        initial: {
            color: '#fff',
        },
        hover: {
            color: '#fff',
            transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
        },
    };

    const preFooterArrowVariants = {
        initial: {
            stroke: '#fff',
            rotate: 0
        },
        hover: {
            stroke: '#fff',
            rotate: 45,
            transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
        },
    };

    const SCALE_REDUCTION = 1.5;

    const rippleVariants2 = {
        initial: {
            opacity: 0,
            transition: { duration: 0.3 }
        },
        hover: {
            opacity: 1,
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            }
        }
    };

    const clientRippleColors = [
        'rgb(44, 169, 92)',
        'rgb(65, 178, 108)',
        'rgb(84, 186, 123)'
    ];

    return (
        <>

            <section id="clientsHeader" className={styles.clientsHeader}>
                <div className={`${styles.container} container`}>
                    <h1 className={styles.clientsHeaderHeading}>Поставщикам</h1>
                    <div className={styles.clientsHeaderText}>
                        <div className={styles.clientsHeaderBottomText}>
                            <h5 className={styles.clientsHeaderTextTitle}>основы сотрудничества</h5>
                            <div className={styles.clientsHeaderBottomBlock}>
                                <h3 className={styles.clientsHeaderTextInfo}>
                                    Надёжное сотрудничество с проверенными поставщиками
                                </h3>
                                <p className={styles.clientsHeaderTextDescription}>
                                    Идеология Еды — производственная компания, выпускающая свежую и качественную продукцию для крупнейших розничных сетей и магазинов. Мы работаем только с проверенными поставщиками сырья, и всегда открыты для новых партнёров, готовых предложить качественные ингредиенты и выгодные условия сотрудничества
                                </p>
                                <button className={styles.clientsHeaderButton} onClick={toggleModal}>
                                    Стать поставщиком
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {isModalOpen && (
                    <div className={styles.modalOverlay} onClick={closeModal}>
                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                            <button className={styles.closeButton} onClick={closeModal}>
                                ✕
                            </button>
                            <div className={styles.contactForm}>
                                <div className={styles.contactFormLeft}>
                                    <Image className={styles.contactFormImage} src={'/Ellipse.svg'} width={449} height={449} alt="Ellipse" />
                                    <h3 className={styles.contactFormTitle}>Хотите стать нашим поставщиком?</h3>
                                    <p className={styles.contactFormInfo}>
                                        Мы всегда рады новым надёжным партнёрам и готовы предложить выгодные условия сотрудничества. Заполните форму, и мы свяжемся с вами в ближайшее время
                                    </p>
                                </div>
                                <div className={styles.contactFormRight}>
                                    <form onSubmit={handleFormSubmit}>
                                        <div className={styles.contactFormRightUp}>
                                            <div className={styles.inputContainer}>
                                                <input
                                                    type="text"
                                                    className={`${styles.partnersInput} ${nameError ? styles.inputError : ''}`}
                                                    value={inputValues.name}
                                                    onFocus={() => handleFocus('name')}
                                                    onBlur={() => handleBlur('name')}
                                                    onChange={(e) => handleChange('name', e.target.value)}
                                                />
                                                <label className={`${styles.customPlaceholder} ${focusedInputs.name || inputValues.name ? styles.active : ''}`}>
                                                    Имя и Фамилия
                                                </label>
                                                {nameError && (
                                                    <div className={styles.errorMessage}>
                                                        {nameError}
                                                    </div>
                                                )}
                                            </div>

                                            <div className={styles.inputContainer}>
                                                <input
                                                    type="text"
                                                    className={`${styles.partnersInput} ${companyError ? styles.inputError : ''}`}
                                                    value={inputValues.company}
                                                    onFocus={() => handleFocus('company')}
                                                    onBlur={() => handleBlur('company')}
                                                    onChange={(e) => handleChange('company', e.target.value)}
                                                />
                                                <label className={`${styles.customPlaceholder} ${focusedInputs.company || inputValues.company ? styles.active : ''}`}>
                                                    Компания
                                                </label>
                                                {companyError && (
                                                    <div className={styles.errorMessage}>
                                                        {companyError}
                                                    </div>
                                                )}
                                            </div>

                                            <div className={styles.inputContainer}>
                                                <input
                                                    type="tel"
                                                    className={`${styles.partnersInput} ${phoneError ? styles.inputError : ''}`}
                                                    value={inputValues.phone}
                                                    onFocus={() => handleFocus('phone')}
                                                    onBlur={() => handleBlur('phone')}
                                                    onChange={(e) => handleChange('phone', e.target.value)}
                                                    placeholder=""
                                                />
                                                <label className={`${styles.customPlaceholder} ${focusedInputs.phone || inputValues.phone ? styles.active : ''}`}>
                                                    Номер телефона
                                                </label>
                                                {phoneError && (
                                                    <div className={styles.errorMessage}>
                                                        {phoneError}
                                                    </div>
                                                )}
                                            </div>

                                            <div className={styles.inputContainer}>
                                                <input
                                                    type="email"
                                                    className={`${styles.partnersInput} ${emailError ? styles.inputError : ''}`}
                                                    value={inputValues.email}
                                                    onFocus={() => handleFocus('email')}
                                                    onBlur={() => handleBlur('email')}
                                                    onChange={(e) => handleChange('email', e.target.value)}
                                                />
                                                <label className={`${styles.customPlaceholder} ${focusedInputs.email || inputValues.email ? styles.active : ''}`}>
                                                    Электронная почта
                                                </label>
                                                {emailError && (
                                                    <div className={styles.errorMessage}>
                                                        {emailError}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className={styles.partnersFileBox}>
                                            <input
                                                className={`${styles.partnersFileInput} ${isFormSubmitted && !selectedFile ? styles.inputError : ''}`}
                                                type="file"
                                                id="partnersFile"
                                                onChange={(e) => handleChange('file', e.target.files[0])}
                                            />
                                            <label className={styles.partnersFileLabel} htmlFor="partnersFile">
                                                <Image
                                                    src={'/paperclip.svg'}
                                                    width={24}
                                                    height={24}
                                                    alt="attach"
                                                    className={`${styles.paperclipIcon} ${isFormSubmitted && !selectedFile ? styles.paperclipError : ''}`}
                                                />
                                                <div className={styles.partnersFiletext}>
                                                    <h5 className={styles.partnersFileInputTitle}>Прикрепить коммерческое предложение</h5>
                                                    <h6 className={`${styles.partnersFileInputInfo} ${isFormSubmitted && !selectedFile ? styles.fileErrorText : ''}`}>
                                                        {isFormSubmitted && !selectedFile ? 'Прикрепите файл' : 'pdf, doc до 10 мб'}
                                                    </h6>
                                                </div>
                                            </label>
                                        </div>

                                        <div className={styles.contactFormRightBottom}>
                                            <button type="submit" className={styles.contactFormSubmit}>
                                                Отправить заявку
                                            </button>
                                            <p className={styles.partnersPolicy}>
                                                Нажимая на кнопку, вы соглашаетесь с{' '}
                                                <Link href={'/privacy'}>политикой конфиденциальности</Link>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {isSuccessModalOpen && (
                    <div className={`${styles.modalOverlay} ${styles.modalOverlaySuccess}`} onClick={closeSuccessModal}>
                        <div className={styles.successModalContent} onClick={(e) => e.stopPropagation()}>
                            <button className={styles.closeButton} onClick={closeSuccessModal}>
                                ✕
                            </button>
                            <div className={styles.successModal}>
                                <Image className={styles.successModalImage} src={'/Ellipse.svg'} width={449} height={449}></Image>
                                <div className={styles.successModalInner}>
                                    <Image src={'/email.svg'} width={52} height={52}></Image>
                                    <h3 className={styles.successModalTitle}>Заявка отправлена</h3>
                                    <p className={styles.successModalInfo}>
                                        Спасибо за интерес к партнёрству! Мы получили вашу заявку и свяжемся с вами в ближайшее время.
                                    </p>
                                    <p className={styles.successModalInfo}>
                                        Если у вас остались вопросы, вы всегда можете позвонить нам по телефону <span><a href="tel:+70000000000">+7 (000) 000–00–00</a></span> или написать на <span><a href="mailto:stm@ideologia.ru">stm@ideologia.ru</a></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <section id='food' className={styles.food}>
                <div className={`${styles.container} container`}>
                    <div className={styles.foodUp}>
                        <h4 className={styles.foodTitle}>закупка сырья</h4>
                        <h3 className={styles.foodSubtitle}>Что мы закупаем?</h3>
                        <p className={styles.foodInfo}>Мы заинтересованы в сотрудничестве с поставщиками следующих категорий продукции</p>
                    </div>

                    {isMobile ? (
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={1.1}
                            className={styles.foodCards}
                        >
                            <SwiperSlide>
                                <li className={styles.foodCard}>
                                    <Image className={styles.foodCardImg} src={'/food1.png'} width={220} height={195}></Image>
                                    <h4 className={styles.foodCardTitle}>Молочные продукты</h4>
                                    <p className={styles.foodCardInfo}>Сливочное масло, молоко, творог, сливки, сметана</p>
                                </li>
                            </SwiperSlide>
                            <SwiperSlide>
                                <li className={styles.foodCard}>
                                    <Image className={styles.foodCardImg} src={'/food2.png'} width={220} height={195}></Image>
                                    <h4 className={styles.foodCardTitle}>Мясо, птица, рыба</h4>
                                    <p className={styles.foodCardInfo}>Куриное филе, ветчина, говядина, лосось</p>
                                </li>
                            </SwiperSlide>
                            <SwiperSlide>
                                <li className={styles.foodCard}>
                                    <Image className={styles.foodCardImg} src={'/food3.png'} width={220} height={195}></Image>
                                    <h4 className={styles.foodCardTitle}>Овощи, фрукты, ягоды, зелень</h4>
                                    <p className={styles.foodCardInfo}>Свежие, готовые к использованию в начинках</p>
                                </li>
                            </SwiperSlide>
                            <SwiperSlide>
                                <li className={styles.foodCard}>
                                    <Image className={styles.foodCardImg} src={'/food4.png'} width={220} height={195}></Image>
                                    <h4 className={styles.foodCardTitle}>Бакалея и мука</h4>
                                    <p className={styles.foodCardInfo}>Пшеничная и ржаная мука, сахар, соль, дрожжи, сыпучие ингредиенты для выпечки и кулинарии</p>
                                </li>
                            </SwiperSlide>
                            <SwiperSlide>
                                <li className={styles.foodCard}>
                                    <Image className={styles.foodCardImg} src={'/food5.png'} width={220} height={195}></Image>
                                    <h4 className={styles.foodCardTitle}>Кондитерские ингредиенты</h4>
                                    <p className={styles.foodCardInfo}>Шоколад, сахарная пудра, джемы</p>
                                </li>
                            </SwiperSlide>
                            <SwiperSlide>
                                <li className={styles.foodCard}>
                                    <Image className={styles.foodCardImg} src={'/food6.png'} width={220} height={195}></Image>
                                    <h4 className={styles.foodCardTitle}>Упаковочные материалы</h4>
                                    <p className={styles.foodCardInfo}>Контейнеры, плёнка, этикетки</p>
                                </li>
                            </SwiperSlide>
                        </Swiper>

                    ) : (
                        <ul className={styles.foodCards}>
                            <li className={styles.foodCard}>
                                <Image className={styles.foodCardImg} src={'/food1.png'} width={220} height={195}></Image>
                                <h4 className={styles.foodCardTitle}>Молочные продукты</h4>
                                <p className={styles.foodCardInfo}>Сливочное масло, молоко, творог, сливки, сметана</p>
                            </li>
                            <li className={styles.foodCard}>
                                <Image className={styles.foodCardImg} src={'/food2.png'} width={220} height={195}></Image>
                                <h4 className={styles.foodCardTitle}>Мясо, птица, рыба</h4>
                                <p className={styles.foodCardInfo}>Куриное филе, ветчина, говядина, лосось</p>
                            </li>
                            <li className={styles.foodCard}>
                                <Image className={styles.foodCardImg} src={'/food3.png'} width={220} height={195}></Image>
                                <h4 className={styles.foodCardTitle}>Овощи, фрукты, ягоды, зелень</h4>
                                <p className={styles.foodCardInfo}>Свежие, готовые к использованию в начинках</p>
                            </li>
                            <li className={styles.foodCard}>
                                <Image className={styles.foodCardImg} src={'/food4.png'} width={220} height={195}></Image>
                                <h4 className={styles.foodCardTitle}>Бакалея и мука</h4>
                                <p className={styles.foodCardInfo}>Пшеничная и ржаная мука, сахар, соль, дрожжи, сыпучие ингредиенты для выпечки и кулинарии</p>
                            </li>
                            <li className={styles.foodCard}>
                                <Image className={styles.foodCardImg} src={'/food5.png'} width={220} height={195}></Image>
                                <h4 className={styles.foodCardTitle}>Кондитерские ингредиенты</h4>
                                <p className={styles.foodCardInfo}>Шоколад, сахарная пудра, джемы</p>
                            </li>
                            <li className={styles.foodCard}>
                                <Image className={styles.foodCardImg} src={'/food6.png'} width={220} height={195}></Image>
                                <h4 className={styles.foodCardTitle}>Упаковочные материалы</h4>
                                <p className={styles.foodCardInfo}>Контейнеры, плёнка, этикетки</p>
                            </li>
                        </ul>
                    )}
                </div>
            </section>

            <section id="quality" className={styles.quality}>
                <div className={`${styles.container} container`}>
                    <div className={styles.qualityHeaderBlock}>
                        <div className={styles.qualityHeaderBottomBlock}>
                            <h5 className={styles.qualityHeaderTitle}>наши преимущества</h5>
                            <div className={styles.qualityRight}>

                                <h3 className={styles.qualityHeaderInfo}>Почему выбирают нас?</h3>

                                <div className={styles.qualityCardsContainer}>
                                    {!isMobile ? (
                                        <>
                                            <motion.div
                                                className={styles.qualityCard}
                                                initial={{ y: 170 }}
                                                whileInView={{ y: 0 }}
                                                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                                viewport={{ once: true }}
                                            >
                                                <div className={styles.qualityCardUp}>
                                                    <p className={styles.qualityText}>Долгосрочное сотрудничество</p>
                                                    <Image
                                                        src="/approved.svg"
                                                        alt="Долгосрочное сотрудничество"
                                                        width={50}
                                                        height={50}
                                                        className={styles.qualityIcon}
                                                    />
                                                </div>
                                                <p className={styles.qualityDescription}>
                                                    Создаём прозрачные условия, выстраиваем доверительные отношения и обеспечиваем стабильные закупки
                                                </p>
                                            </motion.div>
                                            <motion.div
                                                className={styles.qualityCard}
                                                initial={{ y: 170 }}
                                                whileInView={{ y: 0 }}
                                                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                                viewport={{ once: true }}
                                            >
                                                <div className={styles.qualityCardUp}>
                                                    <p className={styles.qualityText}>Гарантированный спрос</p>
                                                    <Image
                                                        src="/growth.svg"
                                                        alt="Гарантированный спрос"
                                                        width={50}
                                                        height={50}
                                                        className={styles.qualityIcon}
                                                    />
                                                </div>
                                                <p className={styles.qualityDescription}>
                                                    Мы поставляем продукцию в крупнейшие розничные сети, обеспечивая постоянные объёмы закупок
                                                </p>
                                            </motion.div>
                                            <motion.div
                                                className={styles.qualityCard}
                                                initial={{ y: 170 }}
                                                whileInView={{ y: 0 }}
                                                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                                viewport={{ once: true }}
                                            >
                                                <div className={styles.qualityCardUp}>
                                                    <p className={styles.qualityText}>Высокие стандарты качества</p>
                                                    <Image
                                                        src="/gear.svg"
                                                        alt="Высокие стандарты качества"
                                                        width={50}
                                                        height={50}
                                                        className={styles.qualityIcon}
                                                    />
                                                </div>
                                                <p className={styles.qualityDescription}>
                                                    Требуем соблюдения всех норм безопасности и сертификации (HACCP, ГОСТ, ISO)
                                                </p>
                                            </motion.div>
                                            <motion.div
                                                className={styles.qualityCard}
                                                initial={{ y: 170 }}
                                                whileInView={{ y: 0 }}
                                                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                                viewport={{ once: true }}
                                            >
                                                <div className={styles.qualityCardUp}>
                                                    <p className={styles.qualityText}>Удобные условия работы</p>
                                                    <Image
                                                        src="/portfolio.svg"
                                                        alt="Удобные условия работы"
                                                        width={50}
                                                        height={50}
                                                        className={styles.qualityIcon}
                                                    />
                                                </div>
                                                <p className={styles.qualityDescription}>
                                                    Предлагаем гибкий график приёма сырья, своевременные платежи и оперативную коммуникацию
                                                </p>
                                            </motion.div>
                                        </>
                                    ) : (
                                        <Swiper spaceBetween={10} slidesPerView={1.1} className={styles.qualitySwiper}>
                                            <SwiperSlide>
                                                <motion.div
                                                    className={styles.qualityCard}

                                                >
                                                    <div className={styles.qualityCardUp}>
                                                        <p className={styles.qualityText}>Широкий ассортимент</p>
                                                        <Image
                                                            src="/organic-food.svg"
                                                            alt="Широкий ассортимент"
                                                            width={50}
                                                            height={50}
                                                            className={styles.qualityIcon}
                                                        />
                                                    </div>
                                                    <p className={styles.qualityDescription}>
                                                        От свежей выпечки до кулинарных изделий и десертов
                                                    </p>
                                                </motion.div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <motion.div
                                                    className={`${styles.qualityCard} ${styles.qualityCardGreen}`}
                                                    style={{ backgroundColor: '#159F4A' }}

                                                >
                                                    <div className={styles.qualityCardUp}>
                                                        <p className={styles.qualityText}>Гибкие условия сотрудничества</p>
                                                        <Image
                                                            src="/approved.svg"
                                                            alt="Гибкие условия сотрудничества"
                                                            width={50}
                                                            height={50}
                                                            className={styles.qualityIcon}
                                                        />
                                                    </div>
                                                    <p className={styles.qualityDescription}>
                                                        Индивидуальные решения для бизнеса
                                                    </p>
                                                </motion.div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <motion.div
                                                    className={`${styles.qualityCard} ${styles.qualityCardGreen}`}
                                                    style={{ backgroundColor: '#159F4A' }}

                                                >
                                                    <div className={styles.qualityCardUp}>
                                                        <p className={styles.qualityText}>Гарантию качества</p>
                                                        <Image
                                                            src="/laboratory.svg"
                                                            alt="Гарантию качества"
                                                            width={50}
                                                            height={50}
                                                            className={styles.qualityIcon}
                                                        />
                                                    </div>
                                                    <p className={styles.qualityDescription}>
                                                        Контроль на каждом этапе производства
                                                    </p>
                                                </motion.div>
                                            </SwiperSlide>
                                            <SwiperSlide>
                                                <motion.div
                                                    className={styles.qualityCard}

                                                >
                                                    <div className={styles.qualityCardUp}>
                                                        <p className={styles.qualityText}>Надёжность поставок</p>
                                                        <Image
                                                            src="/van.svg"
                                                            alt="Надёжность поставок"
                                                            width={50}
                                                            height={50}
                                                            className={styles.qualityIcon}
                                                        />
                                                    </div>
                                                    <p className={styles.qualityDescription}>
                                                        Собственный автопарк и строгий контроль логистики
                                                    </p>
                                                </motion.div>
                                            </SwiperSlide>
                                        </Swiper>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </section>

            <section id='partners' className={styles.partners}>
                <div className={`${styles.container} container`}>
                    <div className={styles.partnersHeading}>
                        <h4 className={styles.partnersTitle}>условия сотрудничества</h4>
                        <div className={styles.partnersRight}>
                            <h3 className={styles.partnersSubtitle}>Для успешного партнёрства мы предъявляем высокие требования к поставщикам</h3>
                        </div>
                        {isMobile ? (
                            <Swiper
                                spaceBetween={20}
                                slidesPerView={1.1}
                                className={styles.partnersListSwiper}
                            >
                                {partnersData.map((partner, index) => (
                                    <SwiperSlide key={index} className={`${index == 1 || index == 2 ? styles.swiperGreen : ''}`}>
                                        <div className={styles.partnersListItem}>
                                            <h4 className={styles.partnersListItemTitle}>{partner.title}</h4>
                                            <p className={styles.partnersListItemInfo}>{partner.info}</p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <ul className={styles.partnersList}>
                                {partnersData.map((partner, index) => (
                                    <li key={index} className={styles.partnersListItem}>
                                        <h4 className={styles.partnersListItemTitle}>{partner.title}</h4>
                                        <p className={styles.partnersListItemInfo}>{partner.info}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className={`${styles.container} container`}>
                    <div className={styles.partnersForm}>
                        <div className={styles.partnersFormLeft}>
                            <h3 className={styles.partnersFormTitle}>Хотите стать нашим поставщиком?</h3>
                            <p className={styles.partnersFormInfo}>Мы всегда рады новым надёжным партнёрам и готовы предложить выгодные условия сотрудничества. Заполните форму, и мы свяжемся с вами в ближайшее время</p>
                        </div>

                        {!isSuccessModalOpen2 ? (
                            <form onSubmit={handleFormSubmit2} className={styles.partnersFormRight}>
                                <div className={styles.partnersFormRightUp}>
                                    <div className={styles.inputContainer}>
                                        <input
                                            type="text"
                                            className={`${styles.partnersInput} ${nameError ? styles.inputError : ''}`}
                                            value={inputValues.name}
                                            onFocus={() => handleFocus('name')}
                                            onBlur={() => handleBlur('name')}
                                            onChange={(e) => handleChange('name', e.target.value)}
                                        />
                                        <label className={`${styles.customPlaceholder} ${focusedInputs.name || inputValues.name ? styles.active : ''}`}>
                                            Имя и Фамилия
                                        </label>
                                        {nameError && (
                                            <div className={styles.errorMessage}>
                                                {nameError}
                                            </div>
                                        )}
                                    </div>

                                    <div className={styles.inputContainer}>
                                        <input
                                            type="text"
                                            className={`${styles.partnersInput} ${companyError ? styles.inputError : ''}`}
                                            value={inputValues.company}
                                            onFocus={() => handleFocus('company')}
                                            onBlur={() => handleBlur('company')}
                                            onChange={(e) => handleChange('company', e.target.value)}
                                        />
                                        <label className={`${styles.customPlaceholder} ${focusedInputs.company || inputValues.company ? styles.active : ''}`}>
                                            Компания
                                        </label>
                                        {companyError && (
                                            <div className={styles.errorMessage}>
                                                {companyError}
                                            </div>
                                        )}
                                    </div>

                                    <div className={styles.inputContainer}>
                                        <input
                                            type="tel"
                                            className={`${styles.partnersInput} ${phoneError ? styles.inputError : ''}`}
                                            value={inputValues.phone}
                                            onFocus={() => handleFocus('phone')}
                                            onBlur={() => handleBlur('phone')}
                                            onChange={(e) => handleChange('phone', e.target.value)}
                                            placeholder=""
                                        />
                                        <label className={`${styles.customPlaceholder} ${focusedInputs.phone || inputValues.phone ? styles.active : ''}`}>
                                            Номер телефона
                                        </label>
                                        {phoneError && (
                                            <div className={styles.errorMessage}>
                                                {phoneError}
                                            </div>
                                        )}
                                    </div>

                                    <div className={styles.inputContainer}>
                                        <input
                                            type="email"
                                            className={`${styles.partnersInput} ${emailError ? styles.inputError : ''}`}
                                            value={inputValues.email}
                                            onFocus={() => handleFocus('email')}
                                            onBlur={() => handleBlur('email')}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                        />
                                        <label className={`${styles.customPlaceholder} ${focusedInputs.email || inputValues.email ? styles.active : ''}`}>
                                            Электронная почта
                                        </label>
                                        {emailError && (
                                            <div className={styles.errorMessage}>
                                                {emailError}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.partnersFileBox}>
                                    <input
                                        className={`${styles.partnersFileInput} ${isFormSubmitted && !selectedFile ? styles.inputError : ''}`}
                                        type="file"
                                        id="partnersFile"
                                        onChange={(e) => handleChange('file', e.target.files[0])}
                                    />
                                    <label className={styles.partnersFileLabel} htmlFor="partnersFile">
                                        <Image
                                            src={'/paperclip.svg'}
                                            width={24}
                                            height={24}
                                            alt="attach"
                                            className={`${styles.paperclipIcon} ${isFormSubmitted && !selectedFile ? styles.paperclipError : ''}`}
                                        />
                                        <div className={styles.partnersFiletext}>
                                            <h5 className={styles.partnersFileInputTitle}>Прикрепить коммерческое предложение</h5>
                                            <h6 className={`${styles.partnersFileInputInfo} ${isFormSubmitted && !selectedFile ? styles.fileErrorText : ''}`}>
                                                {isFormSubmitted && !selectedFile ? 'Прикрепите файл' : 'pdf, doc до 10 мб'}
                                            </h6>
                                        </div>
                                    </label>
                                </div>
                                <div className={styles.partnersFormRightBottom}>
                                    <button className={styles.partnersFormSubmit} type="submit">
                                        Отправить заявку
                                    </button>
                                    <p className={styles.partnersPolicy}>
                                        Нажимая на кнопку, вы соглашаетесь с{' '}
                                        <Link href={'/privacy'}>политикой конфиденциальности</Link>
                                    </p>
                                </div>
                            </form>
                        ) : (
                            <div className={styles.modalOverlay2} onClick={closeSuccessModal2}>
                                <div className={styles.successModalContent2} onClick={(e) => e.stopPropagation()}>
                                    <div className={styles.successModal2}>
                                        <div className={styles.successModalInner2}>
                                            <Image src={'/email.svg'} width={52} height={52} alt="Email icon" />
                                            <h3 className={styles.successModalTitle2}>Заявка отправлена</h3>
                                            <p className={styles.successModalInfo2}>
                                                Спасибо за интерес к партнёрству! Мы получили вашу заявку и свяжемся с вами в ближайшее время.
                                            </p>
                                            <p className={styles.successModalInfo2}>
                                                Если у вас остались вопросы, вы всегда можете позвонить нам по телефону <span><a href="tel:+70000000000">+7 (000) 000–00–00</a></span> или написать на <span><a href="mailto:stm@ideologia.ru">stm@ideologia.ru</a></span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section id='questions' className={styles.questions}>
                <div className={`${styles.container} container`}>
                    <div className={styles.questionsUp}>
                        <h4 className={styles.questionsTitle}>частые вопросы</h4>
                        <h3 className={styles.questionsSubtitle}>Ответы на частые вопросы о сотрудничестве</h3>
                    </div>
                    <ul className={styles.questionsList}>
                        {faqItems.map((item, index) => (
                            <li
                                key={index}
                                className={`${styles.questionsItem} ${openItems.includes(index) ? styles.questionsItemOpened : ''}`}
                                onClick={() => toggleItem(index)}
                            >
                                <div className={styles.questionsItemUp}>
                                    <h4 className={styles.questionsItemTitle}>{item.question}</h4>
                                    <motion.div
                                        animate={{ rotate: openItems.includes(index) ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {openItems.includes(index) ? (
                                            <svg className={styles.questionsItemSym} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M5 12H19" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        ) : (
                                            <svg className={styles.questionsItemSym} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12 5V19M5 12H19" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        )}
                                    </motion.div>
                                </div>
                                <AnimatePresence>
                                    {openItems.includes(index) && (
                                        <motion.div
                                            className={styles.questionsItemBottom}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <p className={styles.questionsItemInfo}>{item.answer}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section id='preFooter' className={styles.preFooter}>
                <div className={`${styles.container} container`}>
                    <div className={styles.preFooterWrapper}>
                        <Image src='/suppliers-prefooter.png' alt='Еда' width={586} height={400} className={styles.preFooterPhoto} />
                        <motion.div
                            className={`${styles.preFooterCard} ${styles.preFooterPartnerCard}`}
                            onMouseEnter={() => setIsPreFooterHovered(true)}
                            onMouseLeave={() => setIsPreFooterHovered(false)}
                            initial='initial'
                            animate={isPreFooterHovered ? 'hover' : 'initial'}
                            variants={preFooterCardBackgroundVariants}
                            style={{ '--ripple-origin-x': rippleOrigin.x, '--ripple-origin-y': rippleOrigin.y }}
                        >
                            <motion.span className={styles.preFooterTopText} variants={preFooterPartnerTextVariants}>
                                смотреть далее
                            </motion.span>
                            <Link href='/news' className={`${styles.partnerLink} ${styles.preFooterLink}`}>
                                <motion.span className={`${styles.partnerText} ${styles.preFooterTitle}`} variants={preFooterPartnerTextVariants}>
                                    Новости
                                </motion.span>
                                <motion.div className={styles.arrowContainer}>
                                    <motion.svg
                                        className={styles.partnerArrow}
                                        width='40'
                                        height='40'
                                        viewBox='0 0 40 40'
                                        fill='none'
                                        strokeWidth={2}
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        variants={preFooterArrowVariants}
                                    >
                                        <motion.path d='M12 28.6667L28.6667 12' />
                                        <motion.path d='M12 12H28.6667V28.6667' />
                                    </motion.svg>
                                </motion.div>
                            </Link>
                            {Array.from({ length: 3 }).map((_, i) => {
                                const baseScale = 5;
                                const finalScale = (baseScale - (i * SCALE_REDUCTION)) * 2;

                                return (
                                    <motion.div
                                        key={`prefooter-ripple-${i}`}
                                        className={styles.ripple}
                                        initial='initial'
                                        animate={isPreFooterHovered ? 'hover' : 'initial'}
                                        variants={rippleVariants2}
                                        style={{
                                            right: `${isMobile ? '20px' : '30px'}`,
                                            bottom: `${isMobile ? '20px' : '30px'}`,
                                            transform: 'translate(50%, 50%)',
                                            backgroundColor: clientRippleColors[i],
                                            scale: finalScale, // Set final scale directly via style
                                        }}
                                    />
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />

        </>
    );
}