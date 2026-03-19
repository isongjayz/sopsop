import './Aegung_Product_Card.scss';

const Aegung_Product_Card = ({ titleKo, titleEnSub, titleEnMain, image, imageAlt, desc, notes, reversed }) => {
    return (
        <div className={`aegung__product-card ${reversed ? 'aegung__product-card--reversed' : ''}`}>
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
                    </div>
                </div>
            </div>
            {/* 장바구니 버튼 */}
            <button className="aegung__product-card__btn">
                장바구니 담기
            </button>
        </div>
    );
};

export default Aegung_Product_Card;