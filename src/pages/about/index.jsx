import Section2 from '../../components/about/Section2';
import './style.scss';

const About = () => {
    return (
        <main className="about">
            {/* ===== 1. Hero Section ===== */}
            <section className="about__hero">
                <div className="about__hero-bg"></div>
                <span className="about__hero-watermark about__hero-watermark--top">Anatole France</span>
                <span className="about__hero-watermark about__hero-watermark--bottom">Anatole France</span>
                <div className="about__hero-inner">
                    <div className="about__hero-content">
                        <span className="about__hero-label">Presence</span>
                        <div className="about__hero-title-wrap">
                            <span className="about__hero-big-a">A</span>
                            <h1 className="about__hero-title">Radiant Presence</h1>
                        </div>
                        <p className="about__hero-desc">
                            <span>1987년 멜버른에서 시작된 이솝의 여정은 우수한 품질을 향해 있습니다.</span>
                            <span>식물성 재료와 과학적 성분을 조화시켜 삶의 공간을 밝히는 존재감을 선사합니다.</span>
                            <span>우리는 인위적 광채가 아닌 피부 본연의 건강함이 만드는 고유한 빛을 믿습니다.</span>
                            <span>시간의 흐름을 받아들이며 내면의 아름다움을 가꾸는 정중한 태도는,</span>
                            <span>단순한 개선을 넘어 삶을 대하는 지적이고 우아한 자세를 완성합니다.</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== 2. Section2 ===== */}
            <Section2 />

            {/* ===== 3. Gallery Section ===== */}
            <section className="about__gallery">
                <span className="about__gallery-watermark">Anatole France</span>
                <div className="about__gallery-track">
                    <div className="about__gallery-item about__gallery-item--small">
                        <img src="/images/about/about-gallery01.png" alt="Aesop store" />
                    </div>
                    <div className="about__gallery-item about__gallery-item--large">
                        <img src="/images/about/about-gallery02.png" alt="Aesop interior" />
                    </div>
                    <div className="about__gallery-item about__gallery-item--small">
                        <img src="/images/about/about-gallery03.png" alt="Aesop product" />
                    </div>
                    <div className="about__gallery-item about__gallery-item--large">
                        <img src="/images/about/about-gallery04.png" alt="Aesop texture" />
                    </div>
                    <div className="about__gallery-item about__gallery-item--small">
                        <img src="/images/about/about-gallery05.png" alt="Aesop detail" />
                    </div>
                    <div className="about__gallery-item about__gallery-item--large">
                        <img src="/images/about/about-gallery06.png" alt="Aesop nature" />
                    </div>
                </div>
            </section>

            {/* ===== 3. Journey Section ===== */}
            <section class="section-intro">
                <div class="section-intro__watermark" aria-hidden="true">William Morris</div>
                <div class="section-intro__inner">
                    <h2 class="section-intro__title">본질을 지키기 위한 여정</h2>
                    <div class="section-intro__rule"></div>
                    <p class="section-intro__sub">그 시간이 빚어낸 단 하나의 실루엣</p>
                </div>
            </section>

            {/* ===== 4. Timeline Section ===== */}
            <section className="about__timeline">
                <div className="about__timeline-inner">
                    <div className="about__timeline-item">
                        <div className="about__timeline-year">1987</div>
                        <div className="about__timeline-line"></div>
                        <div className="about__timeline-text">
                            <h3>The Beginning</h3>
                            <p>호주 멜버른에서 작은 헤어살롱으로 시작. 데니스 파피티스가 식물성 성분과 과학적 연구를 결합한 첫 제품을 선보이다.</p>
                        </div>
                    </div>
                    <div className="about__timeline-item">
                        <div className="about__timeline-year">2003</div>
                        <div className="about__timeline-line"></div>
                        <div className="about__timeline-text">
                            <h3>Global Expansion</h3>
                            <p>아시아와 유럽으로 본격 확장. 각 도시의 문화와 역사에 영감을 받은 시그니처 스토어를 설계하기 시작하다.</p>
                        </div>
                    </div>
                    <div className="about__timeline-item">
                        <div className="about__timeline-year">2020</div>
                        <div className="about__timeline-line"></div>
                        <div className="about__timeline-text">
                            <h3>Sustainable Future</h3>
                            <p>지속 가능성을 핵심 가치로 삼고, 포장재 혁신과 탄소 절감 목표를 발표. 디지털 경험을 통해 새로운 연결을 만들다.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== 5. Now Section ===== */}
            <section class="now">
                <div class="now__watermark" aria-hidden="true">William Morris</div>
                <div class="now__inner">
                    <h2 class="now__heading">Now</h2>
                    <div class="now__rule"></div>
                    <h3 class="now__title">패키지에 담긴 우리의 진심</h3>
                    <p class="now__sub">최소한의 포장과 지속 가능한 실천으로 지구와 공존하는 매일의 여정을 이어나갑니다</p>
                </div>
            </section>

            {/* ===== 6. Sensory Section ===== */}
            <section className="about__sensory">
                <div className="about__sensory-inner">
                    <div className="about__sensory-images">
                        <div className="about__sensory-img about__sensory-img--left">
                            <img src="/images/home/botanicals/chamomile.jpg" alt="botanical ingredient" />
                        </div>
                        <div className="about__sensory-img about__sensory-img--right">
                            <img src="/images/product/detail/fragrance/scent.jpg" alt="sensory texture" />
                        </div>
                    </div>
                    <h2 className="about__sensory-title">Sensory</h2>
                    <p className="about__sensory-desc">
                        향, 질감, 그리고 공간.
                        <br />이솝은 감각의 조화를 통해 일상을 예술로 만듭니다.
                    </p>
                </div>
            </section>

            {/* ===== 7. Quote Section ===== */}
            <section className="about__quote">
                <div className="about__quote-inner">
                    <blockquote className="about__quote-text">
                        "The science of today is the technology of tomorrow."
                    </blockquote>
                    <cite className="about__quote-author">Ada Lovelace</cite>
                </div>
            </section>

        </main>
    );
};

export default About;