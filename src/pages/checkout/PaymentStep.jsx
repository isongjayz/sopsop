// ========================================
// PaymentStep - 결제 및 배송 정보 입력 (Step 2)
// ========================================

import { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import useStore from "../../store/useStore";

const SIMPLE_PAYS = [
  { id: "naver", label: "네이버페이", img: "/images/checkout/npay.png" },
  { id: "kakao", label: "카카오페이", img: "/images/checkout/kakao.png" },
  { id: "samsung", label: "삼성페이", img: "/images/checkout/samsung.png" },
];

function PaymentStep({ onPrev, onNext, setOrderId }) {
  const { cartItems, clearCart, user, addOrder, getTotalPrice } = useStore();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    postcode: user?.zipcode || "",
    address: user?.address || "",
    detailAddress: "",
    memo: "",
    paymentMethod: "card",
    paymentCard: "",
    paymentInstallment: "",
  });

  const [paymentType, setPaymentType] = useState("normal");
  const [memoSelect, setMemoSelect] = useState("");
  const [agreements, setAgreements] = useState({ agree1: false, agree2: false });
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [editingOrderer, setEditingOrderer] = useState(false);
  const [editingShipping, setEditingShipping] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handlePostcodeComplete = (data) => {
    let fullAddress = data.address;
    if (data.addressType === "R") {
      let extraAddress = "";
      if (data.bname !== "") extraAddress += data.bname;
      if (data.buildingName !== "")
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setFormData((prev) => ({
      ...prev,
      postcode: data.zonecode,
      address: fullAddress,
    }));
    setIsPostcodeOpen(false);
  };

  const paymentSelected =
    paymentType === "normal"
      ? formData.paymentCard !== ""
      : ["naver", "kakao", "samsung"].includes(formData.paymentMethod);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreements.agree1 || !agreements.agree2) {
      alert("필수 약관에 모두 동의해주세요.");
      return;
    }
    const orderData = {
      userId: user?.id || "guest",
      orderer: formData.name,
      ordererEmail: formData.email,
      ordererPhone: formData.phone,
      postcode: formData.postcode,
      address: formData.address,
      detailAddress: formData.detailAddress,
      deliveryMemo: formData.memo,
      totalPrice: getTotalPrice(),
      items: cartItems,
      paymentMethod: formData.paymentMethod,
    };
    const newOrder = addOrder(orderData);
    if (setOrderId) setOrderId(newOrder.id);
    clearCart();
    onNext();
  };

  return (
    <form className="checkout-payment" onSubmit={handleSubmit}>
      <div className="checkout-payment__forms">
        {/* 주문자 정보 */}
        <div className="payment-card">
          <div className="payment-card__head">
            <h3>주문자 정보</h3>
            <button
              type="button"
              className="payment-card__edit"
              onClick={() => setEditingOrderer((v) => !v)}
            >
              {editingOrderer ? "닫기" : "수정하기"}
            </button>
          </div>
          {editingOrderer ? (
            <div className="payment-card__body">
              <div className="form-group row">
                <input
                  type="text"
                  placeholder="이름"
                  value={formData.name}
                  onChange={handleChange("name")}
                  required
                />
                <input
                  type="email"
                  placeholder="이메일"
                  value={formData.email}
                  onChange={handleChange("email")}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="전화번호"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  required
                />
              </div>
            </div>
          ) : (
            <div className="payment-card__preview">
              <p>{formData.name || "—"}</p>
              <p>{formData.phone || "—"}</p>
              <p>{formData.email || "—"}</p>
            </div>
          )}
        </div>

        {/* 배송 정보 */}
        <div className="payment-card">
          <div className="payment-card__head">
            <h3>배송 정보</h3>
            <button
              type="button"
              className="payment-card__edit"
              onClick={() => setEditingShipping((v) => !v)}
            >
              {editingShipping ? "닫기" : "수정하기"}
            </button>
          </div>
          {editingShipping ? (
            <div className="payment-card__body">
              <div className="form-group postcode-group">
                <input
                  type="text"
                  placeholder="우편번호"
                  value={formData.postcode}
                  readOnly
                  required
                  onClick={() => setIsPostcodeOpen(true)}
                />
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setIsPostcodeOpen(true)}
                >
                  우편번호 찾기
                </button>
              </div>
              {isPostcodeOpen && (
                <div className="postcode-modal">
                  <div className="postcode-modal__content">
                    <div className="postcode-modal__header">
                      <h4>주소 검색</h4>
                      <button
                        type="button"
                        onClick={() => setIsPostcodeOpen(false)}
                      >
                        x
                      </button>
                    </div>
                    <DaumPostcode onComplete={handlePostcodeComplete} />
                  </div>
                </div>
              )}
              <div className="form-group">
                <input
                  type="text"
                  placeholder="기본 주소"
                  value={formData.address}
                  readOnly
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="상세 주소"
                  value={formData.detailAddress}
                  onChange={handleChange("detailAddress")}
                  required
                />
              </div>
            </div>
          ) : (
            <div className="payment-card__preview">
              <p>{formData.name || "—"}</p>
              <p>{formData.phone || "—"}</p>
              <p>
                {formData.address
                  ? `${formData.address} ${formData.detailAddress}`
                  : "—"}
              </p>
              <div className="form-group" style={{ marginTop: "16px" }}>
                <p className="form-label">배송메모</p>
                <select
                  className="form-delivery"
                  value={memoSelect}
                  onChange={(e) => {
                    setMemoSelect(e.target.value);
                    if (e.target.value !== "직접 입력") {
                      setFormData((prev) => ({ ...prev, memo: e.target.value }));
                    } else {
                      setFormData((prev) => ({ ...prev, memo: "" }));
                    }
                  }}
                >
                  <option value="">배송 요청사항을 입력해주세요</option>
                  <option value="문 앞에 놓아주세요">문 앞에 놓아주세요</option>
                  <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
                  <option value="부재 시 연락주세요">부재 시 연락주세요</option>
                  <option value="직접 입력">직접 입력</option>
                </select>
                {memoSelect === "직접 입력" && (
                  <input
                    type="text"
                    placeholder="배송 요청사항을 직접 입력해주세요"
                    value={formData.memo}
                    onChange={handleChange("memo")}
                    style={{ marginTop: "8px", width: "100%", padding: "12px 14px", border: "1px solid #d5cbc4", fontSize: "14px", fontFamily: "inherit", background: "transparent" }}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* 결제수단 */}
        <div className="payment-card">
          <div className="payment-card__head">
            <h3>결제수단 선택</h3>
          </div>
          <div className="payment-card__body">
            {/* 일반결제 / 간편결제 탭 */}
            <div className="payment-type-tabs">
              <label
                className={`payment-type-tab ${paymentType === "normal" ? "is-active" : ""}`}
              >
                <input
                  type="radio"
                  name="paymentType"
                  value="normal"
                  checked={paymentType === "normal"}
                  onChange={() => setPaymentType("normal")}
                />
                일반결제
              </label>
              <label
                className={`payment-type-tab ${paymentType === "simple" ? "is-active" : ""}`}
              >
                <input
                  type="radio"
                  name="paymentType"
                  value="simple"
                  checked={paymentType === "simple"}
                  onChange={() => setPaymentType("simple")}
                />
                간편결제
              </label>
            </div>

            {/* 일반결제 */}
            {paymentType === "normal" && (
              <div className="payment-normal">
                <div className="payment-normal__selects">
                  <select
                    className="form-select"
                    value={formData.paymentCard}
                    onChange={handleChange("paymentCard")}
                  >
                    <option value="">카드사 선택</option>
                    <option value="shinhan">신한카드</option>
                    <option value="kb">KB국민카드</option>
                    <option value="hyundai">현대카드</option>
                    <option value="samsung">삼성카드</option>
                    <option value="lotte">롯데카드</option>
                    <option value="hana">하나카드</option>
                    <option value="woori">우리카드</option>
                    <option value="bc">BC카드</option>
                  </select>
                  <select
                    className="form-select"
                    value={formData.paymentInstallment}
                    onChange={handleChange("paymentInstallment")}
                  >
                    <option value="">할부 선택</option>
                    <option value="0">일시불</option>
                    <option value="2">2개월</option>
                    <option value="3">3개월</option>
                    <option value="6">6개월</option>
                    <option value="12">12개월</option>
                  </select>
                </div>
              </div>
            )}

            {/* 간편결제 */}
            {paymentType === "simple" && (
              <div className="payment-simple">
                {SIMPLE_PAYS.map((pay) => (
                  <label
                    key={pay.id}
                    className={`payment-simple__item ${formData.paymentMethod === pay.id ? "is-selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={pay.id}
                      checked={formData.paymentMethod === pay.id}
                      onChange={handleChange("paymentMethod")}
                    />
                    <img src={pay.img} alt={pay.label} />
                    <span>{pay.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 약관 동의 */}
        {paymentSelected && (
          <div className="payment-card">
            <div className="payment-card__head">
              <h3>약관 동의</h3>
            </div>
            <div className="payment-card__body">
              <div className="agreement-all">
                <label>
                  <input
                    type="checkbox"
                    checked={agreements.agree1 && agreements.agree2}
                    onChange={(e) =>
                      setAgreements({ agree1: e.target.checked, agree2: e.target.checked })
                    }
                  />
                  모두 동의합니다
                </label>
              </div>
              <div className="agreement-list">
                <label>
                  <input
                    type="checkbox"
                    checked={agreements.agree1}
                    onChange={(e) =>
                      setAgreements((prev) => ({ ...prev, agree1: e.target.checked }))
                    }
                  />
                  <span className="agreement-text">(필수) 개인정보 수집 이용동의</span>
                  <button type="button" className="agreement-view">보기</button>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={agreements.agree2}
                    onChange={(e) =>
                      setAgreements((prev) => ({ ...prev, agree2: e.target.checked }))
                    }
                  />
                  <span className="agreement-text">(필수) 제3자 정보제공 동의</span>
                  <button type="button" className="agreement-view">보기</button>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 오른쪽 요약 */}
      <div className="checkout-payment__summary">
        <div className="summary-section">
          <h3>주문 정보</h3>
          <div className="summary-items">
            {cartItems.map((item) => (
              <div key={item.cartId} className="summary-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="summary-item__img"
                />
                <div className="summary-item__info">
                  <p className="summary-item__name">{item.name}</p>
                  <p className="summary-item__volume">{item.volume}</p>
                </div>
                <p className="summary-item__price">
                  {(item.price * item.quantity).toLocaleString()}원
                </p>
              </div>
            ))}
          </div>

          <h3>결제 금액</h3>
          <div className="summary-price-rows">
            <div className="summary-price-row">
              <span>상품 금액</span>
              <span>{getTotalPrice().toLocaleString()}원</span>
            </div>
            <div className="summary-price-row">
              <span>쿠폰</span>
              <span>0원</span>
            </div>
            <div className="summary-price-row">
              <span>배송비</span>
              <span>0원</span>
            </div>
            <div className="summary-price-row summary-price-row--total">
              <span>합계</span>
              <strong>{getTotalPrice().toLocaleString()}원</strong>
            </div>
          </div>
          <button type="submit" className="summary-submit-btn">
            주문하기
          </button>
        </div>
      </div>
    </form>
  );
}

export default PaymentStep;
