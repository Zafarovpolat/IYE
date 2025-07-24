'use client';

import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import styles from '../styles/About.module.css';
import Button from '../components/Button/Button';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function About() {
    const [isClient, setIsClient] = useState(false);
    const [isClientHovered, setIsClientHovered] = useState(false);
    const [isPreFooterHovered, setIsPreFooterHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isDoubleCards, setIsDoubleCards] = useState(false)
    const [isTripleCards, setIsTripleCards] = useState(false)
    const controls = useAnimation();
    const [animationStep, setAnimationStep] = useState(0); // Track animation progress
    const [isAnimationComplete, setIsAnimationComplete] = useState(false); // Track if animation is done
    const [isAnimating, setIsAnimating] = useState(false); // Track if an animation is in progress
    const sectionControls = useAnimation();
    const sectionRef = useRef(null);
    const listItemRefs = useRef([]);
    const [isSectionVisible, setIsSectionVisible] = useState(false); // New state to track visibility

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isAnimationComplete && !isMobile) {
                    setIsSectionVisible(true); // Set section as visible
                    document.body.style.overflow = 'hidden'; // Lock scroll
                    observer.disconnect(); // Disconnect observer after first trigger
                } else {
                    setIsSectionVisible(false); // Set section as not visible
                    document.body.style.overflow = 'auto'; // Unlock scroll
                }
            },
            {
                root: null,
                threshold: 0.4, // Trigger when 30% of section is visible
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, [isAnimationComplete, isMobile]);

    useEffect(() => {
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
        if (!isSectionVisible || isAnimationComplete || isMobile || isAnimating) return;
        e.preventDefault();

        if (animationStep < 4) { // 5 cards, so 4 steps
            setIsAnimating(true);
            const nextStep = animationStep + 1;

            // Get elements for animation
            const currentItem = listItemRefs.current[animationStep];
            const nextItem = listItemRefs.current[animationStep + 1];

            if (currentItem && nextItem) {
                const currentRect = currentItem.getBoundingClientRect();
                const cardHeight = currentRect.height;
                const gap = 40; // Adjust to match your CSS gap
                const fixedDistance = cardHeight + gap; // Consistent distance for card movement

                // Calculate new section height, accounting for gap
                const currentSectionHeight = sectionRef.current.offsetHeight;
                const heightReduction = cardHeight + (animationStep === 0 ? gap : 40); // Include gap only for first step if needed
                const newSectionHeight = currentSectionHeight - heightReduction;

                const cardAnimation = controls.start((i) => {
                    // Все карты после текущего шага сдвигаются на ОДНУ позицию вверх
                    if (i > animationStep) {
                        // Накапливаем смещение: на каждом шаге карта сдвигается еще на fixedDistance
                        const totalSteps = nextStep; // Общее количество шагов, которые прошла карта
                        return {
                            y: -fixedDistance * totalSteps, // Накопленное смещение
                            transition: {
                                duration: 2,
                                ease: [0.25, 0.1, 0.25, 1],
                                ...(i === animationStep + 1 && {
                                    onComplete: () => {
                                        setAnimationStep(nextStep);
                                        setIsAnimating(false);
                                        if (nextStep === 4) {
                                            setIsAnimationComplete(true);
                                        }
                                    },
                                }),
                            },
                        };
                    }
                    return {};
                });

                // Animate section height
                const sectionAnimation = sectionControls.start({
                    height: newSectionHeight,
                    transition: {
                        duration: 2,
                        ease: [0.25, 0.1, 0.25, 1],
                    },
                });

                // Wait for both animations to complete
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
    }, [isSectionVisible, isAnimationComplete, isMobile, isAnimating, animationStep]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsMobile(width <= 767);
            setIsTripleCards(width <= 1439 && width > 999);
            setIsDoubleCards(width <= 999);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const cards = [
        { src: '/about1.png', alt: 'О компании 1' },
        { src: '/about2.png', alt: 'О компании 2' },
        { src: '/about3.png', alt: 'О компании 3' },
        { src: '/about4.png', alt: 'О компании 4' },
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
        initial: { color: '#fff' },
        hover: { color: '#fff', transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }
    };

    const preFooterArrowVariants = {
        initial: { stroke: '#fff', rotate: 0 },
        hover: { stroke: '#fff', rotate: 45, transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] } }
    };

    const SCALE_REDUCTION = 1.5;
    const rippleVariants = {
        initial: { scale: 0, transition: { duration: 0 } },
        hover: (i) => {
            const baseScale = 5;
            const maxScale = baseScale - (i * SCALE_REDUCTION);
            return {
                scale: [1, 4, maxScale],
                transition: { duration: 0.3, ease: "easeInOut" }
            };
        }
    };
    const rippleVariants2 = {
        initial: { scale: 0, transition: { duration: 0 } },
        hover: (i) => {
            const baseScale = 5;
            const maxScale = (baseScale - (i * SCALE_REDUCTION)) * 2;
            return {
                scale: [2, 8, maxScale],
                transition: { duration: 0.3, ease: "easeInOut" }
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
            <section id='aboutHeader' className={styles.aboutHeader}>
                <div className={`${styles.container} container`}>
                    <h1 className={styles.aboutHeaderTitle}>О компании</h1>
                    {isClient && (isTripleCards || isDoubleCards) ? (
                        <Swiper
                            className={styles.swiperContainer}
                            spaceBetween={20}
                            slidesPerView={isTripleCards ? 3 : 2}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                    spaceBetween: 10,
                                },
                                768: {
                                    slidesPerView: isDoubleCards ? 2 : 3,
                                    spaceBetween: 20,
                                },
                            }}
                        >
                            {cards.map((card, index) => (
                                <SwiperSlide key={index}>
                                    <div className={styles.aboutHeaderCardItem}>
                                        <Image
                                            src={card.src}
                                            alt={card.alt}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        <ul className={styles.aboutHeaderCards}>
                            {cards.map((card, index) => (
                                <li key={index} className={styles.aboutHeaderCardItem}>
                                    <Image
                                        src={card.src}
                                        alt={card.alt}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className={styles.aboutHeaderText}>
                        <div className={styles.aboutHeaderBottomText}>
                            <h5 className={styles.aboutHeaderTextTitle}>компания</h5>
                            <div className={styles.aboutHeaderBottomBlock}>
                                <h3 className={styles.aboutHeaderTextInfo}>
                                    Идеология Еды — проверенный и надёжный производитель готовой продукции в Москве
                                </h3>
                                <p className={styles.aboutHeaderTextDescription}>
                                    <span>
                                        Наша компания специализируется на изготовлении кулинарных, кондитерских и хлебобулочных изделий. Мы поставляем продукцию в магазины, сервисы по доставке еды, отели, рестораны, столовые, различные учреждения.
                                    </span>
                                    <span>
                                        Нам доверяют многие крупные и небольшие компании, которые ценят нас за высокое качество, стабильность поставок и индивидуальный подход.
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="numbers" className={styles.numbersBlock}>
                <div className={`${styles.container} container`}>
                    <div className={styles.numbersHeaderBlock}>
                        <div className={styles.numbersHeaderBottomBlock}>
                            <h5 className={styles.numbersHeaderTitle}>цифры</h5>
                            <h3 className={styles.numbersHeaderInfo}>
                                Наши достижения в цифрах
                            </h3>
                        </div>
                    </div>
                    <div className={styles.cardsContainerBlock}>
                        <div className={styles.cardBlock}>
                            <div className={styles.cardNumberWrapperBlock}>
                                <span className={styles.cardNumberText}>100 000</span>
                                <span className={styles.cardUnitText}>ед.</span>
                            </div>
                            <p className={styles.cardDescriptionText}>
                                продукции в день
                            </p>
                            <img
                                src="/soleniye.png"
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
                                <span className={styles.cardNumberText}>10 000</span>
                                <span className={styles.cardUnitText}>кв.м</span>
                            </div>
                            <p className={styles.cardDescriptionText}>
                                производственной мощности
                            </p>
                        </div>
                        <div className={styles.cardBlock}>
                            <img
                                src="/about-card-gb.png"
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
                                <span className={styles.cardNumberText}>300</span>
                                <span className={styles.cardUnitText}>сотрудников</span>
                            </div>
                            <p className={styles.cardDescriptionText}>
                                в команде
                            </p>
                        </div>
                        <div className={styles.cardBlock}>
                            <div className={styles.cardNumberWrapperBlock}>
                                <span className={styles.cardNumberText}>{`>5`}</span>
                                <span className={styles.cardUnitText}>лет</span>
                            </div>
                            <p className={styles.cardDescriptionText}>
                                на рынке
                            </p>
                        </div>
                    </div>
                    <div className={styles.numbersHeaderLink2}>
                        <Button href="/about" />
                    </div>
                </div>
            </section>

            <section id='history' className={styles.history}>
                <div className={`${styles.container} container`}>
                    <div className={styles.historyContent}>
                        <h5 className={styles.historyTitle}>История</h5>
                        <div className={styles.historyLeft}>
                            <div className={styles.historyText}>
                                <h3 className={styles.historyHeader}>Наша история началась с небольшой пекарни, производящей выпечку</h3>
                                <p className={styles.historyDescription}>
                                    Со временем мы расширили ассортимент, добавив сэндвичи, пироги, блины, десерты и многое другое. Постоянное внимание к качеству и потребностям клиентов помогло нам вырасти в крупного производителя. Мы работаем только с проверенными поставщиками, совершенствуем рецептуру и следим за трендами рынка
                                </p>
                            </div>
                            <Swiper
                                spaceBetween={20}
                                slidesPerView={'auto'}
                                className={styles.historySwiper}
                                breakpoints={{
                                    360: { spaceBetween: 10 },
                                    768: { spaceBetween: 20 },
                                }}
                            >
                                <SwiperSlide className={styles.historyCardSwiper}>
                                    <div className={styles.historyCard}>
                                        <Image src="/history1.png" alt="История 1" width={300} height={200} className={styles.historyCardImage} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className={styles.historyCardSwiper}>
                                    <div className={styles.historyCard}>
                                        <Image src="/history2.png" alt="История 2" width={300} height={200} className={styles.historyCardImage} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className={styles.historyCardSwiper}>
                                    <div className={styles.historyCard}>
                                        <Image src="/history3.png" alt="История 3" width={300} height={200} className={styles.historyCardImage} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className={styles.historyCardSwiper}>
                                    <div className={styles.historyCard}>
                                        <Image src="/history4.png" alt="История 4" width={300} height={200} className={styles.historyCardImage} />
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>

            <section id='faces' className={styles.faces}>
                <div className={`${styles.container} container`}>
                    <h2 className={styles.facesHeading}>Основные лица компании</h2>
                    {isMobile ? (
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={'auto'}
                            className={styles.facesList}
                        >
                            <SwiperSlide className={styles.facesListItemSlide}>
                                <li className={styles.facesListItem}>
                                    <div className={styles.facesListItemUp}>
                                        <Image className={styles.facesListItemImg} src={'/face1.png'} width={435} height={580} alt="Светлана Шмыгля" />
                                    </div>
                                    <div className={styles.facesListItemDown}>
                                        <h4 className={styles.facesListItemTitle}>Светлана Шмыгля</h4>
                                        <p className={styles.facesListItemInfo}>Директор производства</p>
                                    </div>
                                </li>
                            </SwiperSlide>
                            <SwiperSlide className={styles.facesListItemSlide}>
                                <li className={styles.facesListItem}>
                                    <div className={styles.facesListItemUp}>
                                        <Image className={styles.facesListItemImg} src={'/face2.png'} width={435} height={580} alt="Андрей Мандрейчук" />
                                    </div>
                                    <div className={styles.facesListItemDown}>
                                        <h4 className={styles.facesListItemTitle}>Андрей Мандрейчук</h4>
                                        <p className={styles.facesListItemInfo}>Директор отдела качества и пищевой безопасности</p>
                                    </div>
                                </li>
                            </SwiperSlide>
                            <SwiperSlide className={styles.facesListItemSlide}>
                                <li className={styles.facesListItem}>
                                    <div className={styles.facesListItemUp}>
                                        <Image className={styles.facesListItemImg} src={'/face1.png'} width={435} height={580} alt="Анжела Звягина" />
                                    </div>
                                    <div className={styles.facesListItemDown}>
                                        <h4 className={styles.facesListItemTitle}>Анжела Звягина</h4>
                                        <p className={styles.facesListItemInfo}>HR-директор</p>
                                    </div>
                                </li>
                            </SwiperSlide>
                            <SwiperSlide className={styles.facesListItemSlide}>
                                <li className={styles.facesListItem}>
                                    <div className={styles.facesListItemUp}>
                                        <Image className={styles.facesListItemImg} src={'/face2.png'} width={435} height={580} alt="Олег Стойко" />
                                    </div>
                                    <div className={styles.facesListItemDown}>
                                        <h4 className={styles.facesListItemTitle}>Олег Стойко</h4>
                                        <p className={styles.facesListItemInfo}>Директор технического отдела</p>
                                    </div>
                                </li>
                            </SwiperSlide>
                        </Swiper>
                    ) : (
                        <ul className={styles.facesList}>
                            <li className={styles.facesListItem}>
                                <div className={styles.facesListItemUp}>
                                    <Image className={styles.facesListItemImg} src={'/face1.png'} width={435} height={580}></Image>
                                </div>
                                <div className={styles.facesListItemDown}>
                                    <h4 className={styles.facesListItemTitle}>Светлана Шмыгля</h4>
                                    <p className={styles.facesListItemInfo}>Директор производства</p>
                                </div>
                            </li>
                            <li className={styles.facesListItem}>
                                <div className={styles.facesListItemUp}>
                                    <Image className={styles.facesListItemImg} src={'/face2.png'} width={435} height={580}></Image>
                                </div>
                                <div className={styles.facesListItemDown}>
                                    <h4 className={styles.facesListItemTitle}>Андрей Мандрейчук </h4>
                                    <p className={styles.facesListItemInfo}>Директор отдела качества и пищевой безопасности</p>
                                </div>
                            </li>
                            <li className={styles.facesListItem}>
                                <div className={styles.facesListItemUp}>
                                    <Image className={styles.facesListItemImg} src={'/face1.png'} width={435} height={580}></Image>
                                </div>
                                <div className={styles.facesListItemDown}>
                                    <h4 className={styles.facesListItemTitle}>Анжела Звягина</h4>
                                    <p className={styles.facesListItemInfo}>HR-директор</p>
                                </div>
                            </li>
                            <li className={styles.facesListItem}>
                                <div className={styles.facesListItemUp}>
                                    <Image className={styles.facesListItemImg} src={'/face2.png'} width={435} height={580}></Image>
                                </div>
                                <div className={styles.facesListItemDown}>
                                    <h4 className={styles.facesListItemTitle}>Олег Стойко</h4>
                                    <p className={styles.facesListItemInfo}>Директор технического отдела</p>
                                </div>
                            </li>
                        </ul>
                    )}
                </div>
            </section>

            <section id="achievements" className={styles.achievements}>
                <div className={`${styles.container} container`}>
                    <h3 className={styles.achievementsTitle}>Мы гордимся тем, что</h3>
                    <ul className={styles.achievementsCards}>
                        <li className={styles.achievementsCard}>
                            <div className={styles.achievementsCardUp}>
                                <h4 className={styles.achievementsCardText}>Используем только свежие и качественные ингредиенты</h4>
                                <p className={styles.achievementsCardDescription}>Мы тщательно отбираем поставщиков, чтобы в нашу продукцию попадали только проверенные и безопасные ингредиенты</p>
                            </div>
                            <div className={styles.achievementsTags}>
                                <span className={styles.achievementsTag}>сертифицированные поставщики</span>
                                <span className={styles.achievementsTag}>лабораторные тесты</span>
                                <span className={styles.achievementsTag}>работа напрямую с производителями</span>
                            </div>
                        </li>
                        <li className={styles.achievementsCard}>
                            <div className={styles.achievementsCardUp}>
                                <h4 className={styles.achievementsCardText}>Внедрили строгий контроль качества на каждом этапе производства</h4>
                                <p className={styles.achievementsCardDescription}>Чтобы гарантировать безопасность и высокое качество готовой продукции, мы используем многоуровневую систему контроля с применением цифровых технологий и машинного зрения</p>
                            </div>
                            <div className={styles.achievementsTags}>
                                <span className={styles.achievementsTag}>металлодетекторы</span>
                                <span className={styles.achievementsTag}>машинное зрение</span>
                                <span className={styles.achievementsTag}>цифровая система контроля</span>
                                <span className={styles.achievementsTag}>внутренние аудиты</span>
                                <span className={styles.achievementsTag}>НАССР</span>
                                <span className={styles.achievementsTag}>температурный контроль</span>
                                <span className={styles.achievementsTag}>контроль гигиены персонала</span>
                            </div>
                        </li>
                        <li className={styles.achievementsCard}>
                            <div className={styles.achievementsCardUp}>
                                <h4 className={styles.achievementsCardText}>Постоянно обновляем оборудование для повышения эффективности производства</h4>
                                <p className={styles.achievementsCardDescription}>Современные технологии позволяют нам ускорять процессы, минимизировать потери и улучшать качество готовой еды</p>
                            </div>
                            <div className={styles.achievementsTags}>
                                <span className={styles.achievementsTag}>автоматизированные линии</span>
                                <span className={styles.achievementsTag}>системы мониторинга</span>
                                <span className={styles.achievementsTag}>высокоточные термощупы</span>
                                <span className={styles.achievementsTag}>оборудование для упаковки в газовой среде (MAP)</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            <section id="aboutQuality" className={styles.aboutQuality}>
                <div className={`${styles.container} container`}>
                    <motion.div className={styles.aboutQualityContent} ref={sectionRef} animate={sectionControls} initial={{ height: 'auto' }}>
                        <h5 className={styles.aboutQualityTitle}>качество</h5>
                        <div className={styles.aboutQualityLeft}>
                            <h3 className={styles.aboutQualitySubtitle}>На нашем производстве действует система контроля качества, соответствующая международным стандартам</h3>
                            <ul className={styles.aboutQualityList}>
                                {[
                                    {
                                        image: "/about-quality1.png",
                                        alt: "Сертификация по ISO 9001",
                                        number: "1",
                                        title: "НАССР",
                                        description: "Система управления безопасностью пищевой продукции, охватывающая каждый этап производства — от проверки сырья до упаковки готовой продукции. Предотвращает риски и гарантирует соответствие строгим нормам"
                                    },
                                    {
                                        image: "/about-quality2.png",
                                        alt: "Сертификация по ISO 9001",
                                        number: "2",
                                        title: "Лабораторный контроль",
                                        description: "Каждая партия сырья и готовой продукции проходит тестирование на соответствие требованиям безопасности и качества, включая состав, чистоту, вкус и свежесть"
                                    },
                                    {
                                        image: "/about-quality3.png",
                                        alt: "Сертификация по ISO 9001",
                                        number: "3",
                                        title: "Гигиенические нормы",
                                        description: "Соблюдаем строгие санитарные требования: регулярная дезинфекция оборудования, контроль личной гигиены сотрудников, аудит чистоты на производстве"
                                    },
                                    {
                                        image: "/about-quality4.png",
                                        alt: "Сертификация по ISO 9001",
                                        number: "4",
                                        title: "Температурный контроль",
                                        description: "Поддерживаем оптимальные условия хранения на всех этапах: от поступления сырья до доставки продукции клиентам. Используем систему мониторинга температуры в реальном времени"
                                    },
                                    {
                                        image: "/about-quality5.png",
                                        alt: "Сертификация по ISO 9001",
                                        number: "5",
                                        title: "Система машинного зрения",
                                        description: "Используем уникальную систему удалённого мониторинга температурных зон и машинного зрения для отслеживания процессов, выявления отклонений и поддержания стабильного качества продукции"
                                    }
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        className={styles.aboutQualityListItem}
                                        ref={el => listItemRefs.current[index] = el}
                                        custom={index}
                                        animate={controls}
                                        initial={{ y: 0 }}
                                    >
                                        <Image src={item.image} alt={item.alt} width={400} height={320} />
                                        <div className={styles.aboutQualityListItemContent}>
                                            <div className={styles.aboutQualityListItemUp}>
                                                <h4 className={styles.aboutQualityListItemNumber}>{item.number}</h4>
                                                <h4 className={styles.aboutQualityListItemTitle}>{item.title}</h4>
                                            </div>
                                            <p className={styles.aboutQualityListItemDescription}>{item.description}</p>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section id='logistics' className={styles.logistics}>
                <div className={`${styles.container} container`}>
                    <div className={styles.logisticsContent}>
                        <h5 className={styles.logisticsTitle}>логистика</h5>
                        <div className={styles.logisticsLeft}>
                            <div className={styles.logisticsText}>
                                <h3 className={styles.logisticsHeader}>Собственный автопарк и развитая логистика позволяют нам оперативно доставлять продукцию по всей Москве и Московской области</h3>
                                <p className={styles.logisticsDescription}>
                                    Мы гибко подстраиваемся под потребности клиентов, обеспечивая удобные графики поставок и строгое соблюдение температурных режимов при транспортировке
                                </p>
                            </div>
                            <div className={styles.logisticsImgBox}>
                                <Image className={styles.logisticsImg} src="/van2.png" alt="Логистика" width={615} height={320} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="quality" className={styles.quality}>
                <div className={`${styles.container} container`}>
                    <div className={styles.qualityHeaderBlock}>
                        <div className={styles.qualityHeaderBottomBlock}>
                            <h5 className={styles.qualityHeaderTitle}>партнёрство с нами</h5>
                            <div className={styles.qualityRight}>

                                <h3 className={styles.qualityHeaderInfo}>Мы понимаем потребности наших клиентов и предлагаем</h3>

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
                                                    От свежей выпечки до кулинарных изделий и десертов
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
                                                    Индивидуальные решения для бизнеса
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
                                                    Контроль на каждом этапе производства
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
                                                    Собственный автопарк и строгий контроль логистики
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

            <section id="clients" className={styles.clientsBlock}>
                <div className={`${styles.container} container`}>
                    <div className={styles.clientsHeaderBlock}>
                        <div className={styles.clientsHeaderBottomBlock}>
                            <h5 className={styles.clientsHeaderTitle}>клиенты</h5>
                            <div className={styles.clientsLeft}>
                                <h3 className={styles.clientsHeaderInfo}>
                                    Мы заслужили доверие
                                </h3>
                                <div className={styles.clientsCardsContainer}>
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
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.numbersHeaderLink2} ${styles.clientsLink}`}>
                        <Button href="/about" />
                    </div>
                </div>
            </section>

            <section id='preFooter' className={styles.preFooter}>
                <div className={`${styles.container} container`}>
                    <div className={styles.preFooterWrapper}>
                        <Image src='/about-prefooter.png' alt='Производство' width={586} height={400} className={styles.preFooterPhoto} />
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
                                    Производство
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
        </>
    );
}