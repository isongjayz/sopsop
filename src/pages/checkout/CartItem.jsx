import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import useStore from "../../store/useStore";

const CartItem = ({ item }) => {
  const { updateCartQuantity, removeFromCart, toggleGiftWrap, updateCartVolume, products } = useStore();

  const product = products.find((p) => p.id === item.productId);
  const volumeOptions = product?.volumes || [];

  return (
    <div className="cart-item">
      <button
        className="cart-item__remove"
        onClick={() => removeFromCart(item.cartId)}
      >
        ✕
      </button>
      <Link to={`/product/${item.productId}`} className="cart-item__image">
        <img src={item.image} alt={item.name} />
      </Link>
      <div className="cart-item__info">
        <div className="cart-item__name-price">
          <Link to={`/product/${item.productId}`} className="cart-item__name">{item.name}</Link>
          <p className="cart-item__price">{item.price.toLocaleString()}원</p>
        </div>
        <div
          className="cart-item__gift-wrap"
          onClick={() => toggleGiftWrap(item.cartId)}
        >
          <span
            className={`cart-item__gift-wrap ${item.giftWrap ? "is-active" : ""}`}
          >
            개별 포장
            <span className="circle-check"></span>
          </span>
        </div>
        <div className="cart-item__bottom">
          <div className="cart-item__volume">
        {volumeOptions.length > 1 ? (
          <div className="cart-item__vol-wrap">
            <select
              className="cart-item__vol-select"
              value={item.volume}
              onChange={(e) => {
                const selected = volumeOptions.find((v) => v.volume === e.target.value);
                if (selected) updateCartVolume(item.cartId, selected.volume, selected.price);
              }}
            >
              {volumeOptions.map((vol) => (
                <option key={vol.volume} value={vol.volume}>{vol.volume}</option>
              ))}
            </select>
            <IoIosArrowDown className="cart-item__vol-arrow" />
          </div>
        ) : (
          <div className="cart-item__vol-wrap">
            <span className="cart-item__vol-text">{item.volume}</span>
          </div>
        )}
      </div>
          <div className="cart-item__qty">
            <button
              onClick={() => updateCartQuantity(item.cartId, item.quantity - 1)}
            >
              −
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => updateCartQuantity(item.cartId, item.quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
