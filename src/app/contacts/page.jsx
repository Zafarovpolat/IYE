'use client';

import Image from 'next/image';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import styles from '../styles/Contacts.module.css';
import Button from '../components/Button/Button';
import Link from 'next/link';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Contacts() {
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
                                    <a href={'/'} className={styles.technologyCardLink}>+7 (000) 000–00–00</a>
                                    <a href={'/'} className={styles.technologyCardLink}>stm@ideologia.ru</a>
                                </div>
                                <p className={styles.technologyCardInfo}>Московская область, город Балашиха, улица Западная, дом 7А</p>
                            </li>
                            <li className={styles.technologyCard}>
                                <h4 className={styles.technologyCardTitle}>Поставщики</h4>
                                <div className={styles.technologyCardLinks}>
                                    <a href={'/'} className={styles.technologyCardLink}>+7 (000) 000–00–00</a>
                                    <a href={'/'} className={styles.technologyCardLink}>providers@ideologia.ru</a>
                                </div>
                                <p className={styles.technologyCardInfo}>Московская область, город Балашиха, улица Западная, дом 7А</p>
                            </li>
                            <li className={styles.technologyCard}>
                                <h4 className={styles.technologyCardTitle}>Отзывы, жалобы, обратная связь</h4>
                                <div className={styles.technologyCardLinks}>
                                    <a href={'/'} className={styles.technologyCardLink}>+7 (000) 000–00–00</a>
                                    <a href={'/'} className={styles.technologyCardLink}>customers@ideologia.ru</a>
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
                                <form onClick={handleFormSubmit} className={styles.partnersFormRight}>
                                    <div className={styles.partnersFormRightUp}>
                                        <input type="text" placeholder='Имя' className={styles.partnersInput} />
                                        <input type="tel" placeholder='Номер телефона' className={styles.partnersInput} />
                                        <input type="email" placeholder='Электронная почта' className={styles.partnersInput} />
                                        <textarea className={styles.partnersTextArea} name="textArea" id="" placeholder='Опишите вашу ситуацию'></textarea>
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