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
        set({
            products: productData,
            reviews: reviewData || [],
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
