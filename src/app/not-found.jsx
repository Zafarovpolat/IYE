import Link from 'next/link';
import Image from 'next/image';
import styles from './styles/NotFound.module.css';

export default function Custom404() {
    return (
        <section className={styles['not-found']}>
            <div className={`${styles.container} container`}>
                <div className={styles.box}>
                    <Image src={'/404.png'} className={styles.image} alt="404" width={486} height={214}></Image>
                    <h2 className={styles.title}>Страница не найдена</h2>
                    <p className={styles.description}>
                        Такой страницы нет или она больше неактуальна. Вы можете вернуться на главную и продолжить знакомство с компанией
                    </p>
                    <Link href="/" className={styles.link}>Вернуться на главную</Link>
                </div>
            </div>
        </section>
    );
}