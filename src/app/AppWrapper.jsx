'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LoadingProgress from './components/loading';

export default function AppWrapper({ children }) {
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        console.log('Route changed to:', pathname);
        setIsLoadingComplete(false);
    }, [pathname]);

    const handleLoadingComplete = () => {
        console.log('Loading animation completed for:', pathname);
        setIsLoadingComplete(true);
    };

    return (
        <>
            {!isLoadingComplete && (
                <LoadingProgress onComplete={handleLoadingComplete} />
            )}
            {isLoadingComplete && children}
        </>
    );
}