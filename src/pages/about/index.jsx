import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import PhilosophySection from "../../components/about/PhilosophySection";
import Marquee from "../../components/about/Marquee";
import "./style.scss";
import silhouette from "../../assets/silhouette.svg";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  // ref 참조
  const bottleWrapRef = useRef(null);
  const bottleOverlayRef = useRef(null);
  const bottlePathRef = useRef(null);
  const heroPhilRef = useRef(null);
  const philSectionRef = useRef(null);

  useGSAP(() => {
    // ── 병 타임라인
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: bottleWrapRef.current,
        start: "top 5%",
        end: "+=3000",
        scrub: 1,
        pin: true,
      },
    });
    tl.fromTo(
      bottleOverlayRef.current,
      { clipPath: "inset(0% 0 0 0)" },
      { clipPath: "inset(100% 0 0 0)", ease: "none" },
      0,
    ).fromTo(
      bottlePathRef.current,
      { attr: { stroke: "#CEC2BE", strokeWidth: "2" } },
      { attr: { stroke: "#442A20", strokeWidth: "4" }, ease: "none" },
      0,
    );

    // ── Hero A섹션 → Philosophy A섹션 색상 전환
    const heroPhil = heroPhilRef.current;
    const philSection = philSectionRef.current;
    if (!heroPhil || !philSection) return;

    const firstItem = philSection.querySelector(".philosophy__item");
    const textEls = heroPhil.querySelectorAll(
      ".philosophy__letter, .philosophy__label, .philosophy__title, .philosophy__desc",
    );

    gsap.set(firstItem, { autoAlpha: 0 });

    // 두 요소의 문서 기준 위치 차이 계산 → hero-philosophy가 이동해야 할 y 거리
    const heroPhilDocTop = heroPhil.getBoundingClientRect().top + window.scrollY;
    const firstItemDocTop = firstItem.getBoundingClientRect().top + window.scrollY;
    const yDistance = firstItemDocTop - heroPhilDocTop;

    gsap.timeline({
      scrollTrigger: {
        trigger: heroPhil,
        start: "top 20%",
        end: `+=${yDistance}`,
        scrub: 1,
        pin: true,
        pinSpacing: false, // 핵심: 공간을 억지로 차지하지 않아야 아래 섹션이 온전히 올라와서 만납니다.
        onLeave: () => {
          gsap.set(heroPhil, { autoAlpha: 0, y: 0 });
          gsap.set(firstItem, { autoAlpha: 1 });
        },
        onEnterBack: () => {
          gsap.set(heroPhil, { autoAlpha: 1 });
          gsap.set(firstItem, { autoAlpha: 0 });
        },
      },
    })
      .to(textEls, { color: "#603b2d", ease: "none" }, 0);
  });
  return (
    <main className="about">
      {/* 병 모양 클리핑 마스크 정의 (objectBoundingBox: 좌표 0~1 정규화) */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="bottle-clip" clipPathUnits="objectBoundingBox">
            <path d="M0.9967,0.0006 H0.0615 V0.0227 L0.0017,0.1703 L0.1113,0.3852 L0.0764,0.4357 V0.5738 C0.0881,0.5908,0.1113,0.6266,0.1113,0.6337 C0.1113,0.6407,0.1246,0.7308,0.1313,0.7749 L0.2126,0.8625 L0.3788,0.8934 L0.4137,0.9994 H0.6113 L0.6379,0.8934 L0.7824,0.8625 L0.819,0.7554 V0.7264 L0.9668,0.5738 V0.5177 L0.9037,0.3985 V0.331 L0.8705,0.215 V0.1917 L0.9967,0.0227 V0.0006Z" />
          </clipPath>
        </defs>
      </svg>
      {/* 1. Hero */}
      <section className="about__hero">
        <div className="about__hero-placeholder">
          <img src="./images/about/hero.png" alt="hero" />
        </div>
        <div className="about__hero-philosophy" ref={heroPhilRef}>
          <span className="philosophy__letter" aria-hidden="true">
            A
          </span>
          <div className="philosophy__content">
            <span className="philosophy__label">Presence</span>
            <h2 className="philosophy__title">Radiant Presence</h2>
            <p className="philosophy__desc">
              1987년 멜버른에서 시작된 이솝의 여정은 식물성 재료와 과학적 성분을
              조화시켜 삶의 공간을 밝히는 존재감을 선사합니다.시간의 흐름을
              받아들이며 내면의 아름다움을 가꾸는 정중한 태도는, 단순한 개선을
              넘어 삶을 대하는 지적이고 우아한 자세를 완성합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Philosophy A · E · S · O · P */}
      <div ref={philSectionRef}>
        <PhilosophySection />
      </div>

      {/* 2. Gallery Marquee */}
      <Marquee />

      {/* 3. Journey Intro */}
      <section className="section-intro">
        <div className="section-intro__inner">
          <span className="section-intro__watermark" aria-hidden="true">
            William Morris
          </span>
          <h2 className="section-intro__title">본질을 지키기 위한 여정</h2>
        </div>
        <p className="section-intro__sub">그 시간이 빚어낸 단 하나의 실루엣</p>
      </section>

      {/* 4. Timeline Bottle */}
      <div className="about__bottle-wrap" ref={bottleWrapRef}>
        <svg
          viewBox="0 0 301 793"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            ref={bottlePathRef}
            d="M300.008 0.5H18.5078V18L0.507812 135L33.5078 305.5L23.0078 345.5V455C26.5078 468.5 33.5078 496.9 33.5078 502.5C33.5078 508.1 37.5078 579.5 39.5078 614.5L64.0078 684L114.008 708.5L124.508 792.5H184.008L192.008 708.5L235.508 684L246.508 599V576L291.008 455V410.5L272.008 316V262.5L262.008 170.5V152L300.008 18V0.5Z"
            stroke="#CEC2BE"
            strokeWidth="0.5"
          />
        </svg>

        <div className="about__bottle-text">
          <p className="bt_text_1">1987</p>
          <p className="bt_text_2">Formulation for the Mind and Body</p>
          <p className="bt_text_3">Foundation</p>
          <p className="bt bt--row-mix">
            <span className="bt_text_4">1992</span>
            <span className="bt_text_5_wrap">
              <em className="bt_text_5">Essential</em>
              <em className="bt_text_5_1">Formulations</em>
            </span>
          </p>
          <p className="bt_text_6">2003</p>
          <p className="bt bt--landmark">
            <span className="bt_text_7">The First Landmark</span>
            <span className="bt_text_8"></span>
          </p>
          <p className="bt bt--row-mix gap-sm">
            <em className="bt_text_9">Signiture</em>
            <span className="bt_text_10">The First Landmark</span>
          </p>
          <p className="bt bt--row-mix">
            <span className="bt_text_11_wrap">
              <span className="bt_text_11">Global</span>
              <span className="bt_text_11_1">Expansion</span>
            </span>
            <span className="bt_text_12">2012</span>
          </p>
          <p className="bt bt--row-mix gap-sm">
            <span className="bt_text_13_wrap">
              <span className="bt_text_13">in</span>
              <span className="bt_text_13_1">Seoul</span>
            </span>

            <span className="bt_text_14">2014</span>
            <em className="bt_text_15">Heritage</em>
          </p>
          <p className="bt_text_16">2020</p>
          <p className="bt bt--row-mix gap-sm">
            <em className="bt_text_17">BCorp</em>
            <span className="bt_text_18_wrap">
              <span className="bt_text_18">Certification</span>
              <span className="bt_text_18_1">Signiture</span>
            </span>
          </p>
          <div className="bt_text_2024_row">
            <div className="bt_text_2024_left">
              <p className="bt_text_19">IntelligentIntelligent</p>
              <span className="bt_text_20_wrap">
                <span className="bt_text_20">Balanced</span>
                <span className="bt_text_21">Intelligent Intelligent</span>
              </span>
              <p className="bt_text_22">Formulations</p>
              <p className="bt_text_23">Intelligent Intelligent Intelligent</p>
            </div>
            <p className="bt_text_24">2024</p>
          </div>
          <span className="bt_text_25_wrap">
            <p className="bt_text_25">Sincere</p>
            <span className="bt_text_25_1"></span>
          </span>
          <p className="bt_text_26">Meticulous</p>
          <p className="bt bt--row-mix gap-sm">
            <span className="bt_text_27">2025</span>
            <em className="bt_text_28">Anatole France</em>
          </p>
          <div className="bt bt--bottom-group">
            <p className="bt_text_29">Signiture</p>
            <p className="bt_text_30">detail</p>
            <p className="bt_text_31">Heritage</p>
            <p className="bt_text_32">Balanced</p>
          </div>
        </div>
        {/* 병 path 모양의 yellow 오버레이 (wrapper로 clip-path 적용, 내부 div가 스크롤에 따라 펼쳐짐) */}
        <div className="about__bottle-overlay-wrap">
          <div className="about__bottle-overlay" ref={bottleOverlayRef}></div>
        </div>
      </div>

      {/* 5. Now */}
      <section className="now">
        <div className="now__inner">
          <h2 className="now__heading">Now</h2>
          <div className="now__rule"></div>
          <div className="now__heading-wrap">
            <span className="now__watermark" aria-hidden="true">
              William Morris
            </span>
            <h3 className="now__title">패키지에 담긴 우리의 진심</h3>
          </div>
          <p className="now__sub">
            최소한의 포장과 지속 가능한 실천으로 지구와 공존하는 매일의 여정을
            이어나갑니다
          </p>
        </div>
      </section>

      {/* 6. Sensory */}
      <section className="about__sensory">
        <h2 className="about__sensory-title">Sensory</h2>
        <div className="about__sensory-grid">
          <div className="about__sensory-img about__sensory-img--a">
            <img src="/images/about/Sensory01.png" alt="sensory 1" />
          </div>
          <div className="about__sensory-img about__sensory-img--b">
            <img src="/images/about/Sensory02.png" alt="sensory 2" />
          </div>
          <div className="about__sensory-img about__sensory-img--c">
            <img src="/images/about/Sensory03.png" alt="sensory 3" />
          </div>
          <div className="about__sensory-img about__sensory-img--d">
            <img src="/images/about/Sensory04.png" alt="sensory 4" />
          </div>
          <div className="about__sensory-text">
            <div className="about__sensory-text-inner">
              <h3 className="about__sensory-text-title">Ada Lovelace</h3>
              <p className="about__sensory-text-sub">
                This is interested and sustainable design, and this leads to all
                fields. As careful research is essential in all products,
                careful studies The practical courageous courageous courage and
                easy functionality was made as possible as possible. This is
                already exists when you find a new store First of all, let's use
                and cooperate first. Rather than being a space, rather than
                being a space in the region, rather than being a space It's true
                of this is the true. Therefore, you pay heart blood to use
                design elements related to regions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
