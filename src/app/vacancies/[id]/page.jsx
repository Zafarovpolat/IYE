'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';
import styles from '../../styles/VacanciesDetail.module.css';

import { useState, useEffect } from 'react';

const vacanciesDataActive = [
    {
        id: '1',
        title: 'Повар на производство',
        category: 'Производство',
        schedule: 'Полный день',
        location: 'Москва',
        responsibilities: [
            'Приготовление полуфабрикатов и готовой продукции согласно технологическим картам',
            'Соблюдение санитарных норм и стандартов безопасности на всех этапах',
            'Контроль качества сырья и готовых блюд',
            'Работа с производственным оборудованием',
            'Поддержание порядка на рабочем месте'
        ],
        requirements: [
            'Опыт работы поваром на производстве или в кулинарии от 1 года',
            'Знание санитарных норм и стандартов пищевой безопасности',
            'Умение работать по технологическим картам',
            'Ответственность, аккуратность, дисциплина',
            'Готовность к работе в интенсивном режиме'
        ],
        conditions: [
            'График работы: сменный (обсуждается индивидуально)',
            'Современное автоматизированное производство',
            'Официальное оформление по ТК РФ',
            'Комфортные условия труда, спецодежда предоставляется',
            'Возможность карьерного роста внутри компании',
            'Производство находится в Москве'
        ],
        contacts: 'hr@ideologia.ru'
    },
];

const vacanciesData = [
    { id: '1', title: 'Повар на производство', category: 'Производство', schedule: 'Полный день', location: 'Москва' },
    { id: '2', title: 'Фасовщик / Упаковщик', category: 'Производство', schedule: 'Сменный график', location: 'Москва' },
    { id: '3', title: 'Оператор производственной линии', category: 'Производство', schedule: 'Вахта', location: 'Москва' },
    { id: '4', title: 'Технолог пищевого производства', category: 'Производство', schedule: 'Полный день', location: 'Москва' },
];

export default function VacanciesDetail() {
    const { id } = useParams();
    const [vacancy, setVacancy] = useState(null);

    useEffect(() => {
        const foundVacancy = vacanciesDataActive.find((v) => v.id === id);
        setVacancy(foundVacancy);
    }, [id]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission logic (e.g., API call)
        setIsModalOpen(false); // Close the first modal
        setIsSuccessModalOpen(true); // Open the success modal
    };

    const closeSuccessModal = () => {
        setIsSuccessModalOpen(false);
    };

    if (!vacancy) {
        return (
            <div className={`${styles.container} container`}>
                <h3>Вакансия не найдена</h3>
                <Link href="/vacancies">
                    <Button>Вернуться к списку вакансий</Button>
                </Link>
            </div>
        );
    }

    return (
        <>
            <section id="vacancyDetail" className={styles.vacancyDetail}>
                <div className={`${styles.container} container`}>
                    <div className={styles.backLink}>
                        <Link href="/vacancies">
                            <Image src={"/arrow-left.svg"} width={24} height={24}></Image>
                        </Link>
                    </div>
                    <h2 className={styles.vacancyDetailTitle}>{vacancy.title}</h2>
                    <p className={styles.vacancyDetailSubTitle}>
                        {`${vacancy.category} • ${vacancy.schedule} • ${vacancy.location}`}
                    </p>
                    <div className={styles.vacancyDetailWrapper}>
                        <div className={styles.vacancyDetailLeft}>
                            <div className={styles.vacancyDetailInfo}>
                                <h4 className={styles.vacancyDetailInfoTitle}>обязанности</h4>
                                <ul className={styles.vacancyDetailInfoList}>
                                    {vacancy.responsibilities.map((res, index) => (
                                        <li key={index} className={styles.vacancyDetailInfoItem}>{res}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className={styles.vacancyDetailInfo}>
                                <h4 className={styles.vacancyDetailInfoTitle}>требования</h4>
                                <ul className={styles.vacancyDetailInfoList}>
                                    {vacancy.requirements.map((res, index) => (
                                        <li key={index} className={styles.vacancyDetailInfoItem}>{res}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className={styles.vacancyDetailInfo}>
                                <h4 className={styles.vacancyDetailInfoTitle}>условия</h4>
                                <ul className={styles.vacancyDetailInfoList}>
                                    {vacancy.conditions.map((res, index) => (
                                        <li key={index} className={styles.vacancyDetailInfoItem}>{res}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className={styles.vacancyDetailRight}>
                            <button className={styles.vacancyDetailBtn} onClick={toggleModal}>Откликнуться на вакансию</button>
                        </div>
                    </div>
                    <div className={styles.vacancyDetailBottom}>
                        <div className={styles.vacancyDetailContact}>
                            <h4 className={styles.vacancyDetailContactTitle}>контакты по вопросам трудоустройства</h4>
                            <a href="/" className={styles.vacancyDetailContactSubTitle}>{vacancy.contacts}</a>
                        </div>
                    </div>

                    {isModalOpen && (
                        <div className={styles.modalOverlay} onClick={closeModal}>
                            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                                <button className={styles.closeButton} onClick={closeModal}>
                                    ✕
                                </button>
                                <form onSubmit={handleFormSubmit} className={styles.contactForm}>
                                    <div className={styles.contactFormLeft}>
                                        <h4 className={styles.contactFormSubTitle}>отклик на вакансию</h4>
                                        <h3 className={styles.contactFormTitle}>{vacancy.title}</h3>
                                        <p className={styles.contactFormInfo}>
                                            {vacancy.category} • {vacancy.schedule} <span> • {vacancy.location}</span>
                                        </p>
                                    </div>
                                    <div className={styles.partnersFormRight}>
                                        <div className={styles.partnersFormRightUp}>
                                            <input type="text" placeholder='Имя и Фамилия' className={styles.partnersInput} />
                                            <input type="email" placeholder='Электронная почта' className={styles.partnersInput} />
                                            <input type="tel" placeholder='Номер телефона' className={styles.partnersInput} />
                                            <input type="text" placeholder='Город' className={styles.partnersInput} />
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
                                            <button className={styles.partnersFormSubmit} type='submit'>Отправить заявку</button>
                                            <p className={styles.partnersPolicy}>Нажимая на кнопку, вы соглашаетесь с <Link href={'/'}>
                                                политикой конфиденциальности</Link></p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    {isSuccessModalOpen && (
                        <div className={styles.modalOverlay} onClick={closeSuccessModal}>
                            <div className={styles.successModalContent} onClick={(e) => e.stopPropagation()}>
                                <button className={styles.closeButton} onClick={closeSuccessModal}>
                                    ✕
                                </button>
                                <div className={styles.successModal}>
                                    <div className={styles.successModalInner}>
                                        <Image src={'/email.svg'} width={52} height={52}></Image>
                                        <h3 className={styles.successModalTitle}>Заявка отправлена</h3>
                                        <p className={styles.successModalInfo}>
                                            Спасибо за интерес к партнёрству! Мы получили вашу заявку и свяжемся с вами в ближайшее время.
                                        </p>
                                        <p className={styles.successModalInfo}>
                                            Если у вас остались вопросы, вы всегда можете позвонить нам по телефону <span><a href="">+7 (000) 000–00–00</a></span> или написать на <span><a href="">stm@ideologia.ru</a></span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section id='vacancies' className={styles.vacancies}>
                <div className={`${styles.container} container`}>
                    <div className={styles.vacanciesWrapper}>
                        <h3 className={styles.vacanciesSubTitle}>Похожие вакансии</h3>
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
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}