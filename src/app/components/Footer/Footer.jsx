import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p>© 2025 Идеология Еды. Все права защищены.</p>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li><Link href="/contacts">Контакты</Link></li>
                        <li><Link href="/vacancies">Вакансии</Link></li>
                        <li><Link href="/news">Новости</Link></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
}