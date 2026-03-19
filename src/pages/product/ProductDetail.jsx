// ========================================
// Product Detail Page - 상품 상세 페이지
// ========================================

import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useStore from '../../store/useStore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductReview from '../../components/product/ProductReview';
import './ProductDetail.scss';

function ProductDetail() {
    const { id } = useParams();
    const {
        fetchProducts,
        fetchProductById,
        currentProduct,
        products,
        addToCart
    } = useStore();

    const [selectedVolume, setSelectedVolume] = useState('');
    const [activeTab, setActiveTab] = useState('details'); // details, shipping, reviews

    // 수정: productData 정규화 후 세트 상품도 상세에서 동일하게 처리하기 위한 플래그
    const [isSetProduct, setIsSetProduct] = useState(false);

    useEffect(() => {
        // 데이터가 없을 경우를 대비해 초기화 호출 (중복이면 slice 내에서 스킵됨)
        fetchProducts();

        // ID 변경 시 상단 스크롤 (라우팅과 별개로 상세 내비게이션 시)
        window.scrollTo(0, 0);

        const detailData = fetchProductById(id);
        if (detailData) {
            setIsSetProduct(Boolean(detailData.isSet));
        }

        if (detailData && detailData.volumes && detailData.volumes.length > 0) {
            setSelectedVolume(detailData.volumes[0].volume);
        } else {
            setSelectedVolume('default');
        }
    }, [id, fetchProducts, fetchProductById]);

    if (!currentProduct) {
        return (
            <div className="product-detail product-detail--empty">
                <p>상품 정보를 불러오는 중입니다...</p>
            </div>
        );
    }

    const { detail, volumes } = currentProduct;

    // 현재 선택된 옵션의 가격 및 재고
    const currentOption = volumes && volumes.find(v => v.volume === selectedVolume);
    const displayPrice = currentOption ? currentOption.price : currentProduct.price;
    const isOutofStock = currentOption ? currentOption.stock === 0 : currentProduct.stock === 0;

    // 장바구니 추가
    const handleAddToCart = () => {
        if (isOutofStock) return;

        const cartItem = {
            cartId: `${currentProduct.id}-${selectedVolume}`,
            productId: currentProduct.id,
            name: currentProduct.name,
            image: currentProduct.image,
            volume: selectedVolume,
            price: displayPrice,
            quantity: 1,
            giftWrap: false
        };
        addToCart(cartItem);
        alert('장바구니에 담겼습니다.'); // 추후 커스텀 모달/토스트로 변경
    };

    // 관련 카테고리 상품 추천 (현재 상품 제외 최대 5개)
    const recommendedProducts = products
        .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
        .slice(0, 5);

    return (
        <div className="product-detail">
            {/* 상단 2단 레이아웃 */}
            <div className="product-detail__top inner">
                <div className="product-detail__gallery">
                    <img src={currentProduct.image} alt={currentProduct.name} />
                </div>

                <div className="product-detail__info">
                    {/* 브레드크럼 */}
                    <nav className="product-detail__breadcrumb">
                        <Link to="/">Home</Link>
                        <span>/</span>
                        <Link to="/product">Product</Link>
                        <span>/</span>
                        <Link to={`/product/${currentProduct.category}`} className="capitalize">
                            {currentProduct.category}
                        </Link>
                    </nav>

                    <h1 className="product-detail__name">{currentProduct.name}</h1>

                    {/* 가격 및 정보 요약 (이름 바로 아래 배치) */}
                    <div className="product-detail__status-wrap">
                        <div className="product-detail__price">
                            ₩{displayPrice.toLocaleString()}
                        </div>
                        <div className="product-detail__stock-status">
                            {isOutofStock ? (
                                <span className="status-out">품절</span>
                            ) : (
                                <span className="status-in">재고 있음</span>
                            )}
                        </div>
                        <div className="product-detail__shipping-status">
                            <span className="shipping-label">배송</span>
                            <span className="shipping-value">무료 배송 (1-3일 소요)</span>
                        </div>
                    </div>

                    <p className="product-detail__desc">
                        {detail ? detail.description : '상품 설명이 준비되지 않았습니다.'}
                    </p>

                    {/* 주요 스펙 (피부타입, 사용감, 향) */}
                    <ul className="product-detail__specs">
                        {detail?.texture && (
                            <li>
                                <strong>텍스처</strong>
                                <span>{detail.texture}</span>
                            </li>
                        )}
                        {currentProduct.scent && (
                            <li>
                                <strong>아로마</strong>
                                <span>{currentProduct.description}</span>
                            </li>
                        )}
                        {detail?.keyIngredients && (
                            <li>
                                <strong>주요 성분</strong>
                                <span>{detail.keyIngredients}</span>
                            </li>
                        )}
                    </ul>

                    {/* 옵션(용량) 선택 - 제품 리스트 스타일처럼 1개면 100%, 2개면 50% 분기 처리 가능하게 구조화 */}
                    {volumes && volumes.length > 0 && (
                        <div className="product-detail__options">
                            <div className="product-detail__options-list">
                                {volumes.map((vol, idx) => (
                                    <button
                                        key={idx}
                                        className={`product-detail__option-btn ${selectedVolume === vol.volume ? 'is-active' : ''} ${vol.stock === 0 ? 'is-disabled' : ''} ${volumes.length === 1 ? 'is-full' : ''}`}
                                        onClick={() => vol.stock > 0 && setSelectedVolume(vol.volume)}
                                        disabled={vol.stock === 0}
                                    >
                                        {isSetProduct ? 'SET' : vol.volume} {vol.stock === 0 && '(품절)'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 장바구니 버튼 */}
                    <div className="product-detail__action">
                        <button
                            className={`btn-primary product-detail__add-btn ${isOutofStock ? 'is-disabled' : ''}`}
                            onClick={handleAddToCart}
                            disabled={isOutofStock}
                        >
                            {isOutofStock ? '품절' : '담기'}
                        </button>
                    </div>
                </div>
            </div>

            {/* 하단 탭 영역 (상세 설명, 배송정보, 리뷰) */}
            <div className="product-detail__tabs-wrap">
                <div className="inner">
                    <div className="product-detail__tabs-header">
                        <button
                            className={`product-detail__tab-btn ${activeTab === 'details' ? 'is-active' : ''}`}
                            onClick={() => setActiveTab('details')}
                        >
                            사용법
                        </button>
                        <button
                            className={`product-detail__tab-btn ${activeTab === 'shipping' ? 'is-active' : ''}`}
                            onClick={() => setActiveTab('shipping')}
                        >
                            배송 및 반품
                        </button>
                        <button
                            className={`product-detail__tab-btn ${activeTab === 'reviews' ? 'is-active' : ''}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            고객 리뷰
                        </button>
                    </div>

                    <div className="product-detail__tabs-content">
                        {activeTab === 'details' && (
                            <div className="product-detail__tab-panel">
                                <h3>사용법</h3>
                                <p>{detail?.howToUse || '정보가 없습니다.'}</p>
                            </div>
                        )}
                        {activeTab === 'shipping' && (
                            <div className="product-detail__tab-panel">
                                <h3>배송 및 반품 안내</h3>
                                <p>{detail?.shippingInfo || '배송 정보가 준비 중입니다.'}</p>
                            </div>
                        )}
                        {activeTab === 'reviews' && (
                            <div className="product-detail__tab-panel">
                                <ProductReview productId={currentProduct.id} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 추천 상품 슬라이더 */}
            {recommendedProducts.length > 0 && (
                <div className="product-detail__recommend">
                    <div className="inner">
                        <h2>함께 사용하기 좋은 제품</h2>
                        <Swiper
                            modules={[Navigation]}
                            spaceBetween={30}
                            slidesPerView={1}
                            navigation
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                                1280: { slidesPerView: 4 },
                            }}
                            className="product-detail__swiper"
                        >
                            {recommendedProducts.map(p => (
                                <SwiperSlide key={p.id}>
                                    <Link to={`/product/${p.id}`} className="recommend-card">
                                        <div className="recommend-card__img">
                                            <img src={p.image} alt={p.name} />
                                        </div>
                                        <div className="recommend-card__info">
                                            <h4>{p.name}</h4>
                                            <p>{p.description}</p>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductDetail;
