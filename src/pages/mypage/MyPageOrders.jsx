// ========================================
// MyPage Orders (주문 내역)
// ========================================

import { useEffect, useMemo, useState } from 'react';
import useStore from '../../store/useStore';
import MyPageSidebar from './MyPageSidebar';
import './style.scss';

const getOrderDateLabel = (order) => {
    const rawDate = order.createdAt || order.date;
    if (!rawDate) return '-';

    const date = new Date(rawDate);
    if (Number.isNaN(date.getTime())) {
        return rawDate;
    }

    return date.toLocaleDateString('ko-KR').replace(/\./g, '.').replace(/\s/g, '').replace(/\.$/, '');
};

const getOrderChannel = (order) => {
    if (order.source === 'offline-import' || order.imported) {
        return {
            label: '오프라인',
            detail: order.storeName ? `${order.storeName} 연동 주문` : '매장 구매 연동 주문',
            className: 'is-offline',
        };
    }

    return {
        label: '온라인',
        detail: '온라인 스토어 주문',
        className: 'is-online',
    };
};

function MyPageOrders() {
    const { user, getUserOrders, isLoggedIn, addToCart } = useStore();
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        if (isLoggedIn && user) {
            const storeOrders = getUserOrders(user.id);
            setOrders(storeOrders);
            return;
        }

        setOrders([]);
    }, [isLoggedIn, user, getUserOrders]);

    useEffect(() => {
        if (!toastMessage) return undefined;

        const timer = window.setTimeout(() => {
            setToastMessage('');
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

    const handleReorder = (order) => {
        order.items.forEach((item) => {
            // 수정: 주문내역에서 바로 장바구니에 다시 담을 수 있도록 처리
            addToCart({
                productId: item.productId || item.id || `${order.id}-${item.name}`,
                name: item.name,
                image: item.image,
                volume: item.volume,
                price: item.price,
                quantity: item.quantity || 1,
            });
        });

        setToastMessage(`'${order.items[0]?.name || '상품'}' 외 ${order.items.length}개를 장바구니에 담았습니다.`);
    };

    if (!isLoggedIn) return null;

    return (
        <div className="mypage inner">
            <MyPageSidebar />
            <main className="mypage-content">
                <header className="mypage-content__header">
                    <h2 className="font-serif">Recent Orders</h2>
                </header>

                <div className="orders-summary">
                    <div className="summary-item">
                        <span className="count">0</span>
                        <span className="label">주문접수</span>
                    </div>
                    <div className="arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M9 18l6-6-6-6" /></svg>
                    </div>
                    <div className="summary-item is-active">
                        <span className="count">1</span>
                        <span className="label">결제완료</span>
                    </div>
                    <div className="arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M9 18l6-6-6-6" /></svg>
                    </div>
                    <div className="summary-item">
                        <span className="count">0</span>
                        <span className="label">배송준비중</span>
                    </div>
                    <div className="arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M9 18l6-6-6-6" /></svg>
                    </div>
                    <div className="summary-item">
                        <span className="count">0</span>
                        <span className="label">배송중</span>
                    </div>
                    <div className="arrow">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M9 18l6-6-6-6" /></svg>
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
                        sortedOrders.map(order => {
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
                                            <span className="name">{firstItem.name}{extraItemCount > 0 ? ` 외 ${extraItemCount}개` : ''}</span>
                                        </div>
                                    </div>
                                    <div className="col-price">
                                        <strong>₩{(order.totalPrice || order.total || 0).toLocaleString()}원</strong>
                                    </div>
                                    <div className="col-status">
                                        <div className="status-wrap">
                                            <span className="status-text">{order.source === 'offline-import' ? '성수점 매장방문' : '온라인 구매'}</span>
                                            <button className="btn-detail" onClick={() => setSelectedOrder(order)}>상세보기</button>
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
                        <button className="modal-backdrop" aria-label="주문 상세 닫기" onClick={() => setSelectedOrder(null)} />
                        <div className="modal-panel">
                            <div className="modal-panel__header">
                                <div>
                                    <h3>주문 상세보기</h3>
                                    <p>{selectedOrder.id}</p>
                                </div>
                                <button className="close-btn" onClick={() => setSelectedOrder(null)} aria-label="닫기">×</button>
                            </div>

                            <div className="modal-panel__body">
                                <div className="detail-top-row">
                                    <span className={`order-badge ${getOrderChannel(selectedOrder).className}`}>{getOrderChannel(selectedOrder).label}</span>
                                    <span className="channel-detail">{getOrderChannel(selectedOrder).detail}</span>
                                    <span className="detail-status">{selectedOrder.status}</span>
                                </div>

                                <div className="detail-section">
                                    <div className="detail-section__title">구매 상품</div>
                                    <div className="detail-items">
                                        {selectedOrder.items.map((item, idx) => (
                                            <div className="detail-item" key={`${selectedOrder.id}-${idx}`}>
                                                <div className="item-left">
                                                    <div className="img-box">
                                                        <img src={item.image} alt={item.name} />
                                                    </div>
                                                    <div>
                                                        <h4>{item.name}</h4>
                                                        <p>{item.volume} / {item.quantity}개</p>
                                                    </div>
                                                </div>
                                                <div className="item-right">
                                                    <strong>₩{(item.price * item.quantity).toLocaleString()}</strong>
                                                    <button
                                                        type="button"
                                                        className="text-button"
                                                        onClick={() => handleReorder({ ...selectedOrder, items: [item] })}
                                                    >
                                                        이 상품 다시 담기
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="detail-grid">
                                    <div className="detail-box">
                                        <span>주문일자</span>
                                        <strong>{getOrderDateLabel(selectedOrder)}</strong>
                                    </div>
                                    <div className="detail-box">
                                        <span>결제 방식</span>
                                        <strong>{selectedOrder.source === 'offline-import' ? '오프라인 연동' : '온라인 결제'}</strong>
                                    </div>
                                    <div className="detail-box is-total">
                                        <span>최종 결제 금액</span>
                                        <strong>₩{(selectedOrder.totalPrice || selectedOrder.total || 0).toLocaleString()}</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-panel__footer">
                                <button className="btn-outline" onClick={() => setSelectedOrder(null)}>닫기</button>
                                <button className="btn-primary" onClick={() => handleReorder(selectedOrder)}>전체 상품 다시 담기</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default MyPageOrders;
