// ========================================
// MyPage Orders (주문 내역)
// ========================================

import { useEffect, useMemo, useState } from "react";
import useStore from "../../store/useStore";
import MyPageSidebar from "./MyPageSidebar";
import "./style.scss";

const getOrderDateLabel = (order) => {
  const rawDate = order.createdAt || order.date;
  if (!rawDate) return "-";

  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) {
    return rawDate;
  }

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd}`;
};

const getOrderChannel = (order) => {
  if (order.source === "offline-import" || order.imported) {
    return {
      label: "오프라인",
      detail: order.storeName
        ? `${order.storeName} 연동 주문`
        : "매장 구매 연동 주문",
      className: "is-offline",
    };
  }

  return {
    label: "온라인",
    detail: "온라인 스토어 주문",
    className: "is-online",
  };
};

function MyPageOrders() {
  const { user, getUserOrders, isLoggedIn, addToCart, addReview, products, fetchProducts } = useStore();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedReviewItem, setSelectedReviewItem] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (isLoggedIn && user) {
      const storeOrders = getUserOrders(user.id);
      setOrders(storeOrders);
      fetchProducts(); // 리뷰 연동을 위한 상품 데이터 로드
      return;
    }

    setOrders([]);
  }, [isLoggedIn, user, getUserOrders, fetchProducts]);

  useEffect(() => {
    if (!toastMessage) return undefined;

    const timer = window.setTimeout(() => {
      setToastMessage("");
    }, 2200);

    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => {
      const aTime = new Date(a.createdAt || a.date || 0).getTime();
      const bTime = new Date(b.createdAt || b.date || 0).getTime();
      return bTime - aTime;
    });
  }, [orders]);

  if (!isLoggedIn) return null;

  return (
    <div className="mypage">
      <MyPageSidebar />
      <main className="mypage-content">
        <header className="mypage-content__header">
          <h2>Recent Orders</h2>
        </header>

        <div className="orders-summary">
          <div className="summary-item">
            <span className="count">0</span>
            <span className="label">주문접수</span>
          </div>
          <div className="arrow">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
          <div className="summary-item is-active">
            <span className="count">1</span>
            <span className="label">결제완료</span>
          </div>
          <div className="arrow">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
          <div className="summary-item">
            <span className="count">0</span>
            <span className="label">배송준비중</span>
          </div>
          <div className="arrow">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
          <div className="summary-item">
            <span className="count">0</span>
            <span className="label">배송중</span>
          </div>
          <div className="arrow">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
          <div className="summary-item">
            <span className="count">0</span>
            <span className="label">배송완료</span>
          </div>
        </div>

        <div className="orders-table">
          <div className="table-header">
            <span>구입일자</span>
            <span>상품</span>
            <span>구매금액</span>
            <span>상태</span>
          </div>
          {sortedOrders.length === 0 ? (
            <div className="empty-state">
              <p>주문 내역이 없습니다.</p>
            </div>
          ) : (
            sortedOrders.map((order) => {
              if (!order.items || order.items.length === 0) return null;
              const firstItem = order.items[0];
              const extraItemCount = Math.max(order.items.length - 1, 0);

              return (
                <div key={order.id} className="table-row">
                  <div className="col-date">{getOrderDateLabel(order)}</div>
                  <div className="col-product">
                    <div className="img-box">
                      <img src={firstItem.image} alt={firstItem.name} />
                    </div>
                    <div className="product-info">
                      <span className="name">
                        {firstItem.name}
                        {extraItemCount > 0 ? ` 외 ${extraItemCount}개` : ""}
                      </span>
                    </div>
                  </div>
                  <div className="col-price">
                    <strong>
                      {(order.totalPrice || order.total || 0).toLocaleString()}
                      원
                    </strong>
                  </div>
                  <div className="col-status">
                    <div className="status-wrap">
                      <span className="status-text">
                        {order.source === "offline-import"
                          ? "오프라인 구매"
                          : "온라인 구매"}
                      </span>
                      <button
                        className="btn-detail"
                        onClick={() => setSelectedOrder(order)}
                      >
                        상세보기
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {toastMessage && (
          <div className="order-toast" role="status">
            {toastMessage}
          </div>
        )}

        {selectedOrder && (
          <div className="order-detail-modal" role="dialog" aria-modal="true">
            <button
              className="modal-backdrop"
              aria-label="주문 상세 닫기"
              onClick={() => setSelectedOrder(null)}
            />
            <div className="modal-panel">
              <div className="modal-panel__header">
                <h3>주문 상세보기</h3>
                <button
                  className="close-btn"
                  onClick={() => setSelectedOrder(null)}
                  aria-label="닫기"
                >
                  ×
                </button>
              </div>

              <div className="modal-panel__body">
                <div className="modal-order-meta">
                  <span className="modal-meta-label">주문번호</span>
                  <span className="modal-meta-value">{selectedOrder.id}</span>
                </div>

                <div className="modal-channel-row">
                  <span
                    className={`order-badge ${getOrderChannel(selectedOrder).className}`}
                  >
                    {getOrderChannel(selectedOrder).label} 구매
                  </span>
                  <span className="channel-sep">|</span>
                  <span className="channel-detail">
                    {getOrderChannel(selectedOrder).detail}
                  </span>
                </div>

                <div className="detail-items">
                  {selectedOrder.items.map((item, idx) => (
                    <div
                      className="detail-item"
                      key={`${selectedOrder.id}-${idx}`}
                    >
                      <div className="item-img">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <span className="item-name">
                        {item.name} {item.volume}
                      </span>
                      <span className="item-qty">{item.quantity}개</span>
                      <span className="item-price">
                        {(item.price * item.quantity).toLocaleString()}원
                      </span>
                      <button
                        type="button"
                        className="btn-review"
                        onClick={() => {
                          setReviewRating(0);
                          setReviewText("");
                          setSelectedReviewItem({ ...item, orderId: selectedOrder.id });
                        }}
                      >
                        리뷰쓰기
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="btn-reorder-text"
                  onClick={() => {
                    selectedOrder.items.forEach((item) => {
                      addToCart({
                        productId:
                          item.productId ||
                          item.id ||
                          `${selectedOrder.id}-${item.name}`,
                        name: item.name,
                        image: item.image,
                        volume: item.volume,
                        price: item.price,
                        quantity: item.quantity || 1,
                      });
                    });
                    setToastMessage(
                      `'${selectedOrder.items[0]?.name || "상품"}' 외 ${selectedOrder.items.length - 1}개를 장바구니에 담았습니다.`,
                    );
                  }}
                >
                  장바구니 담기
                </button>

                <div className="detail-total-row">
                  <span>상품합계금액</span>
                  <span>
                    총{" "}
                    {(
                      selectedOrder.totalPrice ||
                      selectedOrder.total ||
                      0
                    ).toLocaleString()}
                    원
                  </span>
                </div>

                {selectedOrder.source !== "offline-import" && (
                  <>
                    <div className="detail-info-section">
                      <p className="detail-info-title">주문자 정보</p>
                      <div className="detail-info-rows">
                        <div className="detail-info-row">
                          <span>{selectedOrder.orderer || "—"}</span>
                        </div>
                        <div className="detail-info-row">
                          <span>{selectedOrder.ordererPhone || "—"}</span>
                        </div>
                        <div className="detail-info-row">
                          <span>{selectedOrder.ordererEmail || "—"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="detail-info-section">
                      <p className="detail-info-title">배송 정보</p>
                      <div className="detail-info-rows">
                        <div className="detail-info-row">
                          <span>{selectedOrder.orderer || "—"}</span>
                        </div>
                        <div className="detail-info-row">
                          <span>{selectedOrder.ordererPhone || "—"}</span>
                        </div>
                        <div className="detail-info-row">
                          <span>
                            {selectedOrder.postcode
                              ? `[${selectedOrder.postcode}] ${selectedOrder.address || ""} ${selectedOrder.detailAddress || ""}`
                              : selectedOrder.address || "—"}
                          </span>
                        </div>
                        {selectedOrder.deliveryMemo && (
                          <div className="detail-info-row">
                            <span className="detail-info-label">배송메모</span>
                            <span>{selectedOrder.deliveryMemo}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="modal-panel__footer">
                <button type="button" className="btn-footer-text">
                  문의하기
                </button>
              </div>
            </div>
          </div>
        )}
        {selectedReviewItem && (
          <div className="order-detail-modal" role="dialog" aria-modal="true">
            <button
              className="modal-backdrop"
              aria-label="리뷰 작성 닫기"
              onClick={() => setSelectedReviewItem(null)}
            />
            <div className="modal-panel">
              <div className="modal-panel__header">
                <h3>리뷰 작성</h3>
                <button
                  className="close-btn"
                  onClick={() => setSelectedReviewItem(null)}
                  aria-label="닫기"
                >
                  ×
                </button>
              </div>

              <div className="modal-panel__body">
                <div className="detail-item review-item-info">
                  <div className="item-img">
                    <img src={selectedReviewItem.image} alt={selectedReviewItem.name} />
                  </div>
                  <span className="item-name">
                    {selectedReviewItem.name} {selectedReviewItem.volume}
                  </span>
                </div>

                <div className="review-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`review-star ${star <= reviewRating ? "is-active" : ""}`}
                      onClick={() => setReviewRating(star)}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <textarea
                  className="review-textarea"
                  placeholder="제품에 대한 솔직한 리뷰를 작성해주세요."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
              </div>

              <div className="modal-panel__footer">
                <button
                  type="button"
                  className="btn-footer-text"
                  onClick={() => setSelectedReviewItem(null)}
                >
                  취소
                </button>
                <button
                  type="button"
                  className="btn-footer-text"
                  onClick={() => {
                    if (!reviewText.trim()) {
                      alert("리뷰 내용을 입력해주세요.");
                      return;
                    }
                    if (reviewRating === 0) {
                      alert("별점을 1점 이상 선택해주세요.");
                      return;
                    }

                    // seed data의 productId가 과거 숫자(예: 19)로 배포된 경우가 있어,
                    // 현재 활성화된 전역 products 데이터에서 이름으로 정확한 최신 문자열 ID를 역추적합니다.
                    const matchedProduct = products.find(p => 
                      p.name.replace(/\s+/g,'').includes(selectedReviewItem.name.replace(/\s+/g,'')) ||
                      selectedReviewItem.name.replace(/\s+/g,'').includes(p.name.replace(/\s+/g,''))
                    );
                    
                    const targetProductId = matchedProduct ? matchedProduct.id : String(selectedReviewItem.productId || selectedReviewItem.id);
                    
                    if (targetProductId && addReview) {
                        addReview(targetProductId, {
                            user: user?.name || "익명",
                            rating: reviewRating,
                            content: reviewText
                        });
                    }

                    setToastMessage("리뷰가 안전하게 등록되었습니다.");
                    setSelectedReviewItem(null);
                  }}
                >
                  등록
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default MyPageOrders;
