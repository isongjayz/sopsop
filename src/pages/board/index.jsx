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
                <div className="inner">
                    <h2 className="font-serif">고객 지원</h2>
                    <p>어떤 도움이 필요하신가요?</p>
                    {/* HMR Trigger Comment */}
                </div>
            </section>

            {/* 메인 콘텐츠 */}
            <section className="board-content inner">
                <div className="board-tabs">
                    <button 
                        className={activeTab === 'faq' ? 'is-active' : ''} 
                        onClick={() => setActiveTab('faq')}
                    >
                        자주 묻는 질문 (FAQ)
                    </button>
                    <button 
                        className={activeTab === 'notice' ? 'is-active' : ''} 
                        onClick={() => setActiveTab('notice')}
                    >
                        공지사항
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
            </section>

            {/* 하단 Contact 영역 */}
            <section className="board-contact inner">
                <div className="contact-card">
                    <h3 className="font-serif">직접 문의하기</h3>
                    <p>
                        원하시는 답변을 찾지 못하셨나요?<br />
                        전문 상담원이 친절하게 안내해 드립니다.
                    </p>
                    <div className="contact-info">
                        <div className="info-item">
                            <strong>전화 문의</strong>
                            <span>1800-1234</span>
                            <em>운영시간: 평일 10:00 - 17:00 (주말/공휴일 휴무)</em>
                        </div>
                        <div className="info-item">
                            <strong>1:1 문의</strong>
                            <span>로그인 후 마이페이지에서 접수 가능</span>
                            <em>24시간 접수 가능</em>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Board;
