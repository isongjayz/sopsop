// ========================================
// Layout - 공통 레이아웃 래퍼
// Header + Main(Outlet) + Footer
// ========================================

import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './header';
import Footer from './footer';

const Layout = () => {
    const { pathname } = useLocation();

    // 페이지 이동 시 스크롤 최상단
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <Header />
            <main className="main">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
