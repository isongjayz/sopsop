import { useNavigate } from 'react-router-dom';
import './CartModal.scss';

const CartModal = ({ onClose }) => {
  const navigate = useNavigate();

  const handleCartGo = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <p className="cart-modal__text">제품이 장바구니에 추가되었습니다.</p>
        <div className="cart-modal__buttons">
          <button className="cart-modal__btn cart-modal__btn--outline" onClick={onClose}>
            계속 쇼핑하기
          </button>
          <button className="cart-modal__btn cart-modal__btn--fill" onClick={handleCartGo}>
            장바구니 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
