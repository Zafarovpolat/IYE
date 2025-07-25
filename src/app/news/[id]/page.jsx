'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/NewsDetail.module.css';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; // Импортируем модули навигации и пагинации
import 'swiper/css';
import 'swiper/css/navigation'; // Подключаем стили для навигации
import 'swiper/css/pagination'; // Подключаем стили для пагинации
import Footer from '../../components/Footer/Footer';
import posterImg from '../../Poster2.png'

const newsItems = [
    {
        id: 1,
        image: '/news1.png',
        title: 'Наши сэндвичи теперь в «Самокате» — свежий продукт с доставкой за 15 минут!',
        description: '22 апреля 2025 • Партнёрство',
        subtitle: 'Свежие, вкусные и сбалансированные сэндвичи от «Идеология Еды» теперь можно заказать в сервисе быстрой доставки «Самокат». Продукция доступна в мобильном приложении и на сайте сервиса в Москве и Московской области.',
        info: 'Партнёрство с «Самокатом» стало логичным шагом в развитии нашей дистрибуции. Мы стремимся делать качественную еду ближе к покупателю — и теперь это можно сделать всего за 15 минут.\n\nАссортимент включает любимые позиции: сэндвич с курицей, с тунцом, с ветчиной и сыром. Всё — в привычной герметичной упаковке и с идеальным соотношением вкуса и питательности. \n\nДля запуска проекта мы тщательно адаптировали упаковку под формат доставки, обеспечив свежесть и сохранность продукта в пути. Все продукты проходят тщательный контроль качества на всех этапах — от подбора сырья до отгрузки в логистический хаб.',
        quote: {
            text: '«Мы давно планировали выход в формат экспресс-доставки. В сотрудничестве с „Самокатом“ видим отличную возможность предложить наш продукт новой аудитории и протестировать быстрый канал продаж»',
            author: '— Арсен Тутунджян, генеральный директор «Идеология Еды» '
        },
        lastInfo: 'После запуска мы уже получаем первые положительные отзывы от покупателей, которые отмечают удобство формата, вкус и качество продукта. Мы продолжим расширять ассортимент, добавляя новые вкусы и варианты — от классических до сезонных лимитированных предложений.',
    },
    {
        id: 2,
        image: '/news2.png',
        title: 'Наши сэндвичи теперь в «Самокате» — свежий продукт с доставкой за 15 минут!',
        description: '22 апреля 2025 • Партнёрство',
        subtitle: 'Свежие, вкусные и сбалансированные сэндвичи от «Идеология Еды» теперь можно заказать в сервисе быстрой доставки «Самокат». Продукция доступна в мобильном приложении и на сайте сервиса в Москве и Московской области.',
        info: 'Партнёрство с «Самокатом» стало логичным шагом в развитии нашей дистрибуции. Мы стремимся делать качественную еду ближе к покупателю — и теперь это можно сделать всего за 15 минут.\nАссортимент включает любимые позиции: сэндвич с курицей, с тунцом, с ветчиной и сыром. Всё — в привычной герметичной упаковке и с идеальным соотношением вкуса и питательности. Для запуска проекта мы тщательно адаптировали упаковку под формат доставки, обеспечив свежесть и сохранность продукта в пути. Все продукты проходят тщательный контроль качества на всех этапах — от подбора сырья до отгрузки в логистический хаб.',
        quote: {
            text: '«Мы давно планировали выход в формат экспресс-доставки. В сотрудничестве с „Самокатом“ видим отличную возможность предложить наш продукт новой аудитории и протестировать быстрый канал продаж»',
            author: '— Арсен Тутунджян, генеральный директор «Идеология Еды» '
        },
        lastInfo: 'После запуска мы уже получаем первые положительные отзывы от покупателей, которые отмечают удобство формата, вкус и качество продукта. Мы продолжим расширять ассортимент, добавляя новые вкусы и варианты — от классических до сезонных лимитированных предложений.',
    },
];

