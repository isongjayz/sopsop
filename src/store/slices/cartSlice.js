// ========================================
// cartSlice - 장바구니 상태 관리
// 장바구니 담기, 수량 수정, 삭제, 전체 비우기
// ========================================

export const createCartSlice = (set, get) => ({
    // 상태
    cartItems: [],

    // 기존 데이터 정합성 보정 (cartId 없는 이전 데이터 보정)

    // 장바구니 담기
    addToCart: (item) => {
        const { cartItems } = get();
        const cartId = item.cartId || `${item.productId}-${item.volume}`;

        // 이미 있으면 수량 증가
        const existing = cartItems.find(i => i.cartId === cartId);
        if (existing) {
            set({
                cartItems: cartItems.map(i =>
                    i.cartId === cartId
                        ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                        : i
                ),
            });
        } else {
            // 새로 추가
            set({ cartItems: [...cartItems, { ...item, cartId }] });
        }
    },

    // 수량 변경
    updateCartQuantity: (cartId, quantity) => {
        const { cartItems } = get();
        if (quantity < 1) return;
        set({
            cartItems: cartItems.map(item =>
                item.cartId === cartId ? { ...item, quantity } : item
            ),
        });
    },

    // 옵션(용량) 변경
    updateCartVolume: (oldCartId, newVolume, newPrice) => {
        const { cartItems } = get();
        const item = cartItems.find(i => i.cartId === oldCartId);
        if (!item) return;

        const newCartId = `${item.productId}-${newVolume}`;
        // 같은 옵션이 이미 있으면 합치기
        const existingNew = cartItems.find(i => i.cartId === newCartId);
        if (existingNew) {
            set({
                cartItems: cartItems
                    .filter(i => i.cartId !== oldCartId)
                    .map(i =>
                        i.cartId === newCartId
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    ),
            });
        } else {
            set({
                cartItems: cartItems.map(i =>
                    i.cartId === oldCartId
                        ? { ...i, cartId: newCartId, volume: newVolume, price: newPrice, quantity: 1 }
                        : i
                ),
            });
        }
    },

    // 개별 포장 토글
    toggleGiftWrap: (cartId) => {
        const { cartItems } = get();
        set({
            cartItems: cartItems.map(item =>
                item.cartId === cartId ? { ...item, giftWrap: !item.giftWrap } : item
            ),
        });
    },

    // 개별 삭제
    removeFromCart: (cartId) => {
        const { cartItems } = get();
        set({ cartItems: cartItems.filter(item => item.cartId !== cartId) });
    },

    // 복수 삭제
    removeMultipleFromCart: (cartIds) => {
        const { cartItems } = get();
        set({ cartItems: cartItems.filter(item => !cartIds.includes(item.cartId)) });
    },

    // 전체 비우기
    clearCart: () => set({ cartItems: [] }),

    // 총 수량
    getTotalItems: () => {
        return get().cartItems.reduce((sum, item) => sum + item.quantity, 0);
    },

    // 총 금액
    getTotalPrice: () => {
        return get().cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
});
