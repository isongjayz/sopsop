import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function HomeQuote() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // Pinned crossfade timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=1500', // 1500px 피닝 및 스크롤
                scrub: 1,
                pin: true,
                pinSpacing: true,
            }
        });

        // 애니메이션 시퀀스: Quote 서서히 위로 사라짐 -> Gift Guide 밑에서 서서히 나타남
        // fromTo를 사용하여 스크롤 방향(위/아래)에 상관없이 항상 완벽한 오파시티 상태를 보장합니다.
        // 그리고 겹치는 현상을 방지하기 위해 '<'를 사용하여 두 애니메이션이 완벽히 '동시에' 교차(Crossfade)되도록 맞췄습니다.
        tl.fromTo('.home__quote-content',
            { opacity: 1, y: 0 },
            { opacity: 0, y: -30, duration: 1 }
        )
        .fromTo('.home__gift-guide-content',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1 },
            '<' // 앞의 애니메이션과 완벽히 동일한 타이밍에 시작
        );
          
    }, { scope: sectionRef });

    return (
        <section 
            className="home__quote-transition" 
            ref={sectionRef} 
            style={{ 
                position: 'relative', 
                height: '100vh', 
                backgroundColor: '#fdfbf2', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                overflow: 'hidden'
            }}
        >
            <div className="inner" style={{ position: 'relative', width: '100%', height: '100%' }}>
                <div 
                    className="home__quote-content" 
                    style={{ position: 'absolute', top: '50%', left: '0', right: '0', transform: 'translateY(-50%)' }}
                >
                    <h2 className="home__quote-title">
                        A balance of <span className="italic">philosophy</span>, nature,<br />
                        and carefully considered <span className="italic">formulation</span>
                    </h2>
                    <p className="home__quote-desc">
                        이솝은 브랜드 철학을 바탕으로 자연에서 영감을 받은 성분을 신중하게 선택하고<br />
                        이를 세심한 포뮬레이션으로 완성하여 균형 잡힌 케어 경험을 만들어냅니다.
                    </p>
                </div>

                <div 
                    className="home__gift-guide-content" 
                    // JS가 로드되기 전에 화면에 깜빡이며 겹쳐 보이는 현상을 방지하기 위해 opacity: 0을 미리 줍니다.
                    // 버튼이 있어서 텍스트 블록의 높이가 더 높기 때문에 시각적 중앙을 맞추기 위해 marginTop을 약간 주어 아래로 내립니다.
                    style={{ position: 'absolute', top: '50%', left: '0', right: '0', transform: 'translateY(-50%)', opacity: 0, marginTop: '30px' }}
                >
                    <h2 className="home__gift-guide-title">
                        Aesop's <span className="italic">sensorial</span> care experiences to
                        <br />
                        share with someone <span className="italic">special</span>
                    </h2>
                    <p className="home__gift-guide-desc">
                        이솝의 감각적인 케어 경험을 소중한 사람에게 전해보세요.
                        <br />
                        일상 속 순간을 더욱 특별하게 만들어 줍니다.
                    </p>
                    <Link to="/gift" className="home__gift-guide-btn">
                        Gift Guide
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default HomeQuote;
