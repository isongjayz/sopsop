// ========================================
// 수정: 테스트 계정 전용 초기 주문 데이터
// 오프라인 구매 이력이 온라인 계정으로 연동된 설정
// ========================================

export const TEST_USER_ID = 'test-user-001';

export const seedOrders = [
    {
        id: 'OFFLINE-ORD-20251206-001',
        userId: TEST_USER_ID,
        orderer: '테스트 사용자',
        totalPrice: 406000,
        paymentMethod: 'offline-import',
        createdAt: '2025-12-06T09:34:00.000Z',
        status: '구매완료',
        source: 'offline-import',
        imported: true,
        storeName: '성수점',
        items: [
            {
                productId: 19,
                name: '어브브 어스, 스테오라 오 드 퍼퓸',
                volume: '70ml',
                quantity: 1,
                price: 244000,
                image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&q=80',
            },
            {
                productId: 12,
                name: '루센트 페이셜 나이트 마스크',
                volume: '60ml',
                quantity: 1,
                price: 162000,
                image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80',
            },
        ],
    },
    {
        id: 'ONLINE-ORD-20260115-001',
        userId: TEST_USER_ID,
        orderer: '테스트 사용자',
        ordererEmail: 'test@aesop.com',
        ordererPhone: '010.1234.5678',
        postcode: '06021',
        address: '서울특별시 강남구 도산대로45길 10-6',
        detailAddress: '2층',
        deliveryMemo: '문 앞에 놓아주세요',
        totalPrice: 214000,
        paymentMethod: 'card',
        createdAt: '2026-01-15T14:22:00.000Z',
        status: '배송완료',
        source: 'online',
        imported: false,
        items: [
            {
                productId: 12,
                name: '루센트 페이셜 나이트 마스크',
                volume: '60ml',
                quantity: 1,
                price: 162000,
                image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80',
            },
            {
                productId: 5,
                name: '제라늄 리프 바디 밤',
                volume: '100ml',
                quantity: 1,
                price: 52000,
                image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=600&q=80',
            },
        ],
    },
    {
        id: 'OFFLINE-ORD-20251226-002',
        userId: TEST_USER_ID,
        orderer: '테스트 사용자',
        totalPrice: 214000,
        paymentMethod: 'offline-import',
        createdAt: '2025-12-26T11:10:00.000Z',
        status: '구매완료',
        source: 'offline-import',
        imported: true,
        storeName: '삼청점',
        items: [
            {
                productId: 12,
                name: '루센트 페이셜 나이트 마스크',
                volume: '60ml',
                quantity: 1,
                price: 162000,
                image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80',
            },
            {
                productId: 5,
                name: '제라늄 리프 바디 밤',
                volume: '100ml',
                quantity: 1,
                price: 52000,
                image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=600&q=80',
            },
        ],
    },
];
