'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/Loading.module.css';
import Image from 'next/image';

export default function LoadingProgress({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('LoadingProgress mounted');
        setProgress(0);
        setIsVisible(true);

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    console.log('Progress reached 100%');
                    setTimeout(() => {
                        console.log('Hiding loading screen');
                        setIsVisible(false);
                        if (onComplete) {
                            console.log('Calling onComplete');
                            onComplete();
                        }
                    }, 500);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);

        return () => {
            console.log('Cleaning up interval');
            clearInterval(interval);
        };
    }, [onComplete]);

    if (error) {
        console.error('LoadingProgress error:', error);
        return null; // Fallback if there's an error
    }

    if (!isVisible) return null;

    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loading}>
                <h1 className={styles.loadingText}>{Math.floor(progress)}</h1>
                <Image
                    className={styles.loadingImage}
                    src={'/Percents.svg'}
                    width={67}
                    height={59}
                    alt="Loading progress"
                    onError={(e) => {
                        console.error('Image load error:', e);
                        setError('Failed to load Percents.svg');
                    }}
                />
            </div>
            <div className={styles.loadingBar} style={{ width: `${progress}%` }}></div>
        </div>
    );
}