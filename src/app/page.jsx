'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import styles from './styles/Home.module.css';
import Button from "./components/Button/Button";
import { Swiper, SwiperSlide } from 'swiper/react';
import posterImg from '../../public/Poster.jpg';
import 'swiper/css';

export default function Home() {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isClientHovered, setIsClientHovered] = useState(false); // Hover state for clients section
    const [isPreFooterHovered, setIsPreFooterHovered] = useState(false); // Hover state for preFooter section
    const [isMobile, setIsMobile] = useState(false);
    const [isNewsMobile, setIsNewsMobile] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

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

    // Variants for clients section partnerCard (unchanged)
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
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
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
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
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
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
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
                        transition={{ duration: 0.545, delay: 0.2, ease: "easeOut" }}
                    />
                    <motion.p
                        className={styles.subtitle}
                        initial={{ y: 12, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.545, delay: 0.295, ease: "easeOut" }}
                    >
                        Производство кулинарных, кондитерских и хлебобулочных изделий
                    </motion.p>
                </div>
            </motion.section>

            <motion.section
                id="numbers"
                className={styles.numbersBlock}
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.6, 0.01, 0.05, 0.95], delay: 0.2 }}
            >
                <div className={`${styles.container} container`}>
                    <div className={styles.numbersHeaderBlock}>
                        <div className={styles.numbersHeaderBottomBlock}>
                            <h5 className={styles.numbersHeaderTitle}>
                                цифры
                            </h5>
                            <h3 className={styles.numbersHeaderInfo}>
                                Наше производство — это сочетание традиционных рецептов, современных технологий и масштабов
                            </h3>
                        </div>
                        <div className={styles.numbersHeaderLink}>
                            <Button href="/about" />
                        </div>
                    </div>
                    <div className={styles.cardsContainerBlock}>
                        <div className={styles.cardBlock}>
                            <div className={styles.cardNumberWrapperBlock}>
                                <span className={styles.cardNumberText}>
                                    100 000
                                </span>
                                <span className={styles.cardUnitText}>
                                    ед.
                                </span>
                            </div>
                            <p className={styles.cardDescriptionText}>
                                продукции в день
                            </p>
                            <Image
                                src="/pizza.png"
                                alt="Пиццы"
                                width={360}
                                height={320}
                                className={`${styles.cardImage}`}
                                sizes="100vw"
                                priority
                            />
                        </div>
                        <div className={styles.cardBlock}>
                            <div className={styles.cardNumberWrapperBlock}>
                                <span className={styles.cardNumberText}>
                                    10 000
                                </span>
                                <span className={styles.cardUnitText}>
                                    кв.м
                                </span>
                            </div>
                            <p className={styles.cardDescriptionText}>
                                производственной мощности
                            </p>
                        </div>
                        <div className={styles.cardBlock}>
                            <Image
                                src="/card-bg.png"
                                alt="Пиццы"
                                width={587}
                                height={780}
                                className={`${styles.cardBackgroundImage}`}
                                sizes="100vw"
                                priority
                            />
                        </div>
                        <div className={styles.cardBlock}>
                            <div className={styles.cardNumberWrapperBlock}>
                                <span className={styles.cardNumberText}>
                                    5
                                </span>
                                <span className={styles.cardUnitText}>
                                    этапов
                                </span>
                            </div>
                            <p className={styles.cardDescriptionText}>
                                проверки качества продуктов
                            </p>
                        </div>
                    </div>
                    <div className={styles.numbersHeaderLink2}>
                        <Button href="/about" />
                    </div>
                </div>
            </motion.section>

            <motion.section
                id="clients"
                className={styles.clientsBlock}
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.6, 0.01, 0.05, 0.95], delay: 0.3 }}
            >
                <div className={`${styles.container} container`}>
                    <div className={styles.clientsHeaderBlock}>
                        <div className={styles.clientsHeaderBottomBlock}>
                            <h5 className={styles.clientsHeaderTitle}>
                                клиенты
                            </h5>
                            <h3 className={styles.clientsHeaderInfo}>
                                Больше 5 лет работаем с большими продуктовыми сетями российского рынка и сервисами доставки еды
                            </h3>
                        </div>
                    </div>
                    <div className={styles.clientsCardsContainer}>
                        <div className={styles.clientCard}>
                            <Image
                                src="/vkus.svg"
                                alt="ВкусВилл"
                                width={100}
                                height={100}
                                className={styles.clientLogo}
                            />
                            <p className={styles.clientName}>ВкусВилл</p>
                        </div>
                        <div className={styles.clientCard}>
                            <Image
                                src="/Самокат.svg"
                                alt="Самокат"
                                width={100}
                                height={100}
                                className={styles.clientLogo}
                            />
                            <p className={styles.clientName}>Самокат</p>
                        </div>
                        <div className={`${styles.clientCard} ${styles.clientInfoCard}`}>
                            <p className={styles.clientInfo}>
                                Мы поставляем продукцию в магазины, сервисы по доставке еды, отели, рестораны, столовые, различные учреждения
                            </p>
                        </div>
                        <motion.div
                            className={styles.partnerCard}
                            onMouseEnter={() => setIsClientHovered(true)}
                            onMouseLeave={() => setIsClientHovered(false)}
                            initial="initial"
                            animate={isClientHovered ? "hover" : "initial"}
                            variants={clientCardBackgroundVariants}
                            style={{
                                '--ripple-origin-x': rippleOrigin.x,
                                '--ripple-origin-y': rippleOrigin.y,
                            }}
                        >
                            <Link href="/" className={styles.partnerLink}>
                                <motion.span
                                    className={styles.partnerText}
                                    variants={clientPartnerTextVariants}
                                >
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
                            {isClientHovered && (
                                <>
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <motion.div
                                            key={`client-ripple-${i}`}
                                            className={styles.ripple}
                                            custom={i}
                                            initial="initial"
                                            animate={isClientHovered ? "hover" : "initial"}
                                            variants={rippleVariants}
                                            style={{
                                                right: '20px',
                                                bottom: '20px',
                                                transform: 'translate(50%, 50%)',
                                                backgroundColor: clientRippleColors[i]
                                            }}
                                        />
                                    ))}
                                </>
                            )}
                        </motion.div>
                        <div className={styles.clientCard}>
                            <Image
                                src="/Перекресток.svg"
                                alt="Перекрёсток"
                                width={100}
                                height={100}
                                className={styles.clientLogo}
                            />
                            <p className={styles.clientName}>Перекрёсток</p>
                        </div>
                        <div className={styles.clientCard}>
                            <Image
                                src="/Пятерочка.svg"
                                alt="Пятёрочка"
                                width={100}
                                height={100}
                                className={styles.clientLogo}
                            />
                            <p className={styles.clientName}>Пятёрочка</p>
                        </div>
                    </div>
                    <div className={`${styles.numbersHeaderLink2} ${styles.clientsLink}`}>
                        <Button href="/about" />
                    </div>
                </div>
            </motion.section>

            <motion.section
                id="quality"
                className={styles.quality}
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.6, 0.01, 0.05, 0.95], delay: 0.4 }}
            >
                <div className={`${styles.container} container`}>
                    <div className={styles.qualityHeaderBlock}>
                        <div className={styles.qualityHeaderBottomBlock}>
                            <h5 className={styles.qualityHeaderTitle}>
                                наши преимущества
                            </h5>
                            <h3 className={styles.qualityHeaderInfo}>
                                Нас выбирают за качество, инновации и безупречный сервис
                            </h3>
                        </div>
                    </div>
                    <div className={styles.qualityCardsContainer}>
                        {!isMobile ? (
                            <>
                                <div className={styles.qualityCard}>
                                    <div className={styles.qualityCardUp}>
                                        <p className={styles.qualityText}>
                                            Тщательный отбор сырья
                                        </p>
                                        <Image
                                            src="/organic-food.svg"
                                            alt="Тщательный отбор сырья"
                                            width={50}
                                            height={50}
                                            className={styles.qualityIcon}
                                        />
                                    </div>
                                    <p className={styles.qualityDescription}>
                                        Мы используем только проверенные ингредиенты, чтобы гарантировать высочайшее качество продукции. Мы используем только качественные и проверенные ингредиенты, соответствующие строгим стандартам безопасности. Каждая партия сырья проходит лабораторные тесты на соответствие нормам, что гарантирует натуральность, свежесть и безопасность нашей продукции.
                                    </p>
                                </div>
                                <div className={styles.qualityCard}>
                                    <div className={styles.qualityCardUp}>
                                        <p className={styles.qualityText}>
                                            Строгий контроль поставщиков
                                        </p>
                                        <Image
                                            src="/laboratory.svg"
                                            alt="Строгий контроль поставщиков"
                                            width={50}
                                            height={50}
                                            className={styles.qualityIcon}
                                        />
                                    </div>
                                    <p className={styles.qualityDescription}>
                                        Мы работаем только с проверенными и сертифицированными поставщиками, чья продукция соответствует международным стандартам. Каждый поставщик проходит аудит, а сырьё — дополнительное тестирование перед поступлением на производство.
                                    </p>
                                </div>
                                <div className={styles.qualityCard}>
                                    <div className={styles.qualityCardUp}>
                                        <p className={styles.qualityText}>
                                            Современное оборудование
                                        </p>
                                        <Image
                                            src="/manufacture.svg"
                                            alt="Современное оборудование"
                                            width={50}
                                            height={50}
                                            className={styles.qualityIcon}
                                        />
                                    </div>
                                    <p className={styles.qualityDescription}>
                                        Производственные линии оснащены современным оборудованием для стабильного качества и скорости производства. Металлодетекторы исключают посторонние включения, а автоматизированные системы и лабораторные тесты гарантируют безопасность продукции.
                                    </p>
                                </div>
                                <div className={styles.qualityCard}>
                                    <div className={styles.qualityCardUp}>
                                        <p className={styles.qualityText}>
                                            Профессиональная команда
                                        </p>
                                        <Image
                                            src="/leadership.svg"
                                            alt="Профессиональная команда"
                                            width={50}
                                            height={50}
                                            className={styles.qualityIcon}
                                        />
                                    </div>
                                    <p className={styles.qualityDescription}>
                                        В нашем штате — опытные технологи, инженеры и эксперты по качеству, которые следят за каждым этапом производства. Мы постоянно обучаем сотрудников, внедряем передовые методики и следуем лучшим практикам отрасли.
                                    </p>
                                </div>
                                <div className={styles.qualityCard}>
                                    <div className={styles.qualityCardUp}>
                                        <p className={styles.qualityText}>
                                            Уникальная система контроля качества на всех этапах производства
                                        </p>
                                        <Image
                                            src="/gear.svg"
                                            alt="Уникальная система контроля качества на всех этапах производства"
                                            width={50}
                                            height={50}
                                            className={styles.qualityIcon}
                                        />
                                    </div>
                                    <p className={styles.qualityDescription}>
                                        Наша продукция проходит многоуровневый контроль: от проверки сырья до финального тестирования. Это гарантирует стабильное качество и безопасность.
                                    </p>
                                </div>
                                <div className={styles.qualityCard}>
                                    <div className={styles.qualityCardUp}>
                                        <p className={styles.qualityText}>
                                            Собственный автопарк
                                        </p>
                                        <Image
                                            src="/van.svg"
                                            alt="Собственный автопарк"
                                            width={50}
                                            height={50}
                                            className={styles.qualityIcon}
                                        />
                                    </div>
                                    <p className={styles.qualityDescription}>
                                        Мы обеспечиваем быструю и безопасную доставку продукции за счёт собственной логистики. Ежедневно наши автомобили отправляются к нашим клиентам, поддерживая точные сроки поставок и оптимальные условия хранения во время транспортировки.
                                    </p>
                                </div>
                            </>
                        ) : (
                            <Swiper
                                spaceBetween={10}
                                slidesPerView={1}
                                className={styles.qualitySwiper}
                            >
                                <SwiperSlide>
                                    <div className={styles.qualityCard}>
                                        <div className={styles.qualityCardUp}>
                                            <p className={styles.qualityText}>
                                                Тщательный отбор сырья
                                            </p>
                                            <Image
                                                src="/organic-food.svg"
                                                alt="Тщательный отбор сырья"
                                                width={50}
                                                height={50}
                                                className={styles.qualityIcon}
                                            />
                                        </div>
                                        <p className={styles.qualityDescription}>
                                            Мы используем только проверенные ингредиенты, чтобы гарантировать высочайшее качество продукции. Мы используем только качественные и проверенные ингредиенты, соответствующие строгим стандартам безопасности. Каждая партия сырья проходит лабораторные тесты на соответствие нормам, что гарантирует натуральность, свежесть и безопасность нашей продукции.
                                        </p>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.qualityCard}>
                                        <div className={styles.qualityCardUp}>
                                            <p className={styles.qualityText}>
                                                Строгий контроль поставщиков
                                            </p>
                                            <Image
                                                src="/laboratory.svg"
                                                alt="Строгий контроль поставщиков"
                                                width={50}
                                                height={50}
                                                className={styles.qualityIcon}
                                            />
                                        </div>
                                        <p className={styles.qualityDescription}>
                                            Мы работаем только с проверенными и сертифицированными поставщиками, чья продукция соответствует международным стандартам. Каждый поставщик проходит аудит, а сырьё — дополнительное тестирование перед поступлением на производство.
                                        </p>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.qualityCard}>
                                        <div className={styles.qualityCardUp}>
                                            <p className={styles.qualityText}>
                                                Современное оборудование
                                            </p>
                                            <Image
                                                src="/manufacture.svg"
                                                alt="Современное оборудование"
                                                width={50}
                                                height={50}
                                                className={styles.qualityIcon}
                                            />
                                        </div>
                                        <p className={styles.qualityDescription}>
                                            Производственные линии оснащены современным оборудованием для стабильного качества и скорости производства. Металлодетекторы исключают посторонние включения, а автоматизированные системы и лабораторные тесты гарантируют безопасность продукции.
                                        </p>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.qualityCard}>
                                        <div className={styles.qualityCardUp}>
                                            <p className={styles.qualityText}>
                                                Профессиональная команда
                                            </p>
                                            <Image
                                                src="/leadership.svg"
                                                alt="Профессиональная команда"
                                                width={50}
                                                height={50}
                                                className={styles.qualityIcon}
                                            />
                                        </div>
                                        <p className={styles.qualityDescription}>
                                            В нашем штате — опытные технологи, инженеры и эксперты по качеству, которые следят за каждым этапом производства. Мы постоянно обучаем сотрудников, внедряем передовые методики и следуем лучшим практикам отрасли.
                                        </p>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.qualityCard}>
                                        <div className={styles.qualityCardUp}>
                                            <p className={styles.qualityText}>
                                                Уникальная система контроля качества на всех этапах производства
                                            </p>
                                            <Image
                                                src="/gear.svg"
                                                alt="Уникальная система контроля качества на всех этапах производства"
                                                width={50}
                                                height={50}
                                                className={styles.qualityIcon}
                                            />
                                        </div>
                                        <p className={styles.qualityDescription}>
                                            Наша продукция проходит многоуровневый контроль: от проверки сырья до финального тестирования. Это гарантирует стабильное качество и безопасность.
                                        </p>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.qualityCard}>
                                        <div className={styles.qualityCardUp}>
                                            <p className={styles.qualityText}>
                                                Собственный автопарк
                                            </p>
                                            <Image
                                                src="/van.svg"
                                                alt="Собственный автопарк"
                                                width={50}
                                                height={50}
                                                className={styles.qualityIcon}
                                            />
                                        </div>
                                        <p className={styles.qualityDescription}>
                                            Мы обеспечиваем быструю и безопасную доставку продукции за счёт собственной логистики. Ежедневно наши автомобили отправляются к нашим клиентам, поддерживая точные сроки поставок и оптимальные условия хранения во время транспортировки.
                                        </p>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        )}
                    </div>
                </div>
            </motion.section>

            <motion.section
                id="products"
                className={styles.productsBlock}
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.6, 0.01, 0.05, 0.95], delay: 0.3 }}
            >
                <div className={`${styles.container} container`}>
                    <div className={styles.productsHeaderBlock}>
                        <div className={styles.productsHeaderBottomBlock}>
                            <h5 className={styles.productsHeaderTitle}>
                                Продукция
                            </h5>
                            <h3 className={styles.productsHeaderInfo}>
                                Производим продукцию под СТМ и развиваем наш бренд
                            </h3>
                        </div>
                        <div className={styles.productsHeaderLink}>
                            <Button text={"О продукции"} href="/products" />
                        </div>
                    </div>
                    <div className={styles.productsCardsContainer}>
                        <Swiper
                            spaceBetween={20}
                            slidesPerView={4}
                            className={styles.productsSwiper}
                            breakpoints={{
                                1440: { slidesPerView: 4 },
                                1280: { slidesPerView: 3 },
                                640: { slidesPerView: 2 },
                                360: { slidesPerView: 1 },
                            }}
                        >
                            <SwiperSlide>
                                <div className={styles.productCard}>
                                    <div className={styles.productCardUp}>
                                        <p className={styles.productTitle}>Сэндвичи</p>
                                        <p className={styles.productPrice}>{"> 50 видов"}</p>
                                    </div>
                                    <Image
                                        src="/sandwich.png"
                                        alt="Сэндвич"
                                        width={200}
                                        height={200}
                                        className={styles.productImage}
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={styles.productCard}>
                                    <div className={styles.productCardUp}>
                                        <p className={styles.productTitle}>Блины</p>
                                        <p className={styles.productPrice}>{"> 50 видов"}</p>
                                    </div>
                                    <Image
                                        src="/blini.png"
                                        alt="Блины"
                                        width={200}
                                        height={200}
                                        className={styles.productImage}
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={styles.productCard}>
                                    <div className={styles.productCardUp}>
                                        <p className={styles.productTitle}>Пироги</p>
                                        <p className={styles.productPrice}>{"> 50 видов"}</p>
                                    </div>
                                    <Image
                                        src="/pirogi.png"
                                        alt="Пироги"
                                        width={200}
                                        height={200}
                                        className={styles.productImage}
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={styles.productCard}>
                                    <div className={styles.productCardUp}>
                                        <p className={styles.productTitle}>Слоёные изделия</p>
                                        <p className={styles.productPrice}>{"> 50 видов"}</p>
                                    </div>
                                    <Image
                                        src="/soleniye.png"
                                        alt="Слоёные изделия"
                                        width={200}
                                        height={200}
                                        className={styles.productImage}
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={styles.productCard}>
                                    <div className={styles.productCardUp}>
                                        <p className={styles.productTitle}>Изделия из песочного теста</p>
                                        <p className={styles.productPrice}>{"> 50 видов"}</p>
                                    </div>
                                    <Image
                                        src="/pesochnoye.png"
                                        alt="Песочные изделия"
                                        width={200}
                                        height={200}
                                        className={styles.productImage}
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={styles.productCard}>
                                    <div className={styles.productCardUp}>
                                        <p className={styles.productTitle}>Торты</p>
                                        <p className={styles.productPrice}>{"> 50 видов"}</p>
                                    </div>
                                    <Image
                                        src="/torti.png"
                                        alt="Торты"
                                        width={200}
                                        height={200}
                                        className={styles.productImage}
                                    />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className={styles.productCard}>
                                    <div className={styles.productCardUp}>
                                        <p className={styles.productTitle}>Пирожные</p>
                                        <p className={styles.productPrice}>{"> 50 видов"}</p>
                                    </div>
                                    <Image
                                        src="/pirozhnoye.png"
                                        alt="Пирожные"
                                        width={200}
                                        height={200}
                                        className={styles.productImage}
                                    />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                    <div className={styles.productsHeaderLink2}>
                        <Button text={"О продукции"} href="/products" />
                    </div>
                </div>
            </motion.section>

            <motion.section
                id="production"
                className={styles.productionBlock}
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.6, 0.01, 0.05, 0.95], delay: 0.3 }}
            >
                <div className={`${styles.container} container`}>
                    <div className={styles.productionHeaderBlock}>
                        <div className={styles.productionHeaderBottomBlock}>
                            <h5 className={styles.productionHeaderTitle}>
                                производство
                            </h5>
                            <h3 className={styles.productionHeaderInfo}>
                                Отлаженная работа на всех этапах производства, соблюдение технологий и только передовое оборудование
                            </h3>
                        </div>
                        <div className={styles.productionHeaderLink}>
                            <Button text={"О производстве"} href="/production" />
                        </div>
                    </div>
                </div>
                <div className={styles.productionVideoContainer}>
                    <div className={styles.posterContainer}>
                        <img
                            src={posterImg.src || posterImg}
                            alt="Video poster"
                            className={styles.videoPoster}
                        />
                        <div className={styles.posterLayer}></div>
                        <motion.button
                            className={`${styles.customPlayButton}`}
                            onClick={handlePlayPause}
                            aria-label="Play video"
                            initial={false}
                            onHoverStart={() => setIsHovered(true)}
                            onHoverEnd={() => setIsHovered(false)}
                            animate={isHovered ? "hover" : "initial"}
                            variants={{
                                initial: {},
                                hover: {}
                            }}
                        >
                            <motion.svg
                                width="100"
                                height="100"
                                viewBox="0 0 100 100"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                initial="initial"
                                animate={isHovered ? "hover" : "initial"}
                                variants={{
                                    initial: {
                                        opacity: 0.88
                                    },
                                    hover: {
                                        opacity: 1,
                                        transition: { duration: 0.2 }
                                    }
                                }}
                            >
                                <motion.g
                                    variants={{
                                        initial: {},
                                        hover: {}
                                    }}
                                >
                                    <motion.rect
                                        className={styles.playButtonCircle}
                                        width="100"
                                        height="100"
                                        rx="50"
                                        fill="white"
                                        initial="initial"
                                        variants={{
                                            initial: { fillOpacity: 0.5 },
                                            hover: { fillOpacity: 0.8, transition: { duration: 0.2 } }
                                        }}
                                    />
                                    <motion.path
                                        className={styles.playButtonTriangle}
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M60.8267 46.7613C63.0578 48.2662 63.0578 51.7494 60.8267 53.2543L46.742 61.9114C44.3563 63.5206 41.25 61.6844 41.25 58.6649L41.25 41.3508C41.25 38.3312 44.3563 36.495 46.742 38.1043L60.8267 46.7613Z"
                                        initial="initial"
                                        variants={{
                                            initial: { fill: '#159F4A' },
                                            hover: { fill: 'var(--hover-triangle-color, #0D5F2D)', transition: { duration: 0.2 } }
                                        }}
                                    />
                                </motion.g>
                            </motion.svg>
                        </motion.button>
                    </div>
                </div>
                <div className={`${styles.container} container`}>
                    <div className={styles.productionHeaderLink2}>
                        <Button text={"О производстве"} href="/production" />
                    </div>
                </div>
            </motion.section>

            <motion.section
                id="news"
                className={styles.productionBlock}
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.6, 0.01, 0.05, 0.95], delay: 0.3 }}
            >
                <div className={`${styles.container} container`}>
                    <div className={`${styles.productionHeaderBlock} ${styles.newsHeaderBlock}`}>
                        <div className={styles.productionHeaderBottomBlock}>
                            <h5 className={styles.productionHeaderTitle}>
                                новости
                            </h5>
                            <h3 className={styles.productionHeaderInfo}>
                                Мы открыты и честны: рассказываем обо всем важном, что происходит в компании
                            </h3>
                        </div>
                        <div className={styles.productionHeaderLink}>
                            <Button text={"Все новости"} href="/news" />
                        </div>
                    </div>
                    <div className={styles.newsCardsContainer}>
                        {isNewsMobile ? ( // Используем isNewsMobile вместо isMobile
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
                                    <Link href={"/news"} className={styles.newsCard}>
                                        <Image
                                            src="/news1.png"
                                            alt="Пирожные"
                                            width={200}
                                            height={200}
                                            className={styles.newsImage}
                                        />
                                        <h4 className={styles.newsCardTitle}>Наши сэндвичи теперь в «Самокате» — свежий продукт с доставкой за 15 минут!</h4>
                                        <p className={styles.newsCardDescription}>
                                            22 апреля 2025 • Партнёрство
                                        </p>
                                    </Link>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Link href={"/news"} className={styles.newsCard}>
                                        <Image
                                            src="/news2.png"
                                            alt="Пирожные"
                                            width={200}
                                            height={200}
                                            className={styles.newsImage}
                                        />
                                        <h4 className={styles.newsCardTitle}>Инновационная упаковка — теперь наша продукция остаётся свежей ещё дольше</h4>
                                        <p className={styles.newsCardDescription}>
                                            21 апреля 2025 • Продукция
                                        </p>
                                    </Link>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Link href={"/news"} className={styles.newsCard}>
                                        <Image
                                            src="/news3.png"
                                            alt="Пирожные"
                                            width={200}
                                            height={200}
                                            className={styles.newsImage}
                                        />
                                        <h4 className={styles.newsCardTitle}>СТМ растёт: мы начали выпуск блинов для сети «Пятёрочка»</h4>
                                        <p className={styles.newsCardDescription}>
                                            18 апреля 2025 • Партнёрство
                                        </p>
                                    </Link>
                                </SwiperSlide>
                            </Swiper>
                        ) : (
                            <>
                                <Link href={"/news"} className={styles.newsCard}>
                                    <Image
                                        src="/news1.png"
                                        alt="Пирожные"
                                        width={200}
                                        height={200}
                                        className={styles.newsImage}
                                    />
                                    <h4 className={styles.newsCardTitle}>Наши сэндвичи теперь в «Самокате» — свежий продукт с доставкой за 15 минут!</h4>
                                    <p className={styles.newsCardDescription}>
                                        22 апреля 2025 • Партнёрство
                                    </p>
                                </Link>
                                <Link href={"/news"} className={styles.newsCard}>
                                    <Image
                                        src="/news2.png"
                                        alt="Пирожные"
                                        width={200}
                                        height={200}
                                        className={styles.newsImage}
                                    />
                                    <h4 className={styles.newsCardTitle}>Инновационная упаковка — теперь наша продукция остаётся свежей ещё дольше</h4>
                                    <p className={styles.newsCardDescription}>
                                        21 апреля 2025 • Продукция
                                    </p>
                                </Link>
                                <Link href={"/news"} className={styles.newsCard}>
                                    <Image
                                        src="/news3.png"
                                        alt="Пирожные"
                                        width={200}
                                        height={200}
                                        className={styles.newsImage}
                                    />
                                    <h4 className={styles.newsCardTitle}>СТМ растёт: мы начали выпуск блинов для сети «Пятёрочка»</h4>
                                    <p className={styles.newsCardDescription}>
                                        18 апреля 2025 • Партнёрство
                                    </p>
                                </Link>
                            </>
                        )}
                    </div>
                    <div className={styles.productionHeaderLink2}>
                        <Button text={"Узнать больше"} href="/achievements" />
                    </div>
                </div>
            </motion.section>

            <motion.section
                id="preFooter"
                className={styles.preFooter}
                initial={{ y: 90, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.6, 0.01, 0.05, 0.95], delay: 0.3 }}
            >
                <div className={`${styles.container} container`}>
                    <div className={styles.preFooterWrapper}>
                        <Image
                            src="/prefooter.png"
                            alt="Еда"
                            width={586}
                            height={400}
                            className={styles.preFooterPhoto}
                        />
                        <motion.div
                            className={`${styles.preFooterCard} ${styles.preFooterPartnerCard}`}
                            onMouseEnter={() => setIsPreFooterHovered(true)}
                            onMouseLeave={() => setIsPreFooterHovered(false)}
                            initial="initial"
                            animate={isPreFooterHovered ? "hover" : "initial"}
                            variants={preFooterCardBackgroundVariants}
                            style={{
                                '--ripple-origin-x': rippleOrigin.x,
                                '--ripple-origin-y': rippleOrigin.y,
                            }}
                        >
                            <motion.span
                                className={styles.preFooterTopText}
                                variants={preFooterPartnerTextVariants}
                            >
                                смотреть далее
                            </motion.span>
                            <Link href="/" className={`${styles.partnerLink} ${styles.preFooterLink}`}>
                                <motion.span
                                    className={`${styles.partnerText} ${styles.preFooterTitle}`}
                                    variants={preFooterPartnerTextVariants}
                                >
                                    О компании
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
                                        variants={preFooterArrowVariants}
                                    >
                                        <motion.path d="M12 28.6667L28.6667 12" />
                                        <motion.path d="M12 12H28.6667V28.6667" />
                                    </motion.svg>
                                </motion.div>
                            </Link>
                            {isPreFooterHovered && (
                                <>
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <motion.div
                                            key={`prefooter-ripple-${i}`}
                                            className={styles.ripple}
                                            custom={i}
                                            initial="initial"
                                            animate={isPreFooterHovered ? "hover" : "initial"}
                                            variants={rippleVariants2}
                                            style={{
                                                right: `${isMobile ? '20px' : '30px'}`,
                                                bottom: `${isMobile ? '20px' : '30px'}`,
                                                transform: 'translate(50%, 50%)',
                                                backgroundColor: clientRippleColors[i]
                                            }}
                                        />
                                    ))}
                                </>
                            )}
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        </>
    );
}