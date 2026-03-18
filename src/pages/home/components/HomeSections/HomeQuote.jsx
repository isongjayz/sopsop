import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * HomeQuote 컴포넌트 (기존 HomeMessage)
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
                <blockquote className="home__quote-text font-serif">
                    "A balance of philosophy, nature,
                    and carefully considered formulation"
                </blockquote>
            </div>
        </section>
    );
}

export default HomeQuote;
