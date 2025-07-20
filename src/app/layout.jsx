import './globals.css';
import { Inter } from 'next/font/google';
import Head from 'next/head'; // Импортируем Head для добавления в <head>
import Header from './components/Header/Header';
import styles from './styles/Layout.module.css';
import AppWrapper from './AppWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Идеология Еды',
    description: 'Сайт компании Идеология Еды',
    openGraph: {
        title: 'Идеология Еды',
        description: 'Сайт компании Идеология Еды',
        url: 'https://iye-81rw.onrender.com',
        siteName: 'Идеология Еды',
        images: [
            {
                url: '/og-image.png',
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
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Organization',
                            name: 'Идеология Еды',
                            url: 'https://iye-81rw.onrender.com',
                            logo: 'https://iye-81rw.onrender.com/og-image.png',
                            description: 'Сайт компании Идеология Еды',
                            sameAs: [
                                // Добавьте ссылки на соцсети, если есть
                                'https://facebook.com/ideologyaedy',
                                'https://instagram.com/ideologyaedy',
                                // Другие соцсети
                            ],
                        }),
                    }}
                />
            </Head>
            <body className={inter.className}>
                <Header />
                <AppWrapper>{children}</AppWrapper>
            </body>
        </html>
    );
}