// ========================================
// CompleteStep - 주문 완료 (Step 3)
// ========================================

import { Link } from "react-router-dom";

function CompleteStep({ orderId }) {
  return (
    <div className="checkout-complete">
      <svg
        className="complete-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
      >
        <circle cx="30" cy="30" r="29" stroke="#603B2D" strokeWidth="2" />
        <path
          className="complete-icon__check"
          d="M16.8008 30L25.8008 39L45.6008 19.2"
          stroke="#603B2D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <h2>주문이 완료되었습니다</h2>
      <p>Aesop의 지속 가능한 운영에 동참해주셔서 감사합니다</p>

      <div className="complete-actions">
        <Link to="/" className="btn-complete">
          메인페이지로 가기
        </Link>
        <Link to="/mypage/orders" className="btn-complete">
          주문 내역 보기
        </Link>
      </div>
    </div>
  );
}

export default CompleteStep;
