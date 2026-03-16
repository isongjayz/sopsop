// ========================================
// Checkout Page - 장바구니 및 결제 (3단계 Step)
// ========================================

import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import DaumPostcode from "react-daum-postcode";
import useStore from "../../store/useStore";
import { productData } from "../../assets/api/productData";
import { GoQuestion } from "react-icons/go";
import { ShoppingBag } from "lucide-react";
import CartItem from "./CartItem";

import "./style.scss";

// 샘플 데이터
const sampleList = [
  {
    id: "s-001",
    name: "파슬리 씨드 안티 옥시던트 하이드레이터",
    image: "/images/checkout/cart_sample.png",
  },
  {
    id: "s-002",
    name: "이그젝티드 아이 세럼",
    image: "/images/checkout/cart_sample.png",
  },
  {
    id: "s-003",
    name: "라인드 컨센트레이트 바디 밤",
    image: "/images/checkout/cart_sample.png",
  },
  {
    id: "s-004",
    name: "비 트리플 씨 페이셜 밸런싱 젤",
    image: "/images/checkout/cart_sample.png",
  },
];

const MAX_SAMPLES = 3;

function Checkout() {
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState("");

  return (
    <div className="checkout-page inner">
      <h2 className="font-serif checkout-page__title">
        {step === 1 && "카트"}
        {step === 2 && "결제 및 배송"}
        {step === 3 && "주문 완료"}
      </h2>

      {/* Step Indicator */}
      <div className="checkout__steps">
        <div className={`checkout__step ${step >= 1 ? "is-active" : ""}`}>
          <span className="step-num">1</span>{" "}
          <span className="step-text">장바구니</span>
        </div>
        <div className="step-line"></div>
        <div className={`checkout__step ${step >= 2 ? "is-active" : ""}`}>
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
            onNext={() => setStep(3)}
            setOrderId={setOrderId}
          />
        )}
        {step === 3 && <CompleteStep orderId={orderId} />}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// Step 1: 카트 (CartStep)
