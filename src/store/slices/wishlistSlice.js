// ========================================
// wishlistSlice - 위시리스트 상태 관리
// 찜 토글, 사용자별 조회, 찜 여부 확인
// ========================================

export const createWishlistSlice = (set, get) => ({
    // 상태
    wishlist: [],

    // 찜 토글 (있으면 삭제, 없으면 추가)
    toggleWishlist: (userId, product) => {
        const { wishlist } = get();
        const exists = wishlist.find(
            w => w.userId === userId && w.productId === product.id
        );
        if (exists) {
            // 이미 있으면 삭제
            set({
                wishlist: wishlist.filter(
                    w => !(w.userId === userId && w.productId === product.id)
                ),
            });
            return false; // 삭제됨
        } else {
            // 없으면 추가
            const newItem = {
                id: `wish-${Date.now()}`,
                userId,
                productId: product.id,
            };
            set({ wishlist: [...wishlist, newItem] });
            return true; // 추가됨
        }
    },

    // 사용자별 위시리스트 조회
    getUserWishlist: (userId) => {
        return get().wishlist.filter(w => w.userId === userId);
    },

    // 특정 상품 찜 여부 확인
    isProductWishlisted: (userId, productId) => {
        return get().wishlist.some(
            w => w.userId === userId && w.productId === productId
        );
    },
});
