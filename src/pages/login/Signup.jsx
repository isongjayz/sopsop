// ========================================
// Signup Page - 회원가입 화면
// ========================================

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../store/useStore";
import "./style.scss";

function Signup() {
  const { signup } = useStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    phone: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setErrorMsg("");

    const { email, password, passwordConfirm, name, phone } = formData;

    if (!email || !password || !name || !phone) {
      setErrorMsg("모든 필수 항목을 입력해주세요.");
      return;
    }

    if (password !== passwordConfirm) {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
      return;
    }

    const success = signup({ email, password, name, phone });
    if (success) {
      alert("회원가입이 완료되었습니다. 로그인해주세요.");
      navigate("/login");
    } else {
      setErrorMsg("이미 가입된 이메일입니다.");
    }
  };

  return (
    <div className="auth-page inner">
      <div className="auth-page__layout">
        {/* 왼쪽 이미지 영역 */}
        <div className="auth-page__image">
          <img
            src="https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80"
            alt="Aesop Signup"
          />
        </div>

        {/* 오른쪽 폼 영역 */}
        <div className="auth-page__container">
          <h2 className="auth-page__title">Join Us</h2>
          <p className="auth-page__desc">
            Aesop의 다양한 혜택을 위해 회원가입이 진행됩니다.
          </p>

          <form className="auth-form" onSubmit={handleSignup}>
            <div className="auth-form__group">
              <label>NAME</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="이름을 입력해주세요"
              />
            </div>
            <div className="auth-form__group">
              <label>EMAIL</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="이메일을 입력해주세요"
              />
            </div>
            <div className="auth-form__group">
              <label>PHONE</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(-) 없이 숫자만 입력해주세요"
              />
            </div>
            <div className="auth-form__group">
              <label>PASSWORD</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호를 입력해주세요"
              />
            </div>
            {/* <div className="auth-form__group">
              <label>PASSWORD CONFIRM</label>
              <input
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                placeholder="비밀번호를 확인합니다"
              />
            </div> */}

            {errorMsg && <p className="auth-form__error">{errorMsg}</p>}

            <button
              type="submit"
              className="btn-outline auth-form__submit mt-2"
            >
              Sign up
            </button>

            <div className="auth-page__links--bottom">
              <Link to="/login">이미 계정이 있으신가요? 로그인하기</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
