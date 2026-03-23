import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * HomeQuote 컴포넌트
 * 
 * 브랜드의 핵심 문구를 심플한 등장 애니메이션과 함께 보여주는 인용구 섹션입니다.
 */
function HomeQuote() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // 인용구 텍스트에 대한 페이드인 애니메이션
        gsap.from('.home__quote-text', {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
            },
            opacity: 0,
            y: 20,
            duration: 1.2,
            ease: 'power2.out',
        });
    }, { scope: sectionRef });

    return (
        <section className="home__quote" ref={sectionRef}>
            <div className="inner">
                <div className="home__quote-content">
                    <h2 className="home__quote-title">
                        A balance of <span className="italic">philosophy</span>, nature,<br />
                        and carefully considered <span className="italic">formulation</span>
                    </h2>
                    <p className="home__quote-desc">
                        이솝은 브랜드 철학을 바탕으로 자연에서 영감을 받은 성분을 신중하게 선택하고<br />
                        이를 세심한 포뮬레이션으로 완성하여 균형 잡힌 케어 경험을 만들어냅니다.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default HomeQuote;
