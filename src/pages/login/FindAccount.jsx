// ========================================
// FindAccount Page - 아이디/비밀번호 찾기 화면
// ========================================

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import './style.scss';

function FindAccount() {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('email');
    
    const [nameForEmail, setNameForEmail] = useState('');
    const [phoneForEmail, setPhoneForEmail] = useState('');
    const [foundEmail, setFoundEmail] = useState('');
    
    const [emailForPw, setEmailForPw] = useState('');
    const [phoneForPw, setPhoneForPw] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [pwResetSuccess, setPwResetSuccess] = useState(false);
    
    const [errorMsg, setErrorMsg] = useState('');

    const { findEmail, resetPassword } = useStore();

    useEffect(() => {
        const tab = new URLSearchParams(location.search).get('tab');
        if (tab === 'password') {
            setActiveTab('password');
        }
    }, [location.search]);

    const handleFindEmail = (e) => {
        e.preventDefault();
        setErrorMsg('');
        setFoundEmail('');

        if (!nameForEmail || !phoneForEmail) {
            setErrorMsg('이름과 휴대폰 번호를 입력해주세요.');
            return;
        }

        const email = findEmail(nameForEmail, phoneForEmail);
        if (email) {
            setFoundEmail(email);
        } else {
            setErrorMsg('일치하는 계정 정보가 없습니다.');
        }
    };

    const handleResetPassword = (e) => {
        e.preventDefault();
        setErrorMsg('');
        setPwResetSuccess(false);

        if (!emailForPw || !phoneForPw || !newPassword) {
            setErrorMsg('모든 필드를 입력해주세요.');
            return;
        }

        const success = resetPassword(emailForPw, phoneForPw, newPassword);
        if (success) {
            setPwResetSuccess(true);
        } else {
            setErrorMsg('일치하는 계정 정보가 없습니다.');
        }
    };

    return (
        <div className="auth-page inner">
            <div className="auth-page__layout">
                <div className="auth-page__image">
                    <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80" alt="Aesop Account Recovery" />
                </div>

                <div className="auth-page__container">
                    <h2 className="font-serif auth-page__title">계정 찾기</h2>
                    <p className="auth-page__desc">
                        가입 시 입력하신 정보를 바탕으로 계정을 찾습니다.
                    </p>

                    <div className="auth-form">
                        <div className="auth-form__tabs">
                            <button 
                                className={activeTab === 'email' ? 'is-active' : ''} 
                                onClick={() => { setActiveTab('email'); setErrorMsg(''); }}
                            >
                                이메일 찾기
                            </button>
                            <button 
                                className={activeTab === 'password' ? 'is-active' : ''} 
                                onClick={() => { setActiveTab('password'); setErrorMsg(''); }}
                            >
                                비밀번호 재설정
                            </button>
                        </div>

                        {activeTab === 'email' && (
                            <div>
                                {foundEmail ? (
                                    <div className="auth-form__result">
                                        고객님의 이메일 주소는
                                        <strong>{foundEmail}</strong>
                                        입니다.
                                    </div>
                                ) : (
                                    <form onSubmit={handleFindEmail}>
                                        <div className="auth-form__group">
                                            <label>이름</label>
                                            <input 
                                                type="text" 
                                                value={nameForEmail}
                                                onChange={(e) => setNameForEmail(e.target.value)}
                                                placeholder="가입 시 등록한 이름"
                                            />
                                        </div>
                                        <div className="auth-form__group">
                                            <label>휴대폰 번호</label>
                                            <input 
                                                type="tel" 
                                                value={phoneForEmail}
                                                onChange={(e) => setPhoneForEmail(e.target.value)}
                                                placeholder="가입 시 등록한 휴대폰 번호 (- 제외)"
                                            />
                                        </div>
                                        
                                        {errorMsg && <p className="auth-form__error">{errorMsg}</p>}

                                        <button type="submit" className="btn-primary auth-form__submit">
                                            이메일 찾기
                                        </button>
                                        <button type="button" className="btn-outline auth-form__submit auth-form__back-btn" onClick={() => navigate('/login')}>
                                            돌아가기
                                        </button>
                                    </form>
                                )}
                            </div>
                        )}

                        {activeTab === 'password' && (
                            <div>
                                {pwResetSuccess ? (
                                    <div className="auth-form__result">
                                        비밀번호가 성공적으로 변경되었습니다.
                                        <br />새로운 비밀번호로 로그인해주세요.
                                    </div>
                                ) : (
                                    <form onSubmit={handleResetPassword}>
                                        <div className="auth-form__group">
                                            <label>이메일 주소</label>
                                            <input 
                                                type="email" 
                                                value={emailForPw}
                                                onChange={(e) => setEmailForPw(e.target.value)}
                                                placeholder="가입 시 등록한 이메일"
                                            />
                                        </div>
                                        <div className="auth-form__group">
                                            <label>휴대폰 번호</label>
                                            <input 
                                                type="tel" 
                                                value={phoneForPw}
                                                onChange={(e) => setPhoneForPw(e.target.value)}
                                                placeholder="가입 시 등록한 휴대폰 번호 (- 제외)"
                                            />
                                        </div>
                                        <div className="auth-form__group">
                                            <label>새 비밀번호</label>
                                            <input 
                                                type="password" 
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                placeholder="새로운 비밀번호 입력"
                                            />
                                        </div>
                                        
                                        {errorMsg && <p className="auth-form__error">{errorMsg}</p>}

                                        <button type="submit" className="btn-primary auth-form__submit">
                                            비밀번호 재설정
                                        </button>
                                        <button type="button" className="btn-outline auth-form__submit auth-form__back-btn" onClick={() => navigate('/login')}>
                                            돌아가기
                                        </button>
                                    </form>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FindAccount;
