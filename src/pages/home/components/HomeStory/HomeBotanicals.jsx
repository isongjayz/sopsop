import { useEffect, useRef, useState } from 'react';

const HORIZONTAL_WIDTH = 5659;
const BASE_HEIGHT = 2539;
const QUOTE_PATH_ID = 'botanical-flow-quote-path';
const PRODUCT_CLIP_ID = 'botanical-flow-product-clip';
const PRODUCT_IMAGE_PATH = '/images/home/bottle_sequence_fix_outline/hero1.png';
const QUOTE_SOURCE_TEXT = "'If the Path be beautiful, let us not ask where it leads.'";
const QUOTE_START_RATIO = 0;
const QUOTE_END_RATIO = 0.85;
const QUOTE_LIFT = 148;
const QUOTE_FONT_SIZE = 120;
const QUOTE_TRACKING = 24;
const QUOTE_BASELINE_SHIFT_Y = 96;
const QUOTE_ENTRY_CLUSTER_LENGTH = 118;
const QUOTE_REVEAL_WINDOW = 1.05;
const QUOTE_PROGRESS_OFFSET = 0;
const QUOTE_ENTRY_TRAVEL = 0.18;

const START_PATH_D = 'M552 1L552 1001.26C551.999837 1189.31 721.908 1585.38 1223.383 1643.43';

const flowLines = [
    {
        id: 'line-top',
        d: 'M1223.383 1643.43C1329.13 1658.64 1578.99 1658.96 1817.61 1598.92C2051.75 1518.9 2286.24 1417.67 2333.59 1400.37C2521.98 1325.85 2902.15 1208.32 3025.3 1183.81C3101.29 1168.69 3372.86 1170.31 3434.68 1183.81C3557.88 1210.72 3640.58 1272.33 3700.94 1298.34C3761.3 1324.35 3804.63 1372.86 3956.99 1413.87C4109.35 1454.88 4369.18 1460.98 4541.5 1550.5',
    },
    {
        id: 'line-upper',
        d: 'M1223.383 1643.43L1572.76 1690.44C1572.76 1690.44 1784.04 1710.01 1906.21 1690.44C2028.37 1670.87 2187.95 1645.38 2340.41 1636.43C2527.82 1625.43 2760.63 1570.81 3032.12 1560.41C3178.2 1554.81 3272.1 1560.41 3406.45 1560.41C3540.8 1560.41 3593.37 1560.41 3688.78 1574.91C3811.23 1593.53 3793.92 1583.91 3951.64 1583.91C4109.35 1583.91 4319.53 1498.49 4541.5 1550.5',
    },
    {
        id: 'line-middle',
        d: 'M1223.383 1643.43C1223.383 1643.43 1559.25 1734.79 1778.18 1774.46C1978.06 1810.69 1971.92 1801.97 2293.68 1842.48C2615.44 1882.99 2628.09 1896.0 3025.3 1896.0C3422.51 1896.0 3255.06 1896.0 3390.87 1896.0C3515.63 1896.0 3700.94 1816.98 3700.94 1816.98C3700.94 1816.98 3807.55 1780.97 3936.06 1730.45C4064.57 1679.94 4407.15 1544.0 4541.5 1550.5',
    },
    {
        id: 'line-lower',
        d: 'M1223.383 1643.43L1603.43 1717.45C1889.15 1753.31 2028.39 1717.45 2340.41 1717.45C2652.43 1717.45 2783.37 1747.96 3036.98 1747.96C3285.61 1747.96 3263.33 1748.96 3411.31 1748.96C3559.29 1748.96 3608.46 1732.45 3700.94 1719.95C3826.84 1702.93 3846.98 1683.94 3956.99 1658.43C4067.0 1632.93 4365.29 1526.41 4541.5 1550.5',
    },
    {
        id: 'line-bottom',
        d: 'M1223.383 1643.43L1555.24 1672.94C1666.27 1676.73 1699.05 1674.98 1790.35 1664.44C2010.91 1638.97 2181.72 1569.91 2340.41 1535.4C2340.41 1535.4 2752.0 1390.97 3025.3 1380.36C3218.55 1372.86 3263.33 1370.86 3406.45 1380.36C3549.56 1389.86 3623.03 1387.49 3734.5 1438.0C3845.97 1488.51 3876.38 1489.72 3971.5 1499.5C4025.0 1505.0 4348.25 1470.48 4541.5 1550.5',
    },
];

