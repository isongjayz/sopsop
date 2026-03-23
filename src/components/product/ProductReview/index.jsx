import { useEffect, useState } from 'react';
import useStore from '../../../store/useStore';
import './ProductReview.scss';

function ProductReview({ productId, showHeader = true, initialVisibleCount = null }) {
    const {
        user,
        isLoggedIn,
        getProductReviews,
        addReview,
        updateReview,
        deleteReview,
    } = useStore();
    const reviews = getProductReviews(productId);

    const [isWriting, setIsWriting] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState('');
    const [visibleCount, setVisibleCount] = useState(initialVisibleCount ?? reviews.length);

    useEffect(() => {
        setVisibleCount(initialVisibleCount ?? reviews.length);
    }, [initialVisibleCount, reviews.length, productId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content.trim()) return alert('리뷰 내용을 입력해주세요.');

        if (editingId) {
            updateReview(productId, editingId, content, rating);
            setEditingId(null);
        } else {
            addReview(productId, { user: user?.name || '익명', rating, content });
            if (typeof initialVisibleCount === 'number') {
                setVisibleCount((prev) => prev + 1);
            }
        }

        setContent('');
        setRating(5);
        setIsWriting(false);
    };

    const handleEdit = (review) => {
        setEditingId(review.id);
        setRating(review.rating);
        setContent(review.content);
        setIsWriting(true);
    };

    const handleCancel = () => {
        setIsWriting(false);
        setEditingId(null);
        setContent('');
        setRating(5);
    };

    const renderedReviews =
        typeof initialVisibleCount === 'number' ? reviews.slice(0, visibleCount) : reviews;
    const canLoadMore =
        typeof initialVisibleCount === 'number' && visibleCount < reviews.length;

    return (
        <div className="product-review">
            {showHeader && (
                <div className="product-review__header">
                    <h3>
                        고객 리뷰 <span>({reviews.length})</span>
                    </h3>
                    {!isWriting && (
                        <button
                            className="btn-outline product-review__write-btn"
                            onClick={() => {
                                if (!isLoggedIn) return alert('로그인이 필요합니다.');
                                setIsWriting(true);
                            }}
                        >
                            리뷰 작성하기
                        </button>
                    )}
                </div>
            )}

            {!showHeader && !isWriting && (
                <div className="product-review__subheader">
                    <p>고객 리뷰 {reviews.length}개</p>
                    <button
                        className="btn-outline product-review__write-btn"
                        onClick={() => {
                            if (!isLoggedIn) return alert('로그인이 필요합니다.');
                            setIsWriting(true);
                        }}
                    >
                        리뷰 작성
                    </button>
                </div>
            )}

            {isWriting && (
                <form className="product-review__form" onSubmit={handleSubmit}>
                    <div className="product-review__form-group">
                        <label>별점</label>
                        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                            {[5, 4, 3, 2, 1].map((num) => (
                                <option key={num} value={num}>
                                    {'★'.repeat(num)}
                                    {'☆'.repeat(5 - num)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="product-review__form-group">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="제품에 대한 고객님의 경험을 공유해주세요."
                            rows="4"
                        />
                    </div>
                    <div className="product-review__form-actions">
                        <button type="button" onClick={handleCancel}>
                            취소
                        </button>
                        <button type="submit" className="btn-primary">
                            등록
                        </button>
                    </div>
                </form>
            )}

            <div className="product-review__list">
                {reviews.length === 0 ? (
                    <div className="product-review__empty">첫 리뷰를 작성해보세요.</div>
                ) : (
                    renderedReviews.map((review) => (
                        <div key={review.id} className="product-review__item">
                            <div className="product-review__item-top">
                                <span className="product-review__rating">
                                    {'★'.repeat(review.rating)}
                                    {'☆'.repeat(5 - review.rating)}
                                </span>
                                <span className="product-review__date">
                                    {new Date(review.date).toLocaleDateString()}
                                </span>
                            </div>
                            <h4 className="product-review__user">{review.user}</h4>
                            <p className="product-review__content">{review.content}</p>

                            {isLoggedIn && user?.name === review.user && (
                                <div className="product-review__actions">
                                    <button onClick={() => handleEdit(review)}>수정</button>
                                    <button onClick={() => deleteReview(productId, review.id)}>
                                        삭제
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {canLoadMore && (
                <button
                    type="button"
                    className="product-review__more"
                    onClick={() =>
                        setVisibleCount((prev) => prev + (initialVisibleCount ?? 1))
                    }
                >
                    더보기
                </button>
            )}
        </div>
    );
}

export default ProductReview;
