import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    BASE_HEIGHT,
    BOTTLE_CLIP_PATH,
    BOTTLE_OUTLINE_PATH,
    ENTRY_START_VIEWPORT_RATIO,
    FLOW_LINES,
    HORIZONTAL_SCROLL_END,
    HORIZONTAL_SCROLL_START,
    HORIZONTAL_WIDTH,
    INGREDIENTS,
    MERGE_PATH_D,
    PRODUCT,
    PRODUCT_CLIP_ID,
    PRODUCT_IMAGE_PATH,
    QUOTE_BASELINE_SHIFT_Y,
    QUOTE_END_RATIO,
    QUOTE_FLOW_PATH_D,
    QUOTE_PROGRESS_OFFSET,
    QUOTE_SOURCE_TEXT,
    QUOTE_START_RATIO,
    SECTION_EXIT_BUFFER_RATIO,
    START_PATH_D,
} from './homeBotanicalsData';
import {
    BOTANICALS_DRAW_SEQUENCE,
    BOTANICALS_ENTRY_PROGRESS_PORTION,
    STORY_PROGRESS_BLEND,
} from './homeStoryMotion';

gsap.registerPlugin(ScrollTrigger);

function createSvgPath(d) {
    if (typeof document === 'undefined') {
        return null;
    }

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);

    return path;
}

function getPathLength(d, transform) {
    const path = createSvgPath(d);

    if (path && transform) {
        path.setAttribute('transform', transform);
    }

    return path ? path.getTotalLength() : 0;
}

const PATH_LENGTHS = {
    start: getPathLength(START_PATH_D),
    branches: FLOW_LINES.map((line) => getPathLength(line.d)),
    merge: getPathLength(MERGE_PATH_D),
    outline: getPathLength(BOTTLE_OUTLINE_PATH),
};

const BOTANICALS_PRE_HORIZONTAL_HOLD_RATIO = 0.22;
const BOTANICALS_BOTTOM_BUFFER_RATIO = 0.4;
const BOTANICALS_HORIZONTAL_LEAD_IN = 0;
const BOTANICALS_HORIZONTAL_OVERSCAN = 0;
const BOTANICALS_PHASE_ONE_END = 0.24;
const BOTANICALS_PHASE_TWO_END = 0.82;
const BOTANICALS_PHASE_ONE_VERTICAL_TARGET_RATIO = 0.62;
const BOTANICALS_VIEWPORT_WIDTH = 1920;
const BOTANICALS_VIEWPORT_HEIGHT = 1024;

let quotePathMetrics;

function getQuotePathMetrics() {
    if (quotePathMetrics) {
        return quotePathMetrics;
    }

    const path = createSvgPath(QUOTE_FLOW_PATH_D);

    if (!path) {
        return null;
    }

    quotePathMetrics = {
        path,
        totalLength: path.getTotalLength(),
    };

    return quotePathMetrics;
}

function clamp01(value) {
    return Math.max(0, Math.min(1, value));
}

function getViewportSize() {
    return {
        height: window.innerHeight || 1,
        width: window.innerWidth || 1,
    };
}

function getWindowProgress(progress, start, end) {
    return clamp01((progress - start) / Math.max(end - start, 0.0001));
}

function getSoftProgress(value) {
    return value * (1 - STORY_PROGRESS_BLEND) + easeOutCubic(value) * STORY_PROGRESS_BLEND;
}

function getSegmentDrawStyle(progress, window, length) {
    const localProgress = getWindowProgress(progress, window[0], window[1]);
    const easedProgress = getSoftProgress(localProgress);

    return {
        strokeDasharray: length,
        strokeDashoffset: length * (1 - easedProgress),
    };
}

function getReverseSegmentDrawStyle(progress, window, length) {
    const localProgress = getWindowProgress(progress, window[0], window[1]);
    const easedProgress = getSoftProgress(localProgress);

    return {
        strokeDasharray: length,
        strokeDashoffset: -length * (1 - easedProgress),
    };
}

