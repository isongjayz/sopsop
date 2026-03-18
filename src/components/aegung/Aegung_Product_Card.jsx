import './Aegung_Product_Card.scss';

const Aegung_Product_Card = () => {
    return (
        <div className="aegung__product-card">
            {/* 타이틀 헤더 */}
            <div className="aegung__product-card__header">
                <h2 className="aegung__title-ko">경복궁</h2>
                {/* 오른쪽 정보 영역 */}
                <div className="aegung__title-en-group">
                    <span className="aegung__title-en-sub">[Gyeongbokgung Palace]</span>
                    <span className="aegung__title-en-main">HandWash, HandCream</span>
                </div>
            </div>

            <div className="aegung__product-card__info">
                {/* 왼쪽 이미지 영역 */}
                <div className="aegung__product-card__image">
                    <img src="/images/aegung/03-Product/Product01-경복궁.png" alt="경복궁 HandWash, HandCream" />
                </div>
                {/* 본문 내용 */}
                <div className="aegung__product-card__rightDesc__wrap">
                    <p className="aegung__product-card__desc">
                        한국의 고궁, 경복궁의 정온한 공기와 고즈넉한 나무의 결을 향으로 재해석한 특별한 세트입니다. 시간이 멈춘 듯한 고궁의 단청 아래서 느껴지는 묵직한 우디 향과 대지의 기운을 담은 베티버가 조화를 이루어, 일상 속 손을 씻고 보듬는 행위를 하나의 명상적인 의식으로 바꿔줍니다.
                    </p>


                    {/* 향 정보 리스트 */}
                    <div className="aegung__product-card__notes">
                        <div className="aegung__note-item">
                            <strong className="aegung__note-name">시더우드</strong>
                            <p className="aegung__note-desc">수백 년의 비바람을 견뎌온 고궁의 기둥과 서까래에서 배어 나오는 묵직하고 단단한 고목의 향.</p>
                        </div>
                        <div className="aegung__note-item">
                            <strong className="aegung__note-name">베티버</strong>
                            <p className="aegung__note-desc">새벽 안개가 내려앉은 경복궁의 뜰, 그 축축한 흙내음과 뿌리의 생명력을 담은 쌉싸름한 베이스</p>
                        </div>
                        <div className="aegung__note-item">
                            <strong className="aegung__note-name">세이지</strong>
                            <p className="aegung__note-desc">단청 사이로 불어오는 맑은 바람처럼 감각을 정화하고 깨워주는 허브의 섬세한 터치.</p>
                        </div>
                    </div>
                </div>
                {/* 장바구니 버튼 */}

            </div>
            <button className="aegung__product-card__btn">
                장바구니 담기
            </button>
        </div>
    );
};

export default Aegung_Product_Card;