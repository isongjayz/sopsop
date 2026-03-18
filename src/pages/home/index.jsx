import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.scss';

import {
    HomeHero,
    HomeBrandStory,
    HomeValues,
    HomeBotanicals,
    HomeBestSelection,
    HomeQuote,
    HomeGiftGuide,
    HomeCoda,
} from './components';

/**
 * 홈 페이지 컴포넌트
 * 
 * 히어로, 브랜드 스토리, 제품 하이라이트 등 모든 홈 섹션을 조합합니다.
 * GSAP ScrollTrigger를 사용하여 페이지 전체의 애니메이션을 조정합니다.
 */

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    return (
        <main className="home">
            <HomeHero />
            <HomeBrandStory />
            <HomeValues />
            <HomeBotanicals />
            <HomeBestSelection />
            <HomeQuote />
            <HomeGiftGuide />
            <HomeCoda />
        </main>
    );
};

export default Home;
