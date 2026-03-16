// ========================================
// Product List Page - 상품 목록 메인 (Aesop 스타일)
// ========================================

import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import useStore from '../../store/useStore';
import ProductItem from '../../components/product/ProductItem';
import './style.scss';

function ProductList() {
    const { pathname } = useLocation();
    const { products, fetchProducts, filters, setFilters } = useStore();

    // 현재 경로에 따른 카테고리 판별 (/, /hand, /body, /fragrance, /room, /best)
    const currentCategory = pathname.split('/').pop();
    const isMainProductPage = currentCategory === 'product' || currentCategory === '';

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('recommend'); // recommend, lowPrice, highPrice, new
    const [subTab, setSubTab] = useState(''); // local subcategory filter

    useEffect(() => {
        // Reset subcategory when main category changes
        setSubTab('');
    }, [currentCategory]);

    useEffect(() => {
        // 실제로는 처음 앱 마운트 시 호출되지만, 확실히 보장하기 위해 한 번 더 호출 가능
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        let result = [...products];

        // 1. 이름(검색어) 필터 적용
        if (filters.name) {
            const query = filters.name.trim().toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                (p.description && p.description.toLowerCase().includes(query))
            );
        }

        // 2. 카테고리 필터링
        if (!isMainProductPage && currentCategory !== 'best') {
            result = result.filter(p => p.category === currentCategory);
            // Apply subcategory filter if selected
            if (subTab) {
                // Support grouped subcategories (e.g., bodycleanser_bodyscrub)
                const subTabs = subTab.split('_');
                result = result.filter(p => subTabs.includes(p.subcategory));
            }
        } else if (currentCategory === 'best') {
            result = result.filter(p => p.isBest);
        }

        // 정렬
        switch (sortOrder) {
            case 'lowPrice':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'highPrice':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'new':
                result.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
                break;
            case 'recommend':
            default:
                // 기본 추천순: 베스트 먼저, 그 다음 랜덤 유지 (기존 순서)
                result.sort((a, b) => (b.isBest === a.isBest ? 0 : b.isBest ? 1 : -1));
                break;
        }

        setFilteredProducts(result);
    }, [products, currentCategory, isMainProductPage, sortOrder, filters.name, subTab]);

    // 카테고리 탭 클릭 시 검색어 제거를 위한 핸들러
    const handleCategoryClick = () => {
        if (filters.name) {
            setFilters({ name: '' });
        }
    };

    const titleMap = {
        'product': '전체 상품',
        'hand': 'Hand',
        'body': 'Body',
        'fragrance': 'Fragrance',
        'room': 'Home',
        'best': 'Best Selection',
    };

    const subcategoryTabsMap = {
        hand: [
            { id: '', label: '전체 상품' },
            { id: 'handwash', label: '핸드 워시' },
            { id: 'handbalm', label: '핸드 밤' },

        ],
        body: [
            { id: '', label: '전체 상품' },
            { id: 'bodysoap', label: '바 솝' },
            { id: 'bodycleanser_bodyscrub', label: '바디클렌저 & 스크럽' },
            { id: 'bodybalm_bodyoil', label: '바디 밤 & 오일' },
        ],
        fragrance: [
            { id: '', label: '전체 상품' },
            { id: 'floral', label: '플로럴' },
            { id: 'fresh', label: '프레쉬' },
            { id: 'woody', label: '우디' },
            { id: 'opulent', label: '오퓰런트' },
        ],
        room: [
            { id: '', label: '전체 상품' },
            { id: 'roomspray', label: '룸 스프레이' },
            { id: 'incense', label: '인센스' },
            { id: 'candle', label: '캔들' },
            { id: 'oilburner', label: '오일 버너 블렌드' },
        ],
    };

    const headerTitle = titleMap[isMainProductPage ? 'product' : currentCategory] || 'Products';
    const currentSubTabs = subcategoryTabsMap[currentCategory] || null;

    return (
        <div className="product-page">
            {/* 상단 Hero 영역 */}
            <header className="product-hero">
                <div className="product-hero__inner">
                    <h2 className="font-serif product-hero__title">{headerTitle}</h2>
                    <p className="product-hero__desc">
                        탁월한 스킨, 헤어 및 바디 케어를 선사하는 이솝 제품을 확인해보세요.
                    </p>
                </div>
            </header>

            {/* 카테고리 탭 / 서브 카테고리 탭 */}
            {currentCategory !== 'best' && (
                <nav className="product-tabs inner">
                    {currentSubTabs ? (
                        currentSubTabs.map(tab => (
                            <button
                                key={tab.id}
                                className={`product-tab ${subTab === tab.id ? 'is-active' : ''}`}
                                onClick={() => {
                                    setSubTab(tab.id);
                                    if (filters.name) setFilters({ name: '' });
                                }}
                            >
                                {tab.label}
                            </button>
                        ))
                    ) : (
                        <>
                            <Link to="/product" onClick={handleCategoryClick} className={`product-tab ${isMainProductPage ? 'is-active' : ''}`}>전체상품</Link>
                            <Link to="/product/best" onClick={handleCategoryClick} className={`product-tab ${currentCategory === 'best' ? 'is-active' : ''}`}>베스트</Link>
                            <Link to="/product/hand" onClick={handleCategoryClick} className={`product-tab ${currentCategory === 'hand' ? 'is-active' : ''}`}>핸드</Link>
                            <Link to="/product/body" onClick={handleCategoryClick} className={`product-tab ${currentCategory === 'body' ? 'is-active' : ''}`}>바디</Link>
                            <Link to="/product/fragrance" onClick={handleCategoryClick} className={`product-tab ${currentCategory === 'fragrance' ? 'is-active' : ''}`}>향수</Link>
                            <Link to="/product/room" onClick={handleCategoryClick} className={`product-tab ${currentCategory === 'room' ? 'is-active' : ''}`}>홈</Link>
                        </>
                    )}
                </nav>
            )}

            {/* 메인 리스트 뷰 */}
            <div className="product-main inner">
                {/* 좌측 정보 영역 */}
                <aside className="product-sidebar">
                    <span className="product-count">({filteredProducts.length} 제품)</span>
                    {filters.name && (
                        <div className="search-result-info" style={{ marginTop: '1rem', fontSize: '13px' }}>
                            <p><strong>"{filters.name}"</strong> 검색 결과입니다.</p>
                            <button
                                onClick={() => setFilters({ name: '' })}
                                style={{ marginTop: '0.5rem', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                            >
                                검색 지우기
                            </button>
                        </div>
                    )}
                </aside>

                {/* 우측 리스트 영역 */}
                <div className="product-content">
                    {/* 상단 정렬 컨트롤 */}
                    <div className="product-controls">
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="product-sort"
                        >
                            <option value="recommend">기본 추천순</option>
                            <option value="lowPrice">낮은 가격순</option>
                            <option value="highPrice">높은 가격순</option>
                            <option value="new">신상품순</option>
                        </select>
                    </div>

                    {/* 상품 그리드 */}
                    {filteredProducts.length > 0 ? (
                        <div className="product-grid">
                            {filteredProducts.map(product => (
                                <ProductItem key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="product-empty">
                            <p>해당 조건의 상품이 없습니다.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductList;
