// ========================================
// MyPage Sidebar
// ========================================

import { NavLink } from "react-router-dom";
import useStore from "../../store/useStore";

function MyPageSidebar() {
  const { user } = useStore();

  return (
    <>
    <aside className="mypage-sidebar">
      <nav className="mypage-sidebar__nav">
        <ul>
          <li>
            <NavLink
              to="/mypage"
              end
              className={({ isActive }) => (isActive ? "is-active" : "")}
            >
              마이페이지
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mypage/orders"
              className={({ isActive }) => (isActive ? "is-active" : "")}
            >
              주문내역
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mypage/wishlist"
              className={({ isActive }) => (isActive ? "is-active" : "")}
            >
              위시리스트
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/mypage/inquiry"
              className={({ isActive }) => (isActive ? "is-active" : "")}
            >
              문의하기
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/board"
              className={({ isActive }) => (isActive ? "is-active" : "")}
            >
              고객지원
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
    <div className="mypage-divider" />
    </>
  );
}

export default MyPageSidebar;
