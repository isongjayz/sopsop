import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Aegung_Banner from "./Aegung_Banner";
import './Aegung_Packaging.scss';

gsap.registerPlugin(ScrollTrigger);

const Aegung_Packaging = () => {
    const sliderSectionRef = useRef(null);
    const trackRef = useRef(null);

    const Aegung_sliderImages = [
        { id: 1, src: '/images/aegung/04-Packaging/Slider01.png', alt: '패키징 슬라이더 1', name: '한국 Special Gift Card', price: '' },
        { id: 2, src: '/images/aegung/04-Packaging/Slider02.png', alt: '패키징 슬라이더 2', name: '파슬리 씨드 페이셜 클렌저', price: '₩ 75,000' },
        { id: 3, src: '/images/aegung/04-Packaging/Slider03.png', alt: '패키징 슬라이더 3', name: '라이브러리 오브 아로마', price: '₩ 213,000' },
        { id: 4, src: '/images/aegung/04-Packaging/Slider04.png', alt: '패키징 슬라이더 4', name: '한국 Special 코튼백', price: '' },
        { id: 5, src: '/images/aegung/04-Packaging/Slider05.png', alt: '패키징 슬라이더 5', name: '아로마틱 스톤', price: '₩ 64,000' },
        { id: 6, src: '/images/aegung/04-Packaging/Slider06.png', alt: '패키징 슬라이더 6', name: '샴푸린스바 set', price: '₩ 32,000' },
    ];

    useGSAP(() => {
        // 태블릿/모바일에서는 네이티브 터치 스크롤 사용
        if (window.innerWidth <= 1023) return;

        const track = trackRef.current;

        // 마지막 아이템이 화면 가운데 올 때까지의 스크롤 거리 계산
        const getScrollDistance = () => {
            const lastItem = track.lastElementChild;
            const lastItemWidth = lastItem ? lastItem.offsetWidth : 0;
            return track.scrollWidth - lastItemWidth / 2 - window.innerWidth / 2;
        };

        // 수직 스크롤 → 가로 슬라이드 변환
        gsap.to(track, {
            x: () => -getScrollDistance(),
            ease: 'none',
            scrollTrigger: {
                trigger: sliderSectionRef.current,
                start: 'top top',
                end: () => `+=${getScrollDistance()}`,
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true,
            },
        });
    }, { scope: sliderSectionRef });

    return (
        <section className="Aegung_packaging">
            <Aegung_Banner
                label="Packaging & Gift Card"
                titleSpan="Gung"
                title="의 기품을 전하다"
                desc={<><span className='FB'>한국의 문양과 전통</span>을 담은 이솝 제품을 통해 한국의 기품을 전달합니다.</>}
                bgColor="green"
            />

            {/* 상단 텍스트 + 이미지 영역 */}
            <div className="Aegung_packaging__Top">
                            <div className="Aegung_packaging__Top__line"></div>
                <div className="Aegung_packaging__Top__inner">
                    {/* 왼쪽: 제품 이미지 + 텍스트 블록 */}
                    <div className="Aegung_packaging__Top__left">
                        <div className="Aegung_packaging__Top__product-img">
                            <img src="/images/aegung/04-Packaging/Main01.png" alt="Aesop 제품" />
                        </div>

                        <div className="Aegung_packaging__Top__text-group">
                            <div className="Aegung_packaging__Top__text-block">
                                <h3 className="Aegung_packaging__Top__text-title">정제된 아름다움, 궁의 결을 닮다</h3>
                                <p className="Aegung_packaging__Top__text-desc">
                                    화려한 장식보다 <span className='FB'>본연의 가치</span>에 집중하는 이솝의 철학은, 자연의 흐름을 거스르지 않는 궁의 <span className='FB'>비대칭 미학</span>과 맞닿아 있습니다. 궁의 기품을 담아낸 에디션으로 당신의 일상에 <span className='FB'>격조 높은 휴식</span>을 선사합니다.
                                </p>
                            </div>
                            <div className="Aegung_packaging__Top__text-block">
                                <h3 className="Aegung_packaging__Top__text-title">비움으로 채우는 사유의 시간</h3>
                                <p className="Aegung_packaging__Top__text-desc">
                                    궁궐의 고요한 뒤뜰을 거닐듯, 피부 본연의 건강함을 되찾아주는 <span className='FB'>자연 유래 성분</span>만을 남겼습니다. 후원의 깊은 숲에서 불어오는 바람처럼, 은은하게 퍼지는 이솝의 향기는 <span className='FB'>마음의 안식</span>을 돕습니다.
                                </p>
                            </div>
                            <div className="Aegung_packaging__Top__text-block">
                                <h3 className="Aegung_packaging__Top__text-title">전통을 잇는 세심한 배려</h3>
                                <p className="Aegung_packaging__Top__text-desc">
                                    단순한 바디 케어를 넘어, 한국의 전통 문양을 현대적인 감각으로 재해석한 패키지는 소장하는 것만으로도 하나의 <span className='FB'>예술품</span>이 됩니다. 소중한 이에게 <span className='FB'>한국의 아름다움</span>과 <span className='FB'>이솝의 진정성</span>을 함께 전해 보세요.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 오른쪽: 제품 이미지 그리드 */}
                    <div className="Aegung_packaging__Top__right">
                        <div className="Aegung_packaging__Top__img-block">
                        <div className="Aegung_packaging__Top__right-img">
                            <img src="/images/aegung/04-Packaging/Main02.png" alt="패키징 이미지 1" />
                        </div>
                        <div className="Aegung_packaging__Top__right-img">
                            <img src="/images/aegung/04-Packaging/Main03.png" alt="패키징 이미지 2" />
                        </div>
                        </div>
                        <div className="Aegung_packaging__Top__right-img">
                            <img src="/images/aegung/04-Packaging/Main04.png" alt="패키징 이미지 3" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 중간 대형 이미지 */}
            <div className="Aegung_packaging__MiddleImg">
                <img src="/images/aegung/04-Packaging/Main05.png" alt="패키징 메인 이미지" />
            </div>

            {/* 구분선 */}
            <div className="Aegung_packaging__divider"></div>

            {/* 하단 슬라이더 — GSAP 수평 스크롤 */}
            <div className="Aegung_packaging__slider" ref={sliderSectionRef}>
                <div className="Aegung_packaging__slider__track" ref={trackRef}>
                    {Aegung_sliderImages.map((slide) => (
                        <div className="Aegung_packaging__slider__item" key={slide.id}>
                            <img src={slide.src} alt={slide.alt} draggable="false" />
                            <div className="Aegung_packaging__slider__overlay">
                                <span className={`Aegung_packaging__slider__overlay-name ${!slide.price ? 'Aegung_packaging__slider__overlay-name--no-border' : ''}`}>{slide.name}</span>
                                {slide.price && <span className="Aegung_packaging__slider__overlay-price">{slide.price}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Aegung_Packaging;
