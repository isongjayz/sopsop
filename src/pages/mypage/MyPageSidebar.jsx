// ========================================
// MyPage Sidebar
// ========================================

import { NavLink } from 'react-router-dom';
import useStore from '../../store/useStore';

function MyPageSidebar() {
    const { user } = useStore();

    return (
        <aside className="mypage-sidebar">
            <div className="mypage-sidebar__profile">
                <span className="greeting">안녕하세요,</span>
                <strong className="name">{user?.name} 님</strong>
            </div>

            <nav className="mypage-sidebar__nav">
                <ul>
                    <li>
                        <NavLink to="/mypage" end className={({ isActive }) => isActive ? 'is-active' : ''}>
                            마이페이지
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/mypage/orders" className={({ isActive }) => isActive ? 'is-active' : ''}>
                            주문내역
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/mypage/wishlist" className={({ isActive }) => isActive ? 'is-active' : ''}>
                            위시리스트
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/mypage/inquiry" className={({ isActive }) => isActive ? 'is-active' : ''}>
                            문의하기
                        </NavLink>
                    </li>
                </ul>
            </nav>

        </aside>
    );
}

export default MyPageSidebar;
