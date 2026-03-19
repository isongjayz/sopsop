import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../../store/useStore";
import CartModal from "../CartModal";
import "./ProductItem.scss";

const ProductItem = ({ product, hideActions = false }) => {
  const { user, isLoggedIn, addToCart, toggleWishlist, isProductWishlisted } =
    useStore();
  const navigate = useNavigate();
  const isWishlisted = user ? isProductWishlisted(user.id, product.id) : false;

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [showCartModal, setShowCartModal] = useState(false);

  // 수정: 세트 상품은 용량 버튼 대신 SET 라벨을 노출하고,
  // 단일 사이즈 상품은 옵션이 1개여도 버튼이 보이도록 분리 처리
  const volumeOptions = Array.isArray(product.volumes) ? product.volumes : [];
  const isSetProduct = Boolean(product.isSet);
  const hasVolumeOptions = !isSetProduct && volumeOptions.length > 0;
  const currentVolume = hasVolumeOptions ? volumeOptions[selectedIdx] : null;
  const currentPrice = isSetProduct
    ? product.price
    : (currentVolume?.price ?? product.price);

  const handleAddToCart = () => {
    const selectedVolume = isSetProduct
      ? "SET"
      : currentVolume?.volume || "default";
    const cartItem = {
      cartId: `${product.id}-${selectedVolume}`,
      productId: product.id,
      name: product.name,
      image: product.image,
      volume: selectedVolume,
      price: currentPrice,
      quantity: 1,
      giftWrap: false,
    };
    addToCart(cartItem);
    setShowCartModal(true);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
    toggleWishlist(user.id, product);
  };

  return (
    <>
    {showCartModal && <CartModal onClose={() => setShowCartModal(false)} />}
    <div className="product-card" style={{ position: "relative" }}>
      <Link to={`/product/${product.id}`} className="product-card__link">
        <div className="product-card__thumb">
          <img
            src={currentVolume?.image || product.image}
            alt={product.name}
            className={
              product.hoverImage
                ? "product-card__img-main has-hover-main"
                : "product-card__img-main no-hover-main"
            }
          />
          {product.hoverImage && (
            <img
              src={product.hoverImage}
              alt={`${product.name} hover`}
              className="product-card__img-hover"
            />
          )}
          {(product.isNew || product.isBest) && (
            <div className="product-card__badges">
              {product.isNew && <span className="tag tag--new">NEW</span>}
              {product.isBest && <span className="tag tag--best">BEST</span>}
            </div>
          )}
        </div>
      </Link>

      <button
        className={`product-card__wish ${isWishlisted ? "is-active" : ""}`}
        onClick={handleWishlist}
        aria-label="위시리스트"
      >
        {isWishlisted ? "♥" : "♡"}
      </button>

      <div className="product-card__info">
        {product.description && (
          <p className="product-card__description">{product.description}</p>
        )}
        <h3 className="product-card__title">{product.name}</h3>
      </div>

      {!hideActions && (
        <div className="product-card__action">
          {isSetProduct ? (
            <div className="product-card__options">
              <span className="product-card__option-label is-set">SET</span>
            </div>
          ) : hasVolumeOptions ? (
            <div className="product-card__options">
              {volumeOptions.slice(0, 2).map((vol, idx) => (
                <button
                  key={`${product.id}-${vol.volume}`}
                  className={`product-card__option-btn ${idx === selectedIdx ? "is-active" : ""}`}
                  onClick={() => setSelectedIdx(idx)}
                  type="button"
                >
                  {vol.volume}
                </button>
              ))}
            </div>
          ) : null}

          <button
            className="product-card__add-btn"
            onClick={handleAddToCart}
            type="button"
          >
            {currentPrice.toLocaleString()}원 담기
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default ProductItem;
