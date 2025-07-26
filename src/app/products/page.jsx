'use client';

import Image from 'next/image';
import { motion, useAnimation, useTransform } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import styles from '../styles/Products.module.css';
import Button from '../components/Button/Button';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
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
    const [isOverflowAuto, setIsOverflowAuto] = useState(false);
    const targetOffsetRef = useRef(0);
    const [negativeMarginBottom, setNegativeMarginBottom] = useState(0);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [focusedInputs, setFocusedInputs] = useState({});
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [inputValues, setInputValues] = useState({
        name: '',
        company: '',
        phone: '',
        email: ''
    });
    const productsHeaderRef = useRef(null);
    const [animationStep, setAnimationStep] = useState(0); // Track animation progress
    const [isAnimationComplete, setIsAnimationComplete] = useState(false); // Track if animation is done
    const listItemRefs = useRef([]); // Refs for list items
    const [isAnimating, setIsAnimating] = useState(false); // Track if an animation is in progress

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
        const numbers = value.replace(/\D/g, '');
        let formattedNumbers = numbers;
        if (numbers.startsWith('8')) {
            formattedNumbers = '7' + numbers.slice(1);
        }
        if (!formattedNumbers.startsWith('7') && formattedNumbers.length > 0) {
            formattedNumbers = '7' + formattedNumbers;
        }
        formattedNumbers = formattedNumbers.slice(0, 11);
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
        const hasAt = email.includes('@');
        const hasDot = email.includes('.');
        if (!hasAt || !hasDot) {
            setEmailError('Введите корректный email адрес');
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

    const sectionRef = useRef(null);
    const [sectionHeight, setSectionHeight] = useState('auto');
    const sectionControls = useAnimation();

    useEffect(() => {
        if (window.innerWidth < 1000) return;
        // Disable scrolling initially
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    useEffect(() => {
        // Enable scrolling after animation is complete
        if (isAnimationComplete) {
            document.body.style.overflow = 'auto';
        }
    }, [isAnimationComplete]);

    const handleScroll = async (e) => {
        if (isAnimationComplete || isMobile || isAnimating || (window.innerWidth < 1000)) return;
        e.preventDefault();
        if (animationStep < 2) {
            setIsAnimating(true);
            const nextStep = animationStep + 1;

            // Получаем элементы для анимации
            const currentItem = listItemRefs.current[animationStep];
            const nextItem = listItemRefs.current[animationStep + 1];
            const thirdItem = animationStep === 0 ? listItemRefs.current[2] : null;

            if (currentItem) {
                const currentRect = currentItem.getBoundingClientRect();
                const nextRect = nextItem.getBoundingClientRect();
                const thirdRect = thirdItem ? thirdItem.getBoundingClientRect() : null;

                const distanceToFirst = currentRect.top - nextRect.top;
                // Расстояние для перемещения третьей карточки на место второй (только при первом скролле)
                const distanceToSecond = thirdRect && animationStep === 0 ? nextRect.top - thirdRect.top : 0;

                // При втором скролле: дополнительное расстояние для третьей карточки
                // Она должна подняться еще на расстояние между второй и первой позициями
                const additionalDistanceForThird = animationStep === 1 ? distanceToFirst : 0;

                // Получаем текущую высоту секции и уменьшаем на высоту исчезающей карточки
                const currentSectionHeight = sectionRef.current.offsetHeight;
                const cardHeight = currentRect.height + 40;
                const newSectionHeight = currentSectionHeight - cardHeight;

                const cardAnimation = controls.start((i) => {
                    if (i === animationStep + 1) {
                        if (animationStep === 0) {
                            return {
                                y: distanceToFirst,
                                transition: {
                                    duration: 2,
                                    ease: [0.25, 0.1, 0.25, 1],
                                    onComplete: () => {
                                        setAnimationStep(nextStep);
                                        setIsAnimating(false);
                                        if (nextStep === 2) {
                                            setIsAnimationComplete(true);
                                        }
                                    }
                                }
                            };
                        } else if (animationStep === 1) {
                            return {
                                y: 2 * distanceToFirst, // Перемещаем третью карточку на место первой
                                transition: {
                                    duration: 2,
                                    ease: [0.25, 0.1, 0.25, 1],
                                    onComplete: () => {
                                        setAnimationStep(nextStep);
                                        setIsAnimating(false);
                                        if (nextStep === 2) {
                                            setIsAnimationComplete(true);
                                        }
                                    }
                                }
                            };
                        }
                    }
                    if (animationStep === 0 && i === 2) {
                        return {
                            y: distanceToSecond,
                            transition: {
                                duration: 2,
                                ease: [0.25, 0.1, 0.25, 1]
                            }
                        };
                    }
                    return {};
                });

                // Анимация высоты секции
                const sectionAnimation = sectionControls.start({
                    height: newSectionHeight,
                    transition: {
                        duration: 2,
                        ease: [0.25, 0.1, 0.25, 1]
                    }
                });

                // Ждём завершения обеих анимаций
                await Promise.all([cardAnimation, sectionAnimation]);


            } else {
                setIsAnimating(false);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('wheel', handleScroll, { passive: false });
        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, [animationStep, isAnimationComplete, isAnimating]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setIsSuccessModalOpen(true);
        setIsModalOpen(false);
        const isPhoneValid = validatePhone(inputValues.phone);
        const isEmailValid = validateEmail(inputValues.email);
        if (!isPhoneValid || !isEmailValid) {
            return;
        }
        console.log('Form submitted:', inputValues);
    };

    const closeSuccessModal = () => {
        setIsSuccessModalOpen(false);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const rippleOrigin = {
        x: '100%',
        y: '100%',
    };

    useEffect(() => {
        controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        });
    }, [controls]);

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

            <motion.section
                id='productsHeader'
                className={styles.productsHeader}
                ref={sectionRef}
                animate={sectionControls}
                initial={{ height: 'auto' }}
            >
                <div className={`${styles.container} container`}>
                    <h1 className={styles.productsHeaderHeading}>Продукция</h1>
                    <div className={styles.productsHeaderContent}>
                        <h5 className={styles.productsHeaderTitle}>преимущества</h5>
                        <div className={styles.productsHeaderLeft}>
                            <h3 className={styles.productsHeaderSubtitle}>Почему выбирают нас?</h3>
                            <ul className={styles.productsHeaderList}>
                                {[
                                    {
                                        image: "/productsHeader3.png",
                                        alt: "Сертификация по ISO 9001",
                                        title: "Свежесть и натуральность",
                                        description: "Мы производим вкусную и свежую готовую еду. Вся продукция изготавливается ежедневно на нашем современном производстве и доставляется в крупнейшие торговые сети Москвы, включая «Пятёрочку», «Перекрёсток», «Самокат» и «ВкусВилл»"
                                    },
                                    {
                                        image: "/productsHeader2.png",
                                        alt: "Сертификация по ISO 9001",
                                        title: "Контроль качества на всех этапах",
                                        description: "Мы придерживаемся строгих стандартов качества, включая HACCP и ГОСТ, а также проводим регулярный лабораторный контроль сырья и готовой продукции. Каждая партия проходит аудит, что гарантирует безопасность и высокое качество нашей еды"
                                    },
                                    {
                                        image: "/productsHeader1.png",
                                        alt: "Сертификация по ISO 9001",
                                        title: "Развитие собственного бренда и производство под СТМ",
                                        description: "Мы работаем как под собственным брендом, так и создаём продукцию для частных торговых марок (СТМ). Это позволяет нашим партнёрам предлагать покупателям уникальные товары с гарантированным качеством"
                                    }
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        className={styles.productsHeaderListItem}
                                        ref={el => listItemRefs.current[index] = el}
                                        custom={index}
                                        animate={controls}
                                        initial={{ y: 0 }}
                                    >
                                        <Image src={item.image} alt={item.alt} width={400} height={320} />
                                        <div className={styles.productsHeaderListItemContent}>
                                            <div className={styles.productsHeaderListItemUp}>
                                                <h4 className={styles.productsHeaderListItemTitle}>{item.title}</h4>
                                            </div>
                                            <p className={styles.productsHeaderListItemDescription}>{item.description}</p>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.section>

            <section id="products" className={styles.productsBlock}>
                <div className={`${styles.container} container`}>
                    <div className={styles.productsHeaderBlock}>
                        <div className={styles.productsHeaderBottomBlock}>
                            <h5 className={styles.productsHeaderTitle}>Ассортимент</h5>
                            <h3 className={styles.productsHeaderInfo}>Мы предлагаем широкий выбор готовой еды</h3>
                        </div>
                    </div>
                    <div className={styles.productsCardsContainer}>
                        <div className={styles.productsCard}>
                            <div className={styles.productsCardUp}>
                                <p className={styles.productsTitle}>Сэндвичи</p>
                                <p className={styles.productsPrice}>{'> 50 видов'}</p>
                            </div>
                            <Image src='/sandwich.png' alt='Сэндвич' width={587} height={533} className={styles.productsImage} />
                        </div>
                        <div className={styles.productsCard}>
                            <div className={styles.productsCardUp}>
                                <p className={styles.productsTitle}>Блины</p>
                                <p className={styles.productsPrice}>{'> 50 видов'}</p>
                            </div>
                            <Image src='/blini.png' alt='Блины' width={587} height={533} className={styles.productsImage} />
                        </div>
                        <div className={styles.productsCard}>
                            <div className={styles.productsCardUp}>
                                <p className={styles.productsTitle}>Пироги</p>
                                <p className={styles.productsPrice}>{'> 50 видов'}</p>
                            </div>
                            <Image src='/pirogi.png' alt='Пироги' width={587} height={533} className={styles.productsImage} />
                        </div>
                        <div className={styles.productsCard}>
                            <div className={styles.productsCardUp}>
                                <p className={styles.productsTitle}>Слоёные изделия</p>
                                <p className={styles.productsPrice}>{'> 50 видов'}</p>
                            </div>
                            <Image src='/soleniye.png' alt='Слоёные изделия' width={587} height={533} className={styles.productsImage} />
                        </div>
                        <div className={styles.productsCard}>
                            <div className={styles.productsCardUp}>
                                <p className={styles.productsTitle}>Изделия из песочного теста</p>
                                <p className={styles.productsPrice}>{'> 50 видов'}</p>
                            </div>
                            <Image src='/pesochnoye.png' alt='Песочные изделия' width={587} height={533} className={styles.productsImage} />
                        </div>
                        <div className={styles.productsCard}>
                            <div className={styles.productsCardUp}>
                                <p className={styles.productsTitle}>Торты</p>
                                <p className={styles.productsPrice}>{'> 50 видов'}</p>
                            </div>
                            <Image src='/torti.png' alt='Торты' width={587} height={533} className={styles.productsImage} />
                        </div>
                        <div className={styles.productsCard}>
                            <div className={styles.productsCardUp}>
                                <p className={styles.productsTitle}>Пирожные</p>
                                <p className={styles.productsPrice}>{'> 50 видов'}</p>
                            </div>
                            <Image src='/pirozhnoye.png' alt='Пирожные' width={587} height={533} className={styles.productsImage} />
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

            <section id="steps" className={styles.steps}>
                <div className={`${styles.container} container`}>
                    <div className={styles.stepsContent}>
                        <h5 className={styles.stepsTitle}>качество</h5>
                        <div className={styles.stepsLeft}>
                            <h3 className={styles.stepsSubtitle}>Качество — наш приоритет</h3>
                            <p className={styles.stepsSubInfo}>Мы постоянно работаем над улучшением наших продуктов в сотрудничестве с ведущими представителями ритейла. Мы разрабатываем собственные системы контроля качества, применяем лучшие отечественные и зарубежные практики пищевого производства</p>
                            {isMobile ? (
                                <Swiper
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    pagination={{ clickable: true }}
                                    className={styles.swiperContainer}
                                >
                                    <SwiperSlide>
                                        <div className={styles.stepsCard}>
                                            <Image src="/stepsCard1.png" width={587} height={320} alt="Step 1" />
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <div className={styles.stepsCard}>
                                            <Image src="/stepsCard2.png" width={587} height={320} alt="Step 2" />
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            ) : (
                                <ul className={styles.stepsCards}>
                                    <li className={styles.stepsCard}>
                                        <Image src="/stepsCard1.png" width={587} height={320} alt="Step 1" />
                                    </li>
                                    <li className={styles.stepsCard}>
                                        <Image src="/stepsCard2.png" width={587} height={320} alt="Step 2" />
                                    </li>
                                </ul>
                            )}
                            <h3 className={`${styles.stepsSubtitle} ${styles.stepsSubtitle2}`}>Что для нас значит качество?</h3>
                            <ul className={styles.stepsList}>
                                <li className={styles.stepsListItem}>
                                    <div className={styles.stepsListItemContent}>
                                        <div className={styles.stepsListItemUp}>
                                            <h4 className={styles.stepsListItemNumber}>1.</h4>
                                            <h4 className={styles.stepsListItemTitle}>Безопасность</h4>
                                        </div>
                                        <p className={styles.stepsListItemDescription}>Продукция проходит строгий контроль на каждом этапе: от лабораторных исследований сырья до проверки готового продукта. Используем металлодетекторы и рентген-контроль для выявления посторонних включений. Соблюдаем стандарты НАССР и ISO</p>
                                    </div>
                                </li>
                                <li className={styles.stepsListItem}>
                                    <div className={styles.stepsListItemContent}>
                                        <div className={styles.stepsListItemUp}>
                                            <h4 className={styles.stepsListItemNumber}>2.</h4>
                                            <h4 className={styles.stepsListItemTitle}>Вкус</h4>
                                        </div>
                                        <p className={styles.stepsListItemDescription}>Рецептуры разрабатываются с учётом предпочтений потребителей и проходят дегустационные тесты. Контролируем баланс вкуса, текстуры и аромата, чтобы продукция соответствовала высоким ожиданиям</p>
                                    </div>
                                </li>
                                <li className={styles.stepsListItem}>
                                    <div className={styles.stepsListItemContent}>
                                        <div className={styles.stepsListItemUp}>
                                            <h4 className={styles.stepsListItemNumber}>3.</h4>
                                            <h4 className={styles.stepsListItemTitle}>Свежесть</h4>
                                        </div>
                                        <p className={styles.stepsListItemDescription}>Система «just-in-time» исключает длительное хранение сырья. Используем газомодифицированную упаковку и для сохранения вкуса и структуры продукта. Холодовая цепь не прерывается на всех этапах логистики</p>
                                    </div>
                                </li>
                                <li className={styles.stepsListItem}>
                                    <div className={styles.stepsListItemContent}>
                                        <div className={styles.stepsListItemUp}>
                                            <h4 className={styles.stepsListItemNumber}>4.</h4>
                                            <h4 className={styles.stepsListItemTitle}>Натуральность</h4>
                                        </div>
                                        <p className={styles.stepsListItemDescription}>Мы используем только натуральные ингредиенты без искусственных добавок, усилителей вкуса и ГМО</p>
                                    </div>
                                </li>
                                <li className={styles.stepsListItem}>
                                    <div className={styles.stepsListItemContent}>
                                        <div className={styles.stepsListItemUp}>
                                            <h4 className={styles.stepsListItemNumber}>5.</h4>
                                            <h4 className={styles.stepsListItemTitle}>Консистенция</h4>
                                        </div>
                                        <p className={styles.stepsListItemDescription}>Каждый продукт имеет стабильную текстуру и плотность благодаря точному соблюдению технологий приготовления</p>
                                    </div>
                                </li>
                                <li className={styles.stepsListItem}>
                                    <div className={styles.stepsListItemContent}>
                                        <div className={styles.stepsListItemUp}>
                                            <h4 className={styles.stepsListItemNumber}>6.</h4>
                                            <h4 className={styles.stepsListItemTitle}>Внешний вид</h4>
                                        </div>
                                        <p className={styles.stepsListItemDescription}>Мы следим за тем, чтобы продукция выглядела аппетитно: ровная нарезка, аккуратные формы и надёжная упаковка</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section id='partners' className={styles.partners}>
                <div className={`${styles.container} container`}>
                    <div className={styles.partnersHeading}>
                        <h4 className={styles.partnersTitle}>Сотрудничество</h4>
                        <div className={styles.partnersRight}>
                            <h3 className={styles.partnersSubtitle}>Мы открыты к сотрудничеству и готовы предложить индивидуальные условия для сетевых ритейлеров, кафе, ресторанов и поставщиков</h3>
                        </div>
                    </div>
                </div>

                <div className={`${styles.container} container`}>
                    <div className={styles.partnersForm}>
                        <div className={styles.partnersFormLeft}>
                            <h3 className={styles.partnersFormTitle}>Хотите стать нашим партнёром?</h3>
                            <p className={styles.partnersFormInfo}>Мы всегда открыты к новым партнёрствам и готовы предложить лучшие условия для вашего бизнеса. Заполните форму и мы свяжемся с вами в ближайшее время</p>
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
                        <Image src='/productsHeader1.png' alt='Еда' width={586} height={400} className={styles.preFooterPhoto} />
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
                            <Link href='/clients' className={`${styles.partnerLink} ${styles.preFooterLink}`}>
                                <motion.span className={`${styles.partnerText} ${styles.preFooterTitle}`} variants={preFooterPartnerTextVariants}>
                                    Клиентам
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