import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

/**
 * HomeBrandStory 컴포넌트
 * 
 * 브랜드의 탄생부터 현재까지의 여정을 보여주는 브랜드 스토리 섹션입니다.
 * 각 섹션은 Genesis, Heritage, Presence라는 핵심 이정표를 나타냅니다.
 */
function HomeBrandStory() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const blocks = gsap.utils.toArray('.home__brand-story-block');

        blocks.forEach((block) => {
            const icon = block.querySelector('.home__brand-story-icon');
            const content = block.querySelector('.home__brand-story-content');
            const nav = block.querySelector('.home__brand-story-nav');

            gsap.from([icon, content, nav], {
                scrollTrigger: {
                    trigger: block,
                    start: 'top 80%',
                    end: 'top 20%',
                    toggleActions: 'play none none reverse',
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power2.out',
            });
        });
    }, { scope: containerRef });

    return (
        <section className="home__brand-story" ref={containerRef}>
            <div className="home__brand-story-inner">
                {/* 수직 배경 라인 */}
                <div className="home__brand-story-line"></div>

                {/* Part 1: Genesis */}
                <div className="home__brand-story-block">
                    <div className="home__brand-story-nav">
                        <span className="active">Genesis</span>
                        <span>Heritage</span>
                        <span>Presence</span>
                    </div>
                    <div className="home__brand-story-icon">
                        <svg width="184" height="292" viewBox="0 0 184 292" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M106 1
    C90 18 68 24 55 26
    C60 38 65 49 69 60
    C78 82 88 104 97 127
    C103 142 108 157 111 170
    C114 182 123 192 138 198
    C153 203 167 192 176 176
    C181 167 183 156 181 152
    C176 156 169 164 158 166
    C154 167 151 164 153 161
    C156 158 162 157 168 155
    C176 152 182 148 183 140
    C183 126 180 111 172 100
    C166 109 159 123 146 131
    C141 134 136 136 133 135
    C134 131 137 128 142 124
    C152 116 162 107 167 96
    C170 90 169 84 164 78
    C157 67 149 56 139 49
    C136 47 134 46 134 46
    C133 53 134 61 131 70
    C127 83 123 95 117 105
    C115 107 112 109 110 107
    C108 105 109 102 110 99
    C113 89 119 78 123 64
    C126 53 126 42 117 37
    C112 34 107 31 100 31
    C91 30 81 30 72 29
    C65 29 60 27 55 24
    C53 25 53 28 52 31
    C50 36 45 40 40 45
    C35 50 35 56 40 61
    C47 70 58 76 64 85
    C66 88 65 90 62 90
    C55 90 49 83 44 77
    C39 71 34 65 32 57
    C31 54 30 53 29 55
    C22 67 15 83 15 98
    C19 106 28 116 38 121
    C48 127 58 131 65 136
    C69 139 70 143 64 145
    C56 146 48 141 41 137
    C32 131 23 123 15 115
    C7 107 2 97 2 126
    C1 141 2 154 5 166
    C8 176 15 184 24 189
    C30 190 36 189 43 185
    C51 180 59 175 66 175
    C69 176 69 179 67 182
    C61 190 49 192 40 193
    C34 194 30 195 30 196
    C35 204 44 214 50 220
    C59 228 70 229 83 225
    C93 221 99 213 101 202
    C102 194 102 186 106 180
    C109 179 110 182 111 185
    C115 198 119 211 123 224
    C126 235 128 244 132 252
    C135 258 141 261 147 258
    C150 256 151 252 149 247
    C145 239 137 239 131 240
    C112 241 106 268 106 291"
                                stroke="#603B2D"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                fill="none"
                            />
                        </svg>
                    </div>
                    <div className="home__brand-story-content">
                        <h3 className="font-serif brand-story-year">1987</h3>
                        <h4 className="brand-story-title">호주의 미용사 데니스 파파티스 <strong>식물성 추출물</strong>에 주목</h4>
                        <p>Founded in Melbourne, Aesop evolved from a hair salon into a botanical skincare icon, driven by a desire to trade harsh chemicals for natural purity.</p>
                    </div>
                </div>

                {/* Part 2: Heritage */}
                <div className="home__brand-story-block">
                    <div className="home__brand-story-nav">
                        <span>Genesis</span>
                        <span className="active">Heritage</span>
                        <span>Presence</span>
                    </div>
                    <div className="home__brand-story-icon">
                        <svg
                            width="329"
                            height="169"
                            viewBox="0 0 329 169"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M204 129.32C198.74 131.227 198.501 131.779 193.348 133.937C182.111 138.643 170.968 143.58 159.732 148.288C148.226 153.109 139 157.445 139 157.445"
                                stroke="#603B2D"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                fill="none"
                            />
                            <path
                                d="M91.206 165.814C90.3879 165.127 88.7407 164.167 87.8633 163.572C74.1961 154.301 60.755 144.69 47.2544 135.168C34.1961 125.959 21.0657 116.857 8.00319 107.653C5.43609 105.845 2.74372 104.119 1 101.375C1.9275 99.9591 3.40269 99.7875 4.64582 99.2031C7.28951 97.9603 10.0552 96.9184 12.2168 94.8315"
                                stroke="#603B2D"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                fill="none"
                            />
                            <path
                                d="M99.2578 164.647C100.269 161.905 102.997 159.505 102.997 159.505C110.3 155.625 123.536 149.054 130.667 144.849C142.359 137.956 153.875 130.725 166.149 124.931C176.141 120.214 186.486 116.786 197.605 116.452C201.117 116.347 207.369 120.938 208.391 122.162C210.807 126.65 207.988 128.689 204.364 129.097"
                                stroke="#603B2D"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                fill="none"
                            />
                            <path
                                d="M206.965 115.739C206.518 115.281 204.698 114.276 204.312 114.084C199.931 111.896 195.209 111.259 190.462 111.189C182.726 111.074 175.204 112.744 167.943 115.31C155.232 119.803 143.473 126.418 131.785 133.136C124.17 137.513 116.634 142.033 109.01 146.393C104.343 149.061 104.009 148.94 99.4231 145.728C85.8928 136.251 72.3559 126.784 58.8146 117.324C45.5804 108.078 32.3375 98.8458 19.0984 89.6076L17.7598 88.9204C16.4473 87.411 14.4084 86.779 13.0824 84.8802C16.0833 83.8038 18.9457 82.9525 21.9951 83.671C24.1759 84.1848 24.405 84.9131 22.8787 86.3866L12.6797 94.4203"
                                stroke="#603B2D"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                fill="none"
                            />
                            <path
                                d="M89.5938 164.59C94.18 167.803 94.5131 167.924 99.1805 165.255"
                                stroke="#603B2D"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                fill="none"
                            />
                            <path
                                d="M139 45.824C149.375 53.0726 163.548 62.8324 174.449 69.1941C184.515 75.0684 194.542 81.012 204.621 86.8626C209.118 89.473 213.669 91.759 218.242 94.2273C219.583 94.9508 220.984 96.4673 221.79 98.1039C222.597 99.7404 223 103.832 223 103.832"
                                stroke="#603B2D"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                fill="none"
                            />
                            <path
                                d="M234.973 102.414C236.023 97.0407 242.47 90.6549 245.606 86.5285C253.259 76.4598 265.407 72.5684 277.014 68.2268C286.449 64.6976 296.275 62.8673 306.029 60.6862C309.465 59.9177 312.883 59.0539 316.29 58.155C316.611 58.0701 316.902 58.0109 317.178 57.9974M317.178 57.9974L317.176 57.8478C316.782 56.9189 315.972 56.3265 315.409 55.5435C313.925 53.4785 313.696 51.8192 314.548 49.9521C318.192 51.401 321.796 52.9304 325.292 55.2612C323.23 56.8051 319.571 56.9738 317.625 57.9688L317.564 58.011M317.178 57.9974C317.31 57.9909 317.438 57.9948 317.564 58.011M235.778 106.659C241.717 97.8816 253.526 87.8924 262.759 82.9035C272.726 77.5185 283.69 73.2255 294.652 71.2573C302.878 69.7805 313.189 67.5945 321.416 66.127C323.623 65.7334 326.072 65.6529 328.001 64.0487C327.625 63.1662 326.921 63.0781 326.357 62.724C323.907 61.1845 321.005 60.5026 318.777 58.602C318.441 58.3152 318.131 58.1459 317.82 58.0616C317.735 58.0387 317.65 58.022 317.564 58.011"
                                stroke="#603B2D"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                fill="none"
                            />
                            <path
                                d="M222.89 103.396C222.89 103.396 219.2 101.193 216.624 99.8947C207.767 95.4327 198.506 94.0141 188.711 95.0693C177.46 96.2816 167.127 100.355 157.046 105.227C144.511 111.285 132.703 118.761 120.463 125.401C118.658 126.38 117.377 126.371 115.728 125.159C111.638 122.15 107.416 119.331 103.259 116.418C92.9165 109.171 82.5864 101.905 72.2408 94.6626C61.5376 87.1699 50.8442 79.6619 40.1004 72.2307C35.938 69.3517 31.6718 66.6325 27.5781 63.2642C29.2682 61.8541 31.2152 61.7881 32.9711 61.2184C42.2032 58.223 51.1619 54.4621 60.1855 50.8913C74.4993 45.2271 88.9626 40.1436 104.377 38.8173C109.315 38.3923 114.271 38.8349 119.098 40.1551C123.782 41.4365 127.96 43.9249 132.262 46.1073C135.036 47.5144 135.073 47.4995 136.285 44.5006C140.685 33.613 147.968 25.3323 157.93 19.5436C166.464 14.5854 175.764 11.675 185.145 8.98982C194.495 6.31327 204.032 4.34688 213.26 1.20541C214.122 0.911945 214.915 0.887704 215.72 1.43035C218.557 3.34346 221.793 4.41206 224.883 5.74324C240.535 12.4871 256.296 18.9647 271.928 25.7572C281.723 30.0139 291.537 34.2182 301.382 38.3532C304.023 39.4625 306.872 40.1546 309.282 41.8706C308.708 42.7004 307.951 43.0969 307.192 43.332C302.37 44.8253 297.539 46.289 292.693 47.6987C281.926 50.8309 271.211 54.0995 261.005 58.9159C251.325 63.484 242.318 69.0045 235.589 77.7234C230.409 84.4356 226.622 91.863 225.051 100.379C224.827 101.592 224.943 102.589 225.533 103.593C226.009 103.741 226.296 103.813 226.843 103.822C230.026 103.369 232.152 101.764 234.971 102.58"
                                stroke="#603B2D"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                fill="none"
                            />
                            <path
                                d="M235.779 106.659C235.779 111.147 220.164 125.777 207.59 116.451"
                                stroke="#603B2D"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                fill="none"
                            />
                        </svg>
                    </div>
                    <div className="home__brand-story-content">
                        <h3 className="font-serif brand-story-year">Fables</h3>
                        <h4 className="brand-story-title">우화 작가 이솝(Aesop)의 이름에서 비롯된 <strong>깊은 철학</strong></h4>
                        <p>Named after the Greek fabulist Aesop, we embody the wisdom of a fable. Our philosophy seeks to deliver profound resonance through minimalist simplicity.</p>
                    </div>
                </div>

                {/* Part 3: Presence */}
                <div className="home__brand-story-block">
                    <div className="home__brand-story-nav">
                        <span>Genesis</span>
                        <span>Heritage</span>
                        <span className="active">Presence</span>
                    </div>
                    <div className="home__brand-story-icon">
                        <svg viewBox="0 0 100 120" className="brand-story-svg">
                            <path d="M50,20 L50,110" fill="none" stroke="#603b2d" strokeWidth="1" />
                            <path d="M30,55 L50,40 L70,55 L70,85 L30,85 Z" fill="none" stroke="#603b2d" strokeWidth="1" />
                            <path d="M25,60 L50,42 L75,60 L75,90 L25,90 Z" fill="none" stroke="#603b2d" strokeWidth="0.8" opacity="0.6" />
                        </svg>
                    </div>
                    <div className="home__brand-story-content">
                        <h3 className="font-serif brand-story-year">Aesop</h3>
                        <h4 className="brand-story-title">지역의 <strong>고유함</strong>을 존중하는 전 세계 <strong>단 하나뿐</strong>인 이솝의 공간들</h4>
                        <p>For 30 years, Aesop has curated unique spaces that honor local heritage. As a result, no two Aesop stores are alike anywhere in the world.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeBrandStory;
