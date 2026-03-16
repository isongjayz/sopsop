// ========================================
// MyRoutes - 전체 라우팅 맵
// aesop_2.md 섹션 7 기준
// ========================================

import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../common/Layout';

// 수정: 페이지 단위 lazy import로 초기 번들 크기 분산
const Home = lazy(() => import('../pages/home'));
const AeGung = lazy(() => import('../pages/aegung'));
const Gift = lazy(() => import('../pages/gift'));
const GiftList = lazy(() => import('../pages/gift/GiftList'));
const Product = lazy(() => import('../pages/product'));
const ProductDetail = lazy(() => import('../pages/product/ProductDetail'));
const Checkout = lazy(() => import('../pages/checkout'));
const Login = lazy(() => import('../pages/login'));
const Signup = lazy(() => import('../pages/login/Signup'));
const FindAccount = lazy(() => import('../pages/login/FindAccount'));
const MyPage = lazy(() => import('../pages/mypage'));
const MyPageOrders = lazy(() => import('../pages/mypage/MyPageOrders'));
const MyPageWishlist = lazy(() => import('../pages/mypage/MyPageWishlist'));
const MyPageInquiry = lazy(() => import('../pages/mypage/MyPageInquiry'));
const Board = lazy(() => import('../pages/board'));

const RouteFallback = () => <div className="page-loading">Loading...</div>;

const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<RouteFallback />}>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        {/* 홈 */}
                        <Route index element={<Home />} />

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
            </Suspense>
        </BrowserRouter>
    );
};

export default MyRoutes;
