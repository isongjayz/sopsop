// ========================================
// Board / Customer Support Page
// 고객지원, FAQ, 공지사항 등을 보여주는 페이지
// ========================================

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useStore from "../../store/useStore";
import { Plus, Minus } from "lucide-react";
import ChatBot from "../../components/ChatBot";
import "./style.scss";

function Board() {
  const { faqs, notices, fetchNotices, fetchFAQs } = useStore();
  const [activeTab, setActiveTab] = useState("faq"); // 'faq' | 'notice'
  const [openFaqId, setOpenFaqId] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // 컴포넌트 마운트 시 공지사항과 FAQ 초기 데이터 로드 (Zustand 데이터 가져오기)
    if (faqs.length === 0) fetchFAQs();
    if (notices.length === 0) fetchNotices();
  }, [faqs.length, notices.length, fetchFAQs, fetchNotices]);

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="board-page">
      {/* 상단 Hero 영역 */}
      <div
        className="board-hero"
        style={{
          backgroundImage: `url('/images/board/mainVisual.png')`,
        }}
      >
        <div className="board-hero__inner">
          <h2 className="board-hero__inner_title">고객 지원</h2>
          <p>
            건강한 피부와 평온한 일상을 위한 여정,
            <br />
            이솝이 사려 깊은 가이드가 되어 드립니다.
          </p>
        </div>
      </div>
      <section className="board__inner">
        <div className="aroma_guide">
          <h2 className="aroma_guide__title">AROMA GUIDE</h2>
          <div className="aroma_guide__top">
            <img
              src="../../public/images/board/guide01.png"
              alt=""
              className="aroma_guide__img"
            />
            <div className="aroma_guide__text">
              <p className="aroma_guide__text__ko">
                온라인에서 향수를 구매하는 것은 때때로 어려울 수 있습니다.
                <br />
                이솝 컨설턴트가 상 담을 통해 맞춤형 컨설팅을 제공하고
                <br />
                개개인에게 어울리는 향을 선택할 수 있도록 도움을 드립니다.
              </p>
              <p className="aroma_guide__text__en">
                Selecting a fragrance online can be a nuanced challenge.
                <br />
                Our Aesop consultants offer personalized consultations <br />
                to help you discover a scent that resonates with your unique
                character.
              </p>
            </div>
          </div>
          <div className="aroma_guide__bottom">
            <div className="aroma_guide__text">
              <p className="aroma_guide__text__ko">
                당신의 라이프스타일과 공간에 어우러지는
                <br />
                완벽한 향의 조화를 발견해 보세요. <br />
                지금 바로 아로마 가이드를 통해 감각을 일깨우는
                <br />
                나만의 향기를 만나보시길 바랍니다.
              </p>
              <p className="aroma_guide__text__en">
                Explore the perfect olfactory harmony that
                <br />
                complements your lifestyle and surroundings.
                <br />
                We invite you to awaken your senses and find your
                <br />
                signature aroma through our Aroma Guide.
              </p>
            </div>
            <img
              src="../../public/images/board/guide02.png"
              alt=""
              className="aroma_guide__img"
            />
          </div>

          <button className="consultation_button">컨설턴트와 상담하기</button>
        </div>

        {/* FAQ / NOTICE */}
        <div className="board-FAQ_inner">
          <div className="board-tabs">
            <button
              className={activeTab === "faq" ? "is-active" : ""}
              onClick={() => setActiveTab("faq")}
            >
              <div className="board-tabs__title">FAQ</div>
              <span className="board-tabs__subtitle">이솝의 안내서</span>
            </button>
            <button
              className={activeTab === "notice" ? "is-active" : ""}
              onClick={() => setActiveTab("notice")}
            >
              <div className="board-tabs__title">Notice</div>
              <span className="board-tabs__subtitle">이솝의 공지사항</span>
            </button>
          </div>

          <div className="board-panels">
            {/* FAQ 탭 */}
            {activeTab === "faq" && (
              <div className="faq-list">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className={`faq-item ${openFaqId === faq.id ? "is-open" : ""}`}
                  >
                    <button
                      className="faq-item__question"
                      onClick={() => toggleFaq(faq.id)}
                    >
                      <span className="q-mark">Q.</span>
                      <span className="title">{faq.question}</span>
                      <span className="icon">
                        {openFaqId === faq.id ? (
                          <Minus size={20} />
                        ) : (
                          <Plus size={20} />
                        )}
                      </span>
                    </button>
                    <div className="faq-item__answer">
                      <div className="answer-inner">
                        <span className="a-mark">A.</span>
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 공지사항 탭 */}
            {activeTab === "notice" && (
              <div className="notice-list">
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th className="num">번호</th>
                        <th className="title">제목</th>
                        <th className="date">등록일</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notices.map((notice, idx) => (
                        <tr key={notice.id}>
                          <td className="num">{notices.length - idx}</td>
                          <td className="title">{notice.title}</td>
                          <td className="date">{notice.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 카드안내사항 */}
        <div className="board-card">
          <div className="board-card_bottom01">
            <button className="board-card_bottom01__card">
              <img
                src="../../public/images/board/Icon01.svg"
                alt="주문관련"
                className="board-card_bottom01__card__icon"
              />
              <div className="board-card_bottom01__card__text">
                <strong>주문관련</strong>
                <span>
                  결제 방법, 세금 정보 및 온라인 계정 관리에 대한 도움을
                  드립니다.
                </span>
              </div>
            </button>
            <button className="board-card_bottom01__card">
              <img
                src="../../public/images/board/Icon02.svg"
                alt="배송관련"
                className="board-card_bottom01__card__icon"
              />
              <div className="board-card_bottom01__card__text">
                <strong>배송 및 상품</strong>
                <span>
                  최근 주문을 추적하고, 국제 배송료를 확인하거나 반품을
                  신청하세요.
                </span>
              </div>
            </button>
            <button className="board-card_bottom01__card">
              <img
                src="../../public/images/board/Icon03.svg"
                alt="제품관련"
                className="board-card_bottom01__card__icon"
              />
              <div className="board-card_bottom01__card__text">
                <strong>제품 정보</strong>
                <span>
                  이솝의 제품, 포뮬레이션, 성분, 피부 타입, 피부 타입에 적합한
                  제품 그리고 서비스에 대해 알아보기
                </span>
              </div>
            </button>
            <button className="board-card_bottom01__card">
              <img
                src="../../public/images/board/Icon04.svg"
                alt="매장관련"
                className="board-card_bottom01__card__icon"
              />
              <div className="board-card_bottom01__card__text">
                <strong>기업문의</strong>
                <span>
                  기업체 구매와 관련한 브로셔를 받아보길 희망하시거나 구매
                  문의가 있으신 경우, 문의하기를 진행해주세요.
                </span>
              </div>
            </button>
          </div>
          {/* ----botton2------- */}
          <div className="board-card_bottom02">
            <div className="board-card_bottom02_left">
              <div className="board-card_bottom02_left_top">
                <span className="board-card_bottom02_chip">문의하기</span>
                <strong className="board-card_bottom02_strong">직접문의</strong>
              </div>
              <div className="board-card_bottom02_left_bottom">
                <p className="board-card_bottom02_p">
                  모든 주문 및 제품 관련 문의는 마이페이지를 통해 문의 주시면
                  24시간 이내에 답변드리겠습니다.
                </p>
                <Link to="/mypage" className="board-card_bottom02_left_bottom_button">
                  마이페이지 바로가기
                </Link>
              </div>
            </div>
            <div className="board-card_bottom02_center">
              <div className="board-card_bottom02_center_top">
                <span className="board-card_bottom02_chip">채팅문의</span>
                <strong className="board-card_bottom02_strong">
                  즉각적인 지원
                </strong>
              </div>
              <div className="board-card_bottom02_center_bottom">
                <p className="board-card_bottom02_p">
                  영업 시간 중 컨설턴트와 실시간으로 상담하여 즉각적인 도움을
                  받으세요.
                </p>
                <button className="board-card_bottom02_center_bottom__button" onClick={() => setIsChatOpen(true)}>
                  채팅 시작하기
                </button>
              </div>
            </div>
            <div className="board-card_bottom02_right">
              <span className="board-card_bottom02_chip">전화문의</span>
              <strong className="board-card_bottom02_strong_number">
                +61 3 9412 8900
              </strong>
              <p className="board-card_bottom02_p">
                월요일 - 금요일 <br /> 오전 9:00 — 오후 5:00 (AEDT)
              </p>
              <p className="board-card_bottom02_right_comment">
                일반 통화 요금이 적용됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>
      {isChatOpen && <ChatBot onClose={() => setIsChatOpen(false)} />}
    </div>
  );
}

export default Board;
