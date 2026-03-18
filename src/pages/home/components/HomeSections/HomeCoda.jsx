import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * HomeCoda 컴포넌트 (기존 HomeClosing)
 * 
 * 홈 페이지의 전체 이야기를 우아하게 마무리하는 종결부 섹션입니다.
 */
function HomeCoda() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // 종결부 텍스트에 대한 은은한 페이드인 애니메이션
        gsap.from('.home__coda-text', {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 90%',
            },
            opacity: 0,
            duration: 1.5,
            ease: 'power1.out',
        });
    }, { scope: sectionRef });

    return (
        <section className="home__coda" ref={sectionRef}>
            <div className="inner">
                <p className="home__coda-text font-serif">
                    Finding a quiet sanctuary<br />
                    in your senses
                </p>
            </div>
        </section>
    );
}

export default HomeCoda;
