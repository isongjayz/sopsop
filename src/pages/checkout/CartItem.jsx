import useStore from "../../store/useStore";

const CartItem = ({ item }) => {
  const { updateCartQuantity, removeFromCart, toggleGiftWrap } = useStore();

  return (
    <div className="cart-item">
      <button
        className="cart-item__remove"
        onClick={() => removeFromCart(item.cartId)}
      >
        ✕
      </button>
      <div className="cart-item__image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="cart-item__info">
        <div className="cart-item__name-price">
          <h3 className="cart-item__name">{item.name}</h3>
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
          <div className="cart-item__volume">{item.volume}</div>
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
