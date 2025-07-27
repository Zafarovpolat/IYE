'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '../../components/Footer/Footer';
import Button from '../../components/Button/Button';
import styles from '../../styles/VacanciesDetail.module.css';

import { useState, useEffect, useRef } from 'react';

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
    const vacancyDetailWrapperRef = useRef(null); // Ссылка на .vacancyDetailWrapper
    const vacancyDetailRightRef = useRef(null);
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [cityError, setCityError] = useState('');
    const [textAreaError, setTextAreaError] = useState('');
    const [fileError, setFileError] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [focusedInputs, setFocusedInputs] = useState({});
    const [inputValues, setInputValues] = useState({
        name: '',
        phone: '',
        email: '',
        city: '',
        textArea: ''
    });

    useEffect(() => {
        const foundVacancy = vacanciesDataActive.find((v) => v.id === id);
        setVacancy(foundVacancy);

    }, [id]);

    useEffect(() => {
        let timeoutId;

        const debounce = (func, delay) => {
            return (...args) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => func(...args), delay);
            };
        };

        const handleScrollAndResize = () => {
            if (vacancyDetailWrapperRef.current && vacancyDetailRightRef.current) {
                const button = vacancyDetailRightRef.current;
                const wrapper = vacancyDetailWrapperRef.current;
                // Вычисляем исходную позицию кнопки с учётом всех отступов
                const wrapperRect = wrapper.getBoundingClientRect();
                const buttonOffsetTop = button.offsetTop; // Отступ кнопки относительно родителя
                const originalButtonTop = wrapperRect.top + buttonOffsetTop + window.scrollY + 60; // Учитываем padding-bottom 60px
                const windowBottom = window.scrollY + window.innerHeight;

                // Проверяем, достиг ли нижний край окна исходной позиции кнопки
                if (windowBottom >= originalButtonTop) {
                    button.classList.add(styles.static); // Переключаем на position: static
                } else {
                    button.classList.remove(styles.static); // Возвращаем position: fixed
                }
            }
        };

        const debouncedHandleScrollAndResize = debounce(handleScrollAndResize, 100);

        window.addEventListener('scroll', debouncedHandleScrollAndResize);
        window.addEventListener('resize', debouncedHandleScrollAndResize);

        // Вызываем сразу для инициализации
        handleScrollAndResize();

        return () => {
            window.removeEventListener('scroll', debouncedHandleScrollAndResize);
            window.removeEventListener('resize', debouncedHandleScrollAndResize);
            clearTimeout(timeoutId);
        };
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        document.body.style.overflowY = !isModalOpen ? 'hidden' : 'scroll';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflowY = !isModalOpen ? 'hidden' : 'scroll';
    };

    const handleFocus = (inputName) => {
        setFocusedInputs(prev => ({ ...prev, [inputName]: true }));
    };

    const handleBlur = (inputName) => {
        if (!inputValues[inputName]) {
            setFocusedInputs(prev => ({ ...prev, [inputName]: false }));
        }

        if (inputName === 'name') validateName(inputValues.name);
        else if (inputName === 'phone') validatePhone(inputValues.phone);
        else if (inputName === 'email') validateEmail(inputValues.email);
        else if (inputName === 'city') validateCity(inputValues.city);
        else if (inputName === 'textArea') validateTextArea(inputValues.textArea);
    };

    const formatPhoneNumber = (value) => {
        const numbers = value.replace(/\D/g, '');
        let formattedNumbers = numbers;
        if (numbers.startsWith('8')) {
            formattedNumbers = '7' + numbers.slice(1);
        }
        if (!formattedNumbers.startsWith('7') && formattedNumbers.length > 0) {
            formattedNumbers = '7' + formattedNumbers;
        }
        formattedNumbers = formattedNumbers.slice(0, 11);
        if (formattedNumbers.length >= 1) {
            let formatted = '+7';
            if (formattedNumbers.length > 1) {
                formatted += ' ' + formattedNumbers.slice(1, 4);
            }
            if (formattedNumbers.length > 4) {
                formatted += ' ' + formattedNumbers.slice(4, 7);
            }
            if (formattedNumbers.length > 7) {
                formatted += '-' + formattedNumbers.slice(7, 9);
            }
            if (formattedNumbers.length > 9) {
                formatted += '-' + formattedNumbers.slice(9, 11);
            }
            return formatted;
        }
        return value === '' ? '' : '+7 ';
    };

    const validateName = (name) => {
        if (!name.trim()) {
            setNameError('Пожалуйста, введите имя и фамилию');
            return false;
        }
        if (name.trim().length < 2) {
            setNameError('Имя должно содержать не менее 2 символов');
            return false;
        }
        setNameError('');
        return true;
    };

    const validatePhone = (phone) => {
        const numbers = phone.replace(/\D/g, '');
        if (!phone.trim()) {
            setPhoneError('Пожалуйста, введите номер телефона');
            return false;
        }
        if (numbers.length < 11) {
            setPhoneError('Введите полный номер телефона');
            return false;
        }
        setPhoneError('');
        return true;
    };

    const validateEmail = (email) => {
        if (!email.trim()) {
            setEmailError('Пожалуйста, введите email');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError('Введите корректный email адрес');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validateCity = (city) => {
        if (!city.trim()) {
            setCityError('Пожалуйста, введите город');
            return false;
        }
        if (city.trim().length < 2) {
            setCityError('Название города должно содержать не менее 2 символов');
            return false;
        }
        setCityError('');
        return true;
    };

    const validateTextArea = (text) => {
        if (!text.trim()) {
            setTextAreaError('Пожалуйста, расскажите о себе');
            return false;
        }
        if (text.trim().length < 10) {
            setTextAreaError('Описание должно содержать не менее 10 символов');
            return false;
        }
        setTextAreaError('');
        return true;
    };

    const validateFile = (file) => {
        if (!file) {
            setFileError('Пожалуйста, прикрепите резюме');
            return false;
        }
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            setFileError('Файл должен быть в формате PDF или DOC');
            return false;
        }
        const maxSize = 10 * 1024 * 1024; // 10 MB
        if (file.size > maxSize) {
            setFileError('Файл не должен превышать 10 МБ');
            return false;
        }
        setFileError('');
        return true;
    };

    const handleChange = (inputName, value) => {
        if (inputName === 'phone') {
            const formattedPhone = formatPhoneNumber(value);
            setInputValues(prev => ({ ...prev, [inputName]: formattedPhone }));
            validatePhone(formattedPhone);
        } else if (inputName === 'file') {
            const file = value;
            setSelectedFile(file);
            validateFile(file);
        } else {
            setInputValues(prev => ({ ...prev, [inputName]: value }));
            if (inputName === 'name') validateName(value);
            else if (inputName === 'email') validateEmail(value);
            else if (inputName === 'city') validateCity(value);
            else if (inputName === 'textArea') validateTextArea(value);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const isNameValid = validateName(inputValues.name);
        const isPhoneValid = validatePhone(inputValues.phone);
        const isEmailValid = validateEmail(inputValues.email);
        const isCityValid = validateCity(inputValues.city);
        const isTextAreaValid = validateTextArea(inputValues.textArea);
        const isFileValid = validateFile(selectedFile);

        if (!isNameValid || !isPhoneValid || !isEmailValid || !isCityValid || !isTextAreaValid || !isFileValid) {
            return;
        }

        console.log('Form submitted:', { ...inputValues, file: selectedFile });
        setIsModalOpen(false);
        setIsSuccessModalOpen(true);
        setInputValues({
            name: '',
            phone: '',
            email: '',
            city: '',
            textArea: ''
        });
        setSelectedFile(null);
        setFocusedInputs({
            name: false,
            phone: false,
            email: false,
            city: false,
            textArea: false
        });
        setNameError('');
        setPhoneError('');
        setEmailError('');
        setCityError('');
        setTextAreaError('');
        setFileError('');
    };

    const closeSuccessModal = () => {
        setIsSuccessModalOpen(false);
        document.body.style.overflowY = 'scroll';
    };

    if (!vacancy) {
        return (
            <div className={`${styles.container} container`}>
                <h3>Вакансия не найдена</h3>
                <Button>Вернуться к списку вакансий</Button>
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
                    <div className={styles.vacancyDetailWrapper} ref={vacancyDetailWrapperRef}>
                        <div className={styles.vacancyDetailLeft}>
                            <div className={styles.vacancyDetailInfo}>
                                <h4 className={styles.vacancyDetailInfoTitle}>обязанности</h4>
                                <ul className={styles.vacancyDetailInfoList}>
                                    {vacancy.responsibilities.map((res, index) => (
                                        <li key={index} className={styles.vacancyDetailInfoItem}>
                                            <div className={styles.dot}></div>
                                            {res}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={styles.vacancyDetailInfo}>
                                <h4 className={styles.vacancyDetailInfoTitle}>требования</h4>
                                <ul className={styles.vacancyDetailInfoList}>
                                    {vacancy.requirements.map((res, index) => (
                                        <li key={index} className={styles.vacancyDetailInfoItem}>
                                            <div className={styles.dot}></div>
                                            {res}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className={styles.vacancyDetailInfo}>
                                <h4 className={styles.vacancyDetailInfoTitle}>условия</h4>
                                <ul className={styles.vacancyDetailInfoList}>
                                    {vacancy.conditions.map((res, index) => (
                                        <li key={index} className={styles.vacancyDetailInfoItem}>
                                            <div className={styles.dot}></div>
                                            {res}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className={styles.vacancyDetailRight} ref={vacancyDetailRightRef}>
                            <button className={styles.vacancyDetailBtn} onClick={toggleModal}>Откликнуться на вакансию</button>
                        </div>
                    </div>
                    <div className={styles.vacancyDetailBottom}>
                        <div className={styles.vacancyDetailContact}>
                            <h4 className={styles.vacancyDetailContactTitle}>контакты по вопросам трудоустройства</h4>
                            <Link href={`mailto:${vacancy.contacts}`} className={styles.vacancyDetailContactSubTitle}>{vacancy.contacts}</Link>
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
                                        <Image className={styles.contactFormImage} src={'/Ellipse.svg'} width={449} height={449} alt="Ellipse" />
                                        <h4 className={styles.contactFormSubTitle}>отклик на вакансию</h4>
                                        <h3 className={styles.contactFormTitle}>{vacancy.title}</h3>
                                        <p className={styles.contactFormInfo}>
                                            {vacancy.category} • {vacancy.schedule} <span> • {vacancy.location}</span>
                                        </p>
                                    </div>
                                    <div className={styles.partnersFormRight}>
                                        <div className={styles.partnersFormRightUp}>
                                            <div className={styles.inputContainer}>
                                                <input
                                                    type="text"
                                                    className={`${styles.partnersInput} ${nameError ? styles.inputError : ''}`}
                                                    value={inputValues.name}
                                                    onFocus={() => handleFocus('name')}
                                                    onBlur={() => handleBlur('name')}
                                                    onChange={(e) => handleChange('name', e.target.value)}
                                                />
                                                <label className={`${styles.customPlaceholder} ${focusedInputs.name || inputValues.name ? styles.active : ''}`}>
                                                    Имя и Фамилия
                                                </label>
                                                {nameError && (
                                                    <div className={styles.errorMessage}>
                                                        {nameError}
                                                    </div>
                                                )}
                                            </div>
                                            <div className={styles.inputContainer}>
                                                <input
                                                    type="email"
                                                    className={`${styles.partnersInput} ${emailError ? styles.inputError : ''}`}
                                                    value={inputValues.email}
                                                    onFocus={() => handleFocus('email')}
                                                    onBlur={() => handleBlur('email')}
                                                    onChange={(e) => handleChange('email', e.target.value)}
                                                />
                                                <label className={`${styles.customPlaceholder} ${focusedInputs.email || inputValues.email ? styles.active : ''}`}>
                                                    Электронная почта
                                                </label>
                                                {emailError && (
                                                    <div className={styles.errorMessage}>
                                                        {emailError}
                                                    </div>
                                                )}
                                            </div>
                                            <div className={styles.inputContainer}>
                                                <input
                                                    type="tel"
                                                    className={`${styles.partnersInput} ${phoneError ? styles.inputError : ''}`}
                                                    value={inputValues.phone}
                                                    onFocus={() => handleFocus('phone')}
                                                    onBlur={() => handleBlur('phone')}
                                                    onChange={(e) => handleChange('phone', e.target.value)}
                                                    placeholder=""
                                                />
                                                <label className={`${styles.customPlaceholder} ${focusedInputs.phone || inputValues.phone ? styles.active : ''}`}>
                                                    Номер телефона
                                                </label>
                                                {phoneError && (
                                                    <div className={styles.errorMessage}>
                                                        {phoneError}
                                                    </div>
                                                )}
                                            </div>
                                            <div className={styles.inputContainer}>
                                                <input
                                                    type="text"
                                                    className={`${styles.partnersInput} ${cityError ? styles.inputError : ''}`}
                                                    value={inputValues.city}
                                                    onFocus={() => handleFocus('city')}
                                                    onBlur={() => handleBlur('city')}
                                                    onChange={(e) => handleChange('city', e.target.value)}
                                                />
                                                <label className={`${styles.customPlaceholder} ${focusedInputs.city || inputValues.city ? styles.active : ''}`}>
                                                    Город
                                                </label>
                                                {cityError && (
                                                    <div className={styles.errorMessage}>
                                                        {cityError}
                                                    </div>
                                                )}
                                            </div>
                                            <div className={styles.inputContainer}>
                                                <textarea
                                                    className={`${styles.partnersTextArea} ${textAreaError ? styles.inputError : ''}`}
                                                    name="textArea"
                                                    value={inputValues.textArea}
                                                    onFocus={() => handleFocus('textArea')}
                                                    onBlur={() => handleBlur('textArea')}
                                                    onChange={(e) => handleChange('textArea', e.target.value)}
                                                />
                                                <label className={`${styles.customPlaceholder} ${focusedInputs.textArea || inputValues.textArea ? styles.active : ''}`}>
                                                    Расскажите о себе
                                                </label>
                                                {textAreaError && (
                                                    <div className={styles.errorMessage}>
                                                        {textAreaError}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className={styles.partnersFileBox}>
                                            <input
                                                className={`${styles.partnersFileInput} ${fileError ? styles.inputError : ''}`}
                                                type="file"
                                                id="partnersFile"
                                                onChange={(e) => handleChange('file', e.target.files[0])}
                                            />
                                            <label className={styles.partnersFileLabel} htmlFor="partnersFile">
                                                <Image src={'/paperclip.svg'} width={24} height={24} alt="attach" />
                                                <div className={styles.partnersFiletext}>
                                                    <h5 className={styles.partnersFileInputTitle}>Прикрепить резюме</h5>
                                                    <h6 className={styles.partnersFileInputInfo}>pdf, doc до 10 мб</h6>
                                                </div>
                                            </label>
                                            {fileError && (
                                                <div className={styles.errorMessage}>
                                                    {fileError}
                                                </div>
                                            )}
                                        </div>
                                        <div className={styles.partnersFormRightBottom}>
                                            <button className={styles.partnersFormSubmit} type="submit">Отправить заявку</button>
                                            <p className={styles.partnersPolicy}>
                                                Нажимая на кнопку, вы соглашаетесь с <Link href={'/privacy'}>политикой конфиденциальности</Link>
                                            </p>
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
                                    <Image className={styles.successModalImage} src={'/Ellipse.svg'} width={449} height={449}></Image>
                                    <div className={styles.successModalInner}>
                                        <Image src={'/email.svg'} width={52} height={52}></Image>
                                        <h3 className={styles.successModalTitle}>Заявка отправлена</h3>
                                        <p className={styles.successModalInfo}>
                                            Спасибо за интерес к партнёрству! Мы получили вашу заявку и свяжемся с вами в ближайшее время.
                                        </p>
                                        <p className={styles.successModalInfo}>
                                            Если у вас остались вопросы, вы всегда можете позвонить нам по телефону <span><a href="tel:+70000000000">+7 (000) 000–00–00</a></span> или написать на <span><a href="mailto:stm@ideologia.ru">stm@ideologia.ru</a></span>
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