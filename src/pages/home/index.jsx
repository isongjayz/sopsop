import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.scss';
import { getHomeStageMetrics } from './homeStage';

import {
    HomeHero,
    HomeBrandStory,
    HomeValues,
    HomeBotanicals,
    HomeQuote,
    HomeGiftGuide,
    HomeCoda,
} from './components';

// Home page container.
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const homeRef = useRef(null);
    const [stageMetrics, setStageMetrics] = useState(null);

    useEffect(() => {
        const homeElement = homeRef.current;

        if (!homeElement) {
            return undefined;
        }

        const updateStageMetrics = () => {
            const { guideLineX, stageHeight, stageScale, stageUpScale, stageWidth } =
                getHomeStageMetrics(homeElement.clientWidth || window.innerWidth);

            setStageMetrics({
                '--home-stage-guide-line-x': `${guideLineX}px`,
                '--home-stage-height': `${stageHeight}px`,
                '--home-stage-max-width': `${stageWidth}px`,
                '--home-stage-scale': `${stageScale}`,
                '--home-stage-upscale': `${stageUpScale}`,
                '--home-stage-width': `${stageWidth}px`,
            });
        };

        updateStageMetrics();

        const resizeObserver = new ResizeObserver(() => {
            updateStageMetrics();
        });

        resizeObserver.observe(homeElement);
        window.addEventListener('resize', updateStageMetrics);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', updateStageMetrics);
        };
    }, []);

    useEffect(() => {
        if (!stageMetrics) {
            return undefined;
        }

        let frameId = null;
        let nestedFrameId = null;

        frameId = window.requestAnimationFrame(() => {
            nestedFrameId = window.requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });
        });

        return () => {
            if (frameId !== null) {
                window.cancelAnimationFrame(frameId);
            }

            if (nestedFrameId !== null) {
                window.cancelAnimationFrame(nestedFrameId);
            }
        };
    }, [stageMetrics]);

    return (
        <main ref={homeRef} className="home" style={stageMetrics ?? undefined}>
            <HomeHero />
            <HomeBrandStory />
            <HomeValues />
            <HomeBotanicals />
            <HomeQuote />
            <HomeGiftGuide />
            <HomeCoda />
        </main>
    );
};

export default Home;