const QUOTE_FLOW_PATH_D = `${START_PATH_D}L1223.383 1643.43C1329.13 1658.64 1578.99 1658.96 1817.61 1598.92C2051.75 1518.9 2286.24 1417.67 2333.59 1400.37C2521.98 1325.85 2902.15 1208.32 3025.3 1183.81C3101.29 1168.69 3372.86 1170.31 3434.68 1183.81C3557.88 1210.72 3640.58 1272.33 3700.94 1298.34C3761.3 1324.35 3804.63 1372.86 3956.99 1413.87C4109.35 1454.88 4369.18 1460.98 4541.5 1550.5`;

const MERGE_PATH_D =
    'M4541.5 1550.5C4598.83 1578.67 4705 1610.46 4795 1597.5C4916.59 1579.99 5091.91 1555.16 5107.5 1633.5';

const BOTTLE_OUTLINE_PATH =
    'M5100 1623.93C5096.67 1620.8 5092.42 1617.98 5087 1615.46C5081.33 1612.83 5064.28 1606.03 5052 1610.46C5020.09 1621.98 5023.12 1671.12 5023 1715.46V1744.46C5016.01 1757.46 5014.29 1750.65 5016 1773.46L4989 1776.46C4977.23 1795.3 4979.62 1860.48 4980 1890.46H4990L4991 1892.46L4988 1902.46V1905.46L4995 1906.46C5020.68 1924.24 4961.09 1976.82 4958 1984.46C4950.32 2003.46 4954 2037.22 4954 2062.46C4953.67 2116.47 4953.33 2170.47 4953 2224.46C4953.33 2253.46 4953.67 2282.46 4954 2311.46C4962.03 2333.26 4998.57 2324.45 5024 2329.46L5075 2330.46C5174.15 2328.15 5174.31 2323.53 5180 2306.46V1996.46C5173.69 1966.22 5152.16 1963.21 5141 1943.46C5139.67 1931.13 5138.33 1918.8 5137 1906.46L5146 1904.46C5145.33 1899.8 5144.67 1895.13 5144 1890.46H5151C5155.62 1871.77 5149.47 1796.29 5145 1779.46C5137.82 1774.77 5127.48 1773.07 5115 1773.46C5118.22 1759.8 5115.01 1732.41 5112 1715.46C5106.78 1686.1 5113.04 1671.03 5109 1643C5108.46 1639.28 5108.23 1637.18 5107.5 1633.5';
const BOTTLE_CLIP_PATH = `${BOTTLE_OUTLINE_PATH}Z`;

const PRODUCT = {
    x: 4639,
    y: 1554.43,
    width: 632,
    height: 860,
};

const ingredients = [
    {
        id: 'rosemary',
        label: 'Rosemary Leaf',
        image: 'images/home/botanicals/rosemary_leaf.jpg',
        color: '#b9ab9e',
        labelX: 3340,
        labelY: 1192,
        thumbX: 3928,
        thumbY: 1218,
    },
    {
        id: 'chamomile',
        label: 'Chamomile',
        image: 'images/home/botanicals/chamomile.jpg',
        color: '#8a7669',
        labelX: 3018,
        labelY: 1470,
        thumbX: 3410,
        thumbY: 1462,
    },
    {
        id: 'bergamot',
        label: 'Bergamot',
        image: 'images/home/botanicals/bergamot.jpg',
        color: '#a4ad95',
        labelX: 3042,
        labelY: 1902,
        thumbX: 2836,
        thumbY: 1988,
    },
    {
        id: 'lavender',
        label: 'Lavender',
        image: 'images/home/botanicals/lavender.jpg',
        color: '#aa98c8',
        labelX: 3358,
        labelY: 1712,
        thumbX: 3860,
        thumbY: 1762,
    },
];

const DRAW_SEQUENCE = {
    start: [0.02, 0.2],
    branches: [
        [0.18, 0.42],
        [0.22, 0.46],
        [0.26, 0.5],
        [0.3, 0.54],
        [0.34, 0.58],
    ],
    ingredients: [
        [0.24, 0.38],
        [0.3, 0.44],
        [0.36, 0.5],
        [0.42, 0.56],
    ],
    merge: [0.58, 0.74],
    outline: [0.72, 0.9],
    product: [0.88, 1],
};

function getQuoteAdvance(character, context) {
    const measuredWidth = context.measureText(character === ' ' ? '\u00A0' : character).width;

    if (character === ' ') {
        return measuredWidth + QUOTE_TRACKING * 1.8;
    }

    return measuredWidth + QUOTE_TRACKING;
}

function getPathLength(d) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', d);
    return path.getTotalLength();
}

const START_PATH_LENGTH = getPathLength(START_PATH_D);
const FLOW_LINE_LENGTHS = flowLines.map((line) => getPathLength(line.d));
const MERGE_PATH_LENGTH = getPathLength(MERGE_PATH_D);
const OUTLINE_PATH_LENGTH = getPathLength(BOTTLE_OUTLINE_PATH);

function getQuoteLetters() {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', QUOTE_FLOW_PATH_D);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
        return [];
    }

    context.font = `${QUOTE_FONT_SIZE}px Ogg, serif`;

    const totalLength = path.getTotalLength();
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
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', QUOTE_FLOW_PATH_D);
    const totalLength = path.getTotalLength();
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

function HomeBotanicals() {
    const [stageScale, setStageScale] = useState(1);
    const [quoteLetters, setQuoteLetters] = useState([]);
    const [quoteProgress, setQuoteProgress] = useState(0);
    const sectionRef = useRef(null);
    const previewMode = true;

    useEffect(() => {
        if (previewMode) {
            setStageScale(1);
            return undefined;
        }

        const updateStageScale = () => {
            setStageScale(window.innerHeight / BASE_HEIGHT);
        };

        updateStageScale();
        window.addEventListener('resize', updateStageScale);

        return () => {
            window.removeEventListener('resize', updateStageScale);
        };
    }, [previewMode]);

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
        const updateQuoteProgress = () => {
            const section = sectionRef.current;

            if (!section) {
                return;
            }

            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight || 1;
            const scrollableDistance = Math.max(rect.height - viewportHeight, 1);
            const raw = -rect.top / scrollableDistance;
            setQuoteProgress(clamp01(raw));
        };

        updateQuoteProgress();
        window.addEventListener('scroll', updateQuoteProgress, { passive: true });
        window.addEventListener('resize', updateQuoteProgress);

        return () => {
            window.removeEventListener('scroll', updateQuoteProgress);
            window.removeEventListener('resize', updateQuoteProgress);
        };
    }, [previewMode]);

    const motionQuoteLetters = getMotionQuoteLetters(quoteLetters, quoteProgress);
    const startLineStyle = getSegmentDrawStyle(
        quoteProgress,
        DRAW_SEQUENCE.start,
        START_PATH_LENGTH
    );
    const flowLineStyles = flowLines.map((_, index) =>
        getSegmentDrawStyle(quoteProgress, DRAW_SEQUENCE.branches[index], FLOW_LINE_LENGTHS[index])
    );
    const mergeLineStyle = getSegmentDrawStyle(
        quoteProgress,
        DRAW_SEQUENCE.merge,
        MERGE_PATH_LENGTH
    );
    const outlineLineStyle = getSegmentDrawStyle(
        quoteProgress,
        DRAW_SEQUENCE.outline,
        OUTLINE_PATH_LENGTH
    );
    const ingredientStyles = ingredients.map((ingredient, index) => {
        const localProgress = easeOutCubic(
            getWindowProgress(
                quoteProgress,
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
    const productRevealProgress = easeOutCubic(
        getWindowProgress(quoteProgress, DRAW_SEQUENCE.product[0], DRAW_SEQUENCE.product[1])
    );

    return (
        <section ref={sectionRef} className={`home__botanicals ${previewMode ? 'is-preview' : ''}`}>
            <div className="home__botanicals-viewport">
                <div
                    className="home__botanicals-stage"
                    style={{
                        width: HORIZONTAL_WIDTH,
                        height: BASE_HEIGHT,
                        transform: `translate3d(0px, 0px, 0) scale(${stageScale})`,
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
                                <path id={QUOTE_PATH_ID} d={START_PATH_D} />
                                <clipPath id={PRODUCT_CLIP_ID} clipPathUnits="userSpaceOnUse">
                                    <path d={BOTTLE_CLIP_PATH} />
                                </clipPath>
                            </defs>

                            <path
                                className="botanical-flow__line botanical-flow__line--start"
                                d={START_PATH_D}
                                style={startLineStyle}
                            />

                            {flowLines.map((line, index) => (
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
        </section>
    );
}

export default HomeBotanicals;
