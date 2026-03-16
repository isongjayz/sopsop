// ========================================
// productSlice - 상품 관련 상태 관리
// Seed Data 로드, 필터링, 리뷰 CRUD
// ========================================

import { productData, productDetailData, reviewData } from '../../assets/api/productData';

export const createProductSlice = (set, get) => ({
    // 상태
    products: [],              // 전체 상품 목록
    currentProduct: null,      // 현재 조회 중인 상품 상세
    reviews: [],               // 전체 리뷰 목록
    filters: {                 // 현재 필터 상태
        category: '',
        subcategory: '',
        name: '',
        sort: 'default',
    },

    // Seed Data 로드
    fetchProducts: () => {
        set({
            products: productData,
            reviews: reviewData || [],
        });
    },

    // 상품 상세 조회
    fetchProductById: (id) => {
        const { products } = get();
        const product = products.find(p => p.id === id);
        const detail = productDetailData.find(d => d.productId === id);
        if (product) {
            set({ currentProduct: { ...product, detail } });
        }
        return product ? { ...product, detail } : null;
    },

    // 필터 설정 (상태만 업데이트, 실제 필터링은 컴포넌트에서 수행)
    setFilters: (newFilters) => {
        const { filters } = get();
        set({ filters: { ...filters, ...newFilters } });
    },

    // 필터 초기화
    clearFilters: () => {
        set({
            filters: { category: '', subcategory: '', name: '', sort: 'default' },
        });
    },


    // 리뷰 추가
    addReview: (productId, review) => {
        const { reviews } = get();
        const newReview = {
            ...review,
            id: `review-${Date.now()}`,
            productId,
            date: new Date().toISOString(),
        };
        set({ reviews: [newReview, ...reviews] });
    },

    // 리뷰 수정
    updateReview: (productId, reviewId, content, rating) => {
        const { reviews } = get();
        set({
            reviews: reviews.map(r =>
                r.id === reviewId && r.productId === productId
                    ? { ...r, content, rating }
                    : r
            ),
        });
    },

    // 리뷰 삭제
    deleteReview: (productId, reviewId) => {
        const { reviews } = get();
        set({
            reviews: reviews.filter(r => !(r.id === reviewId && r.productId === productId)),
        });
    },

    // 특정 상품의 리뷰 조회
    getProductReviews: (productId) => {
        return get().reviews.filter(r => r.productId === productId);
    },

    // 사용자가 작성한 리뷰 조회
    getUserReviews: (userName) => {
        return get().reviews.filter(r => r.user === userName);
    },
});
