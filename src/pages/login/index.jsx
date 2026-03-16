// ========================================
// Login Page - 로그인 화면
// ========================================

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import './style.scss';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    
    const { login, loginAsTestUser } = useStore();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (!email || !password) {
            setErrorMsg('이메일과 비밀번호를 입력해주세요.');
            return;
        }

        const success = login({ email, password });
        if (success) {
            navigate('/');
        } else {
            setErrorMsg('이메일 또는 비밀번호가 일치하지 않습니다.');
        }
    };

    const handleTestAccountFill = () => {
        // 수정: 테스트 계정 버튼 클릭 시 계정 정보만 입력하고 로그인은 사용자가 직접 진행
        const testUser = loginAsTestUser(true);
        setEmail(testUser.email);
        setPassword(testUser.password);
        setErrorMsg('');
    };

    return (
        <div className="auth-page inner">
            <div className="auth-page__layout">
                <div className="auth-page__image">
                    <img src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&q=80" alt="Aesop Login" />
                </div>

                <div className="auth-page__container">
                    <h2 className="font-serif auth-page__title">Welcome to Aesop</h2>
                    <p className="auth-page__desc">
                        이솝에 오신것을 환영합니다.<br/>
                        다양한 혜택과 빠른 주문을 위해 로그인해주시기 바랍니다.
                    </p>

                    <form className="auth-form" onSubmit={handleLogin}>
                        <div className="auth-form__group">
                            <label>EMAIL</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="이메일을 입력해주세요"
                            />
                        </div>
                        <div className="auth-form__group">
                            <label>PASSWORD</label>
                            <input 
                                type="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="........"
                            />
                        </div>
                    
                        <div className="auth-page__links--top">
                            <Link to="/find-account">이메일 찾기</Link>
                            <span className="divider">/</span>
                            <Link to="/find-account?tab=password">비밀번호 찾기</Link>
                            <span className="divider">/</span>
                            <button type="button" className="auth-page__text-button" onClick={handleTestAccountFill}>
                                테스트 계정
                            </button>
                        </div>
                        
                        {errorMsg && <p className="auth-form__error">{errorMsg}</p>}

                        <button type="submit" className="btn-outline auth-form__submit">
                            Log in
                        </button>
                        <button 
                            type="button" 
                            className="btn-outline auth-form__signup"
                            onClick={() => navigate('/signup')}
                        >
                            회원가입
                        </button>
                    </form>

                    <div className="auth-page__sns">
                        <p>SNS 로그인</p>
                        <div className="auth-page__sns-icons">
                            <button className="sns-btn naver">N</button>
                            <button className="sns-btn kakao">K</button>
                            <button className="sns-btn google">G</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
