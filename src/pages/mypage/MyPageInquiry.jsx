// ========================================
// MyPage Inquiry (1:1 문의)
// ========================================

import { useState } from 'react';
import useStore from '../../store/useStore';
import MyPageSidebar from './MyPageSidebar';
import { inquiryData } from '../../assets/api/inquiryData';
import './style.scss';

function MyPageInquiry() {
    const { isLoggedIn, user, submitInquiry } = useStore();
    const [list, setList] = useState(inquiryData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null); // null이면 신규, 객체면 수정
    const [openId, setOpenId] = useState(null);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('상품 문의');

    const openCreateModal = () => {
        setEditingItem(null);
        setTitle('');
        setContent('');
        setType('상품 문의');
        setIsModalOpen(true);
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setTitle(item.title);
        setContent(item.content);
        setType(item.type);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (!window.confirm('문의를 삭제하시겠습니까?')) return;
        setList(prev => prev.filter(item => item.id !== id));
        if (openId === id) setOpenId(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }

        if (editingItem) {
            // 수정
            setList(prev => prev.map(item =>
                item.id === editingItem.id
                    ? { ...item, title, content, type }
                    : item
            ));
            alert('문의가 수정되었습니다.');
        } else {
            // 신규 등록
            const newItem = {
                id: Date.now(),
                status: '답변대기',
                title,
                content,
                type,
                orderDate: '-',
                writeDate: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace('.', ''),
                productName: '-',
                orderNo: '-',
                reply: null,
            };
            setList(prev => [newItem, ...prev]);
            submitInquiry({ title, content, userId: user.id, authorName: user.name });
            alert('문의가 등록되었습니다.');
        }

        setIsModalOpen(false);
    };

    const handleToggle = (id) => {
        setOpenId(prev => prev === id ? null : id);
    };

    if (!isLoggedIn) return null;

    return (
        <div className="mypage">
            <MyPageSidebar />
            <main className="mypage-content">
                <header className="mypage-content__header">
                    <h2 className="font-serif">Conversations</h2>
                    <button className="btn-inquiry-top" onClick={openCreateModal}>1:1 문의하기</button>
                </header>

                <div className="conversations-list">
                    {list.length === 0 ? (
                        <div className="empty-state">
                            <p>등록된 대화가 없습니다.</p>
                        </div>
                    ) : (
                        list.map(item => (
                            <div key={item.id} className="conversation-accordion">
                                {/* 목록 행 */}
                                <div
                                    className={`conversation-item ${openId === item.id ? 'is-open' : ''}`}
                                    onClick={() => handleToggle(item.id)}
                                >
                                    <div className="status-col">
                                        <span className={`dot ${item.status === '답변완료' ? 'is-done' : 'is-wait'}`}></span>
                                        <span className="status-text">{item.status}</span>
                                    </div>
                                    <div className="title-col">
                                        <span className="title">{item.title}</span>
                                    </div>
                                    <div className="actions-col" onClick={e => e.stopPropagation()}>
                                        <button
                                            className={`btn-text ${item.status === '답변완료' ? 'is-disabled' : ''}`}
                                            onClick={() => item.status !== '답변완료' && openEditModal(item)}
                                            disabled={item.status === '답변완료'}
                                        >
                                            수정
                                        </button>
                                        <span className="sep">|</span>
                                        <button
                                            className="btn-text"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>

                                {/* 펼쳐지는 상세 영역 */}
                                {openId === item.id && (
                                    <div className="conversation-detail">
                                        <div className="conversation-detail__meta">
                                            <div className="meta-row">
                                                <span className="meta-label">주문일자</span>
                                                <span className="meta-value">{item.orderDate}</span>
                                                <span className="meta-label">작성일자</span>
                                                <span className="meta-value">{item.writeDate}</span>
                                            </div>
                                            <div className="meta-row">
                                                <span className="meta-label">주문상품</span>
                                                <span className="meta-value">{item.productName}</span>
                                                <span className="meta-label">주문번호</span>
                                                <span className="meta-value">{item.orderNo}</span>
                                            </div>
                                        </div>

                                        <div className="conversation-detail__section">
                                            <span className="section-label">{item.type}</span>
                                            <p className="section-content">{item.content}</p>
                                        </div>

                                        {item.reply && (
                                            <div className="conversation-detail__section is-reply">
                                                <span className="section-label">답변완료</span>
                                                <p className="section-content">{item.reply}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {/* 작성/수정 모달 */}
                {isModalOpen && (
                    <div className="inquiry-modal">
                        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}></div>
                        <div className="modal-content">
                            <h3>{editingItem ? '문의 수정' : '1:1 문의하기'}</h3>
                            <button className="close-btn" onClick={() => setIsModalOpen(false)}>×</button>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>제목</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="문의 제목을 입력하세요"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>유형</label>
                                    <select value={type} onChange={(e) => setType(e.target.value)}>
                                        <option>상품 문의</option>
                                        <option>배송 문의</option>
                                        <option>교환/반품 문의</option>
                                        <option>기타</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>내용</label>
                                    <textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="문의 내용을 상세히 입력해주세요"
                                    ></textarea>
                                </div>
                                <div className="modal-actions">
                                    <button type="button" className="btn-outline" onClick={() => setIsModalOpen(false)}>취소</button>
                                    <button type="submit" className="btn-primary">
                                        {editingItem ? '수정하기' : '등록하기'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default MyPageInquiry;
