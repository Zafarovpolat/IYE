'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import styles from '../styles/Contacts.module.css';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import 'swiper/css';

export default function Contacts() {
    const [isClient, setIsClient] = useState(false);
    const [isPreFooterHovered, setIsPreFooterHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const mapRef = useRef(null);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // New state for success modal
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [textAreaError, setTextAreaError] = useState('');
    const [fileError, setFileError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [focusedInputs, setFocusedInputs] = useState({});
    const [inputValues, setInputValues] = useState({
        name: '',
        phone: '',
        email: '',
        textArea: ''
    });

    const handleFocus = (inputName) => {
        setFocusedInputs(prev => ({ ...prev, [inputName]: true }));
    };

    const handleBlur = (inputName) => {
        if (!inputValues[inputName]) {
            setFocusedInputs(prev => ({ ...prev, [inputName]: false }));
        }

        if (inputName === 'name') validateName(inputValues.name);
        else if (inputName === 'phone') validatePhone(inputValues.phone);
        else if (inputName === 'email') validateEmail(inputValues.email);
        else if (inputName === 'textArea') validateTextArea(inputValues.textArea);
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
            setNameError('Пожалуйста, введите имя');
            return false;
        }
        if (name.trim().length < 2) {
            setNameError('Имя должно содержать не менее 2 символов');
            return false;
        }
        setNameError('');
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

    const validateTextArea = (text) => {
        if (!text.trim()) {
            setTextAreaError('Пожалуйста, опишите вашу ситуацию');
            return false;
        }
        if (text.trim().length < 10) {
            setTextAreaError('Описание должно содержать не менее 10 символов');
            return false;
        }
        setTextAreaError('');
        return true;
    };

    const validateFile = (file) => {
        if (!file) {
            setFileError('Пожалуйста, прикрепите файл');
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
            else if (inputName === 'email') validateEmail(value);
            else if (inputName === 'textArea') validateTextArea(value);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const isNameValid = validateName(inputValues.name);
        const isPhoneValid = validatePhone(inputValues.phone);
        const isEmailValid = validateEmail(inputValues.email);
        const isTextAreaValid = validateTextArea(inputValues.textArea);
        const isFileValid = validateFile(selectedFile);

        if (!isNameValid || !isPhoneValid || !isEmailValid || !isTextAreaValid || !isFileValid) {
            return;
        }

        console.log('Form submitted:', { ...inputValues, file: selectedFile });
        setIsSuccessModalOpen(true);
        setInputValues({
            name: '',
            phone: '',
            email: '',
            textArea: ''
        });
        setSelectedFile(null);
        setFocusedInputs({
            name: false,
            phone: false,
            email: false,
            textArea: false
        });
        setNameError('');
        setPhoneError('');
        setEmailError('');
        setTextAreaError('');
        setFileError('');
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient && mapRef.current) {
            const script = document.createElement('script');
            script.src = `https://api-maps.yandex.ru/2.1/?apikey=${process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY}&lang=ru_RU`;
            script.async = true;
            script.onload = () => {
                window.ymaps.ready(() => {
                    const map = new window.ymaps.Map(mapRef.current, {
                        center: [55.798191, 37.938147],
                        zoom: 15,
                    });

                    // Кастомный layout для балуна (опционально)
                    const CustomBalloonLayout = window.ymaps.templateLayoutFactory.createClass(
                        '<div class="custom-balloon" style="padding: 10px; background: white; border-radius: 5px; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">' +
                        '<div>$[[options.contentLayout]]</div>' +
                        '</div>'
                    );

                    // Создаем кастомную метку
                    const placemark = new window.ymaps.Placemark(
                        [55.798191, 37.938147],
                        {
                            hintContent: 'Идеология Еды',
                            balloonContent: 'Московская область, город Балашиха, улица Западная, дом 7А',
                        },
                        {
                            iconLayout: 'default#image',
                            iconImageHref: '/Pin.svg',
                            iconImageSize: [180, 180], // Размер метки
                            iconImageOffset: [-90, -180], // Смещение метки (центр внизу изображения)
                            balloonOffset: [0, -180], // Смещение балуна относительно метки
                            balloonLayout: CustomBalloonLayout, // Кастомный layout для балуна (опционально)
                            balloonPanelMaxMapArea: 0, // Балун не раскрывается в панель
                            balloonCloseButton: true, // Кнопка закрытия балуна
                        }
                    );

                    map.geoObjects.add(placemark);
                });
            };
            document.head.appendChild(script);

            return () => {
                document.head.removeChild(script);
            };
        }
    }, [isClient]);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width <= 767);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const closeSuccessModal = () => {
        setIsSuccessModalOpen(false);
    };

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

            <section id='technology' className={styles.technology}>
                <div className={`${styles.container} container`}>
                    <div className={styles.technologyHeaderBlock}>
                        <h2 className={styles.technologyHeader}>Контакты</h2>
                    </div>
                    <div className={styles.technologyContent}>
                        <div className={styles.technologyTextBlock}>
                            <h5 className={styles.technologyTitle}>контакты по направлениям</h5>
                            <div className={styles.technologyDescription}>
                                <h3 className={styles.technologyDescriptionTitle}>Мы всегда на связи и готовы ответить на ваши вопросы. Выберите нужный отдел, чтобы получить оперативный ответ</h3>
                            </div>
                        </div>
                        <ul className={`${styles.technologyCards}`}>
                            <li className={styles.technologyCard}>
                                <h4 className={styles.technologyCardTitle}>Партнёры и СТМ-сотрудничество</h4>
                                <div className={styles.technologyCardLinks}>
                                    <a href={'tel:+70000000000'} className={styles.technologyCardLink}>+7 (000) 000–00–00</a>
                                    <a href={'mailto:stm@ideologia.ru'} className={styles.technologyCardLink}>stm@ideologia.ru</a>
                                </div>
                                <p className={styles.technologyCardInfo}>Московская область, город Балашиха, улица Западная, дом 7А</p>
                            </li>
                            <li className={styles.technologyCard}>
                                <h4 className={styles.technologyCardTitle}>Поставщики</h4>
                                <div className={styles.technologyCardLinks}>
                                    <a href={'tel:+70000000000'} className={styles.technologyCardLink}>+7 (000) 000–00–00</a>
                                    <a href={'mailto:providers@ideologia.ru'} className={styles.technologyCardLink}>providers@ideologia.ru</a>
                                </div>
                                <p className={styles.technologyCardInfo}>Московская область, город Балашиха, улица Западная, дом 7А</p>
                            </li>
                            <li className={styles.technologyCard}>
                                <h4 className={styles.technologyCardTitle}>Отзывы, жалобы, обратная связь</h4>
                                <div className={styles.technologyCardLinks}>
                                    <a href={'tel:+70000000000'} className={styles.technologyCardLink}>+7 (000) 000–00–00</a>
                                    <a href={'mailto:providers@ideologia.ru'} className={styles.technologyCardLink}>customers@ideologia.ru</a>
                                </div>
                                <p className={styles.technologyCardInfo}>Московская область, город Балашиха, улица Западная, дом 7А</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section id='map' className={styles.map}>
                <div className={`${styles.container} container`}>
                    <div className={styles.mapText}>
                        <h4 className={styles.mapTitle}>местоположение</h4>
                        <div className={styles.mapRight}>
                            <h3 className={styles.mapSubTitle}>Адрес производства</h3>
                            <p className={styles.mapInfo}>Московская область, город Балашиха, улица Западная, дом 7А</p>
                        </div>
                    </div>
                </div>
                <div className={styles.mapImg}>
                    {isClient && (
                        <div ref={mapRef} style={{ width: '100%', height: '600px' }} />
                    )}
                </div>
            </section>

            <section id='partners' className={styles.partners}>
                <div className={`${styles.container} container`}>
                    <div className={styles.partnersWrapper}>
                        <div className={styles.partnersForm}>
                            <div className={styles.partnersFormLeft}>
                                <h4 className={styles.partnersFormSubTitle}>жалобы и отзывы</h4>
                                <h3 className={styles.partnersFormTitle}>Сообщите о проблеме или оставьте отзыв</h3>
                                <p className={styles.partnersFormInfo}>Если у вас есть жалоба или предложение по нашей продукции и сервису, заполните форму — мы разберёмся в ситуации и найдём решение</p>
                            </div>

                            {!isSuccessModalOpen ? (
                                <form onSubmit={handleFormSubmit} className={styles.partnersFormRight}>
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
                                                Имя
                                            </label>
                                            {nameError && (
                                                <div className={styles.errorMessage}>
                                                    {nameError}
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

                                        <div className={styles.inputContainer}>
                                            <textarea
                                                className={`${styles.partnersTextArea} ${textAreaError ? styles.inputError : ''}`}
                                                name="textArea"
                                                value={inputValues.textArea}
                                                onFocus={() => handleFocus('textArea')}
                                                onBlur={() => handleBlur('textArea')}
                                                onChange={(e) => handleChange('textArea', e.target.value)}
                                            />
                                            <label className={`${styles.customPlaceholder} ${focusedInputs.textArea || inputValues.textArea ? styles.active : ''}`}>
                                                Опишите вашу ситуацию
                                            </label>
                                            {textAreaError && (
                                                <div className={styles.errorMessage}>
                                                    {textAreaError}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles.partnersFileBox}>
                                        <input
                                            className={`${styles.partnersFileInput} ${fileError ? styles.inputError : ''}`}
                                            type="file"
                                            id="partnersFile"
                                            onChange={(e) => handleChange('file', e.target.files[0])}
                                        />
                                        <label className={styles.partnersFileLabel} htmlFor="partnersFile">
                                            <Image src={'/paperclip.svg'} width={24} height={24} alt="attach" />
                                            <div className={styles.partnersFiletext}>
                                                <h5 className={styles.partnersFileInputTitle}>Прикрепить файл</h5>
                                                <h6 className={styles.partnersFileInputInfo}>pdf, doc до 10 мб</h6>
                                            </div>
                                        </label>
                                        {fileError && (
                                            <div className={styles.errorMessage}>
                                                {fileError}
                                            </div>
                                        )}
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
                                <div className={styles.modalOverlay} onClick={closeSuccessModal}>
                                    <div className={styles.successModalContent} onClick={(e) => e.stopPropagation()}>
                                        <div className={styles.successModal}>
                                            <div className={styles.successModalInner}>
                                                <Image src={'/email.svg'} width={52} height={52} alt="Email icon" />
                                                <h3 className={styles.successModalTitle}>Заявка отправлена</h3>
                                                <p className={styles.successModalInfo}>
                                                    Спасибо за ваш отзыв! Мы получили вашу заявку и свяжемся с вами в ближайшее время.
                                                </p>
                                                <p className={styles.successModalInfo}>
                                                    Если у вас остались вопросы, вы всегда можете позвонить нам по телефону <span><a href="tel:+70000000000">+7 (000) 000–00–00</a></span> или написать на <span><a href="mailto:customers@ideologia.ru">customers@ideologia.ru</a></span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section id='preFooter' className={styles.preFooter}>
                <div className={`${styles.container} container`}>
                    <div className={styles.preFooterWrapper}>
                        <Image src='/hero-image.png' alt='Еда' width={586} height={400} className={styles.preFooterPhoto} />
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
                                    Главная
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