// ========================================
// MyPage Wishlist (위시리스트)
// ========================================

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../../store/useStore';
import MyPageSidebar from './MyPageSidebar';
import { productData } from '../../assets/api/productData';
import ProductItem from '../../components/product/ProductItem';
import './style.scss';

function MyPageWishlist() {
    const { user, isLoggedIn, getUserWishlist } = useStore();
    const [wishlistProducts, setWishlistProducts] = useState([]);

    useEffect(() => {
        if (isLoggedIn && user) {
            const userWishlist = getUserWishlist(user.id);
            const wishlistIds = userWishlist.map(w => w.productId);
            const allProducts = Object.values(productData).flat();
            const filtered = allProducts.filter(p => wishlistIds.includes(p.id));
            setWishlistProducts(filtered);
            return;
        }
        setWishlistProducts([]);
    }, [isLoggedIn, user, getUserWishlist]);

    if (!isLoggedIn) return null;

    return (
        <div className="mypage inner">
            <MyPageSidebar />
            <main className="mypage-content">
                <header className="mypage-content__header">
                    <h2 className="font-serif">My Picks</h2>
                </header>

                <div className="wishlist-grid wishlist-grid--cards">
                    {wishlistProducts.length === 0 ? (
                        <div className="empty-state">
                            <p>위시리스트에 담긴 상품이 없습니다.</p>
                            <Link to="/product" className="btn-outline">쇼핑 계속하기</Link>
                        </div>
                    ) : (
                        wishlistProducts.map(product => (
                            <ProductItem key={product.id} product={product} />
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}

export default MyPageWishlist;
