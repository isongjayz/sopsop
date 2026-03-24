import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Aegung_SpecialStore_CardText from "./Aegung_SpecialStore_CardText";
import Aegung_SpecialStore_Connector from "./Aegung_SpecialStore_Connector";
import { specialStoreData } from "../../assets/api/aegung.jsx";
import "./Aegung_SpecialStores.scss";

gsap.registerPlugin(ScrollTrigger);

const Aegung_SpecialStores = () => {
  const sectionRef = useRef(null);
  const card1 = specialStoreData.find((item) => item.id === 1);
  const card2 = specialStoreData.find((item) => item.id === 2);
  const card3 = specialStoreData.find((item) => item.id === 3);
  const card4 = specialStoreData.find((item) => item.id === 4);
  const card5 = specialStoreData.find((item) => item.id === 5);
  const card6 = specialStoreData.find((item) => item.id === 6);
  const card7 = specialStoreData.find((item) => item.id === 7);

  useGSAP(() => {
    // 카드별 선택자 + 같은 행 내 순차 delay 설정
    const cardConfig = [
      { selector: ".Aegung_specialStores__card1__wrap", delay: 0 },
      { selector: ".Aegung_specialStores__card2__wrap", delay: 0.25 },
      { selector: ".Aegung_specialStores__card3", delay: 0 },
      { selector: ".Aegung_specialStores__section2__card4", delay: 0 },
      { selector: ".Aegung_specialStores__section2__card5", delay: 0.25 },
      { selector: ".Aegung_specialStores__section3__card6", delay: 0 },
      { selector: ".Aegung_specialStores__card7", delay: 0 },
    ];

    cardConfig.forEach(({ selector, delay }) => {
      const el = sectionRef.current.querySelector(selector);
      if (!el) return;

      gsap.fromTo(
        el,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 50,
          duration: 3,
          delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section className="Aegung_specialStores" ref={sectionRef}>
      <div className="Aegung_specialStores__visual">
        <img
          className="Aegung_specialStores__visual-bg"
          src="/images/aegung/05-SpecialStores/MainVisual.png"
          alt="Korean Special Store"
        />

        {/* 왼쪽 텍스트 박스 */}
        <div className="Aegung_specialStores__visual-textbox">
          <div className="Aegung_specialStores__visual-top">
            <span className="Aegung_specialStores__visual-label">
              [Korea Special Stores]
            </span>
            <h2 className="Aegung_specialStores__visual-title">
              고궁 곁에 머무는 공간
            </h2>
          </div>

          <div className="Aegung_specialStores__visual-bottom">
            <h3 className="Aegung_specialStores__visual-subtitle">
              산책의 여운을 담은 공간,
              <br />
              이솝의 Korean Special Store
            </h3>
            <p className="Aegung_specialStores__visual-desc">
              도심 속 고궁이 주는 여유로움을
              <br />
              이솝 스토어에서 온전히 경험해 보세요.
              <br />
              <span className='FB'>한국 전통 건축의 미학</span>을 존중하며 다듬어진 공간들은
              <br />
              번잡함에서 벗어난 온전한 쉼을 제공합니다.
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          Section 1: Card1(삼청) + Card2(한남) 
          ══════════════════════════════════════════ */}
      <div className="Aegung_specialStores__bottom">
        <div className="Aegung_specialStores__section1">
          {/* Card 1 - 삼청: 텍스트+커넥터 → 이미지 */}
          {card1 && (
            <div className="Aegung_specialStores__card1__wrap">
              <div className="Aegung_specialStores__card1__text-connector">
                <Aegung_SpecialStore_CardText
                  title={card1.title}
                  description={card1.description}
                  align={card1.align || "left"}
                  descWidth="300px"
                />
                <div className="Aegung_specialStores__card1__connector-wrap">
                  <Aegung_SpecialStore_Connector length="120px" />
                </div>
              </div>
              <div className="Aegung_specialStores__card-image__card1">
                <img src={card1.image} alt={card1.title} />
              </div>
            </div>
          )}

          {/* Card 2 - 한남: 텍스트+커넥터 → 이미지 */}
          {card2 && (
            <div className="Aegung_specialStores__card2__wrap">
              <div className="Aegung_specialStores__card2__text-connector">
                <Aegung_SpecialStore_CardText
                  title={card2.title}
                  description={card2.description}
                  align={card2.align || "left"}
                  descWidth="470px"
                />
                <div className="Aegung_specialStores__card2__connector-wrap">
                  <Aegung_SpecialStore_Connector length="120px" />
                </div>
              </div>
              <div className="Aegung_specialStores__card-image__card2">
                <img src={card2.image} alt={card2.title} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          Card 3: 서촌 (이미지 왼 → 텍스트+커넥터 오)
          ══════════════════════════════════════════ */}
      {card3 && (
        <div className="Aegung_specialStores__card3">
          <div className="Aegung_specialStores__card3__wrap">
            <div className="Aegung_specialStores__card-image__card3">
              <img src={card3.image} alt={card3.title} />
            </div>
            <div className="Aegung_specialStores__card3__text-connector">
              <Aegung_SpecialStore_Connector
                className="card3__line"
                length="120px"
                rotate={180}
              />
              <Aegung_SpecialStore_CardText
                title={card3.title}
                description={card3.description}
                align="left"
                descWidth="470px"
              />
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          Section 2: Card4(가로수길) + Card5(롯데월드몰)
          ══════════════════════════════════════════ */}
      <div className="Aegung_specialStores__section2">
        {/* 가로수길 */}
        <div className="Aegung_specialStores__section2__card4">
          {/* 가로수길 큰 이미지 */}
          {card4 && (
            <div className="Aegung_specialStores__card-image__card4">
              <img src={card4.image} alt={card4.title} />
            </div>
          )}
          {/* 가로수길 텍스트 + 커넥터 */}
          {card4 && (
            <div className="Aegung_specialStores__card4__text-connector">
              <Aegung_SpecialStore_Connector length="76px" rotate={270} />
              <Aegung_SpecialStore_CardText
                title={card4.title}
                description={card4.description}
                align="left"
                descWidth="500px"
                className="__desc"
              />
            </div>
          )}
        </div>
        {/* ── 롯데월드몰 ── */}
        <div className="Aegung_specialStores__section2__card5">
          {/* 롯데월드몰 이미지 */}
          <div className="Aegung_specialStores__card-image__card5-small">
            <img
              src="/images/aegung/05-SpecialStores/StoreItem05.png"
              alt="이솝 롯데월드몰"
            />
          </div>

          {/* 롯데월드몰 텍스트 */}
          {card5 && (
            <div className="Aegung_specialStores__card5__text-connector">
              <Aegung_SpecialStore_Connector length="43px" rotate={270} />
              <Aegung_SpecialStore_CardText
                title={card5.title}
                description={card5.description}
                align="left"
                descWidth="340px"
              />
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          Section 3: Card6(성수)
          ══════════════════════════════════════════ */}
      <div className="Aegung_specialStores__section3__card6">
        {/* 성수 이미지 */}
        <div className="Aegung_specialStores__section3__card6__img">
          {card6 && (
            <div className="Aegung_specialStores__card-image__card6-big">
              <img src={card6.image} alt={card6.title} />
            </div>
          )}
        </div>
        {/* 성수 텍스트 + 커넥터 */}
        {card6 && (
          <div className="Aegung_specialStores__section3__card6__text-connector">
            <Aegung_SpecialStore_Connector length="116px" rotate={180} />
            <Aegung_SpecialStore_CardText
              title={card6.title}
              description={card6.description}
              align="left"
              descWidth="340px"
            />
          </div>
        )}
      </div>
      {/* Card 7 - 파르나스: 타이틀+커넥터 행 → 이미지, 설명은 아래 */}
      {card7 && (
        <div className="Aegung_specialStores__card7">
          <div className="Aegung_specialStores__card7_text">
            <div className="Aegung_specialStores__card7__left">
              <div className="Aegung_specialStores__card7__title-row">
                <h3 className="Aegung_specialStores__card7__title">
                  {card7.title}
                </h3>
              </div>
              <p className="Aegung_specialStores__card7__desc">
                {card7.description}
              </p>
            </div>
            <Aegung_SpecialStore_Connector length="110px" />
          </div>
          <div className="Aegung_specialStores__card-image__card7">
            <img src={card7.image} alt={card7.title} />
          </div>

        </div>
      )}
    </section>
  );
};

export default Aegung_SpecialStores;
