import './Aegung_MainVisual.scss';

const Aegung_MainVisual = () => {
    return (
        <section className="aegung__main-visual">
            <div className="aegung__inner">
                {/* 왼쪽 하단 배경 문양 */}
                <div className="aegung__main-visual__bg aegung__main-visual__bg--left">
                    <img
                        src="/images/aegung/01-MainVisual/Background01.png"
                        alt="한국 전통 문양 배경"
                    />
                </div>

                {/* 오른쪽 상단 배경 문양 */}
                <div className="aegung__main-visual__bg aegung__main-visual__bg--right">
                    <img
                        src="/images/aegung/01-MainVisual/Background02.png"
                        alt="한국 전통 문양 배경"
                    />
                </div>

                {/* 왼쪽 텍스트 영역 */}
                <div className="aegung__main-visual__text">
                    <h2 className="aegung__main-visual__title">
                        궁의 결을 담은
                    </h2>
                    <p className="aegung__main-visual__subtitle">
                        The serene texture of Korean curves and poetic space.
                        <br />
                        Elegant tradition meets modern skincare.
                    </p>
                </div>

                {/* 중앙 제품 이미지 영역 */}
                <div className="aegung__main-visual__products">
                    <div className="aegung__main-visual__product aegung__main-visual__product--1">
                        <img
                            src="/images/aegung/01-MainVisual/MainVisual-1.png"
                            alt="Resurrection Aromatique Hand Balm"
                        />
                    </div>
                    <div className="aegung__main-visual__product aegung__main-visual__product--2">
                        <img
                            src="/images/aegung/01-MainVisual/MainVisual-2.png"
                            alt="Parsley Seed Oil"
                        />
                    </div>
                    <div className="aegung__main-visual__product aegung__main-visual__product--3">
                        <img
                            src="/images/aegung/01-MainVisual/MainVisual-3.png"
                            alt="Lucent Facial Night Masque"
                        />
                    </div>
                </div>

                {/* 오른쪽 브랜드 로고 */}
                <div className="aegung__main-visual__brand">
                    <span className="aegung__main-visual__brand-name">Ae-gung</span>
                </div>
            </div>
        </section>
    );
};

export default Aegung_MainVisual;