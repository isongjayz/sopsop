// GiftList - 기프트 상황별 리스트 페이지
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useStore from "../../store/useStore";
import ProductItem from "../../components/product/ProductItem";
import "./style.scss";

const giftCategories = [
  {
    id: "housewarming",
    label: "집들이 선물",
    desc: "새로운 시작을 축하하는 마음이 공간에 향기롭게 머물 수 있도록,\n집안의 공기를 정갈하게 채워주는 이솝의 홈 케어 셀렉션을 제안합니다.",
    image: "/images/gift/gift_home.png",
    items: [
      "hand-wash-01",
      "hand-wash-02",
      "hand-duo-01",
      "room-spray-01",
      "room-spray-02",
    ],
  },
  {
    id: "appreciate",
    label: "감사 선물",
    desc: "깊은 고마움을 전하는 마음이 향기로운 기억으로 남도록,\n일상의 결을 부드럽게 보듬어주는 섬세한 보살핌을 선물하세요.",
    image: "/images/gift/gift_appreciate.png",
    items: [
      "fragrance-03",
      "fragrance-01",
      "body-lotion-01",
      "hand-balm-01",
      "hand-duo-01",
    ],
  },
  {
    id: "promote",
    label: "승진 선물",
    desc: "새로운 성취와 도약의 순간에 정갈한 휴식의 시간을 더해,\n당신의 내일이 더욱 견고하게 빛나기를 진심으로 응원합니다.",
    image: "/images/gift/gift_promote.png",
    items: [
      "hand-balm-01",
      "hand-balm-02",
      "body-scrub-01",
      "hand-wash-03",
      "hand-wash-01",
    ],
  },
  {
    id: "love",
    label: "연인 선물",
    desc: "가장 가까운 곳에서 살결을 타고 흐르는 은은한 아로마처럼,\n소중한 사람의 모든 순간을 향긋한 애정으로 가득 채워줍니다.",
    image: "/images/gift/gift_love.png",
    items: [
      "room-candle-01",
      "room-diffuser-01",
      "fragrance-02",
      "fragrance-04",
      "body-wash-01",
    ],
  },
];

const GiftList = () => {
  const { category } = useParams();
  const { products, fetchProducts } = useStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const activeTab = category || "housewarming";
  const currentCategory =
    giftCategories.find((c) => c.id === activeTab) || giftCategories[0];
  const otherCategories = giftCategories.filter(
    (c) => c.id !== currentCategory.id,
  );

  // items 배열의 순서를 유지하면서 상품 정보를 가져옴
  const displayedProducts = currentCategory.items
    .map((itemId) => products.find((p) => p.id === itemId))
    .filter((p) => p !== undefined);

  return (
    <div className="gift-page">
      <header
        className="gift-hero-banner"
        style={{ backgroundImage: `url(${currentCategory.image})` }}
      >
        <div className="gift-hero-banner__overlay"></div>
        <div className="gift-hero-banner__inner">
          <h2 className="gift-hero-banner__title">{currentCategory.label}</h2>
          <p className="gift-hero-banner__desc">{currentCategory.desc}</p>
        </div>
      </header>

      <nav className="gift-tabs gift-inner">
        {giftCategories.map((cat) => (
          <Link
            key={cat.id}
            to={`/gift/${cat.id}`}
            className={`gift-tab ${activeTab === cat.id ? "is-active" : ""}`}
          >
            {cat.label}
          </Link>
        ))}
      </nav>

      <div className="gift-content gift-inner">
        <div className="gift-content__header">
          <h3>Considered gestures</h3>
          {/* <p>{currentCategory.label}을 위한 이솝의 추천 제품들입니다.</p> */}
        </div>

        {displayedProducts.length > 0 ? (
          <div className="gift-grid">
            {displayedProducts.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div
            className="gift-empty"
            style={{ textAlign: "center", padding: "100px 0", color: "#888" }}
          >
            상품을 불러오는 중입니다...
          </div>
        )}
      </div>

      {/* Other Occasions */}
      <section className="gift-others gift-inner">
        <h3 className="font-serif gift-others__title">Other Occasions</h3>
        <div className="gift-others__list">
          {otherCategories.slice(0, 2).map((cat, index) => (
            <div
              key={cat.id}
              className={`gift-others__item ${index % 2 === 1 ? "is-reverse" : ""}`}
            >
              <div
                className="gift-others__img"
                style={{ backgroundImage: `url(${cat.image})` }}
              ></div>
              <div className="gift-others__text">
                <h4>{cat.label}</h4>
                <p>{cat.desc}</p>
                <Link to={`/gift/${cat.id}`} className="gift-others__link">
                  바로가기 →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GiftList;
