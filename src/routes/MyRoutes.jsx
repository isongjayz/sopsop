// ========================================
// MyRoutes - 전체 라우팅 맵
// aesop_2.md 섹션 7 기준
// ========================================

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../common/Layout';
import { Home, AeGung, Gift, GiftList, Product, ProductDetail, Checkout, Login, Signup, FindAccount, MyPage, MyPageOrders, MyPageWishlist, MyPageInquiry, Board, About } from '../pages';

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* 홈 */}
                    <Route index element={<Home />} />

                    {/* 어바웃 */}
                    <Route path="about" element={<About />} />

                    {/* 큐레이션 페이지 */}
                    <Route path="ae-gung" element={<AeGung />} />
                    <Route path="gift" element={<Gift />} />
                    <Route path="gift/:category" element={<GiftList />} />

                    {/* 상품 페이지 */}
                    <Route path="product" element={<Product />} />
                    <Route path="product/best" element={<Product />} />
                    <Route path="product/hand" element={<Product />} />
                    <Route path="product/body" element={<Product />} />
                    <Route path="product/fragrance" element={<Product />} />
                    <Route path="product/room" element={<Product />} />
                    <Route path="product/:id" element={<ProductDetail />} />

                    {/* 결제 흐름 (장바구니 → 결제정보 → 주문완료) */}
                    <Route path="checkout" element={<Checkout />} />

                    {/* 인증 */}
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="find-account" element={<FindAccount />} />

                    {/* 마이페이지 */}
                    <Route path="mypage" element={<MyPage />} />
                    <Route path="mypage/orders" element={<MyPageOrders />} />
                    <Route path="mypage/wishlist" element={<MyPageWishlist />} />
                    <Route path="mypage/inquiry" element={<MyPageInquiry />} />

                    {/* 고객지원 */}
                    <Route path="board" element={<Board />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default MyRoutes;
