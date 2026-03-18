import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * HomeValues 컴포넌트 (기존 HomePhilosophy)
 * 
 * 브랜드가 추구하는 핵심 가치(미학, 윤리 등)를 수직 레이아웃으로 보여줍니다.
 * GSAP을 사용하여 스크롤 시 각 가치 항목이 순차적으로 등장합니다.
 */
function HomeValues() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // 스크롤 시 각 가치 항목에 대한 페이드인 애니메이션
        gsap.from('.home__values-item', {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
            },
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power2.out',
        });
    }, { scope: sectionRef });

    return (
        <section className="home__values" ref={sectionRef}>
            <div className="home__values-inner">
                {/* 수직 중앙 가이드 라인 */}
                <div className="home__values-line"></div>

                {/* Item 1 */}
                <div className="home__values-item">
                    <div className="home__values-image">
                        <img src="images/value_item1.jpg" alt="Nature Refined" />
                    </div>
                    <div className="home__values-content">
                        <h3 className="font-serif">Nature Refined</h3>
                        <h4>자연과 과학이 빚어낸 스킨케어</h4>
                        <p>Experience the perfect blend of botanical purity and scientific precision, meticulously formulated for your skin, hair, and body care needs.</p>
                    </div>
                </div>

                {/* Item 2 */}
                <div className="home__values-item">
                    <div className="home__values-image">
                        <img src="images/value_item2.jpg" alt="Essential Aesthetics" />
                    </div>
                    <div className="home__values-content">
                        <h3 className="font-serif">Essential Aesthetics</h3>
                        <h4>본질에 집중하는 절제의 미학</h4>
                        <p>A refined pursuit of purity that strips away the unnecessary, revealing the profound elegance of a skin care essence through mindful simplicity.</p>
                    </div>
                </div>

                {/* Item 3 */}
                <div className="home__values-item">
                    <div className="home__values-image">
                        <img src="images/value_item3.jpg" alt="Inspiring Rituals" />
                    </div>
                    <div className="home__values-content">
                        <h3 className="font-serif">Inspiring Rituals</h3>
                        <h4>영감을 채우는 지적이고 감각적인 여정</h4>
                        <p>A sophisticated journey of intellect and sense, curated to awaken your inspirations in the beauty of every moment.</p>
                    </div>
                </div>

                {/* Item 4 */}
                <div className="home__values-item">
                    <div className="home__values-image">
                        <img src="images/value_item4.jpg" alt="Ethical Commitments" />
                    </div>
                    <div className="home__values-content">
                        <h3 className="font-serif">Ethical Commitments</h3>
                        <h4>지구와 생명을 존중하는 확고한 발걸음</h4>
                        <p>A steadfast journey dedicated to honoring our planet and all living beings through conscious choices and unwavering integrity.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeValues;
