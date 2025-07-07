'use client';
import { useEffect, useState } from 'react';
import styles from './Carousel.module.css';
import 'font-awesome/css/font-awesome.min.css';

export default function Carousel() {
    const [currentMedia, setCurrentMedia] = useState(0);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentLogoCicleIndex, setCurrentLogoCicleIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [reloadBar, setReloadBar] = useState(false);
    const [intervalId, setIntervalId] = useState<number | NodeJS.Timeout>(0);
    const [isFirstVideoLoaded, setIsFirstVideoLoaded] = useState(false);

    const mediaList = [
        'https://xxxxxxxx/video1',
        'https://xxxxxxxx/video2',
        'https://xxxxxxxx/video3',
        'https://xxxxxxxx/video4',
        'https://xxxxxxxx/video5',
    ];

    const textList = [
        "Custom tools to optimize your business.",
        "Strategic solutions aligning technology with goals.",
        "Driving business forward with innovation.",
        "Connecting platforms for efficient operations."
    ];

    const logoCicle = [
        "〄M&C",
        "〄M&C",
        "〄M&C",
        "〄M&C"
    ];

    const prevMedia = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setReloadBar(true);

        setCurrentMedia(prev => prev === 0 ? mediaList.length - 1 : prev - 1);
        setCurrentTextIndex(prev => prev === 0 ? textList.length - 1 : prev - 1);
        setCurrentLogoCicleIndex(prev => prev === 0 ? logoCicle.length - 1 : prev - 1);
    };

    const nextMedia = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setReloadBar(true);

        setCurrentMedia(prev => prev === mediaList.length - 1 ? 0 : prev + 1);
        setCurrentTextIndex(prev => prev === textList.length - 1 ? 0 : prev + 1);
        setCurrentLogoCicleIndex(prev => prev === logoCicle.length - 1 ? 0 : prev + 1);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isAnimating) {
                nextMedia();
            }
        }, 8000);

        setIntervalId(interval);

        return () => {
            clearInterval(interval);
        };
    }, [isAnimating]);

    useEffect(() => {
        if (isAnimating) {
            const timer = setTimeout(() => setIsAnimating(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [isAnimating]);

    useEffect(() => {
        if (reloadBar) {
            const timer = setTimeout(() => setReloadBar(false), 50);
            return () => clearTimeout(timer);
        }
    }, [reloadBar]);

    return (
        <div className={styles['carousel-container']}>
            <div className={styles['image-container']}>

                {/* Mensaje de carga solo para el primer video */}
                {!isFirstVideoLoaded && currentMedia === 0 && (
                    <div className={styles['video-loading']}>
                        Loading ...
                    </div>
                )}

                <div className={styles['custom-image']}>
                    <div
                        className={`${styles['image-slide']} ${isAnimating ? styles['slide-animation'] : ''}`}
                        style={{
                            transform: `translateX(-${currentMedia * 100}%)`,
                            transition: isAnimating ? 'transform 1s ease-in-out' : 'none'
                        }}
                    >
                        {mediaList.map((media, index) => (
                            <div key={index} className={styles['image-wrapper']}>
                                <video
                                    className={styles['carousel-video']}
                                    src={media}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    onCanPlayThrough={() => {
                                        // if (index === 0) setIsFirstVideoLoaded(true);
                                        if (index === 0) setTimeout(() => setIsFirstVideoLoaded(true), 1500); // Simula 1.5 segundos de "carga"

                                    }}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles['loading-bar']} key={reloadBar ? 'reload' : 'no-reload'}></div>

                <div className={styles['arrow-container']}>
                    <i
                        className={`${styles['arrow-left']} fa fa-chevron-left`}
                        onClick={prevMedia}
                    ></i>
                    <i
                        className={`${styles['arrow-right']} fa fa-chevron-right`}
                        onClick={nextMedia}
                    ></i>
                </div>
            </div>
        </div>
    );
}