function easeOutCubic(value) {
    return 1 - (1 - value) ** 3;
}

function lerp(start, end, progress) {
    return start + (end - start) * progress;
}

function getCameraMetrics(scale, viewportWidth, viewportHeight) {
    const visibleWorldWidth = viewportWidth / Math.max(scale, 0.001);
    const visibleWorldHeight = viewportHeight / Math.max(scale, 0.001);
    const leadInWorld = BOTANICALS_HORIZONTAL_LEAD_IN / Math.max(scale, 0.001);
    const maxCameraX = Math.max(
        HORIZONTAL_WIDTH -
            visibleWorldWidth +
            leadInWorld +
            BOTANICALS_HORIZONTAL_OVERSCAN / Math.max(scale, 0.001),
        0
    );
    const maxCameraY = Math.max(BASE_HEIGHT - visibleWorldHeight, 0);

    return {
        maxCameraX,
        maxCameraY,
        cameraXStart: 0,
    };
}

function getQuoteStartOffset(progress) {
    const metrics = getQuotePathMetrics();

    if (!metrics) {
        return '0px';
    }

    const { totalLength } = metrics;
    const startLength = Math.max(totalLength * QUOTE_START_RATIO, totalLength * 0.16);
    const endLength = totalLength * QUOTE_END_RATIO;
    const travelLength = Math.max(endLength - startLength, 1);
    const motionProgress = getSoftProgress(clamp01(progress + QUOTE_PROGRESS_OFFSET)) ** 1.35;
    const entryOffset = travelLength * 0.12;
    const currentOffset = startLength - entryOffset + (travelLength + entryOffset) * motionProgress;

    return `${currentOffset}px`;
}

function getIngredientStyles(progress) {
    return INGREDIENTS.map((ingredient, index) => {
        const localProgress = getSoftProgress(
            getWindowProgress(
                progress,
                BOTANICALS_DRAW_SEQUENCE.ingredients[index][0],
                BOTANICALS_DRAW_SEQUENCE.ingredients[index][1]
            )
        );
        const labelX = ingredient.anchorX + ingredient.labelOffsetX;
        const labelY = ingredient.anchorY + ingredient.labelOffsetY;
        const thumbX = ingredient.anchorX + ingredient.thumbOffsetX;
        const thumbY = ingredient.anchorY + ingredient.thumbOffsetY;

        return {
            ...ingredient,
            labelX,
            labelY,
            thumbX,
            thumbY,
            opacity: localProgress,
            translateY: (1 - localProgress) * 32,
            scale: 0.86 + localProgress * 0.14,
        };
    });
}

