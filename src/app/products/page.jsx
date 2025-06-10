'use client';

import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import styles from '../styles/Products.module.css';
import Button from '../components/Button/Button';
import Link from 'next/link';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
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
    const [isOverflowAuto, setIsOverflowAuto] = useState(false); // Новое состояние для overflow
    const targetOffsetRef = useRef(0);
    const [negativeMarginBottom, setNegativeMarginBottom] = useState(0);

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

            <section id='productsHeader' className={styles.productsHeader}>
                <div className={`${styles.container} container`}>
                    <h1 className={styles.productsHeaderHeading}>Продукция</h1>
                    <div className={styles.productsHeaderContent}>
                        <h5 className={styles.productsHeaderTitle}>преимущества</h5>
                        <div className={styles.productsHeaderLeft}>
                            <h3 className={styles.productsHeaderSubtitle}>Почему выбирают нас?</h3>
                            <ul className={styles.productsHeaderList}>
                                <li className={styles.productsHeaderListItem}>
                                    <Image src="/productsHeader3.png" alt="Сертификация по ISO 9001" width={400} height={320} />
                                    <div className={styles.productsHeaderListItemContent}>
                                        <div className={styles.productsHeaderListItemUp}>
                                            <h4 className={styles.productsHeaderListItemTitle}>Свежесть и натуральность</h4>
                                        </div>
                                        <p className={styles.productsHeaderListItemDescription}>Мы производим вкусную и свежую готовую еду. Вся продукция изготавливается ежедневно на нашем современном производстве и доставляется в крупнейшие торговые сети Москвы, включая «Пятёрочку», «Перекрёсток», «Самокат» и «ВкусВилл»</p>
                                    </div>
                                </li>
                                <li className={styles.productsHeaderListItem}>
                                    <Image src="/productsHeader2.png" alt="Сертификация по ISO 9001" width={400} height={320} />
                                    <div className={styles.productsHeaderListItemContent}>
                                        <div className={styles.productsHeaderListItemUp}>
                                            <h4 className={styles.productsHeaderListItemTitle}>Контроль качества на всех этапах</h4>
                                        </div>
                                        <p className={styles.productsHeaderListItemDescription}>Мы придерживаемся строгих стандартов качества, включая HACCP и ГОСТ, а также проводим регулярный лабораторный контроль сырья и готовой продукции. Каждая партия проходит аудит, что гарантирует безопасность и высокое качество нашей еды</p>
                                    </div>
                                </li>
                                <li className={styles.productsHeaderListItem}>
                                    <Image src="/productsHeader1.png" alt="Сертификация по ISO 9001" width={400} height={320} />
                                    <div className={styles.productsHeaderListItemContent}>
                                        <div className={styles.productsHeaderListItemUp}>
                                            <h4 className={styles.productsHeaderListItemTitle}>Развитие собственного бренда и производство под СТМ</h4>
                                        </div>
                                        <p className={styles.productsHeaderListItemDescription}>Мы работаем как под собственным брендом, так и создаём продукцию для частных торговых марок (СТМ). Это позволяет нашим партнёрам предлагать покупателям уникальные товары с гарантированным качеством</p>
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
                            <h5 className={styles.productsHeaderTitle}>Продукция</h5>
                            <h3 className={styles.productsHeaderInfo}>Производим продукцию под СТМ и развиваем наш бренд</h3>
                        </div>
                    </div>
                    <div className={styles.productsCardsContainer}>
                        <div className={styles.productsCard}>
                            <div className={styles.productsCardUp}>
                                <p className={styles.productsTitle}>Сэндвичи</p>
                                <p className={styles.productsPrice}>{'> 50 видов'}</p>
                            </div>
                            <Image src='/sandwich.png' alt='Сэндвич' width={200} height={200} className={styles.productsImage} />
                        </div>
                        <div className={styles.productsCard}>
                            <div className={styles.productsCardUp}>
                                <p className={styles.productsTitle}>Блины</p>
                                <p className={styles.productsPrice}>{'> 50 видов'}</p>
                            </div>
                            <Image src='/blini.png' alt='Блины' width={200} height={200} className={styles.productsImage} />
                        </div>
                        <div className={styles.productsCard}>
                            <div className={styles.productsCardUp}>
                                <p className={styles.productsTitle}>Пироги</p>
                                <p className={styles.productsPrice}>{'> 50 видов'}</p>
                            </div>
                            <Image src='/pirogi.png' alt='Пироги' width={200} height={200} className={styles.productsImage} />
                        </div>
                        <div className={styles.productsCard}>
                            <div className={styles.productsCardUp}>
                                <p className={styles.productsTitle}>Слоёные изделия</p>
                                <p className={styles.productsPrice}>{'> 50 видов'}</p>
                            </div>
                            <Image src='/soleniye.png' alt='Слоёные изделия' width={200} height={200} className={styles.productsImage} />
                        </div>
                        <div className={styles.productsCard}>
                            <div className={styles.productsCardUp}>
                                <p className={styles.productsTitle}>Изделия из песочного теста</p>
                                <p className={styles.productsPrice}>{'> 50 видов'}</p>
                            </div>
                            <Image src='/pesochnoye.png' alt='Песочные изделия' width={200} height={200} className={styles.productsImage} />
                        </div>
                        <div className={styles.productsCard}>
                            <div className={styles.productsCardUp}>
                                <p className={styles.productsTitle}>Торты</p>
                                <p className={styles.productsPrice}>{'> 50 видов'}</p>
                            </div>
                            <Image src='/torti.png' alt='Торты' width={200} height={200} className={styles.productsImage} />
                        </div>
                        <div className={styles.productsCard}>
                            <div className={styles.productsCardUp}>
                                <p className={styles.productsTitle}>Пирожные</p>
                                <p className={styles.productsPrice}>{'> 50 видов'}</p>
                            </div>
                            <Image src='/pirozhnoye.png' alt='Пирожные' width={200} height={200} className={styles.productsImage} />
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
                                <button className={styles.productsBannerBtn}>Отправить заявку</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.container} ${styles.container2} container`}>
                    <div className={styles.productsCardsContainerMobile}>
                        <div className={`${styles.productsCardMobile} ${styles.productsCardMobileInner}`}>
                            <Swiper
                                spaceBetween={10}
                                slidesPerView={1}
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
                                        <Image src='/sandwich.png' alt='Сэндвич' width={200} height={200} className={styles.productsImage} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.productsCard}>
                                        <div className={styles.productsCardUp}>
                                            <p className={styles.productsTitle}>Блины</p>
                                            <p className={styles.productsPrice}>{'> 50 видов'}</p>
                                        </div>
                                        <Image src='/blini.png' alt='Блины' width={200} height={200} className={styles.productsImage} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.productsCard}>
                                        <div className={styles.productsCardUp}>
                                            <p className={styles.productsTitle}>Пироги</p>
                                            <p className={styles.productsPrice}>{'> 50 видов'}</p>
                                        </div>
                                        <Image src='/pirogi.png' alt='Пироги' width={200} height={200} className={styles.productsImage} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.productsCard}>
                                        <div className={styles.productsCardUp}>
                                            <p className={styles.productsTitle}>Слоёные изделия</p>
                                            <p className={styles.productsPrice}>{'> 50 видов'}</p>
                                        </div>
                                        <Image src='/soleniye.png' alt='Слоёные изделия' width={200} height={200} className={styles.productsImage} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.productsCard}>
                                        <div className={styles.productsCardUp}>
                                            <p className={styles.productsTitle}>Изделия из песочного теста</p>
                                            <p className={styles.productsPrice}>{'> 50 видов'}</p>
                                        </div>
                                        <Image src='/pesochnoye.png' alt='Песочные изделия' width={200} height={200} className={styles.productsImage} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.productsCard}>
                                        <div className={styles.productsCardUp}>
                                            <p className={styles.productsTitle}>Торты</p>
                                            <p className={styles.productsPrice}>{'> 50 видов'}</p>
                                        </div>
                                        <Image src='/torti.png' alt='Торты' width={200} height={200} className={styles.productsImage} />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className={styles.productsCard}>
                                        <div className={styles.productsCardUp}>
                                            <p className={styles.productsTitle}>Пирожные</p>
                                            <p className={styles.productsPrice}>{'> 50 видов'}</p>
                                        </div>
                                        <Image src='/pirozhnoye.png' alt='Пирожные' width={200} height={200} className={styles.productsImage} />
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
                                <button className={styles.productsBannerBtn}>Отправить заявку</button>
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

                        <div className={styles.partnersFormRight}>
                            <div className={styles.partnersFormRightUp}>
                                <input type="text" placeholder='Имя и Фамилия' className={styles.partnersInput} />
                                <input type="text" placeholder='Компания' className={styles.partnersInput} />
                                <input type="tel" placeholder='Номер телефона' className={styles.partnersInput} />
                                <input type="email" placeholder='Электронная почта' className={styles.partnersInput} />
                            </div>
                            <div className={styles.partnersFormRightBottom}>
                                <button className={styles.partnersFormSubmit}>Отправить заявку</button>
                                <p className={styles.partnersPolicy}>Нажимая на кнопку, вы соглашаетесь с <Link href={'/'}>
                                    политикой конфиденциальности</Link></p>
                            </div>
                        </div>
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
                            <Link href='/' className={`${styles.partnerLink} ${styles.preFooterLink}`}>
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