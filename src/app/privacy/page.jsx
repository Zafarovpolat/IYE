'use client';

import Image from 'next/image';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import styles from '../styles/Privacy.module.css';
import Link from 'next/link';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';

export default function Privacy() {
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

            <section id='privacy' className={styles.privacy}>
                <div className={`${styles.container} container`}>
                    <div className={styles.privacyWrapper}>
                        <div className={styles.privacyLeft}></div>
                        <div className={styles.privacyRight}>
                            <h2 className={styles.privacyTitle}>Политика конфиденциальности</h2>
                            <p className={`${styles.privacyText} ${styles.privacyTextBold}`}>ООО «Идеология Еды»</p>
                            <p className={`${styles.privacyText} ${styles.privacyTextBold}`}>Дата публикации: 22.05.25</p>
                            <p className={styles.privacyTextLarge}>Настоящая Политика конфиденциальности регулирует порядок обработки и защиты персональных данных пользователей сайта <span><Link className={styles.privacyLink} href={'/'}>https://Ideologiya-edy.ru</Link></span>, принадлежащего Обществу с ограниченной ответственностью «Идеология Еды».</p>
                            <div className={styles.privacyBoxes}>
                                <div className={styles.privacyBox}>
                                    <h3 className={styles.privacyBoxTitle}>1. Общие положения</h3>
                                    <p className={styles.privacyBoxItem}>1.1. Настоящая Политика составлена в соответствии с Федеральным законом РФ от 27.07.2006 № 152-ФЗ «О персональных данных».</p>
                                    <p className={styles.privacyBoxItem}>1.2. Использование сайта означает согласие пользователя с данной Политикой и условиями обработки персональных данных.</p>
                                    <p className={styles.privacyBoxItem}>1.3. В случае несогласия с условиями пользователь должен прекратить использование сайта.</p>
                                </div>
                                <div className={styles.privacyBox}>
                                    <h3 className={styles.privacyBoxTitle}>2. Оператор персональных данных</h3>
                                    <p className={`${styles.privacyText} ${styles.privacyTextBold}`}>ООО «Идеология Еды»</p>
                                    <p className={styles.privacyBoxItem}>Юридический адрес: <span className={`${styles.privacyText} ${styles.privacyTextBold}`}>143930, Московская область, город Балашиха, улица Западная, дом 7А</span></p>
                                    <p className={styles.privacyBoxItem}>ИНН: <span className={`${styles.privacyText} ${styles.privacyTextBold}`}>9703019185</span></p>
                                    <p className={styles.privacyBoxItem}>КПП: <span className={`${styles.privacyText} ${styles.privacyTextBold}`}>500101001</span></p>
                                    <p className={styles.privacyBoxItem}>ОГРН: <span className={`${styles.privacyText} ${styles.privacyTextBold}`}>1207700371460</span></p>
                                    <p className={styles.privacyBoxItem}>Генеральный директор: <span className={`${styles.privacyText} ${styles.privacyTextBold}`}>Тутунджян Арсен Андраникович</span></p>
                                    <p className={styles.privacyBoxItem}>E-mail: <span className={`${styles.privacyText} ${styles.privacyTextBold}`}>info@идеологияеды.рф</span></p>
                                    <p className={styles.privacyBoxItem}>Телефон: <span className={`${styles.privacyText} ${styles.privacyTextBold}`}>+7 (495) 162-62-62</span></p>
                                </div>
                                <div className={styles.privacyBox}>
                                    <h3 className={styles.privacyBoxTitle}>3. Персональные данные, которые мы собираем</h3>
                                    <p className={styles.privacyBoxSubtitle}>Мы можем собирать следующие данные:</p>
                                    <ul className={styles.privacyBoxItemList}>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>Имя и контактные данные (телефон, e-mail)</li>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>Компания и должность (если указано в форме)</li>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>Содержимое сообщений, оставленных через формы обратной связи</li>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>Технические данные: IP-адрес, информация о браузере, cookies, история посещений</li>
                                    </ul>
                                </div>
                                <div className={styles.privacyBox}>
                                    <h3 className={styles.privacyBoxTitle}>4. Цели сбора данных</h3>
                                    <p className={styles.privacyBoxSubtitle}>Мы обрабатываем данные с целью:</p>
                                    <ul className={styles.privacyBoxItemList}>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>Обработки входящих заявок (вакансии, партнёрство, обратная связь)</li>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>Поддержания связи с пользователями</li>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>Улучшения интерфейса и производительности сайта</li>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>Выполнения требований законодательства</li>
                                    </ul>
                                </div>
                                <div className={styles.privacyBox}>
                                    <h3 className={styles.privacyBoxTitle}>5. Условия обработки и хранения данных</h3>
                                    <ul className={styles.privacyBoxItemList}>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>Персональные данные обрабатываются на законной и справедливой основе</li>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>Данные хранятся не дольше, чем это необходимо для целей обработки</li>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>Доступ к данным имеют только уполномоченные сотрудники</li>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>Передача данных третьим лицам возможна только при наличии законных оснований</li>
                                    </ul>
                                </div>
                                <div className={styles.privacyBox}>
                                    <h3 className={styles.privacyBoxTitle}>6. Права пользователя</h3>
                                    <p className={styles.privacyBoxSubtitle}>Вы вправе:</p>
                                    <ul className={styles.privacyBoxItemList}>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>Получать информацию о своих данных</li>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>Требовать исправления, блокировки или удаления данных</li>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>Отозвать своё согласие на обработку, направив письменный запрос на e-mail</li>
                                    </ul>
                                </div>
                                <div className={styles.privacyBox}>
                                    <h3 className={styles.privacyBoxTitle}>7. Использование cookies</h3>
                                    <p className={styles.privacyBoxSubtitle}>Мы используем cookies для:</p>
                                    <ul className={styles.privacyBoxItemList}>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>Запоминания пользовательских предпочтений</li>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>Аналитики и улучшения UX</li>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>Отслеживания статистики посещений</li>
                                    </ul>
                                    <p className={styles.privacyBoxItem}>Мы обрабатываем данные с целью:</p>
                                </div>
                                <div className={styles.privacyBox}>
                                    <h3 className={styles.privacyBoxTitle}>8. Безопасность</h3>
                                    <p className={styles.privacyBoxSubtitle}>Мы применяем организационные и технические меры защиты:</p>
                                    <ul className={styles.privacyBoxItemList}>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>Ограничение доступа</li>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>Шифрование каналов передачи</li>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>Регулярное обновление и аудит систем безопасности</li>
                                    </ul>
                                </div>
                                <div className={styles.privacyBox}>
                                    <h3 className={styles.privacyBoxTitle}>9. Сторонние ресурсы</h3>
                                    <p className={styles.privacyBoxItem}>На сайте могут быть ссылки на сторонние сайты. Мы не отвечаем за политику конфиденциальности этих ресурсов.</p>
                                </div>
                                <div className={styles.privacyBox}>
                                    <h3 className={styles.privacyBoxTitle}>10. Обновление политики</h3>
                                    <p className={styles.privacyBoxItem}>Политика может быть обновлена без предварительного уведомления. Актуальная редакция всегда размещается на этой странице.</p>
                                </div>
                                <div className={styles.privacyBox}>
                                    <h3 className={styles.privacyBoxTitle}>11. Контакты</h3>
                                    <p className={styles.privacyBoxItem}>По всем вопросам, связанным с персональными данными, вы можете связаться с нами:</p>
                                    <p className={`${styles.privacyBoxItem} ${styles.privacyBoxItemBold}`}>ООО «Идеология Еды»</p>
                                    <p className={styles.privacyBoxItem}>Адрес: <span className={`${styles.privacyBoxItem} ${styles.privacyBoxItemBold}`}>143930, Московская область, город Балашиха, улица Западная, дом 7А</span></p>
                                    <p className={styles.privacyBoxItem}>E-mail: <span className={`${styles.privacyBoxItem} ${styles.privacyBoxItemBold}`}>info@идеологияеды.рф</span></p>
                                    <p className={styles.privacyBoxItem}>Телефон: <span className={`${styles.privacyBoxItem} ${styles.privacyBoxItemBold}`}>+7 (495) 162-62-62</span></p>
                                </div>
                            </div>
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