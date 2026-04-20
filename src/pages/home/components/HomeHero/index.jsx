import { useEffect, useId, useRef, useState } from 'react';
import { HOME_STAGE_BASE_HEIGHT, HOME_STAGE_BASE_WIDTH } from '../../homeStage';

const BOTTLE_PATH =
    'M153.5 5.50489L127 8.50489L39.5 0.504883L17 5.50489L30 24.0049H57L102 33.0049V39.0049L90 42.0049V60.0049L73.5 65.5049V129.505L80.5 131.505V162.005L73.5 174.005L27.5 212.505L9.5 238.505L3 262.505L0.5 572.505L9.5 601.005L22 625.505L77 641.005H143L199 635.505L230.5 620.505L247 565.505V534.505V284.005L243.5 254.005L229 226.005L173 174.005L163.5 157.005V131.505L176.5 129.505V65.5049L160 60.0049V42.0049L148.5 39.0049V24.0049H153.5L162 20.5049V11.5049L153.5 5.50489Z';
const BOTTLE_DRAW_PATH = BOTTLE_PATH.replace(/L153\.5 5\.50489Z$/, '');
const BOTTLE_DRAW_CAP_PATH = 'M162 11.5049L153.5 5.50489';
const BOTTLE_TRANSFORM = 'translate(847 160)';
const HERO_IMAGE_PATH = '/images/home/bottle_sequence_fix_outline/hero.png';
const OUTLINE_HIDE_DELAY_MS = 1800;
const INTRO_COMPLETE_DELAY_MS = 2400;
const HERO_VIEW_BOX = `0 0 ${HOME_STAGE_BASE_WIDTH} ${HOME_STAGE_BASE_HEIGHT}`;
let heroIntroStartedAt = null;

function getHeroIntroState() {
    if (heroIntroStartedAt === null) {
        return {
            isIntroComplete: false,
            isOutlineHidden: false,
            isReady: false,
        };
    }

    const elapsed = Math.max(Date.now() - heroIntroStartedAt, 0);

    return {
        isIntroComplete: elapsed >= INTRO_COMPLETE_DELAY_MS,
        isOutlineHidden: elapsed >= OUTLINE_HIDE_DELAY_MS,
        isReady: true,
    };
}

function HomeHero() {
    const drawMainRef = useRef(null);
    const drawCapRef = useRef(null);
    const glowMainRef = useRef(null);
    const glowCapRef = useRef(null);
    const clipId = useId().replace(/:/g, '-');
    const [introState, setIntroState] = useState(() => getHeroIntroState());
    const { isReady, isOutlineHidden, isIntroComplete } = introState;

    useEffect(() => {
        const outlinePaths = [
            drawMainRef.current,
            drawCapRef.current,
            glowMainRef.current,
            glowCapRef.current,
        ];
        const visibleOutlinePaths = outlinePaths.filter(Boolean);

        if (!isOutlineHidden && visibleOutlinePaths.length !== outlinePaths.length) {
            return undefined;
        }

        visibleOutlinePaths.forEach((path) => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = `${length}`;
            path.style.strokeDashoffset = `${length}`;
            path.style.setProperty('--path-length', `${length}`);
        });

        if (heroIntroStartedAt === null) {
            heroIntroStartedAt = Date.now();
        }

        const currentState = getHeroIntroState();
        setIntroState(currentState);

        if (currentState.isIntroComplete) {
            return undefined;
        }

        const frameId = requestAnimationFrame(() => {
            setIntroState((state) => ({
                ...state,
                isReady: true,
            }));
        });

        const outlineHideDelay = Math.max(
            OUTLINE_HIDE_DELAY_MS - (Date.now() - heroIntroStartedAt),
            0
        );
        const introCompleteDelay = Math.max(
            INTRO_COMPLETE_DELAY_MS - (Date.now() - heroIntroStartedAt),
            0
        );
        const hideOutlineTimerId = window.setTimeout(() => {
            setIntroState((state) => ({
                ...state,
                isOutlineHidden: true,
            }));
        }, outlineHideDelay);
        const completeIntroTimerId = window.setTimeout(() => {
            setIntroState({
                isIntroComplete: true,
                isOutlineHidden: true,
                isReady: true,
            });
        }, introCompleteDelay);

        return () => {
            cancelAnimationFrame(frameId);
            window.clearTimeout(hideOutlineTimerId);
            window.clearTimeout(completeIntroTimerId);
        };
    }, [isOutlineHidden]);

    return (
        <section
            className={`home__hero ${isReady && !isIntroComplete ? 'is-ready' : ''} ${
                isIntroComplete ? 'is-intro-complete' : ''
            } ${
                isOutlineHidden ? 'is-outline-hidden' : ''
            }`}
        >
            <div className="home__hero-background" aria-hidden="true">
                <img src={HERO_IMAGE_PATH} alt="" className="home__hero-background-image" />
            </div>

            <div className="home__hero-overlay" aria-hidden="true" />

            <div className="home__hero-frame">
                <div className="home__hero-title-container">
                    <span className="home__hero-text home__hero-text--left">
                        Aesop
                        <span className="home__hero-subtext">
                            From humble botanical beginnings,
                            <br />
                            Aesop has shaped a philosophy of thoughtful and purposeful care.
                        </span>
                    </span>
                    <span className="home__hero-text home__hero-text--right">Origin</span>
                </div>

                <svg
                    className="home__hero-svg"
                    viewBox={HERO_VIEW_BOX}
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
                        width={HOME_STAGE_BASE_WIDTH}
                        height={HOME_STAGE_BASE_HEIGHT}
                        clipPath={`url(#${clipId})`}
                        className="home__hero-bottle-image"
                    />

                    {!isOutlineHidden && (
                        <>
                            <path
                                ref={drawMainRef}
                                className="home__hero-outline home__hero-outline--base home__hero-outline--main"
                                d={BOTTLE_DRAW_PATH}
                                transform={BOTTLE_TRANSFORM}
                                shapeRendering="geometricPrecision"
                            />

                            <path
                                ref={drawCapRef}
                                className="home__hero-outline home__hero-outline--base home__hero-outline--cap"
                                d={BOTTLE_DRAW_CAP_PATH}
                                transform={BOTTLE_TRANSFORM}
                                shapeRendering="geometricPrecision"
                            />

                            <path
                                ref={glowMainRef}
                                className="home__hero-outline home__hero-outline--glow home__hero-outline--main"
                                d={BOTTLE_DRAW_PATH}
                                transform={BOTTLE_TRANSFORM}
                                shapeRendering="geometricPrecision"
                            />

                            <path
                                ref={glowCapRef}
                                className="home__hero-outline home__hero-outline--glow home__hero-outline--cap"
                                d={BOTTLE_DRAW_CAP_PATH}
                                transform={BOTTLE_TRANSFORM}
                                shapeRendering="geometricPrecision"
                            />
                        </>
                    )}
                </svg>
            </div>
        </section>
    );
}

export default HomeHero;
