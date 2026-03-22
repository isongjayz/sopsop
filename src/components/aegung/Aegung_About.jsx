import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './Aegung_About.scss';

gsap.registerPlugin(ScrollTrigger);

const Aegung_About = () => {
    const sectionRef = useRef(null);

    useGSAP(() => {
        const section = sectionRef.current;

        // 왼쪽 텍스트 핀 고정 — 섹션이 끝날 때까지 텍스트는 제자리
        ScrollTrigger.create({
            trigger: section,
            start: 'top top+=60',   // 헤더 높이 고려
            endTrigger: section,
            end: 'bottom bottom',
            pin: section.querySelector('.aegung__about__text'),
            pinSpacing: false,
        });
    }, { scope: sectionRef });

    return (
        <section className="aegung__about" ref={sectionRef}>
            <div className="aegung__inner">
                <div className="aegung__about__text">
                    <h2 className="aegung__about__title">
                        궁의 문을 열다
                        <br />
                        '스며듦'의 미학
                    </h2>
                    <div className="aegung__about__subtitle_box">
                        <p className="aegung__about__subtitle">
                            자연을 거스르지 않고 풍경의 일부가 되는 한국 궁궐의 유려한 선. 그리고 낯선 도시에 들어설 때 그곳의 고유한 아름다움을 먼저 존중하는 이솝의 철학. 두 가치는 '자연스러운 스며듦'이라는 하나의 결로 이어집니다
                        </p>
                        <p className="aegung__about__subtitle_en">
                            The graceful lines of Korean royal palaces, seamlessly becoming part of the landscape rather than defying nature. And Aesop's philosophy of honoring the inherent beauty of a place first when arriving in a new city. These two values converge into a single essence: 'a natural blending.'
                        </p>
                    </div>
                </div>
                <div className="aegung__about__img">
                    <img src="/images/aegung/02-About/about01.png" alt="About" />
                    <img src="/images/aegung/02-About/about02.png" alt="About" />
                    <img src="/images/aegung/02-About/about03.png" alt="About" />
                </div>
            </div>
        </section>
    );
};

export default Aegung_About;
