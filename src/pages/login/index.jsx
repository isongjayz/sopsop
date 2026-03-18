// ========================================
// Login Page - 로그인 화면
// ========================================

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../store/useStore";
import "./style.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { login, loginAsTestUser } = useStore();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    const success = login({ email, password });
    if (success) {
      navigate("/");
    } else {
      setErrorMsg("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  const handleTestAccountFill = () => {
    const testUser = loginAsTestUser(true);
    setEmail(testUser.email);
    setPassword(testUser.password);
    setErrorMsg("");
  };

  return (
    <div className="login">
      {/* 왼쪽 이미지 */}
      <div className="login_image">
        <img src="/images/login/loginimg.png" alt="Aesop" />
      </div>

      {/* 오른쪽 폼 */}
      <div className="login_content">
        <h1 className="login_title">Welcome to Aesop</h1>
        <p className="login_desc">
          이솝에 오신것을 환영합니다.
          <br />
          다양한 혜택과 빠른 주문을 위해 로그인해주시기 바랍니다.
        </p>

        <form className="login_form" onSubmit={handleLogin}>
          {/* 이메일 */}
          <div className="login_field">
            <label>EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력해주세요"
            />
          </div>

          {/* 비밀번호 */}
          <div className="login_field">
            <label>PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {/* 이메일/비밀번호 찾기 */}
          <div className="login_find">
            <Link to="/find-account">이메일 찾기</Link>
            <span className="login_find-sep">/</span>
            <Link to="/find-account?tab=password">비밀번호 찾기</Link>
            <span className="login_find-sep">/</span>
            <button
              type="button"
              className="login_find-test"
              onClick={handleTestAccountFill}
            >
              테스트 계정
            </button>
          </div>

          {errorMsg && <p className="login_error">{errorMsg}</p>}

          {/* 버튼 */}
          <button type="submit" className="login_btn">
            Log in
          </button>
          <button
            type="button"
            className="login_btn"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </form>

        {/* SNS 로그인 */}
        <div className="login_sns">
          <div className="login_sns_divider">
            <span>SNS 로그인</span>
          </div>
          <div className="login_sns_icons">
            <button aria-label="네이버 로그인">
              <img src="/images/login/naver_login.png" alt="naver" />
            </button>
            <button aria-label="카카오 로그인">
              <img src="/images/login/kakao_login.png" alt="kakao" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
