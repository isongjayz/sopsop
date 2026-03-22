import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * HomeGiftGuide 컴포넌트
 * 
 * 기프트 가이드 섹션과 대표 기프트 제품 리스트를 보여줍니다.
 * 제품 노출 시 순차적인(Staggered) 애니메이션이 적용되어 있습니다.
 */
function HomeGiftGuide() {
    const containerRef = useRef(null);

    useGSAP(() => {
        // 메인 기프트 가이드 콘텐츠 애니메이션
        gsap.from('.home__gift-guide-content', {
            scrollTrigger: {
                trigger: '.home__gift-guide',
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
        });

        // 대표 기프트 제품들에 대한 순차적 노출 애니메이션
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
    }, { scope: containerRef });

    return (
        <div ref={containerRef}>
            {/* ===== Gift Guide (기프트 가이드 공지) ===== */}
            <section className="home__gift-guide">
                <div className="inner">
                    <div className="home__gift-guide-content">
                        <h2 className="home__gift-guide-title">
                            Aesop’s <span className="italic">sensorial</span> care experiences to<br />
                            share with someone <span className="italic">special</span>
                        </h2>
                        <p className="home__gift-guide-desc">
                            이솝의 감각적인 케어 경험을 소중한 사람에게 전해보세요.<br />
                            일상 속 순간을 더욱 특별하게 만들어 줍니다.
                        </p>
                        <Link to="/gift" className="home__gift-guide-btn">Gift Guide</Link>
                    </div>
                </div>
            </section>

            {/* ===== Featured Gifts (대표 기프트 제품 리스트) ===== */}
            <section className="home__gift-featured">
                {/* 배경 물결 라인 */}
                <div className="home__gift-bg">
                    <svg viewBox="0 0 1440 1200" fill="none" preserveAspectRatio="none">
                        <path d="M 0 200 Q 360 100 720 200 T 1440 200" stroke="#603b2d" strokeWidth="1" opacity="0.6" />
                        <path d="M 0 600 Q 360 700 720 600 T 1440 600" stroke="#603b2d" strokeWidth="1" opacity="0.6" />
                        <path d="M 0 1000 Q 360 900 720 1000 T 1440 1000" stroke="#603b2d" strokeWidth="1" opacity="0.6" />
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
                            <p>부담 없이 전하는 진심 속에 담긴 사유의 흔적.<br />작은 손길 하나로 당신의 감각적인 안목을 증명하는 선물입니다.</p>
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
