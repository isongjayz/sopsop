// ========================================
// Checkout - 결제 페이지 (3단계 Step 관리)
// ========================================

import { useState } from "react";
import CartStep from "./CartStep";
import PaymentStep from "./PaymentStep";
import CompleteStep from "./CompleteStep";
import "./style.scss";

function Checkout() {
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState("");

  return (
    <div className="checkout-page inner">
      {/* Step Indicator */}
      <div className="checkout__steps">
        <div
          className={`checkout__step ${step >= 1 ? "is-active" : ""} ${step > 1 ? "is-clickable" : ""}`}
          onClick={() => step > 1 && setStep(1)}
        >
          <span className="step-num">1</span>{" "}
          <span className="step-text">장바구니</span>
        </div>
        <div className="step-line"></div>
        <div
          className={`checkout__step ${step >= 2 ? "is-active" : ""} ${step > 2 ? "is-clickable" : ""}`}
          onClick={() => step > 2 && setStep(2)}
        >
          <span className="step-num">2</span>{" "}
          <span className="step-text">결제정보입력</span>
        </div>
        <div className="step-line"></div>
        <div className={`checkout__step ${step >= 3 ? "is-active" : ""}`}>
          <span className="step-num">3</span>{" "}
          <span className="step-text">주문 완료</span>
        </div>
      </div>

      <div className="checkout__content">
        {step === 1 && <CartStep onNext={() => setStep(2)} />}
        {step === 2 && (
          <PaymentStep
            onPrev={() => setStep(1)}
            onNext={() => { setStep(3); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            setOrderId={setOrderId}
          />
        )}
        {step === 3 && <CompleteStep orderId={orderId} />}
      </div>
    </div>
  );
}

export default Checkout;
