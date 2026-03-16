// ========================================
// MyPage Inquiry (1:1 문의)
// ========================================

// 수정: 미사용 useEffect 제거
import { useState } from 'react';
import useStore from '../../store/useStore';
import MyPageSidebar from './MyPageSidebar';
import './style.scss';

function MyPageInquiry() {
    const { isLoggedIn, user, inquiries, submitInquiry } = useStore();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // 문의 폼
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    
    // 내 문의 목록
    const myInquiries = inquiries.filter(item => item.userId === user?.id);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) {
            alert('제목과 내용을 모두 입력해주세요.');
            return;
        }

        submitInquiry({
            title,
            content,
            userId: user.id,
            authorName: user.name
        });

        alert('문의가 등록되었습니다.');
        setIsModalOpen(false);
        setTitle('');
        setContent('');
    };

    if (!isLoggedIn) return null;

    return (
        <div className="mypage inner">
            <MyPageSidebar />
            <main className="mypage-content">
                <header className="mypage-content__header">
                    <h2 className="font-serif">Conversations</h2>
                    <button className="btn-inquiry-top" onClick={() => setIsModalOpen(true)}>1:1 문의하기</button>
                </header>

                <div className="conversations-list">
                    {myInquiries.length === 0 ? (
                        <div className="empty-state">
                            <p>등록된 대화가 없습니다.</p>
                        </div>
                    ) : (
                        myInquiries.map(item => (
                            <div key={item.id} className="conversation-item">
                                <div className="status-col">
                                    <span className={`dot ${item.status === '답변완료' ? 'is-done' : 'is-wait'}`}></span>
                                    <span className="status-text">{item.status}</span>
                                </div>
                                <div className="title-col">
                                    <span className="title">{item.title}</span>
                                </div>
                                <div className="actions-col">
                                    <button className="btn-text">수정</button>
                                    <span className="sep">|</span>
                                    <button className="btn-text">삭제</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* 작성 모달 */}
                {isModalOpen && (
                    <div className="inquiry-modal">
                        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}></div>
                        <div className="modal-content">
                            <h3>1:1 문의하기</h3>
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
                                    <select>
                                        <option>제품 문의</option>
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
                                    <button type="submit" className="btn-primary">등록하기</button>
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
