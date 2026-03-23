import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * HomeCoda 컴포넌트
 *
 * 홈 페이지의 전체 이야기를 우아하게 마무리하는 종결부 섹션입니다.
 */
function HomeCoda() {
    const sectionRef = useRef(null);

    useGSAP(
        () => {
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
        },
        { scope: sectionRef }
    );

    return (
        <section className="home__coda" ref={sectionRef}>
            <div className="inner">
                <h2 className="home__coda-title">
                    Finding a quiet <span className="italic">sanctuary</span>
                    <br />
                    in your <span className="italic">senses</span>
                </h2>
                <p className="home__coda-desc">
                    진정한 휴식은 물리적인 장소를 넘어 우리 내면의 감각을 일깨우는 데서 시작됩니다.
                    <br />
                    감각의 안내를 받아 내면의 고요가 머무는 안식처로 깊숙이 걸어 들어가 보시기
                    바랍니다.
                </p>
            </div>
        </section>
    );
}

export default HomeCoda;
