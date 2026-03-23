// ========================================
// orderSlice - 주문 상태 관리
// 주문 저장, 조회
// ========================================

import { seedOrders } from '../../data/seedOrders';

const mergeOrdersWithSeed = (orders = []) => {
    const mergedMap = new Map();

    // 수정: seed 주문을 먼저 넣어 테스트 계정 주문 이력이 항상 유지되도록 처리
    seedOrders.forEach(order => {
        mergedMap.set(order.id, order);
    });

    orders.forEach(order => {
        mergedMap.set(order.id, order);
    });

    return Array.from(mergedMap.values()).sort((a, b) => {
        const aTime = new Date(a.createdAt || a.date || 0).getTime();
        const bTime = new Date(b.createdAt || b.date || 0).getTime();
        return bTime - aTime;
    });
};

export const createOrderSlice = (set, get) => ({
    // 상태
    // 수정: 테스트 계정 전용 오프라인 연동 주문을 초기 데이터로 보관
    orders: mergeOrdersWithSeed(seedOrders),

    // 수정: persist 재수화 이후에도 테스트 계정 seed 주문이 사라지지 않도록 보정
    ensureSeedOrders: () => {
        const { orders } = get();
        const mergedOrders = mergeOrdersWithSeed(orders);
        set({ orders: mergedOrders });
        return mergedOrders;
    },

    // 주문 추가
    addOrder: (orderData) => {
        const { orders } = get();
        const newOrder = {
            ...orderData,
            id: `ORD-${Date.now()}`,
            createdAt: new Date().toISOString(),
            status: '결제완료',
            // 수정: 온라인 결제로 생성된 주문은 source를 명시
            source: orderData.source || 'online',
            imported: false,
        };
        set({ orders: mergeOrdersWithSeed([newOrder, ...orders]) });
        return newOrder;
    },

    // 주문번호로 조회
    getOrderById: (orderId) => {
        return get().orders.find(o => o.id === orderId) || null;
    },

    // 사용자별 주문 조회
    getUserOrders: (userId) => {
        return get().orders.filter(o => o.userId === userId);
    },

    // 주문 상태 변경
    updateOrderStatus: (orderId, status) => {
        const { orders } = get();
        set({
            orders: orders.map(o =>
                o.id === orderId ? { ...o, status } : o
            ),
        });
    },
});
