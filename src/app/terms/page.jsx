'use client';

import Image from 'next/image';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import styles from '../styles/Privacy.module.css';
import Link from 'next/link';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';

export default function Terms() {
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
                            <h2 className={styles.privacyTitle}>Пользовательское соглашение</h2>
                            <p className={styles.privacyTextLarge}>Настоящая Политика конфиденциальности регулирует порядок обработки и защиты персональных данных пользователей сайта <span><Link className={styles.privacyLink} href={'/'}>https://Ideologiya-edy.ru</Link></span>, принадлежащего Обществу с ограниченной ответственностью «Идеология Еды».</p>
                            <p className={styles.privacyTextLarge}>Пожалуйста, внимательно ознакомьтесь с условиями настоящего Соглашения перед использованием Сайта. Используя Сайт, вы соглашаетесь соблюдать указанные условия. Если вы не согласны с условиями Соглашения, пожалуйста, не используйте Сайт.</p>
                            <div className={styles.privacyBoxes}>
                                <div className={styles.privacyBox}>
                                    <h3 className={styles.privacyBoxTitle}>1. Общие положения</h3>
                                    <p className={styles.privacyBoxItem}>1.1. Настоящее Соглашение является публичной офертой. Доступ к Сайту и его использование означают полное и безоговорочное принятие всех условий Соглашения.</p>
                                    <p className={styles.privacyBoxItem}>1.2. Компания оставляет за собой право изменять условия Соглашения без предварительного уведомления. Актуальная версия всегда доступна на Сайте.</p>
                                </div>
                                <div className={styles.privacyBox}>
                                    <h3 className={styles.privacyBoxTitle}>2. Права и обязанности сторон</h3>
                                    <p className={styles.privacyBoxSubtitle2}>2.1. Пользователь обязуется:</p>
                                    <ul className={styles.privacyBoxItemList}>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>использовать Сайт только в законных целях;</li>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>не предпринимать действий, которые могут нарушить работу Сайта или привести к сбою его функционирования;</li>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>не размещать на Сайте ложную, оскорбительную, недостоверную или вводящую в заблуждение информацию.</li>
                                    </ul>
                                    <p className={styles.privacyBoxSubtitle2}>2.2. Пользователь имеет право:</p>
                                    <ul className={styles.privacyBoxItemList}>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>использовать материалы Сайта для личного, некоммерческого использования;</li>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>обращаться в Компанию через формы обратной связи, заявки или контактную информацию, размещённую на Сайте.</li>
                                    </ul>
                                    <p className={styles.privacyBoxSubtitle2}>2.3. Компания обязуется:</p>
                                    <ul className={styles.privacyBoxItemList}>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>обеспечить корректную работу Сайта (в пределах технической возможности);</li>
                                        <li className={`${styles.privacyBoxItemListItem} ${styles.privacyBoxItem}`}>защищать персональные данные Пользователя в соответствии с Политикой конфиденциальности.</li>
                                    </ul>
                                </div>
                                <div className={styles.privacyBox}>
                                    <h3 className={styles.privacyBoxTitle}>3. Интеллектуальная собственность</h3>
                                    <p className={styles.privacyBoxItem}>3.1. Все объекты, размещённые на Сайте, включая дизайн, тексты, изображения, логотипы, элементы фирменного стиля, являются интеллектуальной собственностью Компании или третьих лиц и охраняются законодательством РФ.</p>
                                    <p className={styles.privacyBoxItem}>3.2. Любое использование материалов Сайта без письменного разрешения правообладателя запрещено, за исключением случаев, прямо предусмотренных законодательством РФ.</p>
                                </div>
                                <div className={styles.privacyBox}>
                                    <h3 className={styles.privacyBoxTitle}>4. Ответственность</h3>
                                    <p className={styles.privacyBoxItem}>4.1. Компания не несёт ответственности за возможные сбои в работе Сайта, вызванные техническими причинами, действиями третьих лиц или непреодолимой силой.</p>
                                    <p className={styles.privacyBoxItem}>4.2. Компания не несёт ответственности за действия Пользователя, нарушающие настоящее Соглашение или законодательство РФ.</p>
                                </div>
                                <div className={styles.privacyBox}>
                                    <h3 className={styles.privacyBoxTitle}>5. Условия обработки и хранения данных</h3>
                                    <p className={styles.privacyTextLarge}>5.1. Все персональные данные, передаваемые Пользователем через Сайт, обрабатываются в соответствии с <span><Link className={styles.privacyLink} href={'/'}>Политикой конфиденциальности</Link></span>, размещённой на Сайте.</p>
                                </div>
                                <div className={styles.privacyBox}>
                                    <h3 className={styles.privacyBoxTitle}>6. Заключительные положения</h3>
                                    <p className={styles.privacyBoxItem}>6.1. Все споры, возникающие между Пользователем и Компанией, подлежат разрешению в соответствии с законодательством Российской Федерации.</p>
                                    <p className={styles.privacyBoxItem}>6.2. Настоящее Соглашение вступает в силу с момента первого использования Сайта Пользователем и действует бессрочно.</p>
                                    <p className={styles.privacyBoxItem}>6.3. В случае, если какое-либо положение Соглашения признаётся недействительным, это не влияет на действительность остальных положений.</p>
                                </div>
                                <div className={styles.privacyBox}>
                                    <h3 className={styles.privacyBoxTitle}>7. Контакты</h3>
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