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

// Home page container.
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
