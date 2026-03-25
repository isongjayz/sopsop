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
                productId: 'fragrance-12',
                name: '어보브 어스 스테오라 오 드 퍼퓸',
                volume: '50ml',
                quantity: 1,
                price: 225000,
                image: 'https://kr.aesop.com/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-aesop-master-catalog/ko_KR/dw30e8c758/images/products/FR32/Aesop_Fragrance_Above_Us_Steorra_50mL_Bottle_Only_Media_Release_Transparent_1080x1080px.png',
            },
            {
                productId: 'hand-wash-01',
                name: '레저렉션 아로마틱 핸드 워시',
                volume: '500ml',
                quantity: 1,
                price: 56000,
                image: 'https://kr.aesop.com/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-aesop-master-catalog/ko_KR/dw41e50847/images/products/BT13/Aesop_Hand_Resurrection_Aromatique_Hand_Wash_500mL_Web_Front_2000x2000px.png',
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
                productId: 'hand-wash-01',
                name: '레저렉션 아로마틱 핸드 워시',
                volume: '500ml',
                quantity: 1,
                price: 56000,
                image: 'https://kr.aesop.com/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-aesop-master-catalog/ko_KR/dw41e50847/images/products/BT13/Aesop_Hand_Resurrection_Aromatique_Hand_Wash_500mL_Web_Front_2000x2000px.png',
            },
            {
                productId: 'body-balm-01',
                name: '제라늄 리프 바디 밤',
                volume: '100ml',
                quantity: 1,
                price: 52000,
                image: 'https://kr.aesop.com/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-aesop-master-catalog/ko_KR/dw4b15e463/images/products/BM08/Aesop_Body_Geranium_Leaf_Body_Balm_100mL_Web_Front_A_2000x2000px.png',
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
                productId: 'hand-wash-01',
                name: '레저렉션 아로마틱 핸드 워시',
                volume: '500ml',
                quantity: 1,
                price: 56000,
                image: 'https://kr.aesop.com/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-aesop-master-catalog/ko_KR/dw41e50847/images/products/BT13/Aesop_Hand_Resurrection_Aromatique_Hand_Wash_500mL_Web_Front_2000x2000px.png',
            },
            {
                productId: 'body-balm-01',
                name: '제라늄 리프 바디 밤',
                volume: '100ml',
                quantity: 1,
                price: 52000,
                image: 'https://kr.aesop.com/dw/image/v2/AARM_PRD/on/demandware.static/-/Sites-aesop-master-catalog/ko_KR/dw4b15e463/images/products/BM08/Aesop_Body_Geranium_Leaf_Body_Balm_100mL_Web_Front_A_2000x2000px.png',
            },
        ],
    },
];
