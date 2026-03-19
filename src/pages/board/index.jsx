// ========================================
// Board / Customer Support Page
// 고객지원, FAQ, 공지사항 등을 보여주는 페이지
// ========================================

import { useState, useEffect } from 'react';
import useStore from '../../store/useStore';
import { Plus, Minus } from 'lucide-react';
import './style.scss';

function Board() {
    const { faqs, notices, fetchNotices, fetchFAQs } = useStore();
    const [activeTab, setActiveTab] = useState('faq'); // 'faq' | 'notice'
    const [openFaqId, setOpenFaqId] = useState(null);

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
            <section className="board-hero">
                <img src="../../public/images/board/MainVisual.png" alt="고객지원" />
                <div className="board-hero__inner">
                    <h2 className="board-hero__inner_title">고객 지원</h2>
                    <p>건강한 피부와 평온한 일상을 위한 여정,<br />이솝이 사려 깊은 가이드가 되어 드립니다.</p>
                </div>
            </section>


            <section className="aroma_guide">
                <div className="aroma_guide_top">
                    <img src="../../public/images/board/guide01.png" alt="" />
                    <div className="aroma_guide_top_text">
                        <strong className="aroma_guide_top_text_title">AROMA GUIDE</strong>
                        <div className="aroma_guide_top_text_desc">
                            <p className="aroma_guide_top_text_desc_ko">온라인에서 향수를 구매하는 것은 때때로 어려울 수 있습니다.<br />이솝 컨설턴트가 상 담을 통해 맞춤형 컨설팅을 제공하고<br />개개인에게 어울리는 향을 선택할 수 있도록 도움을 드립니다.</p>
                            <p className="aroma_guide_top_text_desc_en">Selecting a fragrance online can be a nuanced challenge. Our Aesop consultants offer personalized consultations to help you discover a scent that resonates with your unique character.</p>
                        </div>
                    </div>
                </div>
                <div className="aroma_guide_bottom">
                    <div className="aroma_guide_bottom_text">
                        <p className="aroma_guide_bottom_text_ko">온라인에서 향수를 구매하는 것은 때때로 어려울 수 있습니다.<br />이솝 컨설턴트가 상 담을 통해 맞춤형 컨설팅을 제공하고<br />개개인에게 어울리는 향을 선택할 수 있도록 도움을 드립니다.</p>
                        <p className="aroma_guide_bottom_text_en">온라인에서 향수를 구매하는 것은 때때로 어려울 수 있습니다.<br />이솝 컨설턴트가 상 담을 통해 맞춤형 컨설팅을 제공하고<br />개개인에게 어울리는 향을 선택할 수 있도록 도움을 드립니다.</p>
                    </div>
                    <img src="../../public/images/board/guide02.png" alt="" />
                </div>
                <button className="consultation_button">컨설턴트와 상담하기</button>
            </section >

            {/* 메인 콘텐츠 */}
            < section className="board-content inner" >
                <div className="board-tabs">
                    <button
                        className={activeTab === 'faq' ? 'is-active' : ''}
                        onClick={() => setActiveTab('faq')}
                    >
                        FAQ<span>이솝의 안내서</span>
                    </button>
                    <button
                        className={activeTab === 'notice' ? 'is-active' : ''}
                        onClick={() => setActiveTab('notice')}
                    >
                        Notice<span>이솝의 공지사항</span>
                    </button>
                </div>

                <div className="board-panels">
                    {/* FAQ 탭 */}
                    {activeTab === 'faq' && (
                        <div className="faq-list">
                            {faqs.map(faq => (
                                <div key={faq.id} className={`faq-item ${openFaqId === faq.id ? 'is-open' : ''}`}>
                                    <button className="faq-item__question" onClick={() => toggleFaq(faq.id)}>
                                        <span className="q-mark">Q.</span>
                                        <span className="title">{faq.question}</span>
                                        <span className="icon">
                                            {openFaqId === faq.id ? <Minus size={20} /> : <Plus size={20} />}
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
                    {activeTab === 'notice' && (
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
            </section >


            {/* 하단 Contact 영역 */}
            < section className="board-contact_bottom01" >
                <div className="contact-card">
                    <button className="info-item01">
                        <img src="../../public/images/board/Icon01.svg" alt="주문관련" className="info-item_icon1" />
                        <strong>주문관련</strong>
                        <span>결제 방법, 세금 정보 및 온라인
                            계정 관리에 대한 도움을 드립니
                            다.</span>

                    </button>
                    <button className="info-item02">
                        <img src="../../public/images/board/Icon02.svg" alt="배송관련" className="info-item_icon2" />
                        <strong>배송 및 상품</strong>
                        <span>최근 주문을 추적하고, 국제 배
                            송료를 확인하거나 반품을 신청
                            하세요.</span>

                    </button>
                    <button className="info-item03">
                        <img src="../../public/images/board/Icon03.svg" alt="제품관련" className="info-item_icon3" />
                        <strong>제품 정보</strong>
                        <span>이솝의 제품, 포뮬레이션, 성분, 피부 타입, 피부 타입에 적합한 제품 그리고 서비스에 대해 알아보기</span>

                    </button>
                    <button className="info-item">
                        <img src="../../public/images/board/Icon04.svg" alt="매장관련" className="info-item_icon4" />
                        <strong>기업문의</strong>
                        <span>기업체 구매와 관련한 브로셔를 받    아보길 희망하시거나 구매 문의가 있으신 경우, 문의하기를 진행해주세요.</span>
                    </button>
                </div>
                <div className="board-contact_bottom02">
                    <div className="board-contact_bottom02_left">
                        <span className='contact_bottom02_span'>문의하기</span>
                        <strong className='contact_bottom02_strong'>직접문의</strong>
                        <p className='contact_bottom02_p'>모든 주문 및 제품 관련 문의는 마이페이지를 통해 문의 주시면 24시간 이내에 답변드리겠습니다.</p>
                        <button className='contact_bottom02_button_left'>마이페이지 바로기</button>
                    </div>
                    <div className="board-contact_bottom02_center">
                        <span className='contact_bottom02_span'>채팅문의</span>
                        <strong className='contact_bottom02_strong'>즉각적인 지원</strong>
                        <p className='contact_bottom02_p'>영업 시간 중 컨설턴트와 실시간으로 상담하여 즉각적인 도움을 받으세요.</p>
                        <button className='contact_bottom02_button_center'>채팅 시작하기</button>
                    </div>
                    <div className="board-contact_bottom02_right">
                        <span className='contact_bottom02_span'>전화문의</span>
                        <strong className='contact_bottom02_strong_number'>+61 3 9412 8900</strong>
                        <p className='contact_bottom02_p_right'>월요일 - 금요일
                            오전 9:00 — 오후 5:00 (AEDT)</p>
                        <button className='contact_bottom02_button_right'>일반 통화 요금이 적용됩니다.</button>
                    </div>
                </div>
            </section >
        </div >
    );
}

export default Board;
