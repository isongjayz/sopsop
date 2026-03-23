// ========================================
// Header - Aesop 상단 GNB
// ========================================

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiSearch, CiUser, CiShoppingCart, CiLogout } from 'react-icons/ci';
import { Menu, X } from 'lucide-react';
import useStore from '../../store/useStore';
import NavBar from './NavBar';
import SearchModal from './SearchModal';

const HEADER_DRAWER_BREAKPOINT = 1180;

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [isTransparent, setIsTransparent] = useState(true);
    const [isHidden, setIsHidden] = useState(false);
    const { isLoggedIn, logout, cartItems, setFilters } = useStore();
    const navigate = useNavigate();

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add('scroll-locked');
        } else {
            document.body.classList.remove('scroll-locked');
        }
        return () => document.body.classList.remove('scroll-locked');
    }, [menuOpen]);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 50) {
                setIsTransparent(false);
            } else {
                setIsTransparent(true);
            }

            if (currentScrollY > lastScrollY && currentScrollY > 80 && !menuOpen && !searchOpen) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }

            lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [menuOpen, searchOpen]);

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${HEADER_DRAWER_BREAKPOINT}px)`);

        const handleViewportChange = (event) => {
            if (!event.matches) {
                setMenuOpen(false);
            }
        };

        handleViewportChange(mediaQuery);

        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', handleViewportChange);
            return () => mediaQuery.removeEventListener('change', handleViewportChange);
        }

        mediaQuery.addListener(handleViewportChange);
        return () => mediaQuery.removeListener(handleViewportChange);
    }, []);

    const closeMenu = () => setMenuOpen(false);

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
                <div className="header_inner">
                    {/* 로고 */}
                    <div className="header_logo">
                        <Link to="/" onClick={() => setFilters({ name: '' })}>
                            <img src="/images/common/Logo.png" alt="Aesop" />
                        </Link>
                    </div>

                    {/* 네비게이션 */}
                    <NavBar isOpen={menuOpen} onClose={closeMenu} isLoggedIn={isLoggedIn} onLogout={handleLogout} />

                    {/* 아이콘 */}
                    <div className="header_icons">
                        <button className="util-btn" onClick={() => setSearchOpen(true)} aria-label="검색">
                            <CiSearch size={24} />
                        </button>

                        <Link to={isLoggedIn ? '/mypage' : '/login'} className="util-btn" aria-label="마이페이지">
                            <CiUser size={24} />
                        </Link>

                        <Link to="/checkout" className="util-btn cart-btn" aria-label="장바구니">
                            <CiShoppingCart size={24} />
                            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                        </Link>

                        {isLoggedIn ? (
                            <button className="util-btn login-link" onClick={handleLogout}>
                                <CiLogout size={22} style={{ transform: 'scaleX(-1)' }} />
                                <span className="login-text">로그아웃</span>
                            </button>
                        ) : (
                            <Link to="/login" className="login-link">
                                로그인
                            </Link>
                        )}

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

            {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
            {menuOpen && <div className="header__overlay" onClick={closeMenu} />}
        </>
    );
};

export default Header;
