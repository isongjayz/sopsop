import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

/**
 * HomeBestSelection 컴포넌트
 * 
 * 엄선된 베스트셀러 제품을 소개합니다.
 * 베스트셀러 페이지로 이동하는 CTA 버튼이 포함되어 있습니다.
 */
function HomeBestSelection() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        // 콘텐츠 컨테이너에 대한 은은한 슬라이드업 애니메이션
        gsap.from('.home__best-container', {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 1,
            ease: 'power2.out',
        });
    }, { scope: sectionRef });

    return (
        <section className="home__best" ref={sectionRef}>
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
    );
}

export default HomeBestSelection;
