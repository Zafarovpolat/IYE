'use client';

import Image from 'next/image';
import { motion, useAnimation, useMotionValue, animate } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import styles from '../styles/Production.module.css';
import Button from '../components/Button/Button';
import Link from 'next/link';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import posterImg from '../Poster.jpg';
import 'swiper/css';

export default function Production() {
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
    const [isOverflowAuto, setIsOverflowAuto] = useState(false); // Новое состояние для overflow
    const targetOffsetRef = useRef(0);
    const [negativeMarginBottom, setNegativeMarginBottom] = useState(0);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // New state for success modal
    const [deltaY, setDeltaY] = useState(30); // Default value
    const yOffset = useMotionValue(0);
    const isAnimatingRef = useRef(false); // Флаг для отслеживания активной анимации
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
        setDeltaY(window.innerWidth < 1000 ? 15 : 30);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
            setIsNewsMobile(window.innerWidth <= 1439);
            setDeltaY(window.innerWidth < 1000 ? 15 : 30); // Update deltaY on resize
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const heroHeightRef = useRef(0);
    const headerHeightRef = useRef(0);

    const updateDimensions = () => {
        const header = document.querySelector('header') || document.querySelector('.header');
        const heroElement = document.getElementById('hero');
        headerHeightRef.current = header ? header.offsetHeight - 2 : 0;
        heroHeightRef.current = heroElement ? heroElement.offsetHeight : 0;
    };

    useLayoutEffect(() => {
        if (!isClient) return;

        updateDimensions();
        const protrusionFactor = window.innerHeight > 1080 ? 0.15 : window.innerHeight > 768 ? 0.1 : 0.1;
        const calculatedTargetOffset = heroHeightRef.current - headerHeightRef.current;

        if (window.scrollY > 0) {
            document.body.style.overflowY = 'auto';
            document.body.style.height = `calc(100% - ${calculatedTargetOffset}px)`;
            document.documentElement.style.height = `calc(100% - ${calculatedTargetOffset}px)`;
            currentSectionIndexRef.current = 1;
            targetOffsetRef.current = calculatedTargetOffset;
            controls.set({
                y: -calculatedTargetOffset,
                '--negative-margin-bottom': `${calculatedTargetOffset}px`
            });
        } else {
            document.body.style.overflowY = 'hidden';
            document.body.style.height = '100%';
            document.documentElement.style.height = '100%';
            currentSectionIndexRef.current = 0;
            targetOffsetRef.current = calculatedTargetOffset;
            controls.set({
                y: -heroHeightRef.current * protrusionFactor,
                '--negative-margin-bottom': `${heroHeightRef.current * protrusionFactor}px`
            });
        }
    }, [isClient, controls]);

    useEffect(() => {
        if (!isClient) return;

        let accumulatedDelta = 0;
        let rafId = null;
        let curtainState = currentSectionIndexRef.current;
        const protrusionFactor = window.innerHeight > 1080 ? 0.15 : window.innerHeight > 768 ? 0.1 : 0.1;
        let currentY = curtainState === 1 ? -(heroHeightRef.current - headerHeightRef.current) : -heroHeightRef.current * protrusionFactor;
        let lastWheelTime = 0;
        const wheelDebounceTime = 16;

        updateDimensions();
        const maxOffset = -(heroHeightRef.current - headerHeightRef.current);
        const minOffset = -heroHeightRef.current * protrusionFactor;

        const updatePosition = () => {
            if (isAnimatingRef.current) return;

            const targetY = Math.max(maxOffset, Math.min(minOffset, currentY + accumulatedDelta));
            const newY = currentY + (targetY - currentY) * 0.2;
            const progress = (newY - minOffset) / (maxOffset - minOffset);
            const currentOffset = (heroHeightRef.current * protrusionFactor) + (progress * ((heroHeightRef.current - headerHeightRef.current) - (heroHeightRef.current * protrusionFactor)));

            controls.set({
                y: newY,
                '--negative-margin-bottom': `${currentOffset}px`
            });
            currentY = newY;

            const isNearMax = Math.abs(newY - maxOffset) < 10;
            const isNearMin = Math.abs(newY - minOffset) < 10;

            if (isNearMax && curtainState !== 1) {
                curtainState = 1;
                currentSectionIndexRef.current = 1;
                targetOffsetRef.current = heroHeightRef.current - headerHeightRef.current;
                document.body.style.overflowY = 'auto';
                document.body.style.height = `calc(100% - ${heroHeightRef.current - headerHeightRef.current}px)`;
                document.documentElement.style.height = `calc(100% - ${heroHeightRef.current - headerHeightRef.current}px)`;
                window.scrollTo(0, 0); // Сбрасываем scrollY для надежности
            } else if (isNearMin && curtainState !== 0) {
                curtainState = 0;
                currentSectionIndexRef.current = 0;
                document.body.style.overflowY = 'hidden';
                document.body.style.height = '100%';
                document.documentElement.style.height = '100%';
            }

            if (accumulatedDelta !== 0) {
                accumulatedDelta *= 0.95;
                if (Math.abs(accumulatedDelta) < 0.5) {
                    accumulatedDelta = 0;
                    const finalY = isNearMax ? maxOffset : isNearMin ? minOffset : newY;
                    const finalOffset = isNearMax ? heroHeightRef.current - headerHeightRef.current : heroHeightRef.current * protrusionFactor;

                    isAnimatingRef.current = true;
                    controls.start({
                        y: finalY,
                        '--negative-margin-bottom': `${finalOffset}px`,
                        transition: {
                            type: 'spring',
                            stiffness: 30,
                            damping: 15,
                            mass: 1.2,
                            onComplete: () => {
                                isAnimatingRef.current = false;
                            }
                        }
                    });
                } else {
                    rafId = requestAnimationFrame(updatePosition);
                }
            }
        };

        const handleWheel = (event) => {
            const now = performance.now();
            if (now - lastWheelTime < wheelDebounceTime) return;
            lastWheelTime = now;

            if (curtainState === 0 || (curtainState === 1 && event.deltaY < 0 && window.scrollY <= 50)) {
                event.preventDefault();
                accumulatedDelta -= event.deltaY * 0.4; // Увеличена чувствительность
                if (!rafId && !isAnimatingRef.current) {
                    rafId = requestAnimationFrame(updatePosition);
                }
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('resize', updateDimensions);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('resize', updateDimensions);
            if (rafId) cancelAnimationFrame(rafId);
            document.body.style.overflow = 'auto';
            document.body.style.height = 'auto';
            document.documentElement.style.height = 'auto';
            controls.set({ '--negative-margin-bottom': '0px' });
        };
    }, [isClient, controls]);

    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission logic (e.g., API call)
        setIsSuccessModalOpen(true); // Open the success modal
        setIsModalOpen(false); // Закрываем модальное окно формы
        const isPhoneValid = validatePhone(inputValues.phone);
        const isEmailValid = validateEmail(inputValues.email);

        if (!isPhoneValid || !isEmailValid) {

            return;
        }

        // Здесь ваша логика отправки формы
        console.log('Form submitted:', inputValues);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const closeSuccessModal = () => {
        setIsSuccessModalOpen(false);
    };

    if (!isClient) {
        return null;
    }

    const rippleOrigin = {
        x: '100%',
        y: '100%',
    };

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
            <motion.section
                id="hero"
                className={styles.hero}
                ref={heroRef}
                initial={{ y: 0, opacity: 1 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                <div className={styles.productionVideoContainer}>
                    <div className={styles.posterContainer}>
                        <img src={posterImg.src || posterImg} alt='Video poster' className={styles.videoPoster} />
                        <div className={styles.posterLayer}></div>
                        <motion.button
                            className={`${styles.customPlayButton}`}
                            onClick={handlePlayPause}
                            aria-label='Play video'
                            initial={false}
                            onHoverStart={() => setIsHovered(true)}
                            onHoverEnd={() => setIsHovered(false)}
                            animate={isHovered ? 'hover' : 'initial'}
                            variants={{ initial: {}, hover: {} }}
                        >
                            <motion.svg
                                width='100'
                                height='100'
                                viewBox='0 0 100 100'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                                initial='initial'
                                animate={isHovered ? 'hover' : 'initial'}
                                variants={{ initial: { opacity: 0.88 }, hover: { opacity: 1, transition: { duration: 0.2 } } }}
                            >
                                <motion.g variants={{ initial: {}, hover: {} }}>
                                    <motion.rect
                                        className={styles.playButtonCircle}
                                        width='100'
                                        height='100'
                                        rx='50'
                                        fill='white'
                                        initial='initial'
                                        variants={{ initial: { fillOpacity: 0.5 }, hover: { fillOpacity: 0.8, transition: { duration: 0.2 } } }}
                                    />
                                    <motion.path
                                        className={styles.playButtonTriangle}
                                        fillRule='evenodd'
                                        clipRule='evenodd'
                                        d='M60.8267 46.7613C63.0578 48.2662 63.0578 51.7494 60.8267 53.2543L46.742 61.9114C44.3563 63.5206 41.25 61.6844 41.25 58.6649L41.25 41.3508C41.25 38.3312 44.3563 36.495 46.742 38.1043L60.8267 46.7613Z'
                                        initial='initial'
                                        variants={{
                                            initial: { fill: '#159F4A' },
                                            hover: { fill: 'var(--hover-triangle-color, #0D5F2D)', transition: { duration: 0.2 } },
                                        }}
                                    />
                                </motion.g>
                            </motion.svg>
                        </motion.button>
                    </div>
                </div>
            </motion.section>

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
                                        <div className={`${styles.inputContainer} ${styles.inputContainer2}`}>
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

                                        <div className={`${styles.inputContainer} ${styles.inputContainer2}`}>
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

                                        <div className={`${styles.inputContainer} ${styles.inputContainer2}`}>
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

                                        <div className={`${styles.inputContainer} ${styles.inputContainer2}`}>
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
                                            <Link href={'/'}>политикой конфиденциальности</Link>
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

            <motion.div
                className={styles.sections}
                animate={controls}
                initial={{ y: 0 }}
                style={{ y: yOffset, backgroundColor: '#fff', marginBottom: `-${negativeMarginBottom + deltaY}px`, zIndex: 3, position: 'relative' }}
            >

                <section id='technology' className={styles.technology}>
                    <div className={`${styles.container} container`}>
                        <div className={styles.technologyHeaderBlock}>
                            <h2 className={styles.technologyHeader}>Производство</h2>
                        </div>
                        <div className={styles.technologyContent}>
                            <div className={styles.technologyTextBlock}>
                                <h5 className={styles.technologyTitle}>технологии</h5>
                                <div className={styles.technologyDescription}>
                                    <h3 className={styles.technologyDescriptionTitle}>Отлаженная работа на всех этапах производства, соблюдение технологий и только передовое оборудование</h3>
                                    <p className={styles.technologyDescriptionText}>Мы гордимся нашими масштабами: ежедневно выпускаем десятки тысяч единиц продукции, обеспечивая бесперебойные поставки по всей Москве. Современные линии производства позволяют нам эффективно и быстро выполнять заказы любого объёма</p>
                                    <ul className={`${styles.technologyCards} ${styles.technologyCards2}`}>
                                        <li className={styles.technologyCard}>
                                            <Image src="/technology1.png" alt="3D-печать" width={540} height={420} />
                                        </li>
                                        <li className={styles.technologyCard}>
                                            <Image src="/technology2.png" alt="Искусственный интеллект" width={540} height={420} />
                                        </li>
                                        <li className={`${styles.technologyCard} ${styles.technologyCardAdvanced}`}>
                                            <div className={styles.technologyCardContent}>
                                                <div className={styles.technologyCardNumber}>
                                                    10 000
                                                </div>
                                                <div className={styles.technologyCardText}>
                                                    <span>кв.м</span>
                                                    <p className={styles.technologyCardDescription}>производственной мощности</p>
                                                </div>
                                                <div className={styles.technologyCardSubtext}>производственной мощности</div>
                                            </div>
                                            <div className={styles.technologyCardContent}>
                                                <div className={styles.technologyCardNumber}>
                                                    100 000
                                                </div>
                                                <div className={styles.technologyCardText}>
                                                    <span>ед.</span>
                                                    <p className={styles.technologyCardDescription}>продукции в день</p>
                                                </div>
                                                <div className={styles.technologyCardSubtext}>продукции в день</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <ul className={styles.technologyCards}>
                                <li className={styles.technologyCard}>
                                    <Image src="/technology1.png" alt="3D-печать" width={540} height={420} />
                                </li>
                                <li className={styles.technologyCard}>
                                    <Image src="/technology2.png" alt="Искусственный интеллект" width={540} height={420} />
                                </li>
                                <li className={`${styles.technologyCard} ${styles.technologyCardAdvanced}`}>
                                    <div className={styles.technologyCardContent}>
                                        <div className={styles.technologyCardNumber}>
                                            10 000
                                        </div>
                                        <div className={styles.technologyCardText}>
                                            <span>кв.м</span>
                                            <p className={styles.technologyCardDescription}>производственной мощности</p>
                                        </div>
                                    </div>
                                    <div className={styles.technologyCardContent}>
                                        <div className={styles.technologyCardNumber}>
                                            100 000
                                        </div>
                                        <div className={styles.technologyCardText}>
                                            <span>ед.</span>
                                            <p className={styles.technologyCardDescription}>продукции в день</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="steps" className={styles.steps}>
                    <div className={`${styles.container} container`}>
                        <div className={styles.stepsContent}>
                            <h5 className={styles.stepsTitle}>этапы производства</h5>
                            <div className={styles.stepsLeft}>
                                <h3 className={styles.stepsSubtitle}>Мы строго следуем установленным стандартам на каждом этапе производства</h3>
                                <ul className={styles.stepsList}>
                                    <li className={styles.stepsListItem}>
                                        <div className={styles.stepsListItemContent}>
                                            <div className={styles.stepsListItemUp}>
                                                <h4 className={styles.stepsListItemNumber}>Этап 1.</h4>
                                                <h4 className={styles.stepsListItemTitle}>Отбор сырья</h4>
                                            </div>
                                            <p className={styles.stepsListItemDescription}>Все ингредиенты проходят строгий входной контроль. Проверяется соответствие сырья требованиям безопасности и качества: свежесть, натуральность, отсутствие посторонних примесей. Используются лабораторные тесты, включая проверку на пестициды, антибиотики и уровень влажности. Работаем только с сертифицированными поставщиками, прошедшими аудит</p>
                                        </div>
                                    </li>
                                    <li className={styles.stepsListItem}>
                                        <div className={styles.stepsListItemContent}>
                                            <div className={styles.stepsListItemUp}>
                                                <h4 className={styles.stepsListItemNumber}>Этап 2.</h4>
                                                <h4 className={styles.stepsListItemTitle}>Подготовка и обработка</h4>
                                            </div>
                                            <p className={styles.stepsListItemDescription}>Сырьё очищается, нарезается, измельчается или смешивается в соответствии с технологическими картами. Современные овощерезки, блендеры и тестомесы позволяют точно соблюдать рецептуры. Контролируется температура, влажность и скорость обработки, чтобы сохранить полезные свойства продуктов</p>
                                        </div>
                                    </li>
                                    <li className={styles.stepsListItem}>
                                        <div className={styles.stepsListItemContent}>
                                            <div className={styles.stepsListItemUp}>
                                                <h4 className={styles.stepsListItemNumber}>Этап 3.</h4>
                                                <h4 className={styles.stepsListItemTitle}>Производственный процесс</h4>
                                            </div>
                                            <p className={styles.stepsListItemDescription}>Производственные линии автоматизированы, что минимизирует влияние человеческого фактора. Тестомесильные машины, печи с равномерным распределением тепла и дозаторы обеспечивают стабильное качество продукции. Внедрены системы контроля веса, консистенции и температуры каждого изделия</p>
                                        </div>
                                    </li>
                                    <li className={styles.stepsListItem}>
                                        <div className={styles.stepsListItemContent}>
                                            <div className={styles.stepsListItemUp}>
                                                <h4 className={styles.stepsListItemNumber}>Этап 4.</h4>
                                                <h4 className={styles.stepsListItemTitle}>Контроль качества</h4>
                                            </div>
                                            <p className={styles.stepsListItemDescription}>На всех этапах производства продукция проходит проверки. Используются металлодетекторы и рентген-контроль для выявления посторонних включений, таких как металлические частицы, стекло или пластик. Датчики температуры контролируют тепловой режим, а лабораторные тесты проверяют безопасность сырья. Готовая продукция тестируется на вкус, запах и текстуру, чтобы соответствовать стандартам</p>
                                        </div>
                                    </li>
                                    <li className={styles.stepsListItem}>
                                        <div className={styles.stepsListItemContent}>
                                            <div className={styles.stepsListItemUp}>
                                                <h4 className={styles.stepsListItemNumber}>Этап 5.</h4>
                                                <h4 className={styles.stepsListItemTitle}>Доставка</h4>
                                            </div>
                                            <p className={styles.stepsListItemDescription}>Готовая продукция отправляется в магазины в специализированных рефрижераторах, поддерживающих необходимый температурный режим. Используются системы слежения за температурой, чтобы гарантировать сохранность продуктов во время транспортировки. Доставка осуществляется в кратчайшие сроки</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="quality" className={styles.quality}>
                    <div className={`${styles.container} container`}>
                        <div className={styles.qualityHeaderBlock}>
                            <div className={styles.qualityHeaderBottomBlock}>
                                <h5 className={styles.qualityHeaderTitle}>контроль качества</h5>
                                <div className={styles.qualityRight}>

                                    <h3 className={styles.qualityHeaderInfo}>Мы работаем по международным стандартам качества и безопасности</h3>

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
                                                        <p className={styles.qualityText}>НАССР</p>
                                                        <Image
                                                            src="/gear.svg"
                                                            alt="НАССР"
                                                            width={50}
                                                            height={50}
                                                            className={styles.qualityIcon}
                                                        />
                                                    </div>
                                                    <p className={styles.qualityDescription}>
                                                        Строгий контроль безопасности на всех этапах производства
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
                                                        <p className={styles.qualityText}>Внешний аудит и лабораторные исследования</p>
                                                        <Image
                                                            src="/laboratory.svg"
                                                            alt="Внешний аудит и лабораторные исследования"
                                                            width={50}
                                                            height={50}
                                                            className={styles.qualityIcon}
                                                        />
                                                    </div>
                                                    <p className={styles.qualityDescription}>
                                                        Проверяем каждую продукцию
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
                                                        <p className={styles.qualityText}>Системы видеонаблюдения и мониторинга</p>
                                                        <Image
                                                            src="/camera.svg"
                                                            alt="Системы видеонаблюдения и мониторинга"
                                                            width={50}
                                                            height={50}
                                                            className={styles.qualityIcon}
                                                        />
                                                    </div>
                                                    <p className={styles.qualityDescription}>
                                                        Обеспечивает прозрачность процессов
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
                                                        <p className={styles.qualityText}>Обратная связь с клиентами</p>
                                                        <Image
                                                            src="/customers.svg"
                                                            alt="Обратная связь с клиентами"
                                                            width={50}
                                                            height={50}
                                                            className={styles.qualityIcon}
                                                        />
                                                    </div>
                                                    <p className={styles.qualityDescription}>
                                                        Учитываем отзывы наших клиентов и вносим улучшения в продукцию
                                                    </p>
                                                </motion.div>
                                            </>
                                        ) : (
                                            <Swiper spaceBetween={10} slidesPerView={1.1} className={styles.qualitySwiper}>
                                                <SwiperSlide className={styles.qualityCardSlide}>
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

                <section id='pack' className={styles.pack}>
                    <div className={`${styles.container} container`}>
                        <div className={styles.packHeading}>
                            <h4 className={styles.packTitle}>упаковка</h4>
                        </div>
                        <h3 className={styles.packInfo}>Мы используем современные методы упаковки, которые продлевают срок хранения продукции и сохраняют её свежесть</h3>
                        <div className={styles.packContent}>
                            <div className={styles.packInfoBar1}>
                                <div className={styles.packInfoBarInner}>
                                    <div className={styles.packInfoNumber}>1</div>
                                    <Image src={'/Line.png'} className={styles.packInfoLine} width={260} height={87}></Image>
                                    <div className={styles.packInfoCard}>
                                        <h4 className={styles.packInfoCardTitle}>Вакуумная упаковка</h4>
                                        <p className={styles.packInfoCardInfo}>Предотвращает попадание воздуха и продлевает срок хранения</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.packInfoBar2}>
                                <div className={styles.packInfoBarInner}>
                                    <div className={styles.packInfoNumber}>2</div>
                                    <Image src={'/Line2.png'} className={styles.packInfoLine} width={260} height={80}></Image>
                                    <div className={styles.packInfoCard}>
                                        <h4 className={styles.packInfoCardTitle}>Модифицированная атмосфера (MAP)</h4>
                                        <p className={styles.packInfoCardInfo}>Сохраняет натуральный вкус и текстуру</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.packInfoBar3}>
                                <div className={styles.packInfoBarInner}>
                                    <div className={styles.packInfoNumber}>3</div>
                                    <Image src={'/Line3.png'} className={styles.packInfoLine} width={138} height={1}></Image>
                                    <div className={styles.packInfoCard}>
                                        <h4 className={styles.packInfoCardTitle}>Эко-упаковка</h4>
                                        <p className={styles.packInfoCardInfo}>Заботимся об окружающей среде</p>
                                    </div>
                                </div>
                            </div>
                            <Image src={"/packBg.png"} width={1800} height={844} className={styles.packBg}></Image>
                        </div>
                        <ul className={styles.packCards}>
                            <li className={styles.packCard}>
                                <div className={styles.packInfoCard}>
                                    <h4 className={styles.packInfoCardTitle}>Вакуумная упаковка</h4>
                                    <p className={styles.packInfoCardInfo}>Предотвращает попадание воздуха и продлевает срок хранения</p>
                                </div>
                            </li>
                            <li className={styles.packCard}>
                                <div className={styles.packInfoCard}>
                                    <h4 className={styles.packInfoCardTitle}>Модифицированная атмосфера (MAP)</h4>
                                    <p className={styles.packInfoCardInfo}>Сохраняет натуральный вкус и текстуру</p>
                                </div>
                            </li>
                            <li className={styles.packCard}>
                                <div className={styles.packInfoCard}>
                                    <h4 className={styles.packInfoCardTitle}>Эко-упаковка</h4>
                                    <p className={styles.packInfoCardInfo}>Заботимся об окружающей среде</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>

                <section id='stm' className={styles.stm}>
                    <div className={`${styles.container} container`}>
                        <div className={styles.stmHeading}>
                            <h4 className={styles.stmTitle}>СТМ-продукция</h4>
                            <h3 className={styles.stmSubTitle}>Мы предлагаем полный цикл производства под СТМ</h3>
                        </div>
                        {isMobile ? (
                            <Swiper
                                spaceBetween={16}
                                slidesPerView={1.1}
                                centeredSlides={false}
                                className={styles.stmSwiper}
                            >
                                {[
                                    { number: 1, text: 'Разработка рецептуры с учётом предпочтений клиента' },
                                    { number: 2, text: 'Производство с соблюдением высоких стандартов' },
                                    { number: 3, text: 'Дизайн и разработка индивидуальной упаковки' },
                                    { number: 4, text: 'Контроль качества на каждом этапе' },
                                    { number: 5, text: 'Гибкие условия сотрудничества и быстрая адаптация к требованиям партнёров' },
                                ].map((item, index) => (
                                    <SwiperSlide key={index}>
                                        <div className={styles.stmCard}>
                                            <div className={styles.stmCardNumber}>{item.number}</div>
                                            <p className={styles.stmCardInfo}>{item.text}</p>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <ul className={styles.stmCards}>
                                <li className={styles.stmCard}>
                                    <div className={styles.stmCardNumber}>1</div>
                                    <p className={styles.stmCardInfo}>Разработка рецептуры с учётом предпочтений клиента</p>
                                </li>
                                <li className={styles.stmCard}>
                                    <div className={styles.stmCardNumber}>2</div>
                                    <p className={styles.stmCardInfo}>Производство с соблюдением высоких стандартов</p>
                                </li>
                                <li className={styles.stmCard}>
                                    <div className={styles.stmCardNumber}>3</div>
                                    <p className={styles.stmCardInfo}>Дизайн и разработка индивидуальной упаковки</p>
                                </li>
                                <li className={styles.stmCard}>
                                    <div className={styles.stmCardNumber}>4</div>
                                    <p className={styles.stmCardInfo}>Контроль качества на каждом этапе</p>
                                </li>
                                <li className={styles.stmCard}>
                                    <div className={styles.stmCardNumber}>5</div>
                                    <p className={styles.stmCardInfo}>Гибкие условия сотрудничества и быстрая адаптация к требованиям партнёров</p>
                                </li>
                            </ul>
                        )}
                    </div>
                    <div className={`${styles.container} container`}>
                        <div className={styles.stmBanner}>
                            <ul className={styles.stmBannerLogos}>
                                <li className={styles.stmBannerLogo}>
                                    <Image src={'/stm1.svg'} width={60} height={60} alt="Logo 1" />
                                </li>
                                <li className={styles.stmBannerLogo}>
                                    <Image src={'/stm2.svg'} width={60} height={60} alt="Logo 2" />
                                </li>
                                <li className={styles.stmBannerLogo}>
                                    <Image src={'/stm3.svg'} width={60} height={60} alt="Logo 3" />
                                </li>
                                <li className={styles.stmBannerLogo}>
                                    <Image src={'/stm4.svg'} width={60} height={60} alt="Logo 4" />
                                </li>
                                <li className={styles.stmBannerLogo}>
                                    <Image src={'/plus.svg'} width={24} height={24} alt="Plus" />
                                </li>
                            </ul>
                            <h4 className={styles.stmBannerTitle}>
                                Работа с нами по СТМ — это возможность создать уникальный продукт с сильным брендом без необходимости инвестировать в собственные производственные мощности
                            </h4>
                            <button className={styles.stmBannerBtn} onClick={toggleModal}>Отправить заявку</button>
                        </div>
                    </div>
                </section>

                <section id='partners' className={styles.partners}>
                    <div className={`${styles.container} container`}>
                        <div className={styles.partnersHeading}>
                            <h4 className={styles.partnersTitle}>партнёрство с нами</h4>
                            <div className={styles.partnersRight}>
                                <h3 className={styles.partnersSubtitle}>Ориентация на клиентов и партнёров</h3>
                                <p className={styles.partnersInfo}>Мы выстраиваем долгосрочные отношения с клиентами и стремимся глубоко понимать потребности каждого бизнеса. Предлагаем гибкие условия, оперативную поддержку и надёжное качество продукции. В партнёрстве ценим прозрачность, честность и ответственность — именно это помогает нам расти вместе с нашими клиентами</p>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.container} container`}>
                        <div className={styles.partnersForm}>
                            <div className={styles.partnersFormLeft}>
                                <h3 className={styles.partnersFormTitle}>Хотите стать нашим партнёром?</h3>
                                <p className={styles.partnersFormInfo}>Мы всегда открыты к новым партнёрствам и готовы предложить лучшие условия для вашего бизнеса. Заполните форму и мы свяжемся с вами в ближайшее время</p>
                            </div>

                            {!isSuccessModalOpen ? (
                                <form onSubmit={handleFormSubmit} className={styles.partnersFormRight}>
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
                                            <Link href={'/'}>политикой конфиденциальности</Link>
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
                                                    Спасибо за интерес к партнёрству! Мы получили вашу заявку и свяжемся с вами в ближайшее время.
                                                </p>
                                                <p className={styles.successModalInfo}>
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

                <section id='preFooter' className={styles.preFooter}>
                    <div className={`${styles.container} container`}>
                        <div className={styles.preFooterWrapper}>
                            <Image src='/production-prefooter.png' alt='Еда' width={586} height={400} className={styles.preFooterPhoto} />
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
                                        Продукция
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

            </motion.div>
        </>
    );
}