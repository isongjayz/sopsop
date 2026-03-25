import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function HomeBestSelection() {
    const sectionRef = useRef(null);

    useGSAP(
        () => {
            const vw = (px) => `${(px / 1920) * 100}vw`;
            const vh = (px) => `${(px / 1080) * 100}vh`;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=4000',
                    pin: true,
                    scrub: 1,
                }
            });

            // [1. 병들이 "처음 나오는 위치" 설정]
            const START_L = 630;
            const START_T = 300;

            const GAP_L = 150;
            const GAP_T = 100;

            // 절대 중앙(Center) 정렬을 위한 좌표 보정 수식!
            const xCenter = (leftEdge) => vw(leftEdge + 325);
            const yCenter = (topEdge) => vh(topEdge + 325);

            // [초기 상태 세팅]
            // 가장 안정적이었던 1~4번 병 단독 등장 모델로 완전히 롤백!
            // 회원님 요청: 1번 병도 0에서 1로 페이드인 되도록 초기 투명도를 0으로 설정
            gsap.set('.home__best-item--1', { left: xCenter(START_L), top: yCenter(START_T), xPercent: -50, yPercent: -50, scale: 1.5, opacity: 0, zIndex: 1 });
            gsap.set('.home__best-item--2', { left: xCenter(START_L), top: yCenter(START_T), xPercent: -50, yPercent: -50, scale: 1.5, y: 500, opacity: 0, zIndex: 2 });
            gsap.set('.home__best-item--3', { left: xCenter(START_L), top: yCenter(START_T), xPercent: -50, yPercent: -50, scale: 1.5, y: 500, opacity: 0, zIndex: 3 });
            gsap.set('.home__best-item--4', { left: xCenter(START_L), top: yCenter(START_T), xPercent: -50, yPercent: -50, scale: 1.5, y: 500, opacity: 0, zIndex: 4 });

            gsap.set('.home__best-content', { position: 'absolute', left: vw(1220), top: vh(348), opacity: 0, x: 50 });

            // 1) 1번 병이 먼저 부드럽게 페이드인 (0 -> 1)
            tl.to('.home__best-item--1', { opacity: 1, duration: 1 })

            // 2) 1번 병이 대각선으로 밀려나고, 그 자리에 2번 병 등장!
              .to('.home__best-item--1', { left: xCenter(START_L - GAP_L), top: yCenter(START_T - GAP_T), scale: 1.3, duration: 1 })
              .to('.home__best-item--2', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, "<0.2")

            // 3) 다같이 1칸 전진 & 3번 병 등장
              .to('.home__best-item--1', { left: xCenter(START_L - GAP_L * 2), top: yCenter(START_T - GAP_T * 2), scale: 1.1, duration: 1 })
              .to('.home__best-item--2', { left: xCenter(START_L - GAP_L), top: yCenter(START_T - GAP_T), scale: 1.3, duration: 1 }, "<")
              .to('.home__best-item--3', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, "<0.2")

            // 4) 다같이 1칸 전진 & 4번 병 등장
              .to('.home__best-item--1', { left: xCenter(START_L - GAP_L * 3), top: yCenter(START_T - GAP_T * 3), scale: 1.0, duration: 1 })
              .to('.home__best-item--2', { left: xCenter(START_L - GAP_L * 2), top: yCenter(START_T - GAP_T * 2), scale: 1.1, duration: 1 }, "<")
              .to('.home__best-item--3', { left: xCenter(START_L - GAP_L), top: yCenter(START_T - GAP_T), scale: 1.3, duration: 1 }, "<")
              .to('.home__best-item--4', { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }, "<0.2")

            // [마무리] 이전 픽셀 좌표 원상복구! 1번 병이 날아갔던 버그도 픽스 완료.
              .to('.home__best-item--1', { left: xCenter(60), top: yCenter(90), scale: 1.0, duration: 1.5, ease: 'power2.inOut' })
              .to('.home__best-item--2', { left: xCenter(210), top: yCenter(190), scale: 1.0, duration: 1.5, ease: 'power2.inOut' }, "<")
              .to('.home__best-item--3', { left: xCenter(379), top: yCenter(290), scale: 1.0, duration: 1.5, ease: 'power2.inOut' }, "<")
              .to('.home__best-item--4', { left: xCenter(577), top: yCenter(390), scale: 1.0, duration: 1.5, ease: 'power2.inOut' }, "<")

              .to('.home__best-content', { opacity: 1, x: 0, duration: 1.5 }, "<0.5");
        },
        { scope: sectionRef }
    );

    // 상단 잘림 문제 원인이었던 style={{ overflow: 'hidden' }} 을 visible로 수정 완료!
    return (
        <section className="home__best" ref={sectionRef} style={{ overflow: 'visible' }}>
            <img src="/images/home/best/best1.jpg" alt="Aesop Parsley Seed Serum" className="home__best-item home__best-item--1" />
            <img src="/images/home/best/best2.jpg" alt="Aesop Hand Balm" className="home__best-item home__best-item--2" />
            <img src="/images/home/best/best3.jpg" alt="Aesop Hand Wash" className="home__best-item home__best-item--3" />
            <img src="/images/home/best/best4.jpg" alt="Aesop Eau de Parfum" className="home__best-item home__best-item--4" />
            
            <div className="home__best-content">
                <h3>
                    <span className="home__best-kicker">The Aesop</span>
                    <span className="home__best-title">Best Selection</span>
                </h3>
                <p>
                    유행을 타지 않는 이솝의 철학과 피부 과학이 만나 탄생한 시대를 초월하여
                    <br />
                    사랑받는 상징적인 제품들을 소개합니다.
                </p>
                <Link to="/product/best" className="home__best-btn">
                    바로가기
                </Link>
            </div>
        </section>
    );
}

export default HomeBestSelection;
