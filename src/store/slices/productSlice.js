import { productData, reviewData } from '../../assets/api/productData';

export const createProductSlice = (set, get) => ({
    products: [],
    reviews: [],
    filters: {
        category: '',
        subcategory: '',
        name: '',
        sort: 'default',
    },

    fetchProducts: () => {
        const { reviews } = get();
        set({
            products: productData,
            // 수정: 기존에 작성되어 캐싱된 리뷰(사용자 리뷰 등)가 날아가지 않도록, 초기 상태일 때만 seed 데이터를 넣습니다.
            reviews: reviews.length > 0 ? reviews : (reviewData || []),
        });
    },

    setFilters: (newFilters) => {
        const { filters } = get();
        set({ filters: { ...filters, ...newFilters } });
    },

    clearFilters: () => {
        set({
            filters: { category: '', subcategory: '', name: '', sort: 'default' },
        });
    },

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

    updateReview: (productId, reviewId, content, rating) => {
        const { reviews } = get();

        set({
            reviews: reviews.map((review) =>
                review.id === reviewId && review.productId === productId
                    ? { ...review, content, rating }
                    : review
            ),
        });
    },

    deleteReview: (productId, reviewId) => {
        const { reviews } = get();

        set({
            reviews: reviews.filter(
                (review) => !(review.id === reviewId && review.productId === productId)
            ),
        });
    },

    getProductReviews: (productId) => {
        return get().reviews.filter((review) => review.productId === productId);
    },

    getUserReviews: (userName) => {
        return get().reviews.filter((review) => review.user === userName);
    },
});
