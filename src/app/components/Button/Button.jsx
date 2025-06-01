'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './Button.module.css';

export default function Button({ className, text }) { // Добавляем className как пропс

    if (!text) {
        text = "О компании"; // Значение по умолчанию для текста кнопки
    }

    const svgVariants = {
        initial: { rotate: 0, stroke: "#159F4A" },
        hover: { rotate: 45, stroke: "#0D7F39" },
    };

    return (
        <div className={`${className} ${styles.buttonBox}`}>
            <Link href="/about" className={`${styles.buttonLink}`}>
                <motion.button
                    className={styles.button}
                    initial="initial"
                    whileHover="hover"
                    whileFocus="hover#"
                >
                    <span className={styles.text}>{text}</span>
                    <motion.svg
                        className={styles.arrow}
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        variants={svgVariants}
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <motion.path
                            d="M12 28.6667L28.6667 12"
                        />
                        <motion.path
                            d="M12 12H28.6667V28.6667"
                        />
                    </motion.svg>
                </motion.button>
            </Link>
        </div>
    );
}