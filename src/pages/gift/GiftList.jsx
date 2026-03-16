// GiftList - 기프트 상황별 리스트 페이지
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useStore from '../../store/useStore';
import ProductItem from '../../components/product/ProductItem';
import './style.scss';

const giftCategories = [
    { 
        id: 'housewarming', 
        label: '집들이 선물', 
        desc: '새로운 시작을 축하하는 향기로운 선물',
        image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=1600&q=80',
        items: ['hand-wash-01', 'hand-wash-02', 'hand-duo-01', 'room-spray-01', 'room-spray-02'] 
    },
    { 
        id: 'birthday', 
        label: '생일 선물', 
        desc: '특별한 날을 더욱 빛나게 할 큐레이션',
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=1600&q=80',
        items: ['fragrance-03', 'fragrance-01', 'body-lotion-01', 'hand-balm-01', 'hand-duo-01'] 
    },
    { 
        id: 'small-gift', 
        label: '가벼운 선물', 
        desc: '부담 없이 마음을 전하기 좋은 아이템',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&q=80',
        items: ['hand-balm-01', 'hand-balm-02', 'body-scrub-01', 'hand-wash-03', 'hand-wash-01'] 
    },
    { 
        id: 'for-me', 
        label: '나를 위한 선물', 
        desc: '온전히 나에게 집중하는 휴식의 시간',
        image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=1600&q=80',
        items: ['room-candle-01', 'room-diffuser-01', 'fragrance-02', 'fragrance-04', 'body-wash-01'] 
    },
];

const GiftList = () => {
    const { category } = useParams();
    const { products, fetchProducts } = useStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const activeTab = category || 'housewarming';
    const currentCategory = giftCategories.find(c => c.id === activeTab) || giftCategories[0];
    const otherCategories = giftCategories.filter(c => c.id !== currentCategory.id);
    
    // items 배열의 순서를 유지하면서 상품 정보를 가져옴
    const displayedProducts = currentCategory.items
        .map(itemId => products.find(p => p.id === itemId))
        .filter(p => p !== undefined);

    return (
        <div className="gift-page">
            <header className="gift-hero-banner" style={{ backgroundImage: `url(${currentCategory.image})` }}>
                <div className="gift-hero-banner__overlay"></div>
                <div className="gift-hero-banner__inner inner">
                    <h2 className="font-serif gift-hero-banner__title">{currentCategory.label}</h2>
                    <p className="gift-hero-banner__desc">
                        {currentCategory.desc}
                    </p>
                </div>
            </header>

            <nav className="gift-tabs inner">
                {giftCategories.map(cat => (
                    <Link
                        key={cat.id}
                        to={`/gift/${cat.id}`}
                        className={`gift-tab ${activeTab === cat.id ? 'is-active' : ''}`}
                    >
                        {cat.label}
                    </Link>
                ))}
            </nav>

            <div className="gift-content inner">
                <div className="gift-content__header">
                    <h3 className="font-serif">Considered gestures</h3>
                    <p>{currentCategory.label}을 위한 이솝의 추천 제품들입니다.</p>
                </div>

                {displayedProducts.length > 0 ? (
                    <div className="gift-grid">
                        {displayedProducts.map(product => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="gift-empty" style={{ textAlign: 'center', padding: '100px 0', color: '#888' }}>
                        상품을 불러오는 중입니다...
                    </div>
                )}
            </div>

            {/* Other Occasions */}
            <section className="gift-others inner">
                <h3 className="font-serif gift-others__title">Other Occasions</h3>
                <div className="gift-others__grid">
                    {otherCategories.map(cat => (
                        <Link to={`/gift/${cat.id}`} key={cat.id} className="gift-others__card">
                            <div className="gift-others__img" style={{ backgroundImage: `url(${cat.image})` }}></div>
                            <h4 className="font-serif">{cat.label}</h4>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default GiftList;