function HomeBotanicals() {
    const [stageScale, setStageScale] = useState(1);
    const [viewportSize, setViewportSize] = useState(() => ({
        width: typeof window !== 'undefined' ? window.innerWidth : 1920,
        height: BASE_HEIGHT,
    }));
    const [sectionHeight, setSectionHeight] = useState(BASE_HEIGHT);
    const [animationScrollDistance, setAnimationScrollDistance] = useState(BASE_HEIGHT);
    const [sectionProgress, setSectionProgress] = useState(0);
    const [quoteProgress, setQuoteProgress] = useState(0);
    const sectionRef = useRef(null);
    const viewportRef = useRef(null);

    useEffect(() => {
        const updateStageScale = () => {
            const { height: viewportHeight, width: viewportWidth } = getViewportSize();

            setViewportSize({ width: viewportWidth, height: viewportHeight });
            setStageScale(1);
        };

        updateStageScale();
        window.addEventListener('resize', updateStageScale);

        return () => {
            window.removeEventListener('resize', updateStageScale);
        };
    }, []);

    useEffect(() => {
        const updateSectionMetrics = () => {
            const { height: viewportHeight, width: viewportWidth } = getViewportSize();
            const { maxCameraX, cameraXStart } = getCameraMetrics(
                stageScale,
                viewportWidth,
                viewportHeight
            );
            const horizontalWindow = Math.max(HORIZONTAL_SCROLL_END - HORIZONTAL_SCROLL_START, 0.01);
            const totalScrollDistance =
                (Math.max(maxCameraX - cameraXStart, 0) * stageScale) / horizontalWindow;
            const exitBuffer = viewportHeight * SECTION_EXIT_BUFFER_RATIO;
            const preHorizontalHoldDistance =
                viewportHeight * BOTANICALS_PRE_HORIZONTAL_HOLD_RATIO;
            const bottomBuffer = viewportHeight * BOTANICALS_BOTTOM_BUFFER_RATIO;

            setAnimationScrollDistance(totalScrollDistance);
            setSectionHeight(
                viewportHeight +
                    preHorizontalHoldDistance +
                    totalScrollDistance +
                    exitBuffer +
                    bottomBuffer
            );
        };

        updateSectionMetrics();
        window.addEventListener('resize', updateSectionMetrics);

        return () => {
            window.removeEventListener('resize', updateSectionMetrics);
        };
    }, [stageScale]);

    useEffect(() => {
        let frameId = null;

        const updateProgress = () => {
            frameId = null;
            const section = sectionRef.current;

            if (!section) {
                return;
            }

            const rect = section.getBoundingClientRect();
            const { height: viewportHeight, width: viewportWidth } = getViewportSize();
            const totalScrollDistance = Math.max(animationScrollDistance, 1);
            const preHorizontalHoldDistance =
                viewportHeight * BOTANICALS_PRE_HORIZONTAL_HOLD_RATIO;
            const entryStart = viewportHeight * ENTRY_START_VIEWPORT_RATIO;
            const entryProgress = clamp01((entryStart - rect.top) / Math.max(entryStart, 1));
            const rawScrollDistance = Math.max(-rect.top, 0);
            const mainProgress = clamp01(
                Math.max(rawScrollDistance - preHorizontalHoldDistance, 0) / totalScrollDistance
            );
            const sectionProgress =
                entryProgress * BOTANICALS_ENTRY_PROGRESS_PORTION +
                mainProgress * (1 - BOTANICALS_ENTRY_PROGRESS_PORTION);

            setSectionProgress(sectionProgress);
            setQuoteProgress(mainProgress);
        };

        const requestProgressUpdate = () => {
            if (frameId !== null) {
                return;
            }

            frameId = window.requestAnimationFrame(updateProgress);
        };

        requestProgressUpdate();
        window.addEventListener('scroll', requestProgressUpdate, { passive: true });
        window.addEventListener('resize', requestProgressUpdate);

        return () => {
            if (frameId !== null) {
                window.cancelAnimationFrame(frameId);
            }

            window.removeEventListener('scroll', requestProgressUpdate);
            window.removeEventListener('resize', requestProgressUpdate);
        };
    }, [stageScale, animationScrollDistance]);

    useEffect(() => {
        if (!sectionRef.current || !viewportRef.current) {
            return undefined;
        }

        const trigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${Math.max(sectionHeight - (window.innerHeight || 1), 1)}`,
            pin: viewportRef.current,
            // `sectionHeight` already includes the extra scroll runway for the pinned viewport.
            pinSpacing: false,
            invalidateOnRefresh: true,
        });

        ScrollTrigger.refresh();

        return () => {
            trigger.kill();
        };
    }, [sectionHeight]);

    const quoteStartOffset = getQuoteStartOffset(quoteProgress);
    const screenAlignedStrokeWidth = 2 / Math.max(stageScale, 0.001);
    const {
        maxCameraX,
        maxCameraY,
        cameraXStart,
    } = getCameraMetrics(stageScale, viewportSize.width, viewportSize.height);
    const phaseOneProgress = getSoftProgress(
        getWindowProgress(quoteProgress, 0, BOTANICALS_PHASE_ONE_END)
    );
    const phaseTwoProgress = getSoftProgress(
        getWindowProgress(quoteProgress, BOTANICALS_PHASE_ONE_END, BOTANICALS_PHASE_TWO_END)
    );
    const phaseThreeProgress = getSoftProgress(
        getWindowProgress(quoteProgress, BOTANICALS_PHASE_TWO_END, 1)
    );
    const phaseOneTargetCameraY = maxCameraY * BOTANICALS_PHASE_ONE_VERTICAL_TARGET_RATIO;
    const cameraYAfterPhaseOne = lerp(0, phaseOneTargetCameraY, phaseOneProgress);
    const currentCameraY = lerp(cameraYAfterPhaseOne, maxCameraY, phaseThreeProgress);
    const currentCameraX = lerp(cameraXStart, maxCameraX, phaseTwoProgress);
    const startLineStyle = getSegmentDrawStyle(
        sectionProgress,
        BOTANICALS_DRAW_SEQUENCE.start,
        PATH_LENGTHS.start
    );
    const flowLineStyles = FLOW_LINES.map((line, index) =>
        getSegmentDrawStyle(
            sectionProgress,
            BOTANICALS_DRAW_SEQUENCE.branches[line.id],
            PATH_LENGTHS.branches[index]
        )
    );
    const mergeLineStyle = getSegmentDrawStyle(
        sectionProgress,
        BOTANICALS_DRAW_SEQUENCE.merge,
        PATH_LENGTHS.merge
    );
    const outlineLineStyle = getReverseSegmentDrawStyle(
        sectionProgress,
        BOTANICALS_DRAW_SEQUENCE.outline,
        PATH_LENGTHS.outline
    );
    const ingredientStyles = getIngredientStyles(sectionProgress);
    const productRevealProgress = getSoftProgress(
        getWindowProgress(
            sectionProgress,
            BOTANICALS_DRAW_SEQUENCE.product[0],
            BOTANICALS_DRAW_SEQUENCE.product[1]
        )
    );

    return (
        <section
            ref={sectionRef}
            className="home__botanicals"
            style={{
                height: viewportSize.width <= 600 ? 'auto' : `${sectionHeight}px`,
                '--botanicals-viewport-width': `${BOTANICALS_VIEWPORT_WIDTH}px`,
                '--botanicals-viewport-height': `${BOTANICALS_VIEWPORT_HEIGHT}px`,
            }}
        >
            {/* Desktop: full SVG horizontal scroll canvas */}
            {viewportSize.width > 600 && (
                <div className="home__botanicals-viewport" ref={viewportRef}>
                    <div className="home__botanicals-stage-clip">
                        <div
                            className="home__botanicals-stage"
                            style={{
                                width: HORIZONTAL_WIDTH,
                                height: BASE_HEIGHT,
                                top: 0,
                                transform: `translate3d(${-currentCameraX}px, ${-currentCameraY}px, 0) scale(${stageScale})`,
                            }}
                        >
                            <div
                                className="home__botanicals-track"
                                style={{
                                    width: HORIZONTAL_WIDTH,
                                    height: BASE_HEIGHT,
                                    transform: 'translate3d(0px, 0px, 0px)',
                                }}
                            >
                                <div className="botanical-flow">
                                    <svg
                                        className="botanical-flow__svg"
                                        viewBox={`0 0 ${HORIZONTAL_WIDTH} ${BASE_HEIGHT}`}
                                        preserveAspectRatio="none"
                                        aria-hidden="true"
                                    >
                                        <defs>
                                            <clipPath id={PRODUCT_CLIP_ID} clipPathUnits="userSpaceOnUse">
                                                <path d={BOTTLE_CLIP_PATH} />
                                            </clipPath>
                                        </defs>

                                        {FLOW_LINES.map((line, index) => (
                                            <path
                                                key={line.id}
                                                className="botanical-flow__line botanical-flow__line--branch"
                                                d={line.d}
                                                style={{
                                                    ...flowLineStyles[index],
                                                    strokeWidth: screenAlignedStrokeWidth,
                                                }}
                                            />
                                        ))}

                                        <path
                                            className="botanical-flow__line botanical-flow__line--start"
                                            d={START_PATH_D}
                                            style={{
                                                ...startLineStyle,
                                                strokeWidth: screenAlignedStrokeWidth,
                                            }}
                                        />

                                        <path
                                            className="botanical-flow__line botanical-flow__line--merge"
                                            d={MERGE_PATH_D}
                                            style={{
                                                ...mergeLineStyle,
                                                strokeWidth: screenAlignedStrokeWidth,
                                            }}
                                        />

                                        <image
                                            href={PRODUCT_IMAGE_PATH}
                                            x={PRODUCT.x}
                                            y={PRODUCT.y}
                                            width={PRODUCT.width}
                                            height={PRODUCT.height}
                                            clipPath={`url(#${PRODUCT_CLIP_ID})`}
                                            preserveAspectRatio="none"
                                            className="botanical-flow__product-image"
                                            style={{
                                                opacity: productRevealProgress,
                                            }}
                                        />

                                        <path
                                            className="botanical-flow__bottle-outline"
                                            d={BOTTLE_OUTLINE_PATH}
                                            style={{
                                                ...outlineLineStyle,
                                                strokeWidth: screenAlignedStrokeWidth,
                                            }}
                                        />
                                    </svg>

                                    <div className="botanical-flow__quote-layer" aria-hidden="true">
                                        <svg
                                            className="botanical-flow__quote-svg"
                                            viewBox={`0 0 ${HORIZONTAL_WIDTH} ${BASE_HEIGHT}`}
                                            preserveAspectRatio="none"
                                        >
                                            <defs>
                                                <path id="botanical-flow-quote-path" d={QUOTE_FLOW_PATH_D} />
                                            </defs>
                                            <text
                                                className="botanical-flow__quote-text"
                                                dy={-QUOTE_BASELINE_SHIFT_Y}
                                            >
                                                <textPath
                                                    href="#botanical-flow-quote-path"
                                                    startOffset={quoteStartOffset}
                                                >
                                                    {QUOTE_SOURCE_TEXT}
                                                </textPath>
                                            </text>
                                        </svg>
                                    </div>

                                    <div className="botanical-flow__nodes">
                                        {ingredientStyles.map((ingredient) => (
                                            <div
                                                key={ingredient.id}
                                                className={`ingredient ingredient--${ingredient.id}`}
                                            >
                                                <span
                                                    className="ingredient__label font-serif"
                                                    style={{
                                                        color: ingredient.color,
                                                        left: ingredient.labelX,
                                                        top: ingredient.labelY,
                                                        opacity: ingredient.opacity,
                                                        transform: `translate(-50%, calc(-50% + ${ingredient.translateY}px))`,
                                                    }}
                                                >
                                                    {ingredient.label}
                                                </span>
                                                <div
                                                    className="ingredient__thumb"
                                                    style={{
                                                        left: ingredient.thumbX,
                                                        top: ingredient.thumbY,
                                                        opacity: ingredient.opacity,
                                                        transform: `translate(-50%, calc(-50% + ${ingredient.translateY}px)) scale(${ingredient.scale})`,
                                                    }}
                                                >
                                                    <img src={ingredient.image} alt={ingredient.label} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile: simplified static ingredient grid */}
            <div className="home__botanicals-mobile">
                <h3 className="home__botanicals-mobile-title">Key Botanicals</h3>
                <p className="home__botanicals-mobile-quote">{QUOTE_SOURCE_TEXT}</p>
                <div className="home__botanicals-mobile-grid">
                    {INGREDIENTS.map((ingredient) => (
                        <div key={ingredient.id} className="home__botanicals-mobile-item">
                            <img src={ingredient.image} alt={ingredient.label} />
                            <span>{ingredient.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HomeBotanicals;
