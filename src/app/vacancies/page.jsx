'use client';

import Image from 'next/image';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import styles from '../styles/Vacancies.module.css';
import Button from '../components/Button/Button';
import Link from 'next/link';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Vacancies() {
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
    const mapRef = useRef(null);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // New state for success modal

    const vacanciesData = [
        { id: '1', title: 'Повар на производство', category: 'Производство', schedule: 'Полный день', location: 'Москва' },
        { id: '2', title: 'Фасовщик / Упаковщик', category: 'Производство', schedule: 'Сменный график', location: 'Москва' },
        { id: '3', title: 'Оператор производственной линии', category: 'Производство', schedule: 'Вахта', location: 'Москва' },
        { id: '4', title: 'Технолог пищевого производства', category: 'Производство', schedule: 'Полный день', location: 'Москва' },
        { id: '5', title: 'Водитель (кат. B, С)', category: 'Поставка', schedule: 'Полный день', location: 'Москва и МО' },
        { id: '6', title: 'Логист / Специалист по маршрутизации', category: 'Поставка', schedule: 'Гибкий график', location: 'Москва' },
        { id: '7', title: 'Кладовщик-комплектовщик', category: 'Склад / Поставка', schedule: 'Сменный график', location: 'Москва' },
        { id: '8', title: 'Менеджер по работе с торговыми сетями', category: 'Офис', schedule: 'Полный день', location: 'Москва' },
        { id: '9', title: 'Контент-менеджер', category: 'Офис', schedule: 'Частичная занятость', location: 'Москва / Удалённо' },
        { id: '10', title: 'HR-специалист', category: 'Офис', schedule: 'Полный день', location: 'Москва' },
    ];

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
                    const placemark = new window.ymaps.Placemark([55.798191, 37.938147]);
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

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission logic (e.g., API call)
        setIsSuccessModalOpen(true); // Open the success modal
    };

    const closeSuccessModal = () => {
        setIsSuccessModalOpen(false);
    };

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

            <section id="clientsHeader" className={styles.clientsHeader}>
                <div className={`${styles.container} container`}>
                    <h1 className={styles.clientsHeaderHeading}>Вакансии</h1>
                    <div className={styles.clientsHeaderText}>
                        <div className={styles.clientsHeaderBottomText}>
                            <h5 className={styles.clientsHeaderTextTitle}>работа с нами</h5>
                            <div className={styles.clientsHeaderBottomBlock}>
                                <h3 className={styles.clientsHeaderTextInfo}>
                                    Работать у нас — это быть частью команды, которая делает качественную и доступную готовую еду для сотни тысяч покупателей
                                </h3>
                                <p className={styles.clientsHeaderTextDescription}>
                                    Мы производим и доставляем сэндвичи, блины, пироги, десерты, торты и другую продукцию в крупнейшие сети: Пятёрочка, Перекрёсток, Самокат, ВкусВилл. У нас современное производство, строгий контроль качества и профессиональная команда. Развивайте карьеру вместе с нами!
                                </p>
                                <button className={styles.clientsHeaderButton} >
                                    Смотреть вакансии
                                </button>
                                <div className={styles.cardsContainerBlock}>
                                    <Swiper
                                        className={styles.cardsSwiper}
                                        slidesPerView={2}
                                        spaceBetween={20}
                                        breakpoints={{ 360: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, }}
                                    >
                                        <SwiperSlide className={styles.cardsSwiperSlide}><Image width={586} height={387} src={'/vacancies1.png'}></Image></SwiperSlide>
                                        <SwiperSlide className={styles.cardsSwiperSlide}><Image width={586} height={387} src={'/vacancies2.png'}></Image></SwiperSlide>
                                        <SwiperSlide className={styles.cardsSwiperSlide}><Image width={586} height={387} src={'/vacancies3.png'}></Image></SwiperSlide>
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="quality" className={styles.quality}>
                <div className={`${styles.container} container`}>
                    <div className={styles.qualityHeaderBlock}>
                        <div className={styles.qualityHeaderBottomBlock}>
                            <h5 className={styles.qualityHeaderTitle}>преимущества</h5>
                            <h3 className={styles.qualityHeaderInfo}>Почему стоит работать у нас?</h3>
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
                                        <p className={styles.qualityText}>Стабильность и уверенность</p>
                                        <Image
                                            src="/award.svg"
                                            alt="Тщательный отбор сырья"
                                            width={50}
                                            height={50}
                                            className={styles.qualityIcon}
                                        />
                                    </div>
                                    <p className={styles.qualityDescription}>
                                        Работаем с 2019 года, постоянно растём и увеличиваем объёмы производства. Официальное трудоустройство, оплачиваемые отпуска и больничные
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
                                        <p className={styles.qualityText}>Карьерный рост и развитие</p>
                                        <Image
                                            src="/leader.svg"
                                            alt="Строгий контроль поставщиков"
                                            width={50}
                                            height={50}
                                            className={styles.qualityIcon}
                                        />
                                    </div>
                                    <p className={styles.qualityDescription}>
                                        90% наших руководителей начинали с линейных позиций. Мы даём возможности расти и учиться
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
                                        <p className={styles.qualityText}>Современное производство</p>
                                        <Image
                                            src="/manufacture.svg"
                                            alt="Современное оборудование"
                                            width={50}
                                            height={50}
                                            className={styles.qualityIcon}
                                        />
                                    </div>
                                    <p className={styles.qualityDescription}>
                                        Модернизируем оборудование, создаём комфортные условия труда, следим за безопасностью рабочих мест
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
                                        <p className={styles.qualityText}>Дружная команда</p>
                                        <Image
                                            src="/leadership.svg"
                                            alt="Профессиональная команда"
                                            width={50}
                                            height={50}
                                            className={styles.qualityIcon}
                                        />
                                    </div>
                                    <p className={styles.qualityDescription}>
                                        Открытое руководство, корпоративные мероприятия, взаимопомощь и поддержка на всех уровнях
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
                                        <p className={styles.qualityText}>Гордость за продукт</p>
                                        <Image
                                            src="/organic-food.svg"
                                            alt="Уникальная система контроля качества на всех этапах производства"
                                            width={50}
                                            height={50}
                                            className={styles.qualityIcon}
                                        />
                                    </div>
                                    <p className={styles.qualityDescription}>
                                        Мы готовим еду, которую сами любим и которой доверяем. Постоянно улучшаем рецептуры и упаковку
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
                                        <p className={styles.qualityText}>Сильный бренд и перспективы</p>
                                        <Image src="/popularity.svg" alt="Собственный автопарк" width={50} height={50} className={styles.qualityIcon} />
                                    </div>
                                    <p className={styles.qualityDescription}>
                                        Нашу продукцию можно найти в крупнейших ритейл-сетях. Мы развиваем не только частные торговые марки, но и собственный бренд
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
                                            <p className={styles.qualityText}>Стабильность и уверенность</p>
                                            <Image
                                                src="/award.svg"
                                                alt="Тщательный отбор сырья"
                                                width={50}
                                                height={50}
                                                className={styles.qualityIcon}
                                            />
                                        </div>
                                        <p className={styles.qualityDescription}>
                                            Работаем с 2019 года, постоянно растём и увеличиваем объёмы производства. Официальное трудоустройство, оплачиваемые отпуска и больничные
                                        </p>
                                    </motion.div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <motion.div
                                        className={styles.qualityCard}

                                    >
                                        <div className={styles.qualityCardUp}>
                                            <p className={styles.qualityText}>Карьерный рост и развитие</p>
                                            <Image
                                                src="/leader.svg"
                                                alt="Строгий контроль поставщиков"
                                                width={50}
                                                height={50}
                                                className={styles.qualityIcon}
                                            />
                                        </div>
                                        <p className={styles.qualityDescription}>
                                            90% наших руководителей начинали с линейных позиций. Мы даём возможности расти и учиться
                                        </p>
                                    </motion.div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <motion.div
                                        className={styles.qualityCard}

                                    >
                                        <div className={styles.qualityCardUp}>
                                            <p className={styles.qualityText}>Современное производство</p>
                                            <Image
                                                src="/manufacture.svg"
                                                alt="Современное оборудование"
                                                width={50}
                                                height={50}
                                                className={styles.qualityIcon}
                                            />
                                        </div>
                                        <p className={styles.qualityDescription}>
                                            Модернизируем оборудование, создаём комфортные условия труда, следим за безопасностью рабочих мест
                                        </p>
                                    </motion.div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <motion.div
                                        className={styles.qualityCard}

                                    >
                                        <div className={styles.qualityCardUp}>
                                            <p className={styles.qualityText}>Дружная команда</p>
                                            <Image
                                                src="/leadership.svg"
                                                alt="Профессиональная команда"
                                                width={50}
                                                height={50}
                                                className={styles.qualityIcon}
                                            />
                                        </div>
                                        <p className={styles.qualityDescription}>
                                            Открытое руководство, корпоративные мероприятия, взаимопомощь и поддержка на всех уровнях
                                        </p>
                                    </motion.div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <motion.div
                                        className={styles.qualityCard}

                                    >
                                        <div className={styles.qualityCardUp}>
                                            <p className={styles.qualityText}>Гордость за продукт</p>
                                            <Image
                                                src="/organic-food.svg"
                                                alt="Уникальная система контроля качества на всех этапах производства"
                                                width={50}
                                                height={50}
                                                className={styles.qualityIcon}
                                            />
                                        </div>
                                        <p className={styles.qualityDescription}>
                                            Мы готовим еду, которую сами любим и которой доверяем. Постоянно улучшаем рецептуры и упаковку
                                        </p>
                                    </motion.div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <motion.div
                                        className={styles.qualityCard}

                                    >
                                        <div className={styles.qualityCardUp}>
                                            <p className={styles.qualityText}>Сильный бренд и перспективы</p>
                                            <Image src="/popularity.svg" alt="Собственный автопарк" width={50} height={50} className={styles.qualityIcon} />
                                        </div>
                                        <p className={styles.qualityDescription}>
                                            Нашу продукцию можно найти в крупнейших ритейл-сетях. Мы развиваем не только частные торговые марки, но и собственный бренд
                                        </p>
                                    </motion.div>
                                </SwiperSlide>
                            </Swiper>
                        )}
                    </div>
                </div>
            </section>

            <section id='numbers' className={styles.numbers}>
                <div className={`${styles.container} container`}>
                    <div className={styles.numbersWrapper}>
                        <h4 className={styles.numbersTitle}>цифры о нас</h4>
                        <div className={styles.numbersRight}>
                            <h3 className={styles.numbersInfo}>Мы строим долгосрочные отношения с нашими сотрудниками, предоставляя конкурентоспособные условия труда, поддержку на всех этапах карьеры и возможности для развития</h3>
                            <ul className={styles.numbersCards}>
                                <li className={styles.numbersCard}>
                                    <div className={styles.numbersCardUp}>
                                        <h3 className={styles.numbersCardTitle}>30+</h3>
                                        <span className={styles.numbersCardSubTitle}>профессий</span>
                                    </div>

                                    <p className={styles.numbersCardInfo}>Для работы и развития</p>
                                </li>
                                <li className={styles.numbersCard}>
                                    <div className={styles.numbersCardUp}>
                                        <h3 className={styles.numbersCardTitle}>35%</h3>
                                        <span className={styles.numbersCardSubTitle}>сотрудников</span>
                                    </div>

                                    <p className={styles.numbersCardInfo}>Молодые специалисты</p>
                                </li>
                                <li className={styles.numbersCard}>
                                    <div className={styles.numbersCardUp}>
                                        <h3 className={styles.numbersCardTitle}>20%</h3>
                                        <span className={styles.numbersCardSubTitle}>сотрудников</span>
                                    </div>

                                    <p className={styles.numbersCardInfo}>Ежегодно проходят переподготовку</p>
                                </li>
                                <li className={styles.numbersCard}>
                                    <div className={styles.numbersCardUp}>
                                        <h3 className={styles.numbersCardTitle}>5+</h3>
                                        <span className={styles.numbersCardSubTitle}>лет стабильной работы</span>
                                    </div>

                                    <p className={styles.numbersCardInfo}>На рынке производства готовой еды</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section id='vacancies' className={styles.vacancies}>
                <div className={`${styles.container} container`}>
                    <div className={styles.vacanciesWrapper}>
                        <h4 className={styles.vacanciesTitle}>актуальные вакансии</h4>
                        <h3 className={styles.vacanciesSubTitle}>Вакансии в Москве и Московской области</h3>
                        <ul className={styles.vacanciesTags}>
                            <li className={styles.vacanciesTag}>
                                <button className={`${styles.vacanciesTagBtn} ${styles.vacanciesTagBtnActive}`}>Все вакансии</button>
                            </li>
                            <li className={styles.vacanciesTag}>
                                <button className={styles.vacanciesTagBtn}>Производство</button>
                            </li>
                            <li className={styles.vacanciesTag}>
                                <button className={styles.vacanciesTagBtn}>Поставки</button>
                            </li>
                            <li className={styles.vacanciesTag}>
                                <button className={styles.vacanciesTagBtn}>Офис</button>
                            </li>
                        </ul>
                        <ul className={styles.vacanciesList}>
                            {vacanciesData.map((vacancy) => (
                                <li key={vacancy.id} className={styles.vacanciesItem}>
                                    <Link href={`/vacancies/${vacancy.id}`} className={styles.vacanciesItemLink}>
                                        <h4 className={styles.vacanciesItemTitle}>{vacancy.title}</h4>
                                        <h4 className={styles.vacanciesItemInfo}>
                                            {vacancy.category} • {vacancy.schedule} <span> • {vacancy.location}</span>
                                        </h4>
                                        <h4 className={styles.vacanciesItemCity}>{vacancy.location}</h4>
                                        <button className={styles.vacanciesItemBtn}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 20L20 4" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M4 4H20V20" stroke="#2C2C2C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <button className={styles.vacanciesMoreBtn}>Загрузить ещё</button>
                    </div>
                </div>
            </section>

            <section id='partners' className={styles.partners}>
                <div className={`${styles.container} container`}>
                    <div className={styles.partnersWrapper}>
                        <div className={styles.partnersForm}>
                            <div className={styles.partnersFormLeft}>
                                <h4 className={styles.partnersFormSubTitle}>отдел кадров</h4>
                                <h3 className={styles.partnersFormTitle}>Не нашли подходящую вакансию?</h3>
                                <p className={styles.partnersFormInfo}>Оставьте свои контакты и расскажите о себе — мы свяжемся с вами, когда появится подходящая возможность. Вы также можете отправить резюме на нашу почту <span><a href="/">hr@ideologia.ru</a></span></p>
                            </div>


                            {!isSuccessModalOpen ? (
                                <form onClick={handleFormSubmit} className={styles.partnersFormRight}>
                                    <div className={styles.partnersFormRightUp}>
                                        <input type="text" placeholder='Имя и Фамилия' className={styles.partnersInput} />
                                        <input type="tel" placeholder='Номер телефона' className={styles.partnersInput} />
                                        <input type="email" placeholder='Электронная почта' className={styles.partnersInput} />
                                        <textarea className={styles.partnersTextArea} name="textArea" id="" placeholder='Расскажите о себе'></textarea>
                                    </div>
                                    <div className={styles.partnersFileBox}>
                                        <input className={styles.partnersFileInput} type="file" id='partnersFile' />
                                        <label className={styles.partnersFileLabel} htmlFor="partnersFile">
                                            <Image src={'/paperclip.svg'} width={24} height={24}></Image>
                                            <div className={styles.partnersFiletext}>
                                                <h5 className={styles.partnersFileInputTitle}>Прикрепить коммерческое предложение</h5>
                                                <h6 className={styles.partnersFileInputInfo}>pdf, doc до 10 мб</h6>
                                            </div>
                                        </label>
                                    </div>
                                    <div className={styles.partnersFormRightBottom}>
                                        <button className={styles.partnersFormSubmit}>Отправить заявку</button>
                                        <p className={styles.partnersPolicy}>Нажимая на кнопку, вы соглашаетесь с <Link href={'/'}>
                                            политикой конфиденциальности</Link></p>
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
                </div>
            </section>

            <section id='preFooter' className={styles.preFooter}>
                <div className={`${styles.container} container`}>
                    <div className={styles.preFooterWrapper}>
                        {isClient && (
                            <div ref={mapRef} className={styles.preFooterPhoto} style={{ width: '100%', height: '100%' }} />
                        )}
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
                                    Контакты
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