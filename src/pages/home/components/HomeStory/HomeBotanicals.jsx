import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    BASE_HEIGHT,
    BOTTLE_CLIP_PATH,
    BOTTLE_OUTLINE_PATH,
    DRAW_SEQUENCE,
    ENTRY_START_VIEWPORT_RATIO,
    FLOW_LINES,
    GUIDE_LINE_X,
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
    QUOTE_FONT_SIZE,
    QUOTE_LIFT,
    QUOTE_PROGRESS_OFFSET,
    QUOTE_SOURCE_TEXT,
    QUOTE_START_RATIO,
    QUOTE_TRACKING,
    SECTION_EXIT_BUFFER_RATIO,
    STAGE_SCALE_REDUCTION,
    STAGE_VERTICAL_BIAS,
    START_PATH_D,
    TARGET_VISIBLE_WIDTH,
} from './homeBotanicalsData';

gsap.registerPlugin(ScrollTrigger);

function getQuoteAdvance(character, context) {
    const measuredWidth = context.measureText(character === ' ' ? '\u00A0' : character).width;

    if (character === ' ') {
        return measuredWidth + QUOTE_TRACKING * 1.8;
    }

    return measuredWidth + QUOTE_TRACKING;
}

function createSvgPath(d) {
    if (typeof document === 'undefined') {
        return null;
    }

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);

    return path;
}

function getPathLength(d) {
    const path = createSvgPath(d);

    return path ? path.getTotalLength() : 0;
}

const PATH_LENGTHS = {
    start: getPathLength(START_PATH_D),
    branches: FLOW_LINES.map((line) => getPathLength(line.d)),
    merge: getPathLength(MERGE_PATH_D),
    outline: getPathLength(BOTTLE_OUTLINE_PATH),
};

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

function getQuoteMeasurementContext() {
    if (typeof document === 'undefined') {
        return null;
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
        return null;
    }

    context.font = `${QUOTE_FONT_SIZE}px Ogg, serif`;

    return context;
}

function getQuoteLetters() {
    const metrics = getQuotePathMetrics();
    const context = getQuoteMeasurementContext();

    if (!metrics || !context) {
        return [];
    }

    const { path, totalLength } = metrics;
    const startLength = totalLength * QUOTE_START_RATIO;
    const endLength = totalLength * QUOTE_END_RATIO;
    const availableLength = Math.max(endLength - startLength, 1);
    const characters = QUOTE_SOURCE_TEXT.split('');
    const advances = characters.map((char) => getQuoteAdvance(char, context));
    const totalAdvance = advances.reduce((sum, advance) => sum + advance, 0);
    const spacingScale = totalAdvance > 0 ? availableLength / totalAdvance : 1;
    let cursor = startLength;

    return characters.map((char, index) => {
        const clampedCursor = Math.min(cursor, endLength);
        const point = path.getPointAtLength(clampedCursor);
        const nextPoint = path.getPointAtLength(Math.min(clampedCursor + 1, endLength));
        const angle = (Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180) / Math.PI;
        const normalAngle = ((angle - 90) * Math.PI) / 180;
        const left = point.x + Math.cos(normalAngle) * QUOTE_LIFT;
        const top = point.y + Math.sin(normalAngle) * QUOTE_LIFT;

        cursor += advances[index] * spacingScale;

        return {
            id: `quote-auto-${index}`,
            char,
            finalLeft: left,
            finalTop: top,
            finalRotation: angle,
            finalLength: clampedCursor,
            finalProgress: clampedCursor / totalLength,
        };
    });
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

function getSegmentDrawStyle(progress, window, length) {
    const localProgress = getWindowProgress(progress, window[0], window[1]);
    const easedProgress = easeOutCubic(localProgress);

    return {
        strokeDasharray: length,
        strokeDashoffset: length * (1 - easedProgress),
    };
}

function easeOutCubic(value) {
    return 1 - (1 - value) ** 3;
}

function getStageScrollMetrics(scale, viewportWidth) {
    const scaledWidth = HORIZONTAL_WIDTH * scale;
    const maxHorizontalOffset = Math.max(scaledWidth - viewportWidth, 0);
    const horizontalWindow = Math.max(HORIZONTAL_SCROLL_END - HORIZONTAL_SCROLL_START, 0.01);

    return {
        maxHorizontalOffset,
        totalScrollDistance: maxHorizontalOffset / horizontalWindow,
    };
}

function getPointFromQuotePath(path, totalLength, targetLength) {
    const startPoint = path.getPointAtLength(0);
    const startNextPoint = path.getPointAtLength(Math.min(1, totalLength));
    const startAngle = Math.atan2(startNextPoint.y - startPoint.y, startNextPoint.x - startPoint.x);

    if (targetLength < 0) {
        return {
            point: {
                x: startPoint.x + Math.cos(startAngle) * targetLength,
                y: startPoint.y + Math.sin(startAngle) * targetLength,
            },
            angle: (startAngle * 180) / Math.PI,
        };
    }

    const clampedLength = Math.min(targetLength, totalLength);
    const point = path.getPointAtLength(clampedLength);
    const nextPoint = path.getPointAtLength(Math.min(clampedLength + 1, totalLength));
    const angle = (Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) * 180) / Math.PI;

    return { point, angle };
}

function getMotionQuoteLetters(letters, progress) {
    const metrics = getQuotePathMetrics();

    if (!metrics) {
        return [];
    }

    const { path, totalLength } = metrics;
    const motionProgress = easeOutCubic(clamp01(progress + QUOTE_PROGRESS_OFFSET));
    const trailingLetter = letters[letters.length - 1];
    const trailingLength = trailingLetter ? trailingLetter.finalLength : 0;

    return letters.map((letter) => {
        const startLength = letter.finalLength - trailingLength;
        const currentLength = startLength + (letter.finalLength - startLength) * motionProgress;
        const { point, angle } = getPointFromQuotePath(path, totalLength, currentLength);
        const normalAngle = ((angle - 90) * Math.PI) / 180;
        const isBeforePathStart = currentLength < 0;

        return {
            ...letter,
            left: point.x + Math.cos(normalAngle) * QUOTE_LIFT,
            top: point.y + Math.sin(normalAngle) * QUOTE_LIFT - QUOTE_BASELINE_SHIFT_Y,
            rotation: angle,
            hidden: isBeforePathStart,
        };
    });
}

function getIngredientStyles(progress) {
    return INGREDIENTS.map((ingredient, index) => {
        const localProgress = easeOutCubic(
            getWindowProgress(
                progress,
                DRAW_SEQUENCE.ingredients[index][0],
                DRAW_SEQUENCE.ingredients[index][1]
            )
        );

        return {
            ...ingredient,
            opacity: localProgress,
            translateY: (1 - localProgress) * 32,
            scale: 0.86 + localProgress * 0.14,
        };
    });
}

function HomeBotanicals() {
    const [stageScale, setStageScale] = useState(1);
    const [stageOffsetY, setStageOffsetY] = useState(0);
    const [sectionHeight, setSectionHeight] = useState(BASE_HEIGHT);
    const [animationScrollDistance, setAnimationScrollDistance] = useState(BASE_HEIGHT);
    const [horizontalOffset, setHorizontalOffset] = useState(0);
    const [entryProgress, setEntryProgress] = useState(0);
    const [quoteLetters, setQuoteLetters] = useState([]);
    const [quoteProgress, setQuoteProgress] = useState(0);
    const sectionRef = useRef(null);
    const viewportRef = useRef(null);

    useEffect(() => {
        const updateStageScale = () => {
            const { height: viewportHeight, width: viewportWidth } = getViewportSize();
            const heightFitScale = viewportHeight / BASE_HEIGHT;
            const cropScale = viewportWidth / TARGET_VISIBLE_WIDTH;
            const nextScale = Math.max(heightFitScale, cropScale) * STAGE_SCALE_REDUCTION;

            setStageScale(nextScale);
            setStageOffsetY((viewportHeight - BASE_HEIGHT * nextScale) / 2 + STAGE_VERTICAL_BIAS);
        };

        updateStageScale();
        window.addEventListener('resize', updateStageScale);

        return () => {
            window.removeEventListener('resize', updateStageScale);
        };
    }, []);

    useEffect(() => {
        const updateQuoteLetters = () => {
            setQuoteLetters(getQuoteLetters());
        };

        let cancelled = false;

        const run = async () => {
            if (document.fonts?.ready) {
                await document.fonts.ready;
            }

            if (!cancelled) {
                updateQuoteLetters();
            }
        };

        run();
        window.addEventListener('resize', updateQuoteLetters);

        return () => {
            cancelled = true;
            window.removeEventListener('resize', updateQuoteLetters);
        };
    }, []);

    useEffect(() => {
        const updateSectionMetrics = () => {
            const { height: viewportHeight, width: viewportWidth } = getViewportSize();
            const { totalScrollDistance } = getStageScrollMetrics(stageScale, viewportWidth);
            const exitBuffer = viewportHeight * SECTION_EXIT_BUFFER_RATIO;

            setAnimationScrollDistance(totalScrollDistance);
            setSectionHeight(viewportHeight + totalScrollDistance + exitBuffer);
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
            const { maxHorizontalOffset } = getStageScrollMetrics(stageScale, viewportWidth);
            const totalScrollDistance = Math.max(animationScrollDistance, 1);
            const entryStart = viewportHeight * ENTRY_START_VIEWPORT_RATIO;
            const entryProgress = clamp01((entryStart - rect.top) / Math.max(entryStart, 1));
            const mainProgress = clamp01(-rect.top / totalScrollDistance);
            const horizontalProgress = clamp01(
                (mainProgress - HORIZONTAL_SCROLL_START) /
                Math.max(HORIZONTAL_SCROLL_END - HORIZONTAL_SCROLL_START, 0.01)
            );

            setEntryProgress(entryProgress);
            setQuoteProgress(mainProgress);
            setHorizontalOffset(maxHorizontalOffset * horizontalProgress);
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

    const motionQuoteLetters = getMotionQuoteLetters(quoteLetters, quoteProgress);
    const startLineStyle = getSegmentDrawStyle(
        entryProgress,
        DRAW_SEQUENCE.start,
        PATH_LENGTHS.start
    );
    const flowLineStyles = FLOW_LINES.map((_, index) =>
        getSegmentDrawStyle(quoteProgress, DRAW_SEQUENCE.branches[index], PATH_LENGTHS.branches[index])
    );
    const mergeLineStyle = getSegmentDrawStyle(
        quoteProgress,
        DRAW_SEQUENCE.merge,
        PATH_LENGTHS.merge
    );
    const outlineLineStyle = getSegmentDrawStyle(
        quoteProgress,
        DRAW_SEQUENCE.outline,
        PATH_LENGTHS.outline
    );
    const ingredientStyles = getIngredientStyles(quoteProgress);
    const productRevealProgress = easeOutCubic(
        getWindowProgress(quoteProgress, DRAW_SEQUENCE.product[0], DRAW_SEQUENCE.product[1])
    );

    return (
        <section
            ref={sectionRef}
            className="home__botanicals"
            style={{ height: `${sectionHeight}px` }}
        >
            <div className="home__botanicals-viewport" ref={viewportRef}>
                <div className="home__botanicals-stage-clip">
                    <div
                        className="home__botanicals-stage"
                        style={{
                            width: HORIZONTAL_WIDTH,
                            height: BASE_HEIGHT,
                            top: `${stageOffsetY}px`,
                            transform: `translate3d(${GUIDE_LINE_X * (1 - stageScale)}px, 0px, 0) scale(${stageScale})`,
                        }}
                    >
                        <div
                            className="home__botanicals-track"
                            style={{
                                width: HORIZONTAL_WIDTH,
                                height: BASE_HEIGHT,
                                transform: `translate3d(${-horizontalOffset / stageScale}px, 0px, 0)`,
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

                                    <path
                                        className="botanical-flow__line botanical-flow__line--start"
                                        d={START_PATH_D}
                                        style={startLineStyle}
                                    />

                                    {FLOW_LINES.map((line, index) => (
                                        <path
                                            key={line.id}
                                            className="botanical-flow__line botanical-flow__line--branch"
                                            d={line.d}
                                            style={flowLineStyles[index]}
                                        />
                                    ))}

                                    <path
                                        className="botanical-flow__line botanical-flow__line--merge"
                                        d={MERGE_PATH_D}
                                        style={mergeLineStyle}
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
                                        style={outlineLineStyle}
                                    />
                                </svg>

                                <div className="botanical-flow__quote-layer" aria-hidden="true">
                                    {motionQuoteLetters.map((letter) =>
                                        letter.char !== ' ' && !letter.hidden ? (
                                            <span
                                                key={letter.id}
                                                className="botanical-flow__quote-letter font-serif"
                                                style={{
                                                    transformOrigin: '0% 90%',
                                                    transform: `translate3d(${letter.left}px, ${letter.top}px, 0) rotate(${letter.rotation}deg)`,
                                                }}
                                            >
                                                {letter.char}
                                            </span>
                                        ) : null
                                    )}
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
        </section>
    );
}

export default HomeBotanicals;
