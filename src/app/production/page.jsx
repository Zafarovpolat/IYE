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

    useLayoutEffect(() => {
        if (!isClient) return;

        const header = document.querySelector('header') || document.querySelector('.header');
        const heroElement = document.getElementById('hero');
        const headerHeight = header ? header.offsetHeight - 2 : 0;
        const heroHeight = window.innerHeight; // 100vh для hero
        const protrusionFactor = window.innerHeight > 1080 ? 0.15 : window.innerHeight > 768 ? 0.1 : 0.1; // 15% для >1080px, 10% для >768px
        const calculatedTargetOffset = heroHeight * (1 + protrusionFactor); // Шторка выступает на 10% или 15%

        targetOffsetRef.current = calculatedTargetOffset;

        // Устанавливаем начальные стили
        if (window.scrollY > 0) {
            document.body.style.overflowY = 'auto';
            document.body.style.height = `calc(100% - ${calculatedTargetOffset}px)`;
            document.documentElement.style.height = `calc(100% - ${calculatedTargetOffset}px)`;
            setNegativeMarginBottom(calculatedTargetOffset);
            yOffset.set(-calculatedTargetOffset); // Начальная позиция шторки внизу
        } else {
            document.body.style.overflowY = 'hidden';
            document.body.style.height = '100%';
            document.documentElement.style.height = '100%';
            setNegativeMarginBottom(heroHeight * protrusionFactor); // Выступ на 10% или 15%
            yOffset.set(-heroHeight * protrusionFactor); // Шторка изначально поднята
        }
    }, [isClient, yOffset]);

    useEffect(() => {
        if (!isClient || isMobile) return;

        let accumulatedDelta = 0;
        let rafId = null;
        let isWheelHandlerActive = true;
        let scrollState = 'top';

        const updatePosition = () => {
            const protrusionFactor = window.innerHeight > 1080 ? 0.15 : window.innerHeight > 768 ? 0.1 : 0.1; // 15% или 10%
            const maxOffset = -targetOffsetRef.current; // Максимальное смещение вниз
            const minOffset = -window.innerHeight * protrusionFactor; // Минимальное смещение (выступ)

            const currentY = yOffset.get();
            const targetY = Math.max(maxOffset, Math.min(minOffset, currentY + accumulatedDelta));
            const newY = currentY + (targetY - currentY) * 0.15;
            yOffset.set(newY);

            // Определяем состояние прокрутки
            const isNearMaxOffset = Math.abs(newY - maxOffset) < 5;
            const isNearMinOffset = Math.abs(newY - minOffset) < 5;

            if (isNearMaxOffset && scrollState !== 'bottom') {
                scrollState = 'bottom';
                document.body.style.overflowY = 'auto';
                document.body.style.height = 'auto';
                document.documentElement.style.height = 'auto';
                setNegativeMarginBottom(targetOffsetRef.current);
                if (isWheelHandlerActive) {
                    console.log('Disabling main wheel handler: switching to browser scroll');
                    window.removeEventListener('wheel', handleWheel);
                    isWheelHandlerActive = false;
                }
            } else if (isNearMinOffset && scrollState !== 'top') {
                scrollState = 'top';
                document.body.style.overflowY = 'hidden';
                document.body.style.height = '100%';
                document.documentElement.style.height = '100%';
                setNegativeMarginBottom(window.innerHeight * protrusionFactor); // Выступ на 10% или 15%
            } else if (!isNearMaxOffset && !isNearMinOffset) {
                scrollState = 'moving';
                document.body.style.overflowY = 'hidden';
                document.body.style.height = '100%';
                document.documentElement.style.height = '100%';
                setNegativeMarginBottom(window.innerHeight * protrusionFactor); // Выступ на 10% или 15%
            }

            if (accumulatedDelta !== 0) {
                accumulatedDelta *= 0.95;
                if (Math.abs(accumulatedDelta) < 0.05) {
                    accumulatedDelta = 0;
                    const finalY = isNearMaxOffset ? maxOffset : isNearMinOffset ? minOffset : newY;
                    animate(yOffset, finalY, {
                        type: 'spring',
                        stiffness: 80,
                        damping: 25,
                        mass: 1.2,
                        onUpdate: (latest) => {
                            yOffset.set(latest);
                            const isNearMax = Math.abs(latest - maxOffset) < 5;
                            const isNearMin = Math.abs(latest - minOffset) < 5;
                            if (isNearMax && scrollState !== 'bottom') {
                                scrollState = 'bottom';
                                document.body.style.overflowY = 'auto';
                                document.body.style.height = 'auto';
                                document.documentElement.style.height = 'auto';
                                setNegativeMarginBottom(targetOffsetRef.current);
                                if (isWheelHandlerActive) {
                                    console.log('Spring: Disabling main wheel handler');
                                    window.removeEventListener('wheel', handleWheel);
                                    isWheelHandlerActive = false;
                                }
                            } else if (isNearMin && scrollState !== 'top') {
                                scrollState = 'top';
                                document.body.style.overflowY = 'hidden';
                                document.body.style.height = '100%';
                                document.documentElement.style.height = '100%';
                                setNegativeMarginBottom(window.innerHeight * protrusionFactor); // Выступ на 10% или 15%
                            }
                        },
                        onComplete: () => {
                            console.log(`Spring animation completed: yOffset=${yOffset.get().toFixed(2)}, scrollState=${scrollState}`);
                        },
                    });
                } else {
                    rafId = requestAnimationFrame(updatePosition);
                }
            }
        };

        const handleWheel = (event) => {
            event.preventDefault();
            accumulatedDelta -= event.deltaY * 0.3;
            if (!rafId) {
                rafId = requestAnimationFrame(updatePosition);
            }
        };

        const handleRestoreWheel = (event) => {
            const maxOffset = -targetOffsetRef.current;
            if (
                !isWheelHandlerActive &&
                event.deltaY < 0 &&
                window.scrollY <= 5 &&
                scrollState === 'bottom'
            ) {
                console.log('RestoreWheel: Re-enabling main wheel handler for scrolling up');
                window.addEventListener('wheel', handleWheel, { passive: false });
                isWheelHandlerActive = true;
                accumulatedDelta -= event.deltaY * 0.3;
                if (!rafId) {
                    rafId = requestAnimationFrame(updatePosition);
                }
            }
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('wheel', handleRestoreWheel, { passive: false });

        return () => {
            console.log('Cleanup: Removing both wheel handlers and resetting styles');
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('wheel', handleRestoreWheel);
            if (rafId) cancelAnimationFrame(rafId);
            document.body.style.overflow = 'auto';
            document.body.style.height = 'auto';
            document.documentElement.style.height = 'auto';
            setNegativeMarginBottom(0);
        };
    }, [isClient, isMobile, yOffset]);

    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission logic (e.g., API call)
        setIsSuccessModalOpen(true); // Open the success modal
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

            <motion.div
                className={styles.sections}
                animate={controls}
                initial={{ y: 0 }}
                style={{ y: yOffset, backgroundColor: '#fff', marginBottom: `-${negativeMarginBottom + deltaY}px`, zIndex: 3 }}
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
                                                        initial={{ y: 170 }}
                                                        whileInView={{ y: 0 }}
                                                        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                                        viewport={{ once: true }}
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
                                                        initial={{ y: 170 }}
                                                        whileInView={{ y: 0 }}
                                                        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                                        viewport={{ once: true }}
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
                                                        initial={{ y: 170 }}
                                                        whileInView={{ y: 0 }}
                                                        transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                                        viewport={{ once: true }}
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
                                slidesPerView={1}
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
                            <button className={styles.stmBannerBtn}>Отправить заявку</button>
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
                                <div className={styles.partnersFormRight}>
                                    <form onSubmit={handleFormSubmit}>
                                        <div className={styles.partnersFormRightUp}>
                                            <input type="text" placeholder='Имя и Фамилия' className={styles.partnersInput} />
                                            <input type="text" placeholder='Компания' className={styles.partnersInput} />
                                            <input type="tel" placeholder='Номер телефона' className={styles.partnersInput} />
                                            <input type="email" placeholder='Электронная почта' className={styles.partnersInput} />
                                        </div>
                                        <div className={styles.partnersFormRightBottom}>
                                            <button className={styles.partnersFormSubmit} type='submit'>Отправить заявку</button>
                                            <p className={styles.partnersPolicy}>Нажимая на кнопку, вы соглашаетесь с <Link href={'/'}>политикой конфиденциальности</Link></p>
                                        </div>
                                    </form>
                                </div>
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