'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import Button from '../components/Button/Button';
import styles from '../styles/News.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function News() {
    const [isPreFooterHovered, setIsPreFooterHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const rippleOrigin = {
        x: '100%',
        y: '100%',
    };

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

    // Array of news items
    const newsItems = [
        {
            id: 1,
            image: '/news1.png',
            title: 'Наши сэндвичи теперь в «Самокате» — свежий продукт с доставкой за 15 минут!',
            description: '22 апреля 2025 • Партнёрство'
        },
        {
            id: 2,
            image: '/news2.png',
            title: 'Инновационная упаковка — теперь наша продукция остаётся свежей ещё дольше',
            description: '21 апреля 2025 • Продукция'
        },
        {
            id: 3,
            image: '/news3.png',
            title: 'СТМ растёт: мы начали выпуск блинов для сети «Пятёрочка»',
            description: '18 апреля 2025 • Партнёрство'
        },
        {
            id: 4,
            image: '/news4.png',
            title: 'Обновили линейку сэндвичей — новые рецепты и улучшенный вкус',
            description: '16 апреля 2025 • Продукция'
        },
        {
            id: 5,
            image: '/news5.png',
            title: 'Наши пироги теперь с новыми начинками — ещё вкуснее и разнообразнее',
            description: '15 апреля 2025 • Продукция'
        },
        {
            id: 6,
            image: '/news6.png',
            title: 'Внедрили систему машинного зрения — контроль качества на новом уровне',
            description: '14 апреля 2025 • Производство'
        },
        {
            id: 7,
            image: '/news7.png',
            title: 'Запустили собственную систему мониторинга температуры в реальном времени',
            description: '11 апреля 2025 • Производство'
        },
        {
            id: 8,
            image: '/news8.png',
            title: 'Добавили систему обратной связи на производстве — реагируем ещё быстрее',
            description: '10 апреля 2025 • Производство'
        },
        {
            id: 9,
            image: '/news9.png',
            title: 'Провели аудит качества — без единого замечания',
            description: '9 апреля 2025 • Производство'
        },
        {
            id: 10,
            image: '/news10.png',
            title: 'Запустили линейку мини-десертов — удобный формат для перекуса в пути',
            description: '7 апреля 2025 • Продукция'
        },
        {
            id: 11,
            image: '/news11.png',
            title: 'Открыли вакансию для молодых специалистов с возможностью обучения',
            description: '6 апреля 2025 • Команда'
        },
        {
            id: 12,
            image: '/news12.png',
            title: 'Представили продукцию на выставке METRO EXPO 2025',
            description: '5 апреля 2025 • Продукция'
        },
        {
            id: 13,
            image: '/news13.png',
            title: 'Наши продукция — теперь и в отелях Москвы: старт сотрудничества с крупной гостиничной сетью',
            description: '31 марта 2025 • Партнёрство'
        },
        {
            id: 14,
            image: '/news14.png',
            title: 'Установили новые линии фасовки — теперь ещё быстрее и точнее',
            description: '30 марта 2025 • Производство'
        },
        {
            id: 15,
            image: '/news15.png',
            title: 'Стартовали пилотное производство на новой площадке в Подмосковье',
            description: '29 марта 2025 • Производство'
        },
        {
            id: 16,
            image: '/news16.png',
            title: 'Провели тренинг по пищевой безопасности для всех смен',
            description: '27 марта 2025 • Команда'
        },
        {
            id: 17,
            image: '/news17.png',
            title: 'Расширили ассортимент завтраков — быстрые и сытные блюда на каждый день',
            description: '25 марта 2025 • Продукция'
        },
        {
            id: 18,
            image: '/news18.png',
            title: 'Провели дегустации в московских офисах крупных компаний',
            description: '24 марта 2025 • Продукция'
        },
    ];

    // Limit to 12 cards on mobile
    const displayedNews = isMobile ? newsItems.slice(0, 12) : newsItems;

    // Calculate the middle index for the banner
    const middleIndex = Math.floor(displayedNews.length / 2);

    // Split news items into two parts
    const firstHalf = displayedNews.slice(0, middleIndex);
    const secondHalf = displayedNews.slice(middleIndex);


    return (
        <>
            <section id="clientsHeader" className={styles.clientsHeader}>
                <div className={`${styles.container} container`}>
                    <h1 className={styles.clientsHeaderHeading}>Новости</h1>
                </div>
            </section>

            <section id='news' className={styles.news}>
                <div className={`${styles.container} container`}>
                    <div className={`${styles.newsHeaderBlock} ${styles.newsHeaderBlock}`}>
                        <div className={styles.newsHeaderBottomBlock}>
                            <h3 className={styles.newsHeaderInfo}>
                                Мы открыты и честны: рассказываем обо всем важном, что происходит в компании
                            </h3>
                            <ul className={styles.newsTags}>
                                <li className={`${styles.newsTag} ${styles.newsTagActive}`}>
                                    <button className={`${styles.newsTagBtn} ${styles.newsTagBtnActive}`}>Все новости</button>
                                </li>
                                <li className={styles.newsTag}>
                                    <button className={styles.newsTagBtn}>Продукция</button>
                                </li>
                                <li className={styles.newsTag}>
                                    <button className={styles.newsTagBtn}>Партнёрство</button>
                                </li>
                                <li className={styles.newsTag}>
                                    <button className={styles.newsTagBtn}>Производство</button>
                                </li>
                                <li className={styles.newsTag}>
                                    <button className={styles.newsTagBtn}>Команда</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.newsCardsContainer}>
                        {firstHalf.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ y: 197 }}
                                whileInView={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                viewport={{ once: true }}
                            >
                                <Link href={"/news"} className={styles.newsCard}>
                                    <Image
                                        src={item.image}
                                        alt="Пирожные"
                                        width={200}
                                        height={200}
                                        className={styles.newsImage}
                                    />
                                    <h4 className={styles.newsCardTitle}>{item.title}</h4>
                                    <p className={styles.newsCardDescription}>
                                        {item.description}
                                    </p>
                                </Link>
                            </motion.div>
                        ))}
                        <div className={styles.newsBanner}>
                            <h3 className={styles.newsBannerTitle}>Будь в курсе новостей — подпишись на наши страницы в соцсетях</h3>
                            <div className={styles.newsBannerSocials}>
                                <a href="#" className={styles.newsBannerSocialsLogo}>
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={styles.icon}
                                    >
                                        <path
                                            d="M10.2036 14.216L9.92787 18.0936C10.3223 18.0936 10.4931 17.9242 10.698 17.7207L12.5472 15.9534L16.379 18.7596C17.0818 19.1512 17.5769 18.945 17.7665 18.1131L20.2817 6.32732L20.2824 6.32663C20.5053 5.28777 19.9067 4.88154 19.222 5.13639L4.43777 10.7966C3.42878 11.1883 3.44405 11.7508 4.26625 12.0056L8.04599 13.1813L16.8256 7.6877C17.2387 7.41409 17.6144 7.56548 17.3054 7.83908L10.2036 14.216Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </a>
                                <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className={styles.newsBannerSocialsLogo}>
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={styles.icon}
                                    >
                                        <path
                                            d="M21.894 16.6022C21.8698 16.55 21.8472 16.5067 21.8262 16.472C21.4792 15.847 20.8161 15.08 19.8373 14.1705L19.8166 14.1497L19.8062 14.1395L19.7958 14.129H19.7853C19.341 13.7055 19.0597 13.4208 18.9419 13.275C18.7264 12.9973 18.6781 12.7162 18.7959 12.4314C18.8791 12.2162 19.1918 11.7618 19.7331 11.0674C20.0178 10.6995 20.2433 10.4045 20.4099 10.1824C21.6109 8.58559 22.1317 7.56523 21.9719 7.12089L21.9099 7.01705C21.8682 6.95453 21.7606 6.89734 21.5872 6.84519C21.4135 6.79314 21.1914 6.78454 20.9206 6.81922L17.9217 6.83994C17.8731 6.82272 17.8037 6.82433 17.7133 6.84519L17.5779 6.87652L17.5257 6.9026L17.4843 6.93393C17.4496 6.95464 17.4114 6.99108 17.3697 7.04316C17.3282 7.09506 17.2935 7.15597 17.2658 7.22538C16.9393 8.06538 16.5681 8.84636 16.1515 9.5683C15.8946 9.99879 15.6587 10.3719 15.4433 10.6878C15.2281 11.0035 15.0476 11.2362 14.9019 11.3853C14.756 11.5346 14.6244 11.6542 14.5061 11.7445C14.3881 11.8349 14.298 11.8731 14.2355 11.8591C14.173 11.8452 14.1141 11.8313 14.0583 11.8175C13.9612 11.7549 13.8831 11.6699 13.8242 11.5623C13.765 11.4547 13.7252 11.3193 13.7044 11.1562C13.6836 10.9929 13.6714 10.8525 13.6679 10.7344C13.6646 10.6165 13.6661 10.4497 13.6732 10.2345C13.6804 10.0192 13.6836 9.87358 13.6836 9.7972C13.6836 9.53336 13.6888 9.24701 13.6991 8.93809C13.7096 8.62917 13.7181 8.3844 13.7252 8.20408C13.7323 8.02358 13.7356 7.83261 13.7356 7.63128C13.7356 7.42995 13.7233 7.27206 13.6991 7.15747C13.6749 7.04277 13.6383 6.93103 13.5901 6.82422C13.5414 6.71662 13.4701 6.63339 13.3766 6.57431C13.2829 6.5153 13.1664 6.46846 13.0278 6.43367C12.6598 6.3504 12.1912 6.30536 11.6219 6.29836C10.3307 6.2845 9.50105 6.36787 9.13311 6.54838C8.98733 6.62464 8.85541 6.72884 8.73746 6.86065C8.61247 7.01344 8.59503 7.09681 8.68527 7.11053C9.10186 7.17293 9.39677 7.32221 9.57035 7.55823L9.6329 7.68329C9.68155 7.77352 9.73013 7.93327 9.77875 8.16232C9.82729 8.39137 9.85862 8.64474 9.87241 8.9223C9.90706 9.42916 9.90706 9.86304 9.87241 10.224C9.83765 10.585 9.80483 10.8661 9.7735 11.0675C9.74217 11.2688 9.69534 11.4319 9.6329 11.5569C9.57035 11.6818 9.52873 11.7582 9.50787 11.7859C9.48704 11.8136 9.46968 11.8311 9.4559 11.8379C9.36618 11.8725 9.27084 11.8902 9.17469 11.8901C9.07742 11.8901 8.95947 11.8415 8.82065 11.7443C8.68188 11.647 8.53785 11.5135 8.38856 11.3433C8.23928 11.1732 8.07092 10.9354 7.88342 10.63C7.69606 10.3246 7.50166 9.96363 7.30033 9.54711L7.13376 9.24504C7.02963 9.05072 6.88739 8.76777 6.70689 8.39644C6.52628 8.02497 6.36664 7.66564 6.22786 7.31853C6.17238 7.17275 6.08904 7.06176 5.97799 6.98539L5.92587 6.95406C5.89122 6.92634 5.8356 6.89691 5.7593 6.86554C5.68226 6.83405 5.60191 6.81137 5.51978 6.79792L2.66657 6.81864C2.37501 6.81864 2.17718 6.88469 2.07302 7.01661L2.03133 7.07901C2.0105 7.11377 2 7.16928 2 7.24569C2 7.32207 2.02083 7.4158 2.06251 7.52679C2.47903 8.50571 2.93198 9.4498 3.42137 10.3592C3.91076 11.2686 4.33603 12.0012 4.69692 12.5562C5.05789 13.1116 5.42583 13.6359 5.80073 14.1286C6.17563 14.6215 6.42379 14.9374 6.54521 15.0762C6.66677 15.2152 6.76225 15.3192 6.83166 15.3886L7.09204 15.6385C7.25865 15.8051 7.5033 16.0047 7.82612 16.2372C8.14901 16.4698 8.50648 16.6989 8.8987 16.9247C9.291 17.1501 9.74738 17.3341 10.2681 17.4764C10.7887 17.6188 11.2955 17.676 11.7884 17.6484H12.986C13.2288 17.6274 13.4128 17.551 13.5379 17.4192L13.5793 17.367C13.6072 17.3256 13.6333 17.2612 13.6573 17.1746C13.6817 17.0878 13.6938 16.9922 13.6938 16.8883C13.6867 16.5898 13.7094 16.3208 13.7614 16.0813C13.8133 15.8419 13.8724 15.6614 13.9386 15.5399C14.0047 15.4184 14.0793 15.3159 14.1624 15.2328C14.2456 15.1496 14.3049 15.0991 14.3397 15.0818C14.3743 15.0643 14.4019 15.0525 14.4227 15.0453C14.5893 14.9898 14.7854 15.0436 15.0112 15.2069C15.2369 15.37 15.4485 15.5715 15.6465 15.8109C15.8444 16.0505 16.0821 16.3193 16.3597 16.6178C16.6376 16.9163 16.8805 17.1383 17.0886 17.2843L17.2968 17.4092C17.4359 17.4926 17.6164 17.569 17.8386 17.6384C18.0603 17.7078 18.2547 17.7251 18.4215 17.6904L21.0872 17.6489C21.3509 17.6489 21.556 17.6052 21.7015 17.5186C21.8474 17.4318 21.934 17.3362 21.9619 17.2322C21.9898 17.1281 21.9913 17.01 21.9672 16.878C21.9425 16.7463 21.9182 16.6542 21.894 16.6022Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        {secondHalf.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ y: 197 }}
                                whileInView={{ y: 0 }}
                                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                                viewport={{ once: true }}
                            >
                                <Link href={"/news"} className={styles.newsCard}>
                                    <Image
                                        src={item.image}
                                        alt="Пирожные"
                                        width={200}
                                        height={200}
                                        className={styles.newsImage}
                                    />
                                    <h4 className={styles.newsCardTitle}>{item.title}</h4>
                                    <p className={styles.newsCardDescription}>
                                        {item.description}
                                    </p>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                    <button className={styles.newsBtnMore}>Загрузить ещё</button>
                </div>
            </section>

            <section id='preFooter' className={styles.preFooter}>
                <div className={`${styles.container} container`}>
                    <div className={styles.preFooterWrapper}>
                        <Image src='/news-prefooter.png' alt='Еда' width={586} height={400} className={styles.preFooterPhoto} />
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
                                    Новости
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