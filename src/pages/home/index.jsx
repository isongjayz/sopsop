// ========================================
// Home - 메인 홈 페이지 (GSAP 애니메이션 적용)
// ========================================

import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './style.scss';

// 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

function Home() {

    // Refs for animation
    const container = useRef(null);
    const heroRef = useRef(null);
    const bottleSectionRef = useRef(null);
    const bottlePathRef = useRef(null);
    const bottleImgRef = useRef(null);
    const brandRef = useRef(null);
    const philosophyRef = useRef(null);

    useGSAP(() => {
        // 1. Hero Text Fade Up
        gsap.from('.home__hero-content > *', {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 0.5
        });

        // 2. Bottle Line Drawing Animation
        // SVG 선 그리기 + 병 이미지 서서히 나타나기
        const path = bottlePathRef.current;
        if (path) {
            const length = path.getTotalLength();
            gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: bottleSectionRef.current,
                    start: 'top top',
                    end: '+=150%', // 스크롤 길게
                    pin: true,
                    scrub: 1, // 스크롤에 따라 부드럽게 진행
                }
            });

            // 1) 선 그리기
            tl.to(path, { strokeDashoffset: 0, duration: 2 })
                // 2) 실제 이미지 서서히 나타남 (선과 겹쳐진 뒤)
                .to(bottleImgRef.current, { opacity: 1, duration: 1 })
                // 3) 선 사라짐
                .to(path, { opacity: 0, duration: 0.5 }, '-=0.5');
        }

        // 3. Brand Story Fade In
        gsap.from('.home__brand-fade', {
            scrollTrigger: {
                trigger: brandRef.current,
                start: 'top 70%',
            },
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: 'power2.out',
        });

        // 4. Philosophy Grid Stagger
        gsap.from('.home__philosophy-item', {
            scrollTrigger: {
                trigger: philosophyRef.current,
                start: 'top 70%',
            },
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.15,
            ease: 'power2.out',
        });

    }, { scope: container });

    return (
        <div className="home" ref={container}>
            {/* 1. Hero 섹션 */}
            <section className="home__hero" ref={heroRef}>
                <div className="home__hero-overlay">
                    <div className="home__hero-content">
                        <p className="home__hero-sub font-serif">Since 1987, Melbourne</p>
                        <h2 className="home__hero-title font-serif">Aesop</h2>
                        <p className="home__hero-desc">
                            피부, 모발, 신체를 위한 최상의 제품
                        </p>
                        <Link to="/product" className="home__hero-cta">전체 제품 보기</Link>
                    </div>
                </div>
            </section>

            {/* 2. 진화된 브랜드 스토리 및 철학 (버티컬 타임라인) */}
            <section className="home__origin-timeline">
                <div className="home__origin-inner">
                    {/* Vertical Line */}
                    <div className="home__origin-line"></div>

                    {/* Part 1: Genesis */}
                    <div className="home__origin-block">
                        <div className="home__origin-nav">
                            <span className="active">Genesis</span>
                            <span>Heritage</span>
                            <span>Presence</span>
                        </div>
                        <div className="home__origin-icon">
                            <svg viewBox="0 0 100 100" width="80" height="80">
                                <path d="M50 10 C 20 20, 10 50, 20 70 C 30 90, 60 90, 80 70 C 90 50, 80 20, 50 10 Z" fill="none" stroke="#603b2d" strokeWidth="1" />
                                <path d="M50 10 C 50 40, 40 80, 50 90" fill="none" stroke="#603b2d" strokeWidth="1" />
                                {/* Simple leaf outline */}
                            </svg>
                        </div>
                        <div className="home__origin-content">
                            <h3 className="font-serif origin-year">1987</h3>
                            <h4 className="origin-title">호주의 미용사 데니스 파파티스 <strong>식물성 추출물</strong>에 주목</h4>
                            <p>Founded in Melbourne, Aesop evolved from a hair salon into a botanical skincare icon, driven by a desire to trade harsh chemicals for natural purity.</p>
                        </div>
                    </div>

                    {/* Part 2: Heritage */}
                    <div className="home__origin-block">
                        <div className="home__origin-nav">
                            <span>Genesis</span>
                            <span className="active">Heritage</span>
                            <span>Presence</span>
                        </div>
                        <div className="home__origin-icon">
                            <svg viewBox="0 0 100 80" width="80" height="60">
                                <path d="M10 40 L 50 60 L 90 40 L 50 20 Z" fill="none" stroke="#603b2d" strokeWidth="1" />
                                <path d="M10 50 L 50 70 L 90 50" fill="none" stroke="#603b2d" strokeWidth="1" />
                                {/* Simple book outline */}
                            </svg>
                        </div>
                        <div className="home__origin-content">
                            <h3 className="font-serif origin-year">Fables</h3>
                            <h4 className="origin-title">우화 작가 이솝(Aesop)의 이름에서 비롯된 <strong>깊은 철학</strong></h4>
                            <p>Named after the Greek fabulist Aesop, we embody the wisdom of a fable. Our philosophy seeks to deliver profound resonance through minimalist simplicity.</p>
                        </div>
                    </div>

                    {/* Part 3: Presence */}
                    <div className="home__origin-block">
                        <div className="home__origin-nav">
                            <span>Genesis</span>
                            <span>Heritage</span>
                            <span className="active">Presence</span>
                        </div>
                        <div className="home__origin-icon">
                            <svg viewBox="0 0 100 100" width="80" height="80">
                                <path d="M20 50 L 50 20 L 80 50 L 80 80 L 20 80 Z" fill="none" stroke="#603b2d" strokeWidth="1" />
                                <path d="M40 80 L 40 50 L 60 50 L 60 80" fill="none" stroke="#603b2d" strokeWidth="1" />
                                {/* Simple store outline */}
                            </svg>
                        </div>
                        <div className="home__origin-content">
                            <h3 className="font-serif origin-year">Aesop</h3>
                            <h4 className="origin-title">지역의 <strong>고유함</strong>을 존중하는 전 세계 <strong>단 하나뿐</strong>인 이솝의 공간들</h4>
                            <p>For 30 years, Aesop has curated unique spaces that honor local heritage. As a result, no two Aesop stores are alike anywhere in the world.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. 철학 섹션 (Philosophy Vertical List) */}
            <section className="home__philosophy-vertical">
                <div className="home__pv-inner">
                    {/* Vertical Line */}
                    <div className="home__pv-line"></div>

                    {/* Item 1 */}
                    <div className="home__pv-item">
                        <div className="home__pv-img">
                            <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80" alt="Nature Refined" />
                        </div>
                        <div className="home__pv-content">
                            <h3 className="font-serif">Nature Refined</h3>
                            <h4>자연과 과학이 빚어낸 스킨케어</h4>
                            <p>Experience the perfect blend of botanical purity and scientific precision, meticulously formulated for your skin, hair, and body care needs.</p>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="home__pv-item">
                        <div className="home__pv-img">
                            <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80" alt="Essential Aesthetics" />
                        </div>
                        <div className="home__pv-content">
                            <h3 className="font-serif">Essential Aesthetics</h3>
                            <h4>본질에 집중하는 절제의 미학</h4>
                            <p>A refined pursuit of purity that strips away the unnecessary, revealing the profound elegance of a skin care essence through mindful simplicity.</p>
                        </div>
                    </div>

                    {/* Item 3 */}
                    <div className="home__pv-item">
                        <div className="home__pv-img">
                            <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80" alt="Inspiring Rituals" />
                        </div>
                        <div className="home__pv-content">
                            <h3 className="font-serif">Inspiring Rituals</h3>
                            <h4>영감을 채우는 지적이고 감각적인 여정</h4>
                            <p>A sophisticated journey of intellect and sense, curated to awaken your inspirations in the beauty of every moment.</p>
                        </div>
                    </div>

                    {/* Item 4 */}
                    <div className="home__pv-item">
                        <div className="home__pv-img">
                            <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80" alt="Ethical Commitments" />
                        </div>
                        <div className="home__pv-content">
                            <h3 className="font-serif">Ethical Commitments</h3>
                            <h4>지구와 생명을 존중하는 확고한 발걸음</h4>
                            <p>A steadfast journey dedicated to honoring our planet and all living beings through conscious choices and unwavering integrity.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. 성분 섹션 (Ingredients) */}
            <section className="home__ingredients">
                <div className="home__ingredients-visual">
                    <svg viewBox="0 0 1440 600" className="home__ingredients-svg" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <path id="textCurve" d="M 150 50 C 150 450, 500 500, 850 300" />
                            <path id="line1" d="M 150 50 C 150 450, 500 500, 850 240 C 1100 110, 1150 420, 1300 420" />
                            <path id="line2" d="M 160 50 C 160 460, 490 520, 850 280 C 1100 160, 1150 420, 1300 420" />
                            <path id="line3" d="M 170 50 C 170 470, 480 540, 850 320 C 1100 210, 1150 420, 1300 420" />
                            <path id="line4" d="M 180 50 C 180 480, 470 560, 850 360 C 1100 260, 1150 420, 1300 420" />
                        </defs>
                        <use href="#line1" fill="none" stroke="#603b2d" strokeWidth="1" opacity="0.4" />
                        <use href="#line2" fill="none" stroke="#603b2d" strokeWidth="1" opacity="0.4" />
                        <use href="#line3" fill="none" stroke="#603b2d" strokeWidth="1" opacity="0.4" />
                        <use href="#line4" fill="none" stroke="#603b2d" strokeWidth="1" opacity="0.4" />

                        <text className="font-serif home__ingredients-text" fill="#603b2d">
                            <textPath href="#textCurve" startOffset="2%">
                                'If the Path be beautiful, let us not ask where it leads.'
                            </textPath>
                        </text>
                    </svg>

                    <div className="home__ingredients-circles flex-col">
                        <div className="circle-item">
                            <span className="circle-label font-serif" style={{ color: '#b5a195' }}>Rosemary Leaf</span>
                            <div className="circle-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80)' }}></div>
                        </div>
                        <div className="circle-item">
                            <span className="circle-label font-serif" style={{ color: '#887469' }}>Chamomile</span>
                            <div className="circle-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80)' }}></div>
                        </div>
                        <div className="circle-item">
                            <span className="circle-label font-serif" style={{ color: '#a3ad92' }}>Bergamot</span>
                            <div className="circle-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80)' }}></div>
                        </div>
                        <div className="circle-item">
                            <span className="circle-label font-serif" style={{ color: '#b9a8cf' }}>Lavender</span>
                            <div className="circle-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80)' }}></div>
                        </div>
                    </div>

                    <div className="home__ingredients-bottle">
                        <div className="bottle-outline"></div>
                        <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&q=80" alt="Bottle" />
                    </div>
                </div>
            </section>

            {/* 5. 베스트 섹션 (Side-by-side Image + Text Layout) */}
            <section className="home__best">
                <div className="inner">
                    <div className="home__best-container">
                        <div className="home__best-visual">
                            <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80" alt="Aesop Best Selection Bottles" />
                        </div>
                        <div className="home__best-content">
                            <h3 className="font-serif">The Aesop<br /><span>Best Selection</span></h3>
                            <p>유행을 타지 않는 이솝의 철학과 피부 과학이 만나 탄생한 시대를 초월하여<br />사랑받는 상징적인 제품들을 소개합니다.</p>
                            <Link to="/product/best" className="home__best-btn">바로가기</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. 메시지 섹션 */}
            <section className="home__message">
                <div className="inner">
                    <blockquote className="home__message-text font-serif">
                        "We pursue the finest formulations<br />
                        of plant and laboratory ingredients."
                    </blockquote>
                </div>
            </section>

            {/* 7. 기프트 가이드 섹션 */}
            <section className="home__gift">
                <div className="inner">
                    <div className="home__gift-content">
                        <h3 className="font-serif">Gift Guide</h3>
                        <p>
                            특별한 날, 소중한 분을 위해 준비한 이솝 기프트 컬렉션.<br />
                            세심한 배려가 담긴 선물을 제안합니다.
                        </p>
                        <Link to="/gift" className="home__cta-btn">기프트 구경하기</Link>
                    </div>
                </div>
            </section>

            {/* 8. 대표 기프트 제품 섹션 */}
            <section className="home__featured-gifts">
                {/* Wavy background lines for Featured Gifts */}
                <div className="home__fg-bg">
                    <svg viewBox="0 0 1440 1200" fill="none" preserveAspectRatio="none">
                        <path d="M 0 200 Q 360 100 720 200 T 1440 200" stroke="#603b2d" strokeWidth="1" opacity="0.6" />
                        <path d="M 0 600 Q 360 700 720 600 T 1440 600" stroke="#603b2d" strokeWidth="1" opacity="0.6" />
                        <path d="M 0 1000 Q 360 900 720 1000 T 1440 1000" stroke="#603b2d" strokeWidth="1" opacity="0.6" />
                    </svg>
                </div>

                <div className="inner">
                    <div className="home__fg-list">
                        {/* Item 1 */}
                        <div className="home__fg-item">
                            <div className="home__fg-img">
                                <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80" alt="An Everyday Essential for a Balanced Life" />
                            </div>
                            <h3 className="font-serif">An Everyday Essential for a Balanced Life</h3>
                            <p>가장 많이 사랑받는 구성 속에 담긴 변치 않는 가치<br />실패 없는 선택을 넘어 정중한 환대의 마음까지 선물하세요.</p>
                            <Link to="/gift" className="home__fg-btn">바로가기</Link>
                        </div>

                        {/* Item 2 */}
                        <div className="home__fg-item">
                            <div className="home__fg-img">
                                <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80" alt="A Thoughtful Gesture of Quiet Sincerity" />
                            </div>
                            <h3 className="font-serif">A Thoughtful Gesture of Quiet Sincerity</h3>
                            <p>부담 없이 전하는 진심 속에 담긴 사유의 흔적.<br />작은 손길 하나로 당신의 감각적인 안목을 증명하는 선물입니다.</p>
                            <Link to="/gift" className="home__fg-btn">바로가기</Link>
                        </div>

                        {/* Item 3 */}
                        <div className="home__fg-item">
                            <div className="home__fg-img">
                                <img src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80" alt="A Scent for Lasting Memories" />
                            </div>
                            <h3 className="font-serif">A Scent for Lasting Memories</h3>
                            <p>가장 많이 사랑받는 구성 속에 담긴 변치 않는 가치<br />실패 없는 선택을 넘어 향기로운 기억까지 선물하세요.</p>
                            <Link to="/gift" className="home__fg-btn">바로가기</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. 마무리 메시지 */}
            <section className="home__closing">
                <div className="inner">
                    <p className="home__closing-text font-serif">
                        Carefully considered design for the discerning eye.
                    </p>
                </div>
            </section>
        </div>
    );
}

export default Home;
