import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Home gift guide section.
function HomeGiftGuide() {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            // Featured gift items stagger in.
            gsap.from('.home__gift-item', {
                scrollTrigger: {
                    trigger: '.home__gift-featured',
                    start: 'top 75%',
                },
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power2.out',
            });

            gsap.to('.home__gift-bg svg', {
                x: 52,
                rotate: 2.1,
                duration: 3.9,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                transformOrigin: 'center',
            });
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef}>
            {/* Featured gift list */}
            <section className="home__gift-featured">
                {/* Background line artwork */}
                <div className="home__gift-bg">
                    <svg viewBox="0 0 1440 1200" fill="none" preserveAspectRatio="none">
                        <path d="M 0 150 Q 360 50 720 150 T 1440 150" stroke="#603b2d" strokeWidth="1" opacity="0.6" />
                        {/* <path d="M 0 550 Q 360 450 720 550 T 1440 550" stroke="#603b2d" strokeWidth="1" opacity="0.6" /> */}
                        <path d="M 0 550 Q 360 650 720 550 T 1440 550" stroke="#603b2d" strokeWidth="1" opacity="0.6" />
                        <path d="M 0 930 Q 360 830 720 930 T 1440 930" stroke="#603b2d" strokeWidth="1" opacity="0.6" />
                    </svg>
                </div>

                <div className="inner">
                    <div className="home__gift-list">
                        {/* Item 1 */}
                        <div className="home__gift-item">
                            <div className="home__gift-image">
                                <img src="images/gift_item1.jpg" alt="An Everyday Essential for a Balanced Life" />
                            </div>
                            <h3 className="font-serif">An Everyday Essential for a Balanced Life</h3>
                            <p>가장 많이 사랑받는 구성 속에 담긴 변치 않는 가치<br />실패 없는 선택을 넘어 정중한 환대의 마음까지 선물하세요.</p>
                            <Link to="/product/hand-wash-01" className="home__gift-link">바로가기</Link>
                        </div>

                        {/* Item 2 */}
                        <div className="home__gift-item">
                            <div className="home__gift-image">
                                <img src="images/gift_item2.jpg" alt="A Thoughtful Gesture of Quiet Sincerity" />
                            </div>
                            <h3 className="font-serif">A Thoughtful Gesture of Quiet Sincerity</h3>
                            <p>부담 없이 전하는 진심 속에 담긴 사유의 흔적,<br />작은 손길 하나로 당신의 감각적인 안목을 증명하는 선물입니다.</p>
                            <Link to="/product/hand-balm-01" className="home__gift-link">바로가기</Link>
                        </div>

                        {/* Item 3 */}
                        <div className="home__gift-item">
                            <div className="home__gift-image">
                                <img src="images/gift_item3.jpg" alt="A Scent for Lasting Memories" />
                            </div>
                            <h3 className="font-serif">A Scent for Lasting Memories</h3>
                            <p>소중한 이의 특별한 날을 완성하는 감각적인 향의 여정,<br />함께 나눈 시간의 밀도만큼 깊고 우아한 여운을 선물하세요.</p>
                            <Link to="/product/fragrance-01" className="home__gift-link">바로가기</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomeGiftGuide;
