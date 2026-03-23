import ProductReview from '../ProductReview';

function ProductReviewTab({ productId }) {
    return (
        <div className="product-review-tab">
            <section className="product-review-tab__hero">
                <h3>Review</h3>
                <p>
                    단순한 만족을 넘어 일상의 일부가 된 순간들. 제품을 경험한 이들이 전하는
                    정갈한 기록들을 만나보세요.
                </p>
            </section>

            <ProductReview
                productId={productId}
                showHeader={false}
                initialVisibleCount={1}
            />
        </div>
    );
}

export default ProductReviewTab;
