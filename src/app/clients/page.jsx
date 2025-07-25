'use client';

import Image from 'next/image';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import styles from '../styles/Clients.module.css';
import Button from '../components/Button/Button';
import Link from 'next/link';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Clients() {
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
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
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

    const validateEmail = (email) => {
        if (email === '') {
            setEmailError('');
            return true;
        }

        // Проверяем наличие @ и .
        const hasAt = email.includes('@');
        const hasDot = email.includes('.');

        if (!hasAt || !hasDot) {
            setEmailError('Введите корректный email адрес');
            return false;
        }

        // Более точная проверка структуры email
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

        if (phone === '') {
            setPhoneError('');
            return true;
        }

        if (numbers.length < 11) {
            setPhoneError('Введите полный номер телефона');
            return false;
        }

        setPhoneError('');
        return true;
    };

    const handleChange = (inputName, value) => {
        if (inputName === 'phone') {
            const formattedPhone = formatPhoneNumber(value);
            setInputValues(prev => ({ ...prev, [inputName]: formattedPhone }));

            // Валидация в реальном времени
            validatePhone(formattedPhone);
        } else {
            setInputValues(prev => ({ ...prev, [inputName]: value }));
        }
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
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission logic (e.g., API call)
        setIsModalOpen(false); // Close the first modal
        setIsSuccessModalOpen(true); // Open the success modal
    };

    const closeSuccessModal = () => {
        setIsSuccessModalOpen(false);
    };

    const handleFormSubmit2 = (e) => {
        e.preventDefault();
        // Simulate form submission logic (e.g., API call)
        setIsSuccessModalOpen2(true); // Open the success modal
        const isPhoneValid = validatePhone(inputValues.phone);
        const isEmailValid = validateEmail(inputValues.email);

        if (!isPhoneValid || !isEmailValid) {

            return;
        }

        // Здесь ваша логика отправки формы
        console.log('Form submitted:', inputValues);
    };

    const closeSuccessModal2 = () => {
        setIsSuccessModalOpen2(false);
    };

    const faqItems = [
        {
            question: 'Какие минимальные объёмы поставок?',
            answer: 'Мы работаем как с крупными, так и с небольшими заказами. Условия обсуждаются индивидуально.'
        },
        {
            question: 'Как быстро вы сможете начать поставки?',
            answer: 'Сроки зависят от объёма заказа и логистики. Обычно поставки запускаются в течение 5 дней после подписания договора.'
        },
        {
            question: 'Есть ли возможность производства под СТМ?',
            answer: 'Да, мы разрабатываем рецептуры и производим продукцию под торговыми марками наших партнёров.'
        },
        {
            question: 'Можете ли вы разрабатывать уникальные рецептуры под наши требования?',
            answer: 'Да, мы предлагаем разработку индивидуальных рецептур с учётом ваших пожеланий по вкусу, составу и упаковке.'
        },
        {
            question: 'Как осуществляется доставка?',
            answer: 'Мы доставляем продукцию собственным транспортом с соблюдением температурного режима или работаем с проверенными логистическими партнёрами.'
        },
        {
            question: 'Какие гарантии качества вы предоставляете?',
            answer: 'Вся продукция проходит строгий контроль качества, включая лабораторные тесты, металлодетекцию и рентген-контроль. Мы сертифицированы по международным стандартам (HACCP, ISO 22000).'
        },
        {
            question: 'Можно ли заказать пробные партии продукции?',
            answer: 'Да, мы можем предоставить тестовые образцы, чтобы вы могли оценить качество и вкус нашей продукции.'
        },
        {
            question: 'Работаете ли вы с регионами?',
            answer: 'Да, работаем и представлены во многих регионах России. Условия доставки обсуждаются индивидуально.'
        }
    ];

    const partnersData = [
        {
            title: 'Оптовые поставки на выгодных условиях',
            info: 'Предлагаем стабильные поставки продукции по конкурентным ценам с гибкими условиями сотрудничества',
        },
        {
            title: 'Производство под собственной торговой маркой (СТМ)',
            info: 'Разрабатываем рецептуры и выпускаем продукцию с учётом требований вашего бренда, гарантируя высокое качество',
        },
        {
            title: 'Эксклюзивные контракты',
            info: 'Открыты к индивидуальным соглашениям, предоставляя партнёрам уникальные условия и ассортимент',
        },
    ];

    const rippleOrigin = {
        x: '100%',
        y: '100%',
    };

    const clientCardBackgroundVariants = {
        initial: {
            backgroundColor: '#fff',
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

    const clientPartnerTextVariants = {
        initial: {
            color: '#2C2C2C',
        },
        hover: {
            color: '#fff',
            transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
        },
    };

    const clientArrowVariants = {
        initial: {
            stroke: '#2C2C2C',
            rotate: 0
        },
        hover: {
            stroke: '#fff',
            rotate: 45,
            transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
        },
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
    const rippleVariants = {
        initial: {
            scale: 0,
            transition: { duration: 0 }
        },
        hover: (i) => {
            const baseScale = 5;
            const maxScale = baseScale - (i * SCALE_REDUCTION);
            return {
                scale: [1, 4, maxScale],
                transition: {
                    duration: 0.3,
                    ease: "easeInOut",
                }
            };
        }
    };
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
                    <h1 className={styles.clientsHeaderHeading}>Клиентам</h1>
                    <div className={styles.clientsHeaderText}>
                        <div className={styles.clientsHeaderBottomText}>
                            <h5 className={styles.clientsHeaderTextTitle}>что мы делаем</h5>
                            <div className={styles.clientsHeaderBottomBlock}>
                                <h3 className={styles.clientsHeaderTextInfo}>
                                    Готовая продукция для вашего бизнеса
                                </h3>
                                <p className={styles.clientsHeaderTextDescription}>
                                    Мы производим свежие и качественные продукты питания, которые можно найти на полках крупнейших сетей: «Пятёрочка», «Перекрёсток», «Самокат», «ВкусВилл» и других. Наши сэндвичи, блины, пироги, десерты и другие изделия готовы к употреблению и подходят для самых разных форматов торговли: от магазинов у дома до сетевых гипермаркетов и онлайн-доставки
                                </p>
                                <button className={styles.clientsHeaderButton} onClick={toggleModal}>
                                    Стать партнёром
                                </button>
                                <div className={styles.cardsContainerBlock}>
                                    <motion.div
                                        className={styles.cardBlock}
                                        initial={{ x: -245 }}
                                        whileInView={{ x: 0 }}
                                        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                        viewport={{ once: true }}
                                    >
                                        <motion.div
                                            className={styles.cardNumberWrapperBlock}
                                            initial={{ x: -245 }}
                                            whileInView={{ x: 0 }}
                                            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                            viewport={{ once: true }}
                                        >
                                            <span className={styles.cardNumberText}>100 000</span>
                                            <span className={styles.cardUnitText}>ед.</span>
                                        </motion.div>
                                        <motion.p
                                            className={styles.cardDescriptionText}
                                            initial={{ y: 15 }}
                                            whileInView={{ y: 0 }}
                                            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                            viewport={{ once: true }}
                                        >
                                            продукции в день
                                        </motion.p>
                                        <motion.img
                                            src="/pizza.png"
                                            alt="Пиццы"
                                            width={360}
                                            height={320}
                                            className={`${styles.cardImage}`}
                                            sizes="100vw"
                                            initial={{ y: 15 }}
                                            whileInView={{ y: 0 }}
                                            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                            viewport={{ once: true }}
                                            style={{ willChange: 'transform' }}
                                            priority
                                        />
                                    </motion.div>

                                    <div className={styles.cardBlock}>
                                        <motion.div
                                            className={styles.cardNumberWrapperBlock}
                                            initial={{ x: -245 }}
                                            whileInView={{ x: 0 }}
                                            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                            viewport={{ once: true }}
                                        >
                                            <span className={styles.cardNumberText}>5</span>
                                            <span className={styles.cardUnitText}>этапов</span>
                                        </motion.div>
                                        <motion.p
                                            className={styles.cardDescriptionText}
                                            initial={{ y: 15 }}
                                            whileInView={{ y: 0 }}
                                            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                            viewport={{ once: true }}
                                        >
                                            проверки качества продуктов
                                        </motion.p>
                                    </div>

                                    <div className={styles.cardBlock}>
                                        <motion.div
                                            className={styles.cardNumberWrapperBlock}
                                            initial={{ x: -245 }}
                                            whileInView={{ x: 0 }}
                                            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                            viewport={{ once: true }}
                                        >
                                            <span className={styles.cardNumberText}>{`>5`}</span>
                                            <span className={styles.cardUnitText}>лет</span>
                                        </motion.div>
                                        <motion.p
                                            className={styles.cardDescriptionText}
                                            initial={{ y: 15 }}
                                            whileInView={{ y: 0 }}
                                            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                            viewport={{ once: true }}
                                        >
                                            на рынке производства готовой еды
                                        </motion.p>
                                    </div>
                                </div>
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
                                    <Image className={styles.contactFormImage} src={'/Ellipse.svg'} width={449} height={449}></Image>
                                    <h3 className={styles.contactFormTitle}>Хотите стать нашим партнёром?</h3>
                                    <p className={styles.contactFormInfo}>
                                        Мы всегда открыты к новым партнёрствам и готовы предложить лучшие условия для вашего бизнеса. Заполните форму и мы свяжемся с вами в ближайшее время
                                    </p>
                                </div>
                                <div className={styles.contactFormRight}>
                                    <form onSubmit={handleFormSubmit}>
                                        <div className={styles.contactFormRightUp}>
                                            <div className={styles.inputContainer}>
                                                <input
                                                    type="text"
                                                    className={styles.partnersInput}
                                                    value={inputValues.name}
                                                    onFocus={() => handleFocus('name')}
                                                    onBlur={() => handleBlur('name')}
                                                    onChange={(e) => handleChange('name', e.target.value)}
                                                />
                                                <label className={`${styles.customPlaceholder} ${focusedInputs.name || inputValues.name ? styles.active : ''}`}>
                                                    Имя и Фамилия
                                                </label>
                                            </div>

                                            <div className={styles.inputContainer}>
                                                <input
                                                    type="text"
                                                    className={styles.partnersInput}
                                                    value={inputValues.company}
                                                    onFocus={() => handleFocus('company')}
                                                    onBlur={() => handleBlur('company')}
                                                    onChange={(e) => handleChange('company', e.target.value)}
                                                />
                                                <label className={`${styles.customPlaceholder} ${focusedInputs.company || inputValues.company ? styles.active : ''}`}>
                                                    Компания
                                                </label>
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
                    <div className={styles.modalOverlay} onClick={closeSuccessModal}>
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
                                        Если у вас остались вопросы, вы всегда можете позвонить нам по телефону <span><a href="">+7 (000) 000–00–00</a></span> или написать на <span><a href="">stm@ideologia.ru</a></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            <section id='advantages' className={styles.advantages}>
                <div className={`${styles.container} container`}>
                    <div className={styles.advantagesContent}>
                        <h5 className={styles.advantagesTitle}>наши преимущества</h5>
                        <div className={styles.advantagesLeft}>
                            <h3 className={styles.advantagesSubtitle}>Почему выбирают нас?</h3>
                            <ul className={styles.advantagesList}>
                                <li className={styles.advantagesListItem}>
                                    <Image src="/about-quality2.png" alt="Сертификация по ISO 9001" width={400} height={320} />
                                    <div className={styles.advantagesListItemContent}>
                                        <div className={styles.advantagesListItemUp}>
                                            <h4 className={styles.advantagesListItemTitle}>Гарантия качества и безопасности</h4>
                                        </div>
                                        <p className={styles.advantagesListItemDescription}>Мы строго соблюдаем все санитарные и производственные стандарты. Наши продукты проходят лабораторные тесты, рентген-контроль и проверку металлодетекторами на всех этапах производства</p>
                                    </div>
                                </li>
                                <li className={styles.advantagesListItem}>
                                    <Image src="/about-quality1.png" alt="Сертификация по ISO 9001" width={400} height={320} />
                                    <div className={styles.advantagesListItemContent}>
                                        <div className={styles.advantagesListItemUp}>
                                            <h4 className={styles.advantagesListItemTitle}>Сертификация и контроль</h4>
                                        </div>
                                        <p className={styles.advantagesListItemDescription}>Мы работаем в соответствии с международными стандартами безопасности пищевых продуктов (HACCP, ISO 22000). Каждая партия сырья и готовой продукции проходит обязательное тестирование</p>
                                    </div>
                                </li>
                                <li className={styles.advantagesListItem}>
                                    <Image src="/about-prefooter.png" alt="Сертификация по ISO 9001" width={400} height={320} />
                                    <div className={styles.advantagesListItemContent}>
                                        <div className={styles.advantagesListItemUp}>
                                            <h4 className={styles.advantagesListItemTitle}>Современное производство</h4>
                                        </div>
                                        <p className={styles.advantagesListItemDescription}>Наше предприятие оснащено передовым оборудованием, что позволяет автоматизировать процессы, контролировать дозировку ингредиентов и минимизировать влияние человеческого фактора</p>
                                    </div>
                                </li>
                                <li className={styles.advantagesListItem}>
                                    <Image src="/productsHeader1.png" alt="Сертификация по ISO 9001" width={400} height={320} />
                                    <div className={styles.advantagesListItemContent}>
                                        <div className={styles.advantagesListItemUp}>
                                            <h4 className={styles.advantagesListItemTitle}>Производство под СТМ</h4>
                                        </div>
                                        <p className={styles.advantagesListItemDescription}>Мы разрабатываем рецептуры и выпускаем продукцию под собственными торговыми марками (СТМ) наших партнёров. Индивидуальный подход, соблюдение рецептур и гибкие условия позволяют создавать уникальные решения для вашего бизнеса</p>
                                    </div>
                                </li>
                                <li className={styles.advantagesListItem}>
                                    <Image src="/productsHeader3.png" alt="Сертификация по ISO 9001" width={400} height={320} />
                                    <div className={styles.advantagesListItemContent}>
                                        <div className={styles.advantagesListItemUp}>
                                            <h4 className={styles.advantagesListItemTitle}>Экспертный подход</h4>
                                        </div>
                                        <p className={styles.advantagesListItemDescription}>Мы знаем, какие продукты пользуются спросом у покупателей, и готовы предложить вам популярные позиции и новинки, основанные на анализе трендов рынка</p>
                                    </div>
                                </li>
                                <li className={styles.advantagesListItem}>
                                    <Image src="/logistics.png" alt="Сертификация по ISO 9001" width={400} height={320} />
                                    <div className={styles.advantagesListItemContent}>
                                        <div className={styles.advantagesListItemUp}>
                                            <h4 className={styles.advantagesListItemTitle}>Собственная логистика</h4>
                                        </div>
                                        <p className={styles.advantagesListItemDescription}>Наш автопарк и транспортная сеть обеспечивают бесперебойные поставки по Москве и области, гарантируя быструю и своевременную доставку с соблюдением температурного режима</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section id="products" className={styles.productsBlock}>
                <div className={`${styles.container} container`}>
                    <div className={styles.productsHeaderBlock}>
                        <div className={styles.productsHeaderBottomBlock}>
                            <h5 className={styles.productsHeaderTitle}>ассортимент продукции</h5>
                            <h3 className={styles.productsHeaderInfo}>Мы предлагаем широкий выбор готовой еды</h3>
                        </div>
                    </div>
                    <div className={styles.productsCardsContainer}>
                        <div className={styles.productsCard}>
                            <div className={styles.productsCardUp}>
                                <p className={styles.productsTitle}>Сэндвичи</p>
                                <p className={styles.productsPrice}>{'> 50 видов'}</p>
                            </div>
                            <Image src='/sandwich.png' alt='Сэндвич' width={484} height={440} className={styles.productsImage} />
                        </div>
                        <div className={styles.productsCard}>
                            <div className={styles.productsCardUp}>
                                <p className={styles.productsTitle}>Блины</p>
                                <p className={styles.productsPrice}>{'> 50 видов'}</p>
                            </div>
                            <Image src='/blini.png' alt='Блины' width={484} height={440} className={styles.productsImage} />
                        </div>
                        <div className={styles.productsCard}>
                            <div className={styles.productsCardUp}>
                                <p className={styles.productsTitle}>Пироги</p>
                                <p className={styles.productsPrice}>{'> 50 видов'}</p>
                            </div>
                            <Image src='/pirogi.png' alt='Пироги' width={484} height={440} className={styles.productsImage} />
                        </div>
                        <div className={styles.productsCard}>
                            <div className={styles.productsCardUp}>
                                <p className={styles.productsTitle}>Слоёные изделия</p>
                                <p className={styles.productsPrice}>{'> 50 видов'}</p>
                            </div>
                            <Image src='/soleniye.png' alt='Слоёные изделия' width={484} height={440} className={styles.productsImage} />
                        </div>
                        <div className={styles.productsCard}>
                            <div className={styles.productsCardUp}>
                                <p className={styles.productsTitle}>Изделия из песочного теста</p>
                                <p className={styles.productsPrice}>{'> 50 видов'}</p>
                            </div>
                            <Image src='/pesochnoye.png' alt='Песочные изделия' width={484} height={440} className={styles.productsImage} />
                        </div>
                        <div className={styles.productsCard}>
                            <div className={styles.productsCardUp}>
                                <p className={styles.productsTitle}>Торты</p>
                                <p className={styles.productsPrice}>{'> 50 видов'}</p>
                            </div>
                            <Image src='/torti.png' alt='Торты' width={484} height={440} className={styles.productsImage} />
                        </div>
                        <div className={styles.productsCard}>
                            <div className={styles.productsCardUp}>
                                <p className={styles.productsTitle}>Пирожные</p>
                                <p className={styles.productsPrice}>{'> 50 видов'}</p>
                            </div>
                            <Image src='/pirozhnoye.png' alt='Пирожные' width={484} height={440} className={styles.productsImage} />
                        </div>
                        <div className={styles.productsCard}>
                            <div className={styles.productsBanner}>
                                <ul className={styles.productsBannerLogos}>
                                    <li className={styles.productsBannerLogo}>
                                        <Image src={'/stm1.svg'} width={60} height={60} alt="Logo 1" />
                                    </li>
                                    <li className={styles.productsBannerLogo}>
                                        <Image src={'/stm2.svg'} width={60} height={60} alt="Logo 2" />
                                    </li>
                                    <li className={styles.productsBannerLogo}>
                                        <Image src={'/stm3.svg'} width={60} height={60} alt="Logo 3" />
                                    </li>
                                    <li className={styles.productsBannerLogo}>
                                        <Image src={'/stm4.svg'} width={60} height={60} alt="Logo 4" />
                                    </li>
                                    <li className={styles.productsBannerLogo}>
                                        <Image src={'/plus.svg'} width={24} height={24} alt="Plus" />
                                    </li>
                                </ul>
                                <h4 className={styles.productsBannerTitle}>
                                    Готовы произвести то, что нужно именно вам
                                </h4>
                                <p className={styles.productsBannerInfo}>В каталоге — лишь часть наших возможностей. Мы можем разработать и запустить в производство продукцию по вашему техническому заданию, от рецептуры до упаковки</p>
                                <button className={styles.productsBannerBtn} onClick={toggleModal}>Отправить заявку</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.container} ${styles.container2} container`}>
                    <div className={styles.productsCardsContainerMobile}>
                        <div className={`${styles.productsCardMobile} ${styles.productsCardMobileInner}`}>
                            <Swiper
                                spaceBetween={10}
                                slidesPerView={1.1}
                                className={styles.productsSwiper}
                                ref={swiperRef}
                                onSlideChange={(swiper) => setSwiperIndex(swiper.activeIndex)}
                            >
                                <SwiperSlide>
                                    <div className={styles.productsCard}>
                                        <div className={styles.productsCardUp}>
                                            <p className={styles.productsTitle}>Сэндвичи</p>
                                            <p className={styles.productsPrice}>{'> 50 видов'}</p>
                                        </div>
                                        <Image src='/sandwich.png' alt='Сэндвич' width={484} height={440} className={styles.productsImage} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.productsCard}>
                                        <div className={styles.productsCardUp}>
                                            <p className={styles.productsTitle}>Блины</p>
                                            <p className={styles.productsPrice}>{'> 50 видов'}</p>
                                        </div>
                                        <Image src='/blini.png' alt='Блины' width={484} height={440} className={styles.productsImage} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.productsCard}>
                                        <div className={styles.productsCardUp}>
                                            <p className={styles.productsTitle}>Пироги</p>
                                            <p className={styles.productsPrice}>{'> 50 видов'}</p>
                                        </div>
                                        <Image src='/pirogi.png' alt='Пироги' width={484} height={440} className={styles.productsImage} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.productsCard}>
                                        <div className={styles.productsCardUp}>
                                            <p className={styles.productsTitle}>Слоёные изделия</p>
                                            <p className={styles.productsPrice}>{'> 50 видов'}</p>
                                        </div>
                                        <Image src='/soleniye.png' alt='Слоёные изделия' width={484} height={440} className={styles.productsImage} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.productsCard}>
                                        <div className={styles.productsCardUp}>
                                            <p className={styles.productsTitle}>Изделия из песочного теста</p>
                                            <p className={styles.productsPrice}>{'> 50 видов'}</p>
                                        </div>
                                        <Image src='/pesochnoye.png' alt='Песочные изделия' width={484} height={440} className={styles.productsImage} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.productsCard}>
                                        <div className={styles.productsCardUp}>
                                            <p className={styles.productsTitle}>Торты</p>
                                            <p className={styles.productsPrice}>{'> 50 видов'}</p>
                                        </div>
                                        <Image src='/torti.png' alt='Торты' width={484} height={440} className={styles.productsImage} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.productsCard}>
                                        <div className={styles.productsCardUp}>
                                            <p className={styles.productsTitle}>Пирожные</p>
                                            <p className={styles.productsPrice}>{'> 50 видов'}</p>
                                        </div>
                                        <Image src='/pirozhnoye.png' alt='Пирожные' width={484} height={440} className={styles.productsImage} />
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <div className={styles.productsCardMobile}>
                            <div className={styles.productsBanner}>
                                <ul className={styles.productsBannerLogos}>
                                    <li className={styles.productsBannerLogo}>
                                        <Image src={'/stm1.svg'} width={60} height={60} alt="Logo 1" />
                                    </li>
                                    <li className={styles.productsBannerLogo}>
                                        <Image src={'/stm2.svg'} width={60} height={60} alt="Logo 2" />
                                    </li>
                                    <li className={styles.productsBannerLogo}>
                                        <Image src={'/stm3.svg'} width={60} height={60} alt="Logo 3" />
                                    </li>
                                    <li className={styles.productsBannerLogo}>
                                        <Image src={'/stm4.svg'} width={60} height={60} alt="Logo 4" />
                                    </li>
                                    <li className={styles.productsBannerLogo}>
                                        <Image src={'/plus.svg'} width={24} height={24} alt="Plus" />
                                    </li>
                                </ul>
                                <h4 className={styles.productsBannerTitle}>
                                    Готовы произвести то, что нужно именно вам
                                </h4>
                                <p className={styles.productsBannerInfo}>В каталоге — лишь часть наших возможностей. Мы можем разработать и запустить в производство продукцию по вашему техническому заданию, от рецептуры до упаковки</p>
                                <button className={styles.productsBannerBtn} onClick={toggleModal}>Отправить заявку</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id='partners' className={styles.partners}>
                <div className={`${styles.container} container`}>
                    <div className={styles.partnersHeading}>
                        <h4 className={styles.partnersTitle}>коммерческие условия и партнёрство</h4>
                        <div className={styles.partnersRight}>
                            <h3 className={styles.partnersSubtitle}>Мы предлагаем различные варианты сотрудничества</h3>
                        </div>
                        {isMobile ? (
                            <Swiper
                                spaceBetween={20}
                                slidesPerView={1}
                                className={styles.partnersListSwiper}
                            >
                                {partnersData.map((partner, index) => (
                                    <SwiperSlide key={index} className={`${index == 1 ? styles.swiperGreen : ''}`}>
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
                            <h3 className={styles.partnersFormTitle}>Хотите стать нашим партнёром?</h3>
                            <p className={styles.partnersFormInfo}>Мы всегда открыты к новым партнёрствам и готовы предложить лучшие условия для вашего бизнеса. Заполните форму и мы свяжемся с вами в ближайшее время</p>
                        </div>

                        {!isSuccessModalOpen2 ? (
                            <form onSubmit={handleFormSubmit2} className={styles.partnersFormRight}>
                                <div className={styles.partnersFormRightUp}>
                                    <div className={styles.inputContainer}>
                                        <input
                                            type="text"
                                            className={styles.partnersInput}
                                            value={inputValues.name}
                                            onFocus={() => handleFocus('name')}
                                            onBlur={() => handleBlur('name')}
                                            onChange={(e) => handleChange('name', e.target.value)}
                                        />
                                        <label
                                            className={`${styles.customPlaceholder} ${focusedInputs.name || inputValues.name ? styles.active : ''
                                                }`}
                                        >
                                            Имя и Фамилия
                                        </label>
                                    </div>

                                    <div className={styles.inputContainer}>
                                        <input
                                            type="text"
                                            className={styles.partnersInput}
                                            value={inputValues.company}
                                            onFocus={() => handleFocus('company')}
                                            onBlur={() => handleBlur('company')}
                                            onChange={(e) => handleChange('company', e.target.value)}
                                        />
                                        <label
                                            className={`${styles.customPlaceholder} ${focusedInputs.company || inputValues.company ? styles.active : ''
                                                }`}
                                        >
                                            Компания
                                        </label>
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
                                        <label
                                            className={`${styles.customPlaceholder} ${focusedInputs.phone || inputValues.phone ? styles.active : ''
                                                }`}
                                        >
                                            Номер телефона
                                        </label>
                                        {phoneError && <div className={styles.errorMessage}>{phoneError}</div>}
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
                                        <label
                                            className={`${styles.customPlaceholder} ${focusedInputs.email || inputValues.email ? styles.active : ''
                                                }`}
                                        >
                                            Электронная почта
                                        </label>
                                        {emailError && <div className={styles.errorMessage}>{emailError}</div>}
                                    </div>
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
                        <Image src='/clients-prefooter.png' alt='Еда' width={586} height={400} className={styles.preFooterPhoto} />
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
                            <Link href='/' className={`${styles.partnerLink} ${styles.preFooterLink}`}>
                                <motion.span className={`${styles.partnerText} ${styles.preFooterTitle}`} variants={preFooterPartnerTextVariants}>
                                    Поставщикам
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