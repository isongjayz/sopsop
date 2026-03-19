// Gift - 기프트 큐레이션 메인 페이지
import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const curations = [
  {
    id: "housewarming",
    en: "Sanctuary",
    title: "집들이 선물",
    desc: "새로운 공간에 어울리는\n향기로운 시작",
  },
  {
    id: "gratitude",
    en: "Tribute",
    title: "감사 선물",
    desc: "진심을 담은 향기의 기록\n고마움을 전하는 정중한 방식",
  },
  {
    id: "promotion",
    en: "Altitude",
    title: "승진 선물",
    desc: "더 높은 곳을 향한 여정에\n함께하는 향기",
  },
  {
    id: "couple",
    en: "Intimacy",
    title: "연인 선물",
    desc: "가까운 사람에게 전하는\n깊고 은밀한 감각",
  },
];

const Gift = () => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="gift-index">
      <video
        className="gift-index__video"
        src="/images/gift/gift_curation.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="gift-index__overlay" />
      <div className="gift-index__categories">
        {curations.map((item) => (
          <Link
            to={`/gift/${item.id}`}
            key={item.id}
            className={`gift-index__item ${hoveredId === item.id ? "is-active" : ""} ${hoveredId && hoveredId !== item.id ? "is-dim" : ""}`}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <p className="gift-index__en">{item.en}</p>
            <p className="gift-index__title">{item.title}</p>
            <p className="gift-index__desc">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gift;