// ----------------------------------------------------
function CartStep({ onNext }) {
  const { user, cartItems, getTotalPrice, addToCart } = useStore();
  const [selectedSamples, setSelectedSamples] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [shippingModal, setShippingModal] = useState(false);

  const recommendedProducts = useMemo(() => {
    return [...productData].sort(() => Math.random() - 0.5).slice(0, 4);
  }, []);

  const handleSampleToggle = (id) => {
    setSelectedSamples((prev) => {
      if (prev.includes(id)) return prev.filter((s) => s !== id);
      if (prev.length >= MAX_SAMPLES) return prev;
      return [...prev, id];
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <p>장바구니가 비어 있습니다.</p>
        <Link to="/product" className="cart-empty__btn">
          쇼핑 계속하기
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-cart">
      <div className="checkout-cart__left">
        <div className="cart-title-row">
          <h2 className="cart-title">{user?.name || "고객"}님의 장바구니</h2>
          <button
            className="cart-shipping-info"
            onClick={() => setShippingModal(true)}
          >
            이솝의 실용적인 배송 방법 <GoQuestion size={18} />
          </button>
        </div>

        <div className="cart-items">
          {cartItems.map((item) => (
            <CartItem key={item.cartId} item={item} />
          ))}
        </div>

        <div className="cart-samples">
          <h3 className="cart-samples__title">
            무료 샘플을 추가해주세요 {selectedSamples.length}/{MAX_SAMPLES}
          </h3>
          <div className="cart-samples__list">
            {sampleList.map((sample) => (
              <div
                key={sample.id}
                className={`cart-sample-item ${selectedSamples.includes(sample.id) ? "is-selected" : ""}`}
                onClick={() => handleSampleToggle(sample.id)}
              >
                <img src={sample.image} alt={sample.name} />
                <p>{sample.name}</p>
                <span className="cart-sample-item__check"></span>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-recommend">
          <h3 className="cart-recommend__title">함께보면 좋은 제품</h3>
          <div className="cart-recommend__list">
            {recommendedProducts.map((product) => (
              <div key={product.id} className="cart-recommend-item">
                <button
                  className="cart-recommend-item__cart"
                  onClick={() =>
                    addToCart({
                      cartId: `${product.id}-${product.volumes[0].volume}`,
                      productId: product.id,
                      name: product.name,
                      price: product.volumes[0].price,
                      volume: product.volumes[0].volume,
                      image: product.image,
                      quantity: 1,
                    })
                  }
                >
                  <ShoppingBag size={20} />
                </button>
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                <p className="cart-recommend-item__name">{product.name}</p>
                <p className="cart-recommend-item__price">
                  ₩{product.volumes[0].price.toLocaleString()}원
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="checkout-cart__right">
        <div className="cart-coupon">
          <h3 className="cart-coupon__title">쿠폰 적용</h3>
          <select
            className="cart-coupon__select"
            value={selectedCoupon}
            onChange={(e) => setSelectedCoupon(e.target.value)}
          >
            <option value="">선택</option>
            <option value="10">10% 할인</option>
            <option value="free">무료배송</option>
          </select>
        </div>

        <div className="cart-summary">
          <h3 className="cart-summary__title">결제 금액</h3>
          <div className="cart-summary__row">
            <span>상품 금액</span>
            <span>{getTotalPrice().toLocaleString()}원</span>
          </div>
          <div className="cart-summary__row">
            <span>쿠폰</span>
            <span>0원</span>
          </div>
          <div className="cart-summary__row">
            <span>배송비</span>
            <span>0원</span>
          </div>
          <div className="cart-summary__row cart-summary__total">
            <span>합계</span>
            <span>{getTotalPrice().toLocaleString()}원</span>
          </div>
          <button className="cart-order-btn" onClick={onNext}>
            주문하기
          </button>
        </div>
      </div>

      {shippingModal && (
        <div
          className="shipping-modal-overlay"
          onClick={() => setShippingModal(false)}
        >
          <div className="shipping-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="shipping-modal__close"
              onClick={() => setShippingModal(false)}
            >
              ✕
            </button>
            <h3 className="shipping-modal__title">이솝의 실용적인 배송 방법</h3>
            <div className="shipping-modal__content">
              <p>
                주문 후 <strong>1-3 영업일</strong> 이내 출고됩니다.
              </p>
              <p>
                배송비는 <strong>무료</strong>입니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// Step 2: 결제 및 배송 (PaymentStep)
// ----------------------------------------------------
function PaymentStep({ onPrev, onNext, setOrderId }) {
  const { cartItems, clearCart, user, addOrder, getTotalPrice } = useStore();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    postcode: "",
    address: "",
    detailAddress: "",
    paymentMethod: "card",
  });
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

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
    setFormData({ ...formData, postcode: data.zonecode, address: fullAddress });
    setIsPostcodeOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      userId: user?.id || "guest",
      orderer: formData.name,
      address: `[${formData.postcode}] ${formData.address} ${formData.detailAddress}`,
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
        <section className="form-section">
          <h3>주문자 정보</h3>
          <div className="form-group row">
            <input
              type="text"
              placeholder="이름"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              type="email"
              placeholder="이메일"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              placeholder="전화번호"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>
        </section>

        <section className="form-section">
          <h3>배송지 정보</h3>
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
                    ×
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
              onChange={(e) =>
                setFormData({ ...formData, detailAddress: e.target.value })
              }
              required
            />
          </div>
        </section>

        <section className="form-section">
          <h3>결제 수단</h3>
          <div className="payment-methods">
            {["card", "bank", "kakao"].map((method) => (
              <label
                key={method}
                className={`method-label ${formData.paymentMethod === method ? "is-selected" : ""}`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={formData.paymentMethod === method}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentMethod: e.target.value })
                  }
                />
                {method === "card"
                  ? "신용카드"
                  : method === "bank"
                    ? "무통장 입금"
                    : "카카오페이"}
              </label>
            ))}
          </div>
        </section>
      </div>

      <div className="checkout-payment__summary">
        <h3>주문 요약</h3>
        <div className="summary-items">
          {cartItems.map((item) => (
            <div key={item.cartId} className="summary-item">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₩{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
        </div>
        <div className="summary-total">
          <span>총 결제 금액</span>
          <strong>₩{getTotalPrice().toLocaleString()}</strong>
        </div>
        <div className="summary-actions">
          <button
            type="button"
            className="btn-outline outline-btn"
            onClick={onPrev}
          >
            뒤로 가기
          </button>
          <button type="submit" className="btn-primary submit-btn">
            결제하기
          </button>
        </div>
      </div>
    </form>
  );
}

// ----------------------------------------------------
// Step 3: 주문 완료 (CompleteStep)
// ----------------------------------------------------
function CompleteStep({ orderId }) {
  return (
    <div className="checkout-complete">
      <h2 className="font-serif">고객님의 주문이 완료되었습니다.</h2>
      <p>주문 번호: {orderId || `ORD-${Date.now().toString().slice(-6)}`}</p>
      <p className="desc">Aesop을 이용해 주셔서 감사합니다.</p>
      <div className="complete-actions">
        <Link to="/product" className="btn-outline">
          계속 쇼핑하기
        </Link>
        <Link to="/mypage/orders" className="btn-primary">
          주문 내역 보기
        </Link>
      </div>
    </div>
  );
}

export default Checkout;
