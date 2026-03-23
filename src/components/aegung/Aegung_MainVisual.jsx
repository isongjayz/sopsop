import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "./Aegung_MainVisual.scss";

const Aegung_MainVisual = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 왼쪽 텍스트: 중앙 → 왼쪽 (x 양수에서 0으로)
      // 오른쪽 브랜드명: 중앙 → 오른쪽 (x 음수에서 0으로)
      // 동시에 opacity fade in
      tl.from(".aegung__main-visual__text", {
        x: 80,
        opacity: 0,
        duration: 3,
      })
        .from(
          ".aegung__main-visual__brand",
          {
            x: -80,
            opacity: 0,
            duration: 3,
          },
          "<",
        ) // '<' = 동시에 실행
        // 제품 이미지 시간차 위에서 내려오기
        .from(
          ".aegung__main-visual__product",
          {
            y: -80,
            opacity: 0,
            duration: 2,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=2.5",
        )
        // 배경 문양: 제품 다 나온 후 스르르 fade in
        .from(
          ".aegung__main-visual__bg",
          {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=1",
        );
    },
    { scope: containerRef },
  );

  return (
    <section className="aegung__main-visual" ref={containerRef}>
      <div className="aegung__inner">
        {/* 왼쪽 하단 배경 문양 */}
        <div className="aegung__main-visual__bg aegung__main-visual__bg--left">
          <img
            src="/images/aegung/01-MainVisual/Background01.svg"
            alt="한국 전통 문양 배경"
          />
        </div>

        {/* 오른쪽 상단 배경 문양 */}
        <div className="aegung__main-visual__bg aegung__main-visual__bg--right">
          <img
            src="/images/aegung/01-MainVisual/Background02.svg"
            alt="한국 전통 문양 배경"
          />
        </div>

        {/* 왼쪽 텍스트 영역 */}
        <div className="aegung__main-visual__text">
          <h2 className="aegung__main-visual__title">궁의 결을 담은</h2>
          <p className="aegung__main-visual__subtitle">
            The serene texture of Korean curves and poetic space.
            <br />
            Elegant tradition meets modern skincare.
          </p>
        </div>

        {/* 중앙 제품 이미지 영역 */}
        <div className="aegung__main-visual__products">
          <div className="aegung__main-visual__product aegung__main-visual__product--1">
            <img
              src="/images/aegung/01-MainVisual/MainVisual-1.png"
              alt="Resurrection Aromatique Hand Balm"
            />
          </div>
          <div className="aegung__main-visual__product aegung__main-visual__product--2">
            <img
              src="/images/aegung/01-MainVisual/MainVisual-2.png"
              alt="Parsley Seed Oil"
            />
          </div>
          <div className="aegung__main-visual__product aegung__main-visual__product--3">
            <img
              src="/images/aegung/01-MainVisual/MainVisual-3.png"
              alt="Lucent Facial Night Masque"
            />
          </div>
        </div>

        {/* 오른쪽 브랜드 로고 */}
        <div className="aegung__main-visual__brand">
          <span className="aegung__main-visual__brand-name">Ae-gung</span>
        </div>
      </div>
    </section>
  );
};

export default Aegung_MainVisual;
