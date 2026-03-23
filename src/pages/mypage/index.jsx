// ========================================
// MyPage Dashboard (Main)
// ========================================

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../store/useStore";
import MyPageSidebar from "./MyPageSidebar";
import "./style.scss";

function MyPage() {
  const { isLoggedIn, user, updateUser } = useStore();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    phone: "",
    birth: "",
    email: "",
    gender: "",
    zipcode: "",
    country: "",
    address: "",
  });

  const [isPwChanging, setIsPwChanging] = useState(false);
  const [pwData, setPwData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (user) {
      setEditData((prev) => ({
        ...prev,
        name: user.name || "",
        phone: user.phone || "",
        birth: user.birth || prev.birth,
        email: user.email || "",
        gender: user.gender || prev.gender,
        zipcode: user.zipcode || prev.zipcode,
        country: user.country || prev.country,
        address: user.address || prev.address,
      }));
    }
  }, [isLoggedIn, navigate, user]);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save logic
      updateUser(user.id, {
        name: editData.name,
        phone: editData.phone,
        birth: editData.birth,
        email: editData.email,
        gender: editData.gender,
        zipcode: editData.zipcode,
        country: editData.country,
        address: editData.address,
      });
      setIsEditing(false);
      alert("정보가 수정되었습니다.");
    } else {
      setIsEditing(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePwChange = (e) => {
    const { name, value } = e.target;
    setPwData((prev) => ({ ...prev, [name]: value }));
  };

  const submitPwChange = () => {
    const { updatePassword } = useStore.getState();
    if (pwData.new !== pwData.confirm) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    const result = updatePassword(user.id, pwData.current, pwData.new);
    if (result.success) {
      alert("비밀번호가 변경되었습니다.");
      setIsPwChanging(false);
      setPwData({ current: "", new: "", confirm: "" });
    } else {
      alert(result.message);
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="mypage mypage--home">
      <MyPageSidebar />
      <main className="mypage-content">
        <header className="mypage-content__header is-home">
          <h2 className="font-serif">
            A seeker of mindful beauty, {user?.name || ""}
          </h2>
        </header>

        <div className="mypage-profile-info">
          <section className="info-section">
            <h3 className="section-title">
              개인 정보
              <button className="btn-edit-profile" onClick={handleEditToggle}>
                {isEditing ? "Save" : "Edit"}
              </button>
            </h3>
            <div className="info-grid">
              <div className="info-row">
                <span className="label">이름</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={editData.name}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  <span className="value">
                    {user?.name || ""}
                  </span>
                )}
              </div>
              <div className="info-row">
                <span className="label">생년월일</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="birth"
                    value={editData.birth}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  <span className="value">
                    {user?.birth || editData.birth}
                  </span>
                )}
              </div>
              <div className="info-row">
                <span className="label">이메일</span>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={editData.email}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  <span className="value">
                    {user?.email || ""}
                  </span>
                )}
              </div>
              <div className="info-row">
                <span className="label">성별</span>
                <div className="value gender-toggle">
                  <span
                    className={`gender-opt ${editData.gender === "남성" ? "is-active" : ""}`}
                    onClick={() =>
                      isEditing &&
                      setEditData((prev) => ({ ...prev, gender: "남성" }))
                    }
                  >
                    남성
                  </span>
                  <span
                    className={`gender-opt ${editData.gender === "여성" ? "is-active" : ""}`}
                    onClick={() =>
                      isEditing &&
                      setEditData((prev) => ({ ...prev, gender: "여성" }))
                    }
                  >
                    여성
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h3 className="section-title">배송 정보</h3>
            <div className="info-grid">
              <div className="info-row">
                <span className="label">전화번호</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={editData.phone}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  <span className="value">
                    {user?.phone || ""}
                  </span>
                )}
              </div>
              <div className="info-row">
                <span className="label">우편번호</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="zipcode"
                    value={editData.zipcode}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  <span className="value">
                    {user?.zipcode || editData.zipcode}
                  </span>
                )}
              </div>
              <div className="info-row">
                <span className="label">국가</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="country"
                    value={editData.country}
                    onChange={handleInputChange}
                    className="edit-input"
                  />
                ) : (
                  <span className="value">
                    {user?.country || editData.country}
                  </span>
                )}
              </div>
              <div className="info-row">
                <span className="label">주소</span>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={editData.address}
                    onChange={handleInputChange}
                    className="edit-textarea"
                  />
                ) : (
                  <span className="value">
                    {user?.address || editData.address}
                  </span>
                )}
              </div>
            </div>
          </section>

          <section className="info-section">
            <h3 className="section-title">보안 설정</h3>
            <div className="info-grid">
              <div className="info-row">
                <span className="label">비밀번호</span>
                <span
                  className="value link"
                  onClick={() => setIsPwChanging(!isPwChanging)}
                >
                  비밀번호 변경
                </span>
              </div>
            </div>

            {isPwChanging && (
              <div className="pw-change-box">
                <div className="pw-input-group">
                  <label>현재 비밀번호</label>
                  <input
                    type="password"
                    name="current"
                    value={pwData.current}
                    onChange={handlePwChange}
                    placeholder="현재 비밀번호"
                  />
                </div>
                <div className="pw-input-group">
                  <label>새 비밀번호</label>
                  <input
                    type="password"
                    name="new"
                    value={pwData.new}
                    onChange={handlePwChange}
                    placeholder="새 비밀번호"
                  />
                </div>
                <div className="pw-input-group">
                  <label>비밀번호 확인</label>
                  <input
                    type="password"
                    name="confirm"
                    value={pwData.confirm}
                    onChange={handlePwChange}
                    placeholder="새 비밀번호 확인"
                  />
                </div>
                <button className="btn-pw-submit" onClick={submitPwChange}>
                  변경하기
                </button>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default MyPage;
