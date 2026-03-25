import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useStore from '../../store/useStore';
import ProductDetailTab, { ProductDetailIntroVisual } from '../../components/product/ProductDetailTab';
import ProductShippingTab from '../../components/product/ProductShippingTab';
import ProductReviewTab from '../../components/product/ProductReviewTab';
import ProductAccompaniedBy from '../../components/product/ProductAccompaniedBy';
import './ProductDetail.scss';

const PRODUCT_DETAIL_TABS = [
    { id: 'details', label: '제품 상세' },
    { id: 'shipping', label: '배송 안내' },
    { id: 'reviews', label: '리뷰' },
];

function getInitialSelectedVolume(product) {
    return product?.volumes?.[0]?.volume || 'default';
}

function getSelectedOption(volumes, selectedVolume) {
    return volumes.find((volume) => volume.volume === selectedVolume);
}

function getStockLabel(stock) {
    if (stock >= 5) {
        return '재고 5개 이상';
    }

    if (stock > 0) {
        return `재고 ${stock}개`;
    }

    return '일시품절';
}

function getShippingEstimateLabel() {
    const dayLabels = ['일', '월', '화', '수', '목', '금', '토'];
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + 3);

    const month = String(estimatedDate.getMonth() + 1).padStart(2, '0');
    const date = String(estimatedDate.getDate()).padStart(2, '0');
    const day = dayLabels[estimatedDate.getDay()];

    return `${month}.${date} (${day}) 출고예정`;
}

function getRecommendedProducts(products, currentProduct) {
    return products
        .filter(
            (product) =>
                product.category === currentProduct.category && product.id !== currentProduct.id
        )
        .slice(0, 3);
}

function ProductDetail() {
    const { id } = useParams();
    const { fetchProducts, products, addToCart } = useStore();

    const [selectedVolume, setSelectedVolume] = useState('');
    const [activeTab, setActiveTab] = useState('details');

    useEffect(() => {
        fetchProducts();
        window.scrollTo(0, 0);
    }, [fetchProducts, id]);

    const currentProduct = products.find((product) => product.id === id);

    useEffect(() => {
        if (!currentProduct) {
            return;
        }

        setSelectedVolume(getInitialSelectedVolume(currentProduct));
        setActiveTab('details');
    }, [currentProduct?.id]);

    if (!currentProduct) {
        return (
            <div className="product-detail product-detail--empty">
                <p>상품 정보를 불러오는 중입니다...</p>
            </div>
        );
    }

    const volumes = currentProduct.volumes || [];
    const currentOption = getSelectedOption(volumes, selectedVolume);
    const selectedImage = currentOption?.image || currentProduct.image;
    const displayPrice = currentOption?.price || currentProduct.price;
    const currentStock = currentOption?.stock ?? currentProduct.stock;
    const isOutOfStock = currentStock === 0;
    const isSetProduct = Boolean(currentProduct.isSet);
    const stockLabel = getStockLabel(currentStock);
    const shippingEstimateLabel = getShippingEstimateLabel();
    const recommendedProducts = getRecommendedProducts(products, currentProduct);

    const handleAddToCart = () => {
        if (isOutOfStock) {
            return;
        }

        addToCart({
            cartId: `${currentProduct.id}-${selectedVolume}`,
            productId: currentProduct.id,
            name: currentProduct.name,
            image: selectedImage,
            volume: selectedVolume,
            price: displayPrice,
            quantity: 1,
            giftWrap: false,
        });

        alert('장바구니에 담았습니다.');
    };

    const renderSecondaryTabContent = () => {
        if (activeTab === 'shipping') {
            return <ProductShippingTab product={currentProduct} />;
        }

        if (activeTab === 'reviews') {
            return <ProductReviewTab productId={currentProduct.id} />;
        }

        return null;
    };

    return (
        <div className="product-detail">
            <div className="product-detail__top inner">
                <div className="product-detail__gallery">
                    <img src={selectedImage} alt={currentProduct.name} />
                </div>

                <div className="product-detail__info">
                    <nav className="product-detail__breadcrumb">
                        <Link to="/">Home</Link>
                        <span>/</span>
                        <Link to="/product">Product</Link>
                        <span>/</span>
                        <Link to={`/product/${currentProduct.category}`} className="capitalize">
                            {currentProduct.category}
                        </Link>
                    </nav>

                    <div className="product-detail__panel">
                        <div className="product-detail__heading">
                            <p className="product-detail__stock">{stockLabel}</p>
                            <h1 className="product-detail__name">{currentProduct.name}</h1>
                        </div>

                        <p className="product-detail__shipping-copy">
                            전 지역 무료배송
                            <br />
                            <span className="product-detail__shipping-date">
                                {shippingEstimateLabel}
                            </span>
                        </p>

                        {volumes.length > 0 && (
                            <div className="product-detail__options">
                                <div
                                    className={`product-detail__options-list ${volumes.length === 1 ? 'is-single' : ''
                                        }`}
                                >
                                    {volumes.map((volume) => (
                                        <button
                                            key={volume.volume || 'default'}
                                            className={`product-detail__option-btn ${selectedVolume === volume.volume ? 'is-active' : ''
                                                } ${volume.stock === 0 ? 'is-disabled' : ''}`}
                                            onClick={() =>
                                                volume.stock > 0 && setSelectedVolume(volume.volume)
                                            }
                                            disabled={volume.stock === 0}
                                        >
                                            {isSetProduct ? 'SET' : volume.volume}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button
                            className={`product-detail__add-btn ${isOutOfStock ? 'is-disabled' : ''
                                }`}
                            onClick={handleAddToCart}
                            disabled={isOutOfStock}
                        >
                            {displayPrice.toLocaleString()}원
                        </button>
                    </div>
                </div>
            </div>

            <div className="product-detail__tabs-wrap">
                <div className="product-detail__tabs-header-shell">
                    <div className="inner">
                        <div className="product-detail__tabs-header">
                            {PRODUCT_DETAIL_TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    className={`product-detail__tab-btn ${activeTab === tab.id ? 'is-active' : ''
                                        }`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {activeTab === 'details' && (
                    <div className="product-detail__details-panel">
                        <div className="product-detail__details-hero">
                            <ProductDetailIntroVisual product={currentProduct} />
                        </div>

                        <div className="product-detail__details-content-shell">
                            <div className="inner">
                                <div className="product-detail__tabs-content product-detail__tabs-content--details">
                                    <ProductDetailTab
                                        product={currentProduct}
                                        showIntroVisual={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab !== 'details' && (
                    <div className="product-detail__tab-panel-shell">
                        <div className="inner">
                            <div className="product-detail__tabs-content">
                                {renderSecondaryTabContent()}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <ProductAccompaniedBy products={recommendedProducts} />
        </div>
    );
}

export default ProductDetail;
