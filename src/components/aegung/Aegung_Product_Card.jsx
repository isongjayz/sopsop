import { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import useStore from '../../store/useStore';
import CartModal from '../product/CartModal';
import './Aegung_Product_Card.scss';

gsap.registerPlugin(ScrollTrigger);

const Aegung_Product_Card = ({ id, titleKo, titleEnSub, titleEnMain, image, imageAlt, desc, notes, price, reversed }) => {
    const addToCart = useStore((state) => state.addToCart);
    const [showModal, setShowModal] = useState(false);
    const cardRef = useRef(null);

    const handleAddToCart = () => {
        addToCart({
            productId: id,
            name: titleKo,
            subName: titleEnMain,
            image,
            price: Number(String(price).replace(/,/g, '')),
            volume: 'SET',
            quantity: 1,
        });
        setShowModal(true);
    };

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: cardRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
            defaults: { ease: 'power2.out', duration: 1.4 },
        });

        // 1. 타이틀 헤더: 먼저 등장
        tl.from('.aegung__product-card__header', {
            y: 30,
            opacity: 0,
        })
        // 2. 이미지: 0.5초 차이로 등장
        .from('.aegung__product-card__image', {
            y: 30,
            opacity: 0,
        }, 1)
        // 3. 우측 정보 영역: 이미지와 동시에 등장
        .from('.aegung__product-card__rightDesc__wrap', {
            y: 30,
            opacity: 0,
        }, '<');

    }, { scope: cardRef });

    return (
        <div
            ref={cardRef}
            className={`aegung__product-card ${reversed ? 'aegung__product-card--reversed' : ''}`}
        >
            {/* 타이틀 헤더 */}
            <div className="aegung__product-card__header__wrap">
                <div className="aegung__product-card__header">
                    <h2 className="aegung__title-ko">{titleKo}</h2>
                    {/* 오른쪽 정보 영역 */}
                    <div className="aegung__title-en-group">
                        <span className="aegung__title-en-sub">[{titleEnSub}]</span>
                        <span className="aegung__title-en-main">{titleEnMain}</span>
                    </div>
                </div>

                <div className="aegung__product-card__info">
                    {/* 이미지 영역 */}
                    <div className="aegung__product-card__image">
                        <img src={image} alt={imageAlt} />
                    </div>
                    {/* 본문 내용 */}
                    <div className="aegung__product-card__rightDesc__wrap">
                        <p className="aegung__product-card__desc">
                            {desc}
                        </p>

                        {/* 향 정보 리스트 */}
                        <div className="aegung__product-card__notes">
                            {notes.map((note, index) => (
                                <div className="aegung__note-item" key={index}>
                                    <strong className="aegung__note-name">{note.name}</strong>
                                    <p className="aegung__note-desc">{note.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div className="aegung__product-card__price">{price} 원</div>
                    </div>
                </div>
            </div>
            {/* 장바구니 버튼 */}
            <button className="aegung__product-card__btn" onClick={handleAddToCart}>
                장바구니 담기
            </button>
            {showModal && <CartModal onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default Aegung_Product_Card;
