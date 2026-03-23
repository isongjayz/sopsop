// ========================================
// NavBar - 메인 네비게이션 메뉴
// 데스크탑: 수평 메뉴 / 태블릿 이하: 전체화면 슬라이드 오버레이
// ========================================

import { NavLink } from 'react-router-dom';
import useStore from '../../store/useStore';
import { LogOut, User, LogIn } from 'lucide-react';

const navItems = [
    { label: 'ABOUT', path: '/about' },
    { label: 'AE-GUNG', path: '/ae-gung' },
    { label: 'GIFT', path: '/gift' },
    { label: 'BEST', path: '/product/best' },
    { label: 'HAND', path: '/product/hand' },
    { label: 'BODY', path: '/product/body' },
    { label: 'FRAGRANCE', path: '/product/fragrance' },
    { label: 'ROOM', path: '/product/room' },
];

const NavBar = ({ isOpen, onClose, isLoggedIn, onLogout }) => {
    const { setFilters } = useStore();

    const handleLinkClick = () => {
        setFilters({ name: '' });
        onClose();
    };

    return (
        <nav className={`nav ${isOpen ? 'is-open' : ''}`}>
            <ul className="nav__list">
                {navItems.map((item) => (
                    <li key={item.path}>
                        <NavLink
                            to={item.path}
                            className="nav__link"
                            onClick={handleLinkClick}
                        >
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>

            {/* 모바일 전용 하단 유틸 메뉴 */}
            <div className="nav__mobile-util">
                {isLoggedIn ? (
                    <>
                        <NavLink to="/mypage" className="util-link" onClick={onClose}>
                            <User size={20} />
                            마이페이지
                        </NavLink>
                        <button className="util-link" onClick={() => { onLogout(); onClose(); }}>
                            <LogOut size={20} />
                            로그아웃
                        </button>
                    </>
                ) : (
                    <NavLink to="/login" className="util-link" onClick={onClose}>
                        <LogIn size={20} />
                        로그인
                    </NavLink>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
