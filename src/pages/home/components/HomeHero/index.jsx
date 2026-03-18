import { useEffect, useId, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * HomeHero 컴포넌트
 * 
 * SVG 패스와 CSS/JS 협업을 통해 보틀 드로잉 애니메이션을 구현합니다.
 * 기존 풀스크린 히어로를 대체하여 브랜드 아이덴티티를 강조하는 비주얼을 제공합니다.
 */

const BOTTLE_PATH =
    'M153.5 5.50489L127 8.50489L39.5 0.504883L17 5.50489L30 24.0049H57L102 33.0049V39.0049L90 42.0049V60.0049L73.5 65.5049V129.505L80.5 131.505V162.005L73.5 174.005L27.5 212.505L9.5 238.505L3 262.505L0.5 572.505L9.5 601.005L22 625.505L77 641.005H143L199 635.505L230.5 620.505L247 565.505V534.505V284.005L243.5 254.005L229 226.005L173 174.005L163.5 157.005V131.505L176.5 129.505V65.5049L160 60.0049V42.0049L148.5 39.0049V24.0049H153.5L162 20.5049V11.5049L153.5 5.50489Z';

const BOTTLE_TRANSFORM = 'translate(847 160)';
const HERO_IMAGE_PATH = '/images/home/bottle_sequence_fix_outline/hero.png';

function HomeHero() {
    const drawRef = useRef(null);
    const glowRef = useRef(null);
    const clipId = useId().replace(/:/g, '-');
    const [isReady, setIsReady] = useState(false);
    const [isOutlineHidden, setIsOutlineHidden] = useState(false);

    useEffect(() => {
        const drawPath = drawRef.current;
        const glowPath = glowRef.current;

        if (!drawPath || !glowPath) return undefined;

        const length = drawPath.getTotalLength();

        [drawPath, glowPath].forEach((path) => {
            path.style.strokeDasharray = `${length}`;
            path.style.strokeDashoffset = `${length}`;
            path.style.setProperty('--path-length', `${length}`);
        });

        const frame = requestAnimationFrame(() => {
            setIsReady(true);
        });

        const hideOutlineTimer = window.setTimeout(() => {
            setIsOutlineHidden(true);
        }, 3050);

        return () => {
            cancelAnimationFrame(frame);
            window.clearTimeout(hideOutlineTimer);
        };
    }, []);

    return (
        <section className={`home__hero ${isReady ? 'is-ready' : ''} ${isOutlineHidden ? 'is-outline-hidden' : ''}`}>
            <div className="home__hero-background" aria-hidden="true">
                <img src={HERO_IMAGE_PATH} alt="" className="home__hero-background-image" />
            </div>

            <div className="home__hero-overlay" aria-hidden="true" />

            <div className="home__hero-copy home__hero-copy--left">
                <p className="home__hero-eyebrow font-serif">Aesop</p>
                <h2 className="home__hero-heading font-serif">
                    Tacit trails of citrus,
                    <br />
                    woods, and warm stillness.
                </h2>
            </div>


            <div className="home__hero-copy home__hero-copy--right">
                <p className="home__hero-eyebrow font-serif">Eau de Parfum</p>
                <h2 className="home__hero-heading font-serif">
                    A bottle revealed,
                    <br />
                    then language unfolds.
                </h2>
            </div>


            <svg
                className="home__hero-svg"
                viewBox="0 0 1920 1024"
                preserveAspectRatio="xMidYMid slice"
                fill="none"
                aria-hidden="true"
            >

                <defs>
                    <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
                        <path d={BOTTLE_PATH} transform={BOTTLE_TRANSFORM} />
                    </clipPath>
                </defs>

                <image
                    href={HERO_IMAGE_PATH}
                    x="0"
                    y="0"
                    width="1920"
                    height="1024"
                    clipPath={`url(#${clipId})`}
                    preserveAspectRatio="xMidYMid slice"
                    className="home__hero-bottle-image"
                />

                {!isOutlineHidden && (
                    <>
                        <path
                            ref={drawRef}
                            className="home__hero-outline home__hero-outline--base"
                            d={BOTTLE_PATH}
                            transform={BOTTLE_TRANSFORM}
                            shapeRendering="geometricPrecision"
                        />

                        <path
                            ref={glowRef}
                            className="home__hero-outline home__hero-outline--glow"
                            d={BOTTLE_PATH}
                            transform={BOTTLE_TRANSFORM}
                            shapeRendering="geometricPrecision"
                        />
                    </>
                )}
            </svg>
        </section>
    );
}

export default HomeHero;