export default function NewsDetail({ params }) {
    const news = newsItems.find((item) => item.id === parseInt(params.id));
    const [isNewsMobile, setIsNewsMobile] = useState(false);
    const [isSliderMobile, setIsSliderMobile] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(1); // Состояние для текущего слайда
    const [isHovered, setIsHovered] = useState(false);
    const swiperRef = useRef(null); // Для хранения экземпляра Swiper
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 4000); // Сбрасываем состояние через 4 секунды
        } catch (err) {
            console.error('Ошибка при копировании:', err);
        }
    };

    const slides = [
        { src: '/news-slide1.png', caption: '1/2 Подпись к фотографии' },
        { src: '/news-slide2.png', caption: '2/2 Подпись к фотографии' },
    ];

    if (!news) {
        return <div>Новость не найдена</div>;
    }

    useEffect(() => {
        const handleResize = () => {
            setIsNewsMobile(window.innerWidth <= 1439);
            setIsSliderMobile(window.innerWidth <= 767);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    return (
        <>

            <section id='newsDetail' className={styles.newsDetail}>
                <div className={`${styles.container} container`}>
                    <div className={styles.backLink}>
                        <Link href="/news">
                            <Image src={"/arrow-left.svg"} width={24} height={24}></Image>
                        </Link>
                    </div>
                    <div className={styles.newsDetailsWrapper}>
                        <h2 className={styles.newsDetailsTitle}>{news.title}</h2>
                        <p className={styles.newsDetailsDescription}>{news.description}</p>
                        <Image
                            src={news.image}
                            alt={news.title}
                            width={900}
                            height={490}
                            className={styles.newsDetailsImage}
                        />
                        <div className={styles.newsDetailsContent}>
                            <h3 className={styles.newsDetailsSubtitle}>{news.subtitle}</h3>
                            <p className={styles.newsDetailsInfo}>{news.info}</p>
                            <div className={styles.newsDetailsQuote}>
                                <p className={styles.newsDetailsQuoteText}>{news.quote.text}</p>
                                <p className={styles.newsDetailsQuoteAuthor}>{news.quote.author}</p>
                            </div>
                            <p className={styles.newsDetailsLastInfo}>{news.lastInfo}</p>
                        </div>
                        <div className={styles.newsDetailsSlider}>
                            <div className={styles.newsDetailsSliderWrapper}>
                                {isSliderMobile ? (
                                    <Swiper
                                        spaceBetween={10}
                                        slidesPerView={1.1}
                                        className={styles.newsDetailsSwiper}
                                        onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex + 1)}
                                        ref={swiperRef}
                                    >
                                        {slides.map((slide, index) => (
                                            <SwiperSlide key={index}>
                                                <Image
                                                    className={styles.newsDetailsSwiperImg}
                                                    src={slide.src}
                                                    width={900}
                                                    height={490}
                                                    alt={slide.caption}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                ) : (
                                    <>
                                        <button
                                            className={`${styles.newsDetailsSliderPrevBtn} ${currentSlide === 1 ? styles.disabled : ''}`}
                                            disabled={currentSlide === 1}
                                        >
                                            <Image style={{ transform: 'rotate(180deg)' }} src={'/nextBtn.svg'} width={24} height={24}></Image>
                                        </button>
                                        <Swiper
                                            spaceBetween={20}
                                            slidesPerView={1}
                                            modules={[Navigation, Pagination]}
                                            navigation={{
                                                prevEl: `.${styles.newsDetailsSliderPrevBtn}`,
                                                nextEl: `.${styles.newsDetailsSliderNextBtn}`,
                                            }}
                                            onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex + 1)}
                                            className={styles.newsDetailsSwiper}
                                            ref={swiperRef}
                                        >
                                            {slides.map((slide, index) => (
                                                <SwiperSlide key={index}>
                                                    <Image
                                                        className={styles.newsDetailsSwiperImg}
                                                        src={slide.src}
                                                        width={900}
                                                        height={490}
                                                        alt={slide.caption}
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                        <button
                                            className={`${styles.newsDetailsSliderNextBtn} ${currentSlide === slides.length ? styles.disabled : ''}`}
                                            disabled={currentSlide === slides.length}
                                        >
                                            <Image src={'/nextBtn.svg'} width={24} height={24}></Image>
                                        </button>
                                    </>
                                )}
                            </div>
                            <div className={styles.newsDetailsSwiperInfo}>
                                <span className={styles.newsDetailsSwiperCount}>{currentSlide}/{slides.length}</span>
                                <p className={styles.newsDetailsSwiperText}>{slides[currentSlide - 1]?.caption}</p>
                            </div>
                        </div>
                        <div className={styles.newsDetailsReasons}>
                            <h3 className={styles.newsDetailsReasonsTitle}>Почему стоит попробовать наши сэндвичи? (H2)</h3>
                            <ul className={styles.newsDetailsReasonsList}>
                                <h3 className={styles.newsDetailsReasonsSubTitle}>Примеры (H3)</h3>
                                <li className={styles.newsDetailsReasonsItem}>Используем только натуральные и свежие ингредиенты</li>
                                <li className={styles.newsDetailsReasonsItem}>Удобная герметичная упаковка</li>
                                <li className={styles.newsDetailsReasonsItem}>Отличный вариант для перекуса на работе или в дороге</li>
                            </ul>
                            <ul className={styles.newsDetailsReasonsList}>
                                <h3 className={styles.newsDetailsReasonsSubTitle}>Примеры (H3)</h3>
                                <li className={styles.newsDetailsReasonsItem}>Используем только натуральные и свежие ингредиенты</li>
                                <li className={styles.newsDetailsReasonsItem}>Удобная герметичная упаковка</li>
                                <li className={styles.newsDetailsReasonsItem}>Отличный вариант для перекуса на работе или в дороге</li>
                            </ul>
                        </div>
                        <div className={styles.newsDetailsComparison}>
                            <h3 className={styles.newsDetailsComparisonTitle}>Сравнение продукции</h3>
                            <div className={styles.customTableContainer}>
                                <table className={styles.customTable}>
                                    <thead>
                                        <tr>
                                            <th>Блюдо</th>
                                            <th>Калории</th>
                                            <th>Белки</th>
                                            <th>Жиры</th>
                                            <th>Углероды</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Сендвич с курицей</td>
                                            <td>320 ккал</td>
                                            <td>18 г</td>
                                            <td>10 г</td>
                                            <td>35 г</td>
                                        </tr>
                                        <tr>
                                            <td>Блин с творогом</td>
                                            <td>270 ккал</td>
                                            <td>9 г</td>
                                            <td>8 г</td>
                                            <td>38 г</td>
                                        </tr>
                                        <tr>
                                            <td>Сендвич с курицей</td>
                                            <td>320 ккал</td>
                                            <td>18 г</td>
                                            <td>10 г</td>
                                            <td>35 г</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className={styles.newsDetailsComparisonInfo}>После запуска мы уже получаем первые положительные отзывы от покупателей, которые отмечают удобство формата, вкус и качество продукта. Мы продолжим расширять ассортимент, добавляя новые вкусы и варианты — от классических до сезонных лимитированных предложений.</p>
                        </div>
                        <div className={styles.newsDetailsOrder}>
                            <h3 className={styles.newsDetailsOrderTitle}>Как сделать заказ?</h3>
                            <ol className={styles.newsDetailsOrderList}>
                                <li className={styles.newsDetailsOrderItem}>Откройте приложение «Самокат» или зайдите на сайт</li>
                                <li className={styles.newsDetailsOrderItem}>Найдите раздел с готовыми блюдами</li>
                                <li className={styles.newsDetailsOrderItem}>Выберите понравившийся сэндвич</li>
                                <li className={styles.newsDetailsOrderItem}>Добавьте в корзину и оформите заказ</li>
                                <li className={styles.newsDetailsOrderItem}>Получите продукт в течение 15 минут!</li>
                            </ol>
                            <div className={styles.newsDetailsOrderVideo}>
                                <div className={styles.newsVideoContainer}>
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

                                <div className={styles.newsVideoInfo}>
                                    <p className={styles.newsVideoInfoText}>После запуска мы уже получаем первые положительные отзывы от покупателей, которые отмечают удобство формата, вкус и качество продукта. Мы продолжим расширять ассортимент, добавляя новые вкусы и варианты — от классических до сезонных лимитированных предложений.</p>
                                </div>

                                <div className={styles.newsVideoSocials}>
                                    <h5 className={styles.newsVideoSocialsTitle}>Поделиться:</h5>
                                    <ul className={styles.newsVideoSocialsList}>

                                        <li className={styles.newsVideoSocialsitem}>
                                            <motion.a
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleCopy();
                                                }}
                                                className={styles.socialIcon}
                                                animate={{
                                                    width: isCopied ? 157 : 44, // Расширение до 157px при копировании
                                                }}
                                                transition={{ duration: 0.2, ease: 'easeInOut' }} // Ускоренная анимация без задержки
                                            >
                                                <AnimatePresence mode="wait">
                                                    {isCopied ? (
                                                        <motion.div
                                                            key="copied"
                                                            className={styles.copiedContainer}
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                                                        >
                                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M15 6.1875L5.375 15.8125L1 11.4375" stroke="#159F4A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                            </svg>

                                                            <span className={styles.copiedText}>Скопировано</span>
                                                        </motion.div>
                                                    ) : (
                                                        <motion.svg
                                                            key="share"
                                                            width="20"
                                                            height="20"
                                                            viewBox="0 0 20 20"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className={styles.icon}
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            exit={{ opacity: 0 }}
                                                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                                                        >
                                                            <path
                                                                d="M13.9322 1.00019C15.2725 1.01185 16.5546 1.55067 17.5023 2.49957C18.4499 3.44836 18.9881 4.73148 18.9998 6.07318C19.0107 7.33125 18.5583 8.54671 17.7345 9.48901L17.565 9.67355L15.1911 12.0504C14.6729 12.5693 14.0493 12.9704 13.3627 13.2269C12.676 13.4833 11.942 13.5893 11.2109 13.5369C10.4799 13.4844 9.76858 13.2751 9.12545 12.9233C8.56267 12.6154 8.06385 12.2043 7.65375 11.7127L7.48326 11.4977L7.41599 11.3971C7.10805 10.8841 7.23208 10.2106 7.72102 9.84425C8.20995 9.47806 8.89033 9.54876 9.29502 9.98911L9.37243 10.0823L9.46366 10.1986C9.68453 10.4634 9.95396 10.6842 10.2571 10.85C10.6034 11.0394 10.986 11.1521 11.3796 11.1803C11.7731 11.2085 12.1683 11.1522 12.5379 11.0142C12.9077 10.8761 13.244 10.6598 13.5231 10.3803L15.8675 8.03299C16.3688 7.51331 16.6469 6.81687 16.6407 6.0944C16.6344 5.37188 16.3446 4.6806 15.8343 4.16966C15.324 3.65871 14.6336 3.36858 13.912 3.3623C13.1934 3.35607 12.5006 3.63112 11.9822 4.12906L10.6359 5.47066L10.5456 5.55094C10.0812 5.92786 9.39845 5.89875 8.96787 5.46512C8.50856 5.00255 8.51048 4.25492 8.97248 3.79504L10.3253 2.44883L10.3373 2.43683L10.5216 2.26705C11.4626 1.44229 12.6759 0.989343 13.9322 1.00019Z"
                                                                fill="currentColor"
                                                            />
                                                            <path
                                                                d="M8.78817 6.46311C9.51926 6.51554 10.2313 6.72484 10.8745 7.07671C11.4373 7.3846 11.9362 7.79573 12.3463 8.28729L12.5167 8.50228L12.584 8.60285C12.8919 9.11588 12.7678 9.78942 12.279 10.1558C11.7901 10.5219 11.1097 10.4512 10.705 10.0109L10.6276 9.91769L10.5354 9.80143C10.3146 9.5368 10.0459 9.31576 9.74289 9.15001C9.39666 8.96062 9.01396 8.84796 8.62045 8.81968C8.22678 8.79146 7.83093 8.84766 7.46114 8.98577C7.13756 9.10666 6.84009 9.28762 6.58383 9.51817L6.47693 9.61966L4.12515 11.9735C3.62782 12.4924 3.35317 13.1862 3.35935 13.9056C3.36562 14.6282 3.65539 15.3194 4.1657 15.8303C4.67601 16.3413 5.36639 16.6314 6.08804 16.6377C6.80657 16.6439 7.49851 16.368 8.01684 15.87L9.354 14.5321L9.44339 14.4509C9.90668 14.0726 10.5901 14.0997 11.022 14.5321C11.4826 14.9933 11.4826 15.741 11.022 16.2022L9.66272 17.5632C8.69868 18.4954 7.40706 19.0115 6.06685 18.9998C4.72678 18.988 3.44532 18.4492 2.4977 17.5004C1.55009 16.5516 1.01195 15.2686 1.00019 13.9268C0.988547 12.5849 1.50394 11.2917 2.43504 10.3264L4.80802 7.94958L5.00799 7.76043C5.4838 7.33256 6.03655 6.99751 6.63728 6.77314C7.32382 6.51676 8.0573 6.41077 8.78817 6.46311Z"
                                                                fill="currentColor"
                                                            />
                                                        </motion.svg>
                                                    )}
                                                </AnimatePresence>
                                            </motion.a>
                                        </li>

                                        <li className={styles.newsVideoSocialsitem}>
                                            <a href="https://example.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className={styles.icon}
                                                >
                                                    <path
                                                        d="M16.3984 3.63194C14.704 1.93554 12.4506 1.00101 10.0499 1C5.10316 1 1.07727 5.02568 1.07526 9.97382C1.07466 11.5555 1.48779 13.0994 2.27321 14.4605L1 19.111L5.75757 17.863C7.0684 18.578 8.54425 18.9549 10.0463 18.9553H10.0499C10.0497 18.9553 10.0501 18.9553 10.0499 18.9553C14.996 18.9553 19.0223 14.9292 19.0243 9.98086C19.0253 7.58296 18.0928 5.32834 16.3984 3.63194ZM6.40534 10.3004C6.29325 10.1507 5.48973 9.08457 5.48973 7.9808C5.48973 6.87703 6.06908 6.3345 6.27454 6.11013C6.48 5.88575 6.72309 5.82961 6.8726 5.82961C7.02212 5.82961 7.17184 5.83102 7.30244 5.83746C7.44008 5.8445 7.62502 5.78514 7.80693 6.22242C7.99388 6.67137 8.44223 7.77534 8.49837 7.88743C8.55452 7.99971 8.59174 8.13052 8.51709 8.28023C8.44243 8.42975 8.405 8.52332 8.29291 8.65433C8.18083 8.78533 8.05747 8.94672 7.95645 9.04714C7.84416 9.15902 7.72724 9.28037 7.85805 9.50474C7.98885 9.72932 8.43881 10.4636 9.10549 11.0583C9.96194 11.8224 10.6846 12.059 10.9087 12.1713C11.1329 12.2836 11.2637 12.2649 11.3945 12.1151C11.5253 11.9654 11.9552 11.4603 12.1047 11.236C12.2542 11.0116 12.4037 11.049 12.6092 11.1237C12.8148 11.1985 13.9172 11.7411 14.1414 11.8531C14.3655 11.9654 14.5151 12.0216 14.5712 12.1151C14.6273 12.2087 14.6273 12.6577 14.4404 13.1815C14.2535 13.7053 13.3576 14.1834 12.9267 14.2476C12.5404 14.3054 12.0516 14.3295 11.5143 14.1587C11.1887 14.0554 10.7709 13.9174 10.2358 13.6864C7.98663 12.715 6.51763 10.4501 6.40534 10.3004Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                            </a>
                                        </li>

                                        <li className={styles.newsVideoSocialsitem}>
                                            <a href="#" className={styles.socialIcon}>
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
                                        </li>

                                        <li className={styles.newsVideoSocialsitem}>
                                            <a href="https://vk.com" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
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
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id='banner' className={styles.banner}>
                <div className={`${styles.container} container`}>
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
                </div>
            </section>

            <section id='news' className={styles.newsBlock}>
                <div className={`${styles.container} container`}>
                    <div className={`${styles.newsHeaderBlock} ${styles.newsHeaderBlock}`}>
                        <div className={styles.newsHeaderBottomBlock}>
                            <h3 className={styles.newsHeaderInfo}>
                                Другие новости
                            </h3>
                        </div>
                    </div>
                    <div className={styles.newsCardsContainer}>
                        {isNewsMobile ? (
                            <Swiper
                                spaceBetween={20}
                                slidesPerView={2}
                                className={styles.newsSwiper}
                                breakpoints={{
                                    300: {
                                        slidesPerView: 1.1, // 2 слайда на экранах ≥ 768px
                                        spaceBetween: 20,
                                    },
                                    768: {
                                        slidesPerView: 2, // 2 слайда на экранах ≥ 768px
                                        spaceBetween: 20,
                                    },
                                    1440: {
                                        slidesPerView: 3, // 3 слайда на экранах ≥ 1440px
                                        spaceBetween: 20,
                                    },
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
                                                width={200}
                                                height={200}
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
                                                width={200}
                                                height={200}
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
                                                width={200}
                                                height={200}
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
                                            width={200}
                                            height={200}
                                            className={styles.newsImage}
                                        />
                                        <h4 className={styles.newsCardTitle}>СТМ растёт: мы начали выпуск блинов для сети «Пятёрочка»</h4>
                                        <p className={styles.newsCardDescription}>
                                            18 апреля 2025 • Партнёрство
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
                                            src="/news9.png"
                                            alt="Пирожные"
                                            width={587}
                                            height={374}
                                            className={styles.newsImage}
                                        />
                                        <h4 className={styles.newsCardTitle}>Провели аудит качества — без единого замечания</h4>
                                        <p className={styles.newsCardDescription}>
                                            9 апреля 2025  •  Производство
                                        </p>
                                    </Link>
                                </motion.div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            <Footer></Footer>
        </>
    );
}