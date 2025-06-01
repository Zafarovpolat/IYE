import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import styles from './styles/Layout.module.css'; // Импортируем стили

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Идеология Еды',
    description: 'Сайт компании Идеология Еды',
    openGraph: {
        title: 'Идеология Еды',
        description: 'Сайт компании Идеология Еды',
        url: 'https://your-site.com',
        siteName: 'Идеология Еды',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Идеология Еды',
            },
        ],
        locale: 'ru_RU',
        type: 'website',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
            <body className={inter.className}>
                <Header />
                <main className={styles.main}>{children}</main>
                <Footer />
            </body>
        </html>
    );
}