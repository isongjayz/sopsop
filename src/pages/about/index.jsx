import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './style.scss';

const About = () => {
    const containerRef = useRef(null);

    useGSAP(() => {
        // Hero reveal
        gsap.from('.about__hero-title', {
            y: 50,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
        });

        gsap.from('.about__hero-desc', {
            y: 30,
            opacity: 0,
            duration: 1,
            delay: 0.3,
            ease: 'power3.out',
        });

        // Section reveals
        const sections = gsap.utils.toArray('.about__section');
        sections.forEach((section) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: 'power2.out',
            });
        });
    }, { scope: containerRef });

    return (
        <main className="about" ref={containerRef}>
            {/* Hero Section */}
            <section className="about__hero">
                <div className="inner">
                    <div className="about__hero-content">
                        <h1 className="about__hero-title font-serif">
                            A <span className="italic">philosophical</span> approach 
                            <br /> to skin and body care
                        </h1>
                        <p className="about__hero-desc">
                            우리는 단순히 제품을 만드는 것을 넘어, 
                            <br /> 감각적인 경험과 진정성 있는 가치를 전달하고자 합니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="about__section about__philosophy">
                <div className="inner">
                    <div className="about__section-grid">
                        <div className="about__section-image">
                            <img src="/images/about/philosophy.jpg" alt="Aesop Philosophy" />
                        </div>
                        <div className="about__section-text">
                            <h2 className="font-serif">Our Philosophy</h2>
                            <p>
                                에이솝의 철학은 아주 단순합니다. 
                                최상의 품질을 갖춘 성분들을 선별하여, 
                                세심하게 고안된 포뮬레이션을 통해 
                                당신의 일상에 균형을 가져다주는 것입니다.
                            </p>
                            <p>
                                우리는 과학적 탐구와 미학적 가치를 결합하여 
                                피부 건강뿐만 아니라 마음의 평온까지 고려한 
                                토탈 배려의 경험을 선사합니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Design Section */}
            <section className="about__section about__design">
                <div className="inner">
                    <div className="about__section-grid reverse">
                        <div className="about__section-text">
                            <h2 className="font-serif">Design & Aesthetics</h2>
                            <p>
                                에이솝에게 디자인이란 단순한 장식을 넘어선 
                                지적인 탐구의 과정입니다. 
                                우리는 각 매장이 위치한 지역의 역사와 
                                문화를 존중하며 고유한 개성을 담아냅니다.
                            </p>
                            <p>
                                정중하고도 세심한 공간 구성을 통해 
                                고객이 머무는 시간 동안 진정한 휴식과 
                                영감을 얻을 수 있도록 배려합니다.
                            </p>
                        </div>
                        <div className="about__section-image">
                            <img src="/images/about/design.jpg" alt="Aesop Design" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sustainable Section */}
            <section className="about__section about__sustainable">
                <div className="inner">
                    <div className="about__sustainable-content">
                        <h2 className="font-serif italic">Sustainability</h2>
                        <p>
                            우리는 환경에 미치는 영향을 최소화하고 
                            커뮤니티와 공존하기 위한 지속 가능한 경영을 실천합니다. 
                            포장재의 효율적인 사용부터 원료의 투명한 수급까지, 
                            지구를 위한 책임을 다하고자 끊임없이 노력합니다.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default About;
