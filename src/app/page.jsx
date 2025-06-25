'use client';

import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import Footer from './components/Footer/Footer';
import Link from 'next/link';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import styles from './styles/Home.module.css';
import Button from './components/Button/Button';
import { Swiper, SwiperSlide } from 'swiper/react';
import posterImg from '../../public/Poster.jpg';
import 'swiper/css';

export default function Home() {
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

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
            setIsNewsMobile(window.innerWidth <= 1439);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useLayoutEffect(() => {
        if (!isClient) return;

        const header = document.querySelector('header') || document.querySelector('.header');
        const heroElement = document.getElementById('hero');
        const headerHeight = header ? header.offsetHeight - 2 : 0;
        const heroHeight = heroElement ? heroElement.offsetHeight : 0;
        const calculatedTargetOffset = heroHeight - headerHeight;

        // Важно: Вызываем controls.set() только после того, как все размеры DOM вычислены
        // и компонент гарантированно доступен для манипуляций framer-motion.
        if (window.scrollY > 0) {
            document.body.style.overflowY = 'auto';
            document.body.style.height = `calc(100% - ${calculatedTargetOffset}px)`;
            document.documentElement.style.height = `calc(100% - ${calculatedTargetOffset}px)`;
            setNegativeMarginBottom(calculatedTargetOffset);
            currentSectionIndexRef.current = 1;
            targetOffsetRef.current = calculatedTargetOffset;
            controls.set({ y: -calculatedTargetOffset });
        } else {
            document.body.style.overflowY = 'hidden';
            document.body.style.height = '100%';
            document.documentElement.style.height = '100%';
            setNegativeMarginBottom(0);
            currentSectionIndexRef.current = 0;
            targetOffsetRef.current = 0;
            controls.set({ y: 0 });
        }
    }, [isClient, controls]);

    useEffect(() => {
        if (!isClient) return;

        let isAnimating = false;

        const sectionDurations = {
            numbers: 1.2,
        };

        const debounce = (func, wait) => {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        };

        const handleWheel = (event) => {
            if (isAnimating || currentSectionIndexRef.current > 0 || (event.deltaY < 0 && window.scrollY > 0)) {
                return;
            }

            event.preventDefault();

            const delta = event.deltaY;
            const direction = delta > 0 ? 1 : -1;

            if (currentSectionIndexRef.current === 0 && direction === 1) {
                isAnimating = true;
                const sectionElements = ['hero', 'numbers', 'clients', 'quality', 'products', 'production', 'news', 'preFooter', 'footer'].map(id => document.getElementById(id));
                const header = document.querySelector('header') || document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight - 2 : 0;
                const heroHeight = sectionElements[0] ? sectionElements[0].offsetHeight : 0;
                const targetOffset = heroHeight - headerHeight;

                targetOffsetRef.current = targetOffset;

                controls.start({
                    y: -targetOffset,
                    transition: {
                        duration: sectionDurations['numbers'],
                        ease: [0.4, 0, 0.2, 1],
                    },
                }).then(() => {
                    currentSectionIndexRef.current = 1;
                    isAnimating = false;
                    setNegativeMarginBottom(targetOffset);
                    document.body.style.height = `calc(100% - ${targetOffset}px)`;
                    document.documentElement.style.height = `calc(100% - ${targetOffset}px)`;
                    document.body.style.overflowY = 'auto';
                    window.removeEventListener('wheel', debouncedHandleWheel);
                });
            }
        };

        const debouncedHandleWheel = debounce(handleWheel, 300);
        window.addEventListener('wheel', debouncedHandleWheel, { passive: false });

        return () => {
            window.removeEventListener('wheel', debouncedHandleWheel);
            document.body.style.overflow = 'auto';
            document.body.style.height = 'auto';
            document.documentElement.style.height = 'auto';
            // Удалите следующую строку:
            // controls.set({ y: 0 });
            setNegativeMarginBottom(0);
        };
    }, [isClient, controls]);

    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    if (!isClient) {
        return null;
    }

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
            scale: 0,
            transition: { duration: 0 }
        },
        hover: (i) => {
            const baseScale = 5;
            const maxScale = (baseScale - (i * SCALE_REDUCTION)) * 2;
            return {
                scale: [2, 8, maxScale],
                transition: {
                    duration: 0.3,
                    ease: "easeInOut",
                }
            };
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
                <div className={`${styles.container} container`}>
                    <Image
                        src="/hero-image.png"
                        alt="Идеология Еды"
                        width={1200}
                        height={600}
                        className={styles.heroImage}
                        sizes="100vw"
                        priority
                    />
                    {!isMobile && (
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        >
                            <Image
                                src="/hero-text.svg"
                                alt="Идеология Еды"
                                width={1200}
                                height={200}
                                className={`${styles.heroText} ${styles.heroTextLarge}`}
                                sizes="100vw"
                                priority
                            />
                        </motion.div>
                    )}
                    {isMobile && (
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                        >
                            <Image
                                src="/hero-text-sm.svg"
                                alt="Идеология Еды (маленький)"
                                width={600}
                                height={100}
                                className={`${styles.heroText} ${styles.heroTextSmall}`}
                                sizes="100vw"
                                priority
                            />
                        </motion.div>
                    )}
                    <motion.div
                        className={styles.divider}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 1, opacity: 1 }}
                        transition={{ duration: 0.545, delay: 0.2, ease: 'easeOut' }}
                    />
                    <motion.p
                        className={styles.subtitle}
                        initial={{ y: 12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.545, delay: 0.295, ease: 'easeOut' }}
                    >
                        Производство кулинарных, кондитерских и хлебобулочных изделий
                    </motion.p>
                </div>
            </motion.section>

            <motion.div
                animate={controls}
                initial={{ y: 0 }}
                style={{ backgroundColor: '#fff', marginBottom: `-${negativeMarginBottom}px` }}

            >
                <section id="numbers" className={styles.numbersBlock}>
                    <div className={`${styles.container} container`}>
                        <div className={styles.numbersHeaderBlock}>
                            <div className={styles.numbersHeaderBottomBlock}>
                                <h5 className={styles.numbersHeaderTitle}>цифры</h5>
                                <h3 className={styles.numbersHeaderInfo}>
                                    Наше производство — это сочетание традиционных рецептов, современных технологий и масштабов
                                </h3>
                            </div>
                            <div className={styles.numbersHeaderLink}>
                                <Button href="/about" />
                            </div>
                        </div>
                        <div className={styles.cardsContainerBlock}>
                            {/* Первая карточка */}
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

                            {/* Вторая карточка */}
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
                                    <span className={styles.cardNumberText}>10 000</span>
                                    <span className={styles.cardUnitText}>кв.м</span>
                                </motion.div>
                                <motion.p
                                    className={styles.cardDescriptionText}
                                    initial={{ y: 15 }}
                                    whileInView={{ y: 0 }}
                                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                    viewport={{ once: true }}
                                >
                                    производственной мощности
                                </motion.p>
                            </motion.div>

                            {/* Третья карточка */}
                            <motion.div
                                className={styles.cardBlock}
                                initial={{ x: -245 }}
                                whileInView={{ x: 0 }}
                                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                viewport={{ once: true }}
                            >
                                <motion.div
                                    initial={{ x: 245 }}
                                    whileInView={{ x: 0 }}
                                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                    viewport={{ once: true }}
                                >
                                    <Image
                                        src="/card-bg.png"
                                        alt="Пиццы"
                                        width={587}
                                        height={780}
                                        className={`${styles.cardBackgroundImage}`}
                                        sizes="100vw"
                                        priority
                                    />
                                </motion.div>
                            </motion.div>

                            {/* Четвертая карточка */}
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
                        </div>
                        <div className={styles.numbersHeaderLink2}>
                            <Button href="/about" />
                        </div>
                    </div>
                </section>

                <section id="clients" className={styles.clientsBlock}>
                    <div className={`${styles.container} container`}>
                        <div className={styles.clientsHeaderBlock}>
                            <div className={styles.clientsHeaderBottomBlock}>
                                <h5 className={styles.clientsHeaderTitle}>клиенты</h5>
                                <h3 className={styles.clientsHeaderInfo}>
                                    Больше 5 лет работаем с большими продуктовыми сетями российского рынка и сервисами доставки еды
                                </h3>
                            </div>
                        </div>
                        <div className={styles.clientsCardsContainer}>
                            {/* Карточка 1: ВкусВилл */}
                            <motion.div
                                className={styles.clientCard}
                                initial={{ y: 170 }}
                                whileInView={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                viewport={{ once: true }}
                            >
                                <Image src="/vkus.svg" alt="ВкусВилл" width={100} height={100} className={styles.clientLogo} />
                                <p className={styles.clientName}>ВкусВилл</p>
                            </motion.div>

                            {/* Карточка 2: Самокат */}
                            <motion.div
                                className={styles.clientCard}
                                initial={{ y: 170 }}
                                whileInView={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                viewport={{ once: true }}
                            >
                                <Image src="/Самокат.svg" alt="Самокат" width={100} height={100} className={styles.clientLogo} />
                                <p className={styles.clientName}>Самокат</p>
                            </motion.div>

                            {/* Карточка 3: Информация */}
                            <motion.div
                                className={`${styles.clientCard} ${styles.clientInfoCard}`}
                                initial={{ y: 170 }}
                                whileInView={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                viewport={{ once: true }}
                            >
                                <p className={styles.clientInfo}>
                                    Мы поставляем продукцию в магазины, сервисы по доставке еды, отели, рестораны, столовые, различные учреждения
                                </p>
                            </motion.div>

                            {/* Карточка 4: Партнер */}
                            <motion.div
                                className={styles.partnerCard}
                                onMouseEnter={() => setIsClientHovered(true)}
                                onMouseLeave={() => setIsClientHovered(false)}
                                initial={{ y: 170, ...clientCardBackgroundVariants.initial }}
                                whileInView={{ y: 0 }}
                                animate={isClientHovered ? 'hover' : 'initial'}
                                variants={clientCardBackgroundVariants}
                                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                viewport={{ once: true }}
                                style={{ '--ripple-origin-x': rippleOrigin.x, '--ripple-origin-y': rippleOrigin.y }}
                            >
                                <Link href="/" className={styles.partnerLink}>
                                    <motion.span className={styles.partnerText} variants={clientPartnerTextVariants}>
                                        Стать нашим партнёром
                                    </motion.span>
                                    <motion.div className={styles.arrowContainer}>
                                        <motion.svg
                                            className={styles.partnerArrow}
                                            width="40"
                                            height="40"
                                            viewBox="0 0 40 40"
                                            fill="none"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            variants={clientArrowVariants}
                                        >
                                            <motion.path d="M12 28.6667L28.6667 12" />
                                            <motion.path d="M12 12H28.6667V28.6667" />
                                        </motion.svg>
                                    </motion.div>
                                </Link>
                                {isClientHovered &&
                                    Array.from({ length: 3 }).map((_, i) => (
                                        <motion.div
                                            key={`client-ripple-${i}`}
                                            className={styles.ripple}
                                            custom={i}
                                            initial="initial"
                                            animate={isClientHovered ? 'hover' : 'initial'}
                                            variants={rippleVariants}
                                            style={{
                                                right: '20px',
                                                bottom: '20px',
                                                transform: 'translate(50%, 50%)',
                                                backgroundColor: clientRippleColors[i],
                                            }}
                                        />
                                    ))}
                            </motion.div>

                            {/* Карточка 5: Перекрёсток */}
                            <motion.div
                                className={styles.clientCard}
                                initial={{ y: 170 }}
                                whileInView={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                viewport={{ once: true }}
                            >
                                <Image src="/Перекресток.svg" alt="Перекрёсток" width={100} height={100} className={styles.clientLogo} />
                                <p className={styles.clientName}>Перекрёсток</p>
                            </motion.div>

                            {/* Карточка 6: Пятёрочка */}
                            <motion.div
                                className={styles.clientCard}
                                initial={{ y: 170 }}
                                whileInView={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                viewport={{ once: true }}
                            >
                                <Image src="/Пятерочка.svg" alt="Пятёрочка" width={100} height={100} className={styles.clientLogo} />
                                <p className={styles.clientName}>Пятёрочка</p>
                            </motion.div>
                        </div>
                        <div className={`${styles.numbersHeaderLink2} ${styles.clientsLink}`}>
                            <Button href="/about" text={"Стать нашим партнером"} />
                        </div>
                    </div>
                </section>

                <section id="quality" className={styles.quality}>
                    <div className={`${styles.container} container`}>
                        <div className={styles.qualityHeaderBlock}>
                            <div className={styles.qualityHeaderBottomBlock}>
                                <h5 className={styles.qualityHeaderTitle}>наши преимущества</h5>
                                <h3 className={styles.qualityHeaderInfo}>Нас выбирают за качество, инновации и безупречный сервис</h3>
                            </div>
                        </div>
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
                                            <p className={styles.qualityText}>Тщательный отбор сырья</p>
                                            <Image
                                                src="/organic-food.svg"
                                                alt="Тщательный отбор сырья"
                                                width={50}
                                                height={50}
                                                className={styles.qualityIcon}
                                            />
                                        </div>
                                        <p className={styles.qualityDescription}>
                                            Мы используем только проверенные ингредиенты, чтобы гарантировать высочайшее качество продукции. Мы
                                            используем только качественные и проверенные ингредиенты, соответствующие строгим стандартам
                                            безопасности. Каждая партия сырья проходит лабораторные тесты на соответствие нормам, что гарантирует
                                            натуральность, свежесть и безопасность нашей продукции.
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
                                            <p className={styles.qualityText}>Строгий контроль поставщиков</p>
                                            <Image
                                                src="/laboratory.svg"
                                                alt="Строгий контроль поставщиков"
                                                width={50}
                                                height={50}
                                                className={styles.qualityIcon}
                                            />
                                        </div>
                                        <p className={styles.qualityDescription}>
                                            Мы работаем только с проверенными и сертифицированными поставщиками, чья продукция соответствует
                                            международным стандартам. Каждый поставщик проходит аудит, а сырьё — дополнительное тестирование перед
                                            поступлением на производство.
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
                                            <p className={styles.qualityText}>Современное оборудование</p>
                                            <Image
                                                src="/manufacture.svg"
                                                alt="Современное оборудование"
                                                width={50}
                                                height={50}
                                                className={styles.qualityIcon}
                                            />
                                        </div>
                                        <p className={styles.qualityDescription}>
                                            Производственные линии оснащены современным оборудованием для стабильного качества и скорости
                                            производства. Металлодетекторы исключают посторонние включения, а автоматизированные системы и
                                            лабораторные тесты гарантируют безопасность продукции.
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
                                            <p className={styles.qualityText}>Профессиональная команда</p>
                                            <Image
                                                src="/leadership.svg"
                                                alt="Профессиональная команда"
                                                width={50}
                                                height={50}
                                                className={styles.qualityIcon}
                                            />
                                        </div>
                                        <p className={styles.qualityDescription}>
                                            В нашем штате — опытные технологи, инженеры и эксперты по качеству, которые следят за каждым этапом
                                            производства. Мы постоянно обучаем сотрудников, внедряем передовые методики и следуем лучшим практикам
                                            отрасли.
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
                                            <p className={styles.qualityText}>Уникальная система контроля качества на всех этапах производства</p>
                                            <Image
                                                src="/gear.svg"
                                                alt="Уникальная система контроля качества на всех этапах производства"
                                                width={50}
                                                height={50}
                                                className={styles.qualityIcon}
                                            />
                                        </div>
                                        <p className={styles.qualityDescription}>
                                            Наша продукция проходит многоуровневый контроль: от проверки сырья до финального тестирования. Это
                                            гарантирует стабильное качество и безопасность.
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
                                            <p className={styles.qualityText}>Собственный автопарк</p>
                                            <Image src="/van.svg" alt="Собственный автопарк" width={50} height={50} className={styles.qualityIcon} />
                                        </div>
                                        <p className={styles.qualityDescription}>
                                            Мы обеспечиваем быструю и безопасную доставку продукции за счёт собственной логистики. Ежедневно наши
                                            автомобили отправляются к нашим клиентам, поддерживая точные сроки поставок и оптимальные условия
                                            хранения во время транспортировки.
                                        </p>
                                    </motion.div>
                                </>
                            ) : (
                                <Swiper spaceBetween={10} slidesPerView={1} className={styles.qualitySwiper}>
                                    <SwiperSlide>
                                        <motion.div
                                            className={styles.qualityCard}
                                            initial={{ y: 170 }}
                                            whileInView={{ y: 0 }}
                                            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                            viewport={{ once: true }}
                                        >
                                            <div className={styles.qualityCardUp}>
                                                <p className={styles.qualityText}>Тщательный отбор сырья</p>
                                                <Image
                                                    src="/organic-food.svg"
                                                    alt="Тщательный отбор сырья"
                                                    width={50}
                                                    height={50}
                                                    className={styles.qualityIcon}
                                                />
                                            </div>
                                            <p className={styles.qualityDescription}>
                                                Мы используем только проверенные ингредиенты, чтобы гарантировать высочайшее качество продукции. Мы
                                                используем только качественные и проверенные ингредиенты, соответствующие строгим стандартам
                                                безопасности. Каждая партия сырья проходит лабораторные тесты на соответствие нормам, что гарантирует
                                                натуральность, свежесть и безопасность нашей продукции.
                                            </p>
                                        </motion.div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <motion.div
                                            className={styles.qualityCard}
                                            initial={{ y: 170 }}
                                            whileInView={{ y: 0 }}
                                            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                            viewport={{ once: true }}
                                        >
                                            <div className={styles.qualityCardUp}>
                                                <p className={styles.qualityText}>Строгий контроль поставщиков</p>
                                                <Image
                                                    src="/laboratory.svg"
                                                    alt="Строгий контроль поставщиков"
                                                    width={50}
                                                    height={50}
                                                    className={styles.qualityIcon}
                                                />
                                            </div>
                                            <p className={styles.qualityDescription}>
                                                Мы работаем только с проверенными и сертифицированными поставщиками, чья продукция соответствует
                                                международным стандартам. Каждый поставщик проходит аудит, а сырьё — дополнительное тестирование перед
                                                поступлением на производство.
                                            </p>
                                        </motion.div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <motion.div
                                            className={`${styles.qualityCard} ${styles.qualityCardDark}`}
                                            initial={{ y: 170 }}
                                            whileInView={{ y: 0 }}
                                            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                            viewport={{ once: true }}
                                        >
                                            <div className={styles.qualityCardUp}>
                                                <p className={styles.qualityText}>Современное оборудование</p>
                                                <Image
                                                    src="/manufacture.svg"
                                                    alt="Современное оборудование"
                                                    width={50}
                                                    height={50}
                                                    className={styles.qualityIcon}
                                                />
                                            </div>
                                            <p className={styles.qualityDescription}>
                                                Производственные линии оснащены современным оборудованием для стабильного качества и скорости
                                                производства. Металлодетекторы исключают посторонние включения, а автоматизированные системы и
                                                лабораторные тесты гарантируют безопасность продукции.
                                            </p>
                                        </motion.div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <motion.div
                                            className={`${styles.qualityCard} ${styles.qualityCardDark}`}

                                            initial={{ y: 170 }}
                                            whileInView={{ y: 0 }}
                                            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                            viewport={{ once: true }}
                                        >
                                            <div className={styles.qualityCardUp}>
                                                <p className={styles.qualityText}>Профессиональная команда</p>
                                                <Image
                                                    src="/leadership.svg"
                                                    alt="Профессиональная команда"
                                                    width={50}
                                                    height={50}
                                                    className={styles.qualityIcon}
                                                />
                                            </div>
                                            <p className={styles.qualityDescription}>
                                                В нашем штате — опытные технологи, инженеры и эксперты по качеству, которые следят за каждым этапом
                                                производства. Мы постоянно обучаем сотрудников, внедряем передовые методики и следуем лучшим практикам
                                                отрасли.
                                            </p>
                                        </motion.div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <motion.div
                                            className={styles.qualityCard}
                                            initial={{ y: 170 }}
                                            whileInView={{ y: 0 }}
                                            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                            viewport={{ once: true }}
                                        >
                                            <div className={styles.qualityCardUp}>
                                                <p className={styles.qualityText}>Уникальная система контроля качества на всех этапах производства</p>
                                                <Image
                                                    src="/gear.svg"
                                                    alt="Уникальная система контроля качества на всех этапах производства"
                                                    width={50}
                                                    height={50}
                                                    className={styles.qualityIcon}
                                                />
                                            </div>
                                            <p className={styles.qualityDescription}>
                                                Наша продукция проходит многоуровневый контроль: от проверки сырья до финального тестирования. Это
                                                гарантирует стабильное качество и безопасность.
                                            </p>
                                        </motion.div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <motion.div
                                            className={styles.qualityCard}
                                            initial={{ y: 170 }}
                                            whileInView={{ y: 0 }}
                                            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                            viewport={{ once: true }}
                                        >
                                            <div className={styles.qualityCardUp}>
                                                <p className={styles.qualityText}>Собственный автопарк</p>
                                                <Image src="/van.svg" alt="Собственный автопарк" width={50} height={50} className={styles.qualityIcon} />
                                            </div>
                                            <p className={styles.qualityDescription}>
                                                Мы обеспечиваем быструю и безопасную доставку продукции за счёт собственной логистики. Ежедневно наши
                                                автомобили отправляются к нашим клиентам, поддерживая точные сроки поставок и оптимальные условия
                                                хранения во время транспортировки.
                                            </p>
                                        </motion.div>
                                    </SwiperSlide>
                                </Swiper>
                            )}
                        </div>
                    </div>
                </section>

                <section id="products" className={styles.productsBlock}>
                    <div className={`${styles.container} container`}>
                        <div className={styles.productsHeaderBlock}>
                            <div className={styles.productsHeaderBottomBlock}>
                                <h5 className={styles.productsHeaderTitle}>Продукция</h5>
                                <h3 className={styles.productsHeaderInfo}>Производим продукцию под СТМ и развиваем наш бренд</h3>
                            </div>
                            <div className={styles.productsHeaderLink}>
                                <Button text={'О продукции'} href='/products' />
                            </div>
                        </div>
                        <div className={styles.productsCardsContainer}>
                            <Swiper
                                spaceBetween={20}
                                slidesPerView={4}
                                className={styles.productsSwiper}
                                breakpoints={{ 1440: { slidesPerView: 4 }, 1280: { slidesPerView: 3 }, 640: { slidesPerView: 2 }, 360: { slidesPerView: 1 } }}
                                ref={swiperRef}
                                onSlideChange={(swiper) => setSwiperIndex(swiper.activeIndex)}
                            >
                                <SwiperSlide>
                                    <div className={styles.productCard}>
                                        <div className={styles.productCardUp}>
                                            <p className={styles.productTitle}>Сэндвичи</p>
                                            <p className={styles.productPrice}>{'> 50 видов'}</p>
                                        </div>
                                        <Image src='/sandwich.png' quality={100} alt='Сэндвич' width={484} height={440} className={styles.productImage} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.productCard}>
                                        <div className={styles.productCardUp}>
                                            <p className={styles.productTitle}>Блины</p>
                                            <p className={styles.productPrice}>{'> 50 видов'}</p>
                                        </div>
                                        <Image src='/blini.png' alt='Блины' width={484} height={440} className={styles.productImage} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.productCard}>
                                        <div className={styles.productCardUp}>
                                            <p className={styles.productTitle}>Пироги</p>
                                            <p className={styles.productPrice}>{'> 50 видов'}</p>
                                        </div>
                                        <Image src='/pirogi.png' alt='Пироги' width={484} height={440} className={styles.productImage} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.productCard}>
                                        <div className={styles.productCardUp}>
                                            <p className={styles.productTitle}>Слоёные изделия</p>
                                            <p className={styles.productPrice}>{'> 50 видов'}</p>
                                        </div>
                                        <Image src='/soleniye.png' alt='Слоёные изделия' width={484} height={440} className={styles.productImage} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.productCard}>
                                        <div className={styles.productCardUp}>
                                            <p className={styles.productTitle}>Изделия из песочного теста</p>
                                            <p className={styles.productPrice}>{'> 50 видов'}</p>
                                        </div>
                                        <Image src='/pesochnoye.png' alt='Песочные изделия' width={484} height={440} className={styles.productImage} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.productCard}>
                                        <div className={styles.productCardUp}>
                                            <p className={styles.productTitle}>Торты</p>
                                            <p className={styles.productPrice}>{'> 50 видов'}</p>
                                        </div>
                                        <Image src='/torti.png' alt='Торты' width={484} height={440} className={styles.productImage} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.productCard}>
                                        <div className={styles.productCardUp}>
                                            <p className={styles.productTitle}>Пирожные</p>
                                            <p className={styles.productPrice}>{'> 50 видов'}</p>
                                        </div>
                                        <Image src='/pirozhnoye.png' alt='Пирожные' width={484} height={440} className={styles.productImage} />
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <div className={styles.productsHeaderLink2}>
                            <Button text={'О продукции'} href='/products' />
                        </div>
                    </div>
                </section>

                <section id='production' className={styles.productionBlock}>
                    <div className={`${styles.container} container`}>
                        <div className={styles.productionHeaderBlock}>
                            <div className={styles.productionHeaderBottomBlock}>
                                <h5 className={styles.productionHeaderTitle}>производство</h5>
                                <h3 className={styles.productionHeaderInfo}>
                                    Отлаженная работа на всех этапах производства, соблюдение технологий и только передовое оборудование
                                </h3>
                            </div>
                            <div className={styles.productionHeaderLink}>
                                <Button text={'О производстве'} href='/production' />
                            </div>
                        </div>
                    </div>
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
                    <div className={`${styles.container} container`}>
                        <div className={styles.productionHeaderLink2}>
                            <Button text={'О производстве'} href='/production' />
                        </div>
                    </div>
                </section>

                <section id='news' className={styles.productionBlock}>
                    <div className={`${styles.container} container`}>
                        <div className={`${styles.productionHeaderBlock} ${styles.newsHeaderBlock}`}>
                            <div className={styles.productionHeaderBottomBlock}>
                                <h5 className={styles.productionHeaderTitle}>новости</h5>
                                <h3 className={styles.productionHeaderInfo}>
                                    Мы открыты и честны: рассказываем обо всем важном, что происходит в компании
                                </h3>
                            </div>
                            <div className={styles.productionHeaderLink}>
                                <Button text={"Все новости"} href="/news" />
                            </div>
                        </div>
                        <div className={styles.newsCardsContainer}>
                            {isNewsMobile ? (
                                <Swiper
                                    spaceBetween={20}
                                    slidesPerView={2}
                                    className={styles.newsSwiper}
                                    breakpoints={{
                                        768: { slidesPerView: 2 },
                                        767: { slidesPerView: 1 },
                                        360: { slidesPerView: 1 },
                                    }}
                                >
                                    <SwiperSlide>
                                        <motion.div
                                            initial={{ y: 197 }}
                                            whileInView={{ y: 0 }}
                                            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                            viewport={{ once: true }}
                                        >
                                            <Link href={"/news"} className={styles.newsCard}>
                                                <Image
                                                    src="/news1.png"
                                                    alt="Пирожные"
                                                    width={587}
                                                    height={374}
                                                    className={styles.newsImage}
                                                />
                                                <h4 className={styles.newsCardTitle}>Наши сэндвичи теперь в «Самокате» — свежий продукт с доставкой за 15 минут!</h4>
                                                <p className={styles.newsCardDescription}>
                                                    22 апреля 2025 • Партнёрство
                                                </p>
                                            </Link>
                                        </motion.div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <motion.div
                                            initial={{ y: 197 }}
                                            whileInView={{ y: 0 }}
                                            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                            viewport={{ once: true }}
                                        >
                                            <Link href={"/news"} className={styles.newsCard}>
                                                <Image
                                                    src="/news2.png"
                                                    alt="Пирожные"
                                                    width={587}
                                                    height={374}
                                                    className={styles.newsImage}
                                                />
                                                <h4 className={styles.newsCardTitle}>Инновационная упаковка — теперь наша продукция остаётся свежей ещё дольше</h4>
                                                <p className={styles.newsCardDescription}>
                                                    21 апреля 2025 • Продукция
                                                </p>
                                            </Link>
                                        </motion.div>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <motion.div
                                            initial={{ y: 197 }}
                                            whileInView={{ y: 0 }}
                                            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                            viewport={{ once: true }}
                                        >
                                            <Link href={"/news"} className={styles.newsCard}>
                                                <Image
                                                    src="/news3.png"
                                                    alt="Пирожные"
                                                    width={587}
                                                    height={374}
                                                    className={styles.newsImage}
                                                />
                                                <h4 className={styles.newsCardTitle}>СТМ растёт: мы начали выпуск блинов для сети «Пятёрочка»</h4>
                                                <p className={styles.newsCardDescription}>
                                                    18 апреля 2025 • Партнёрство
                                                </p>
                                            </Link>
                                        </motion.div>
                                    </SwiperSlide>
                                </Swiper>
                            ) : (
                                <>
                                    <motion.div
                                        initial={{ y: 197 }}
                                        whileInView={{ y: 0 }}
                                        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                        viewport={{ once: true }}
                                    >
                                        <Link href={"/news"} className={styles.newsCard}>
                                            <Image
                                                src="/news1.png"
                                                alt="Пирожные"
                                                width={587}
                                                height={374}
                                                className={styles.newsImage}
                                            />
                                            <h4 className={styles.newsCardTitle}>Наши сэндвичи теперь в «Самокате» — свежий продукт с доставкой за 15 минут!</h4>
                                            <p className={styles.newsCardDescription}>
                                                22 апреля 2025 • Партнёрство
                                            </p>
                                        </Link>
                                    </motion.div>
                                    <motion.div
                                        initial={{ y: 197 }}
                                        whileInView={{ y: 0 }}
                                        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                        viewport={{ once: true }}
                                    >
                                        <Link href={"/news"} className={styles.newsCard}>
                                            <Image
                                                src="/news2.png"
                                                alt="Пирожные"
                                                width={587}
                                                height={374}
                                                className={styles.newsImage}
                                            />
                                            <h4 className={styles.newsCardTitle}>Инновационная упаковка — теперь наша продукция остаётся свежей ещё дольше</h4>
                                            <p className={styles.newsCardDescription}>
                                                21 апреля 2025 • Продукция
                                            </p>
                                        </Link>
                                    </motion.div>
                                    <motion.div
                                        initial={{ y: 197 }}
                                        whileInView={{ y: 0 }}
                                        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                        viewport={{ once: true }}
                                    >
                                        <Link href={"/news"} className={styles.newsCard}>
                                            <Image
                                                src="/news3.png"
                                                alt="Пирожные"
                                                width={587}
                                                height={374}
                                                className={styles.newsImage}
                                            />
                                            <h4 className={styles.newsCardTitle}>СТМ растёт: мы начали выпуск блинов для сети «Пятёрочка»</h4>
                                            <p className={styles.newsCardDescription}>
                                                18 апреля 2025 • Партнёрство
                                            </p>
                                        </Link>
                                    </motion.div>
                                </>
                            )}
                        </div>
                        <div className={styles.productionHeaderLink2}>
                            <Button text={"Все новости"} linkTo="/news" />
                        </div>
                    </div>
                </section>

                <section id='preFooter' className={styles.preFooter}>
                    <div className={`${styles.container} container`}>
                        <div className={styles.preFooterWrapper}>
                            <Image src='/prefooter.png' alt='Еда' width={586} height={400} className={styles.preFooterPhoto} />
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
                                        О компании
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
                                {isPreFooterHovered &&
                                    Array.from({ length: 3 }).map((_, i) => (
                                        <motion.div
                                            key={`prefooter-ripple-${i}`}
                                            className={styles.ripple}
                                            custom={i}
                                            initial='initial'
                                            animate={isPreFooterHovered ? 'hover' : 'initial'}
                                            variants={rippleVariants2}
                                            style={{
                                                right: `${isMobile ? '20px' : '30px'}`,
                                                bottom: `${isMobile ? '20px' : '30px'}`,
                                                transform: 'translate(50%, 50%)',
                                                backgroundColor: clientRippleColors[i],
                                            }}
                                        />
                                    ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                <Footer />

            </motion.div>
        </>
    );
}