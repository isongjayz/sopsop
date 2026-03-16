// ========================================
// Header - Aesop 상단 GNB
// 좌측 로고, 중앙 GNB, 우측 유틸 (검색/마이페이지/장바구니/로그인)
// ========================================

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, LogOut } from 'lucide-react';
import useStore from '../../store/useStore';
import NavBar from './NavBar';
import SearchModal from './SearchModal';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [isTransparent, setIsTransparent] = useState(true);
    const [isHidden, setIsHidden] = useState(false);
    // 수정: 미사용 user 제거
    const { isLoggedIn, logout, cartItems, setFilters } = useStore();
    const navigate = useNavigate();

    // 장바구니 아이템 총 수량
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // 모바일 메뉴 열면 body 스크롤 잠금
    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add('scroll-locked');
        } else {
            document.body.classList.remove('scroll-locked');
        }
        return () => document.body.classList.remove('scroll-locked');
    }, [menuOpen]);

    // 스크롤 시 헤더 투명도 및 숨김 처리
    useEffect(() => {
        let lastScrollY = window.scrollY;
        
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // 상단 부분에 있을 때 투명하게 (50px 기준)
            if (currentScrollY > 50) {
                setIsTransparent(false);
            } else {
                setIsTransparent(true);
            }

            // 스크롤을 내리면 숨기고 올리면 표시 (모달이나 메뉴가 열려있지 않을 때만)
            if (currentScrollY > lastScrollY && currentScrollY > 80 && !menuOpen && !searchOpen) {
                setIsHidden(true); // 스크롤 다운
            } else {
                setIsHidden(false); // 스크롤 업
            }

            lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // 초기 로드 시 한 번 실행하여 상태 맞추기
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [menuOpen, searchOpen]);

    // 메뉴 닫기
    const closeMenu = () => setMenuOpen(false);

    // 로그아웃 처리
    const handleLogout = () => {
        setFilters({ name: '' });
        logout();
        navigate('/');
    };

    return (
        <>
            <header 
                id="header" 
                className={`header ${isTransparent && !menuOpen ? 'is-transparent' : ''} ${isHidden ? 'is-hidden' : ''}`}
            >
                <div className="inner">
                    {/* 좌측: 로고 */}
                    <h1 className="header__logo">
                        <Link to="/" onClick={() => setFilters({ name: '' })}>Aesop</Link>
                    </h1>

                    {/* 중앙: GNB */}
                    <NavBar isOpen={menuOpen} onClose={closeMenu} isLoggedIn={isLoggedIn} onLogout={handleLogout} />

                    {/* 우측: 유틸 */}
                    <div className="header__util">
                        {/* 검색 */}
                        <button
                            className="util-btn"
                            onClick={() => setSearchOpen(true)}
                            aria-label="검색"
                        >
                            <Search size={22} />
                        </button>

                        {/* 마이페이지 (비로그인 시 로그인으로 이동) */}
                        <Link to={isLoggedIn ? "/mypage" : "/login"} className="util-btn" aria-label="마이페이지">
                            <User size={22} />
                        </Link>

                        {/* 장바구니 */}
                        <Link to="/checkout" className="util-btn cart-btn" aria-label="장바구니">
                            <ShoppingBag size={22} />
                            {cartCount > 0 && (
                                <span className="cart-count">{cartCount}</span>
                            )}
                        </Link>

                        {/* 로그인/로그아웃 */}
                        {isLoggedIn ? (
                            <button className="util-btn login-link" onClick={handleLogout}>
                                <LogOut size={20} />
                                <span className="login-text">로그아웃</span>
                            </button>
                        ) : (
                            <Link to="/login" className="login-link">
                                로그인
                            </Link>
                        )}

                        {/* 모바일 햄버거 */}
                        <button
                            className="util-btn hamburger-btn"
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label="메뉴"
                        >
                            {menuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* 검색 모달 */}
            {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}

            {/* 모바일 메뉴 오버레이 */}
            {menuOpen && <div className="header__overlay" onClick={closeMenu} />}
        </>
    );
};

export default Header;
