import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    BASE_HEIGHT,
    BOTTLE_CLIP_PATH,
    BOTTLE_OUTLINE_PATH,
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
import {
    HOME_STAGE_BASE_HEIGHT,
    HOME_STAGE_BASE_WIDTH,
    HOME_TABLET_MAX_WIDTH,
    getHomeStageMetrics,
} from '../../homeStage';

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

function getPathBounds(d, transform) {
    if (typeof document === 'undefined' || !document.body) {
        return null;
    }

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = createSvgPath(d);

    if (!path) {
        return null;
    }

    if (transform) {
        path.setAttribute('transform', transform);
    }

    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.style.position = 'absolute';
    svg.style.visibility = 'hidden';
    svg.style.pointerEvents = 'none';
    svg.style.overflow = 'hidden';
    svg.appendChild(path);
    document.body.appendChild(svg);

    let bounds = null;

    try {
        bounds = path.getBBox();
    } finally {
        if (svg.parentNode) {
            svg.parentNode.removeChild(svg);
        }
    }

    return bounds;
}

const PATH_LENGTHS = {
    start: getPathLength(START_PATH_D),
    branches: FLOW_LINES.map((line) => getPathLength(line.d)),
    merge: getPathLength(MERGE_PATH_D),
    outline: getPathLength(BOTTLE_OUTLINE_PATH),
    quoteFlow: getPathLength(QUOTE_FLOW_PATH_D),
};

const BOTANICALS_PRE_HORIZONTAL_HOLD_RATIO = 0.12;
const BOTANICALS_BOTTOM_BUFFER_RATIO = 0.4;
const BOTANICALS_START_PATH_SCROLL_RATIO = 2;
const BOTANICALS_HORIZONTAL_LEAD_IN = 0;
const BOTANICALS_HORIZONTAL_OVERSCAN = 0;
const BOTANICALS_PHASE_ONE_END = 0.24;
const BOTANICALS_PHASE_TWO_END = 0.82;
const BOTANICALS_PHASE_ONE_VERTICAL_TARGET_RATIO = 0.62;
const BOTANICALS_FINAL_PRODUCT_CENTER_RATIO = 0.5;
const BOTANICALS_VIEWPORT_WIDTH = HOME_STAGE_BASE_WIDTH;
const BOTANICALS_VIEWPORT_HEIGHT = HOME_STAGE_BASE_HEIGHT;
const BOTANICALS_STAGE_VERTICAL_OFFSET_RATIO = 0.5;
const BOTANICALS_STAGE_MAX_OFFSET = 280;
const BOTANICALS_SELECTION_SCROLL_RATIO = 2.7;
const BOTANICALS_SELECTION_ENTRY_OFFSET_X = 520;
const BOTANICALS_SELECTION_SLOT_X_RATIO = 0.5;
const BOTANICALS_SELECTION_SLOT_Y_RATIO = 0.66;
const BEST_SELECTION_ITEM_SIZE_RATIO = 0.9;
const BEST_SELECTION_ITEM_ENTRY_STARTS = [0.22, 0.26, 0.5, 0.72];
const BEST_SELECTION_ITEM_ENTRY_DURATION = 0.16;
const BEST_SELECTION_PRODUCT_FADE_START = 0.226;
const BEST_SELECTION_PRODUCT_FADE_END = 0.238;
const BEST_SELECTION_ITEM_1_FADE_START = 0.22;
const BEST_SELECTION_ITEM_1_FADE_END = 0.22;
const BEST_SELECTION_ITEM_ENTRY_ENDS = [
    0.41,
    BEST_SELECTION_ITEM_ENTRY_STARTS[1] + BEST_SELECTION_ITEM_ENTRY_DURATION,
    BEST_SELECTION_ITEM_ENTRY_STARTS[2] + BEST_SELECTION_ITEM_ENTRY_DURATION,
    BEST_SELECTION_ITEM_ENTRY_STARTS[3] + BEST_SELECTION_ITEM_ENTRY_DURATION,
];
const BEST_SELECTION_ITEM_PUSH_TRIGGER_RATIO = 0.34;
const BEST_SELECTION_STACK_STEP_X = 164;
const BEST_SELECTION_STACK_STEP_Y = 34;
const BEST_SELECTION_STACK_FINAL_SHIFT_X = -96;
const BEST_SELECTION_STACK_FINAL_SHIFT_Y = 0;
const BEST_SELECTION_FINAL_SHIFT_START = 1 - BEST_SELECTION_ITEM_ENTRY_DURATION;
const BEST_SELECTION_FINAL_SHIFT_END = 1;
const BEST_SELECTION_ITEM_MAX_VIEWPORT_HEIGHT_RATIO = 0.72;
const BEST_SELECTION_SLOT_SAFE_TOP_PADDING = 16;
const BEST_SELECTION_CONTENT_WIDTH_RATIO = 0.38;
const BEST_SELECTION_CONTENT_MAX_WIDTH = 620;
const BEST_SELECTION_CONTENT_MIN_WIDTH = 320;
const BEST_SELECTION_CONTENT_GAP_MIN = 36;
const BEST_SELECTION_CONTENT_GAP_MAX = 96;
const BEST_SELECTION_CONTENT_EDGE_PADDING_MIN = 44;
const BEST_SELECTION_CONTENT_EDGE_PADDING_MAX = 120;
const BEST_SELECTION_GROUP_SHIFT_X = -56;
const BEST_SELECTION_CONTENT_SHIFT_X = -36;

function createBestSelectionLayout(count, shiftX = 0, shiftY = 0) {
    return Array.from({ length: count }, (_, index) => {
        const offset = count - 1 - index;

        return {
            x: shiftX - offset * BEST_SELECTION_STACK_STEP_X,
            y: shiftY - offset * BEST_SELECTION_STACK_STEP_Y,
            scale: 1,
        };
    });
}

const BEST_SELECTION_LAYOUT_STAGE_1 = createBestSelectionLayout(1);
const BEST_SELECTION_LAYOUT_STAGE_2 = createBestSelectionLayout(2);
const BEST_SELECTION_LAYOUT_STAGE_3 = createBestSelectionLayout(3);
const BEST_SELECTION_LAYOUT_STAGE_4 = createBestSelectionLayout(4);
const BEST_SELECTION_LAYOUT_FINAL = createBestSelectionLayout(
    4,
    BEST_SELECTION_STACK_FINAL_SHIFT_X,
    BEST_SELECTION_STACK_FINAL_SHIFT_Y
);
const BEST_SELECTION_ITEM_1_CLIP_ID = 'home-botanicals-selection-item-1-clip';

const BEST_SELECTION_ITEMS = [
    {
        id: 'item-1',
        src: PRODUCT_IMAGE_PATH,
        alt: 'Aesop Parsley Seed Anti-Oxidant Facial Treatment',
        label: 'Parsley Seed',
        visualOffsetXRatio: -0.118,
        visualOffsetYRatio: 0.018,
        zIndex: 1,
    },
    {
        id: 'item-2',
        src: '/images/home/best/best2.jpg',
        alt: 'Aesop Resurrection Aromatique Hand Balm',
        label: 'Resurrection',
        visualOffsetXRatio: -0.0277,
        visualOffsetYRatio: 0.0185,
        zIndex: 2,
    },
    {
        id: 'item-3',
        src: '/images/home/best/best3.jpg',
        alt: 'Aesop Reverence Aromatique Hand Wash',
        label: 'Reverence',
        visualOffsetXRatio: -0.0015,
        visualOffsetYRatio: 0.0192,
        zIndex: 3,
    },
    {
        id: 'item-4',
        src: '/images/home/best/best4.jpg',
        alt: 'Aesop Above Us, Steorra Eau de Parfum',
        label: 'Above Us, Steorra',
        visualOffsetXRatio: 0,
        visualOffsetYRatio: 0,
        zIndex: 4,
    },
];

let quotePathMetrics;
let bottleClipBounds;

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

function getBottleClipBounds() {
    if (bottleClipBounds) {
        return bottleClipBounds;
    }

    const bounds = getPathBounds(BOTTLE_CLIP_PATH);

    if (!bounds) {
        return null;
    }

    bottleClipBounds = bounds;

    return bottleClipBounds;
}

function useBottleClipBounds() {
    const [bounds, setBounds] = useState(() => bottleClipBounds);

    useEffect(() => {
        if (bottleClipBounds) {
            setBounds(bottleClipBounds);

            return undefined;
        }

        const nextBounds = getBottleClipBounds();

        if (nextBounds) {
            setBounds(nextBounds);
        }

        return undefined;
    }, []);

    return bounds;
}

function clamp01(value) {
    return Math.max(0, Math.min(1, value));
}

function getViewportSize() {
    if (typeof window === 'undefined') {
        return {
            height: BASE_HEIGHT,
            width: BOTANICALS_VIEWPORT_WIDTH,
        };
    }

    return {
        height: window.innerHeight || 1,
        width: window.innerWidth || 1,
    };
}

function getBotanicalsViewportMetrics() {
    const { height: viewportHeight, width: viewportWidth } = getViewportSize();
    const { stageHeight, stageUpScale, stageWidth } = getHomeStageMetrics(viewportWidth);
    const renderedViewportWidth = Math.min(viewportWidth, stageWidth);
    const renderedViewportHeight = Math.min(viewportHeight, stageHeight);
    const shellHeight = viewportHeight;
    const scrollShellHeight = renderedViewportHeight;
    const verticalSlack = shellHeight - renderedViewportHeight;
    const stageOffsetY = clamp(
        verticalSlack * BOTANICALS_STAGE_VERTICAL_OFFSET_RATIO,
        0,
        BOTANICALS_STAGE_MAX_OFFSET
    );

    return {
        renderedViewportHeight,
        renderedViewportWidth,
        scrollShellHeight,
        shellHeight,
        stageHeight,
        stageOffsetY,
        stageUpScale,
        stageWidth,
        viewportHeight,
        viewportWidth,
    };
}

function getResponsiveGuideLineX(viewportWidth) {
    return getHomeStageMetrics(viewportWidth).guideLineX;
}

function isCompactBotanicalsViewport(viewportWidth) {
    return viewportWidth <= HOME_TABLET_MAX_WIDTH;
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

function getAbsoluteDrawStyle(progress, length) {
    const easedProgress = clamp01(progress);

    return {
        strokeDasharray: length,
        strokeDashoffset: length * (1 - easedProgress),
    };
}

function getAdjustedStartPathD(stageVerticalOffset = 0, screenScale = 1) {
    const offsetInWorld = stageVerticalOffset / Math.max(screenScale, 0.001);
    const startY = 1 - offsetInWorld;

    return `M${GUIDE_LINE_X} ${startY}L${GUIDE_LINE_X} 1001.26C551.999837 1189.31 721.908 1585.38 1223.383 1643.43`;
}

function easeOutCubic(value) {
    return 1 - (1 - value) ** 3;
}

function easeInOutCubic(value) {
    if (value < 0.5) {
        return 4 * value ** 3;
    }

    return 1 - (-2 * value + 2) ** 3 / 2;
}

function lerp(start, end, progress) {
    return start + (end - start) * progress;
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function getGradualPushProgress(
    enterProgress,
    triggerRatio = BEST_SELECTION_ITEM_PUSH_TRIGGER_RATIO
) {
    const localProgress = getWindowProgress(enterProgress, triggerRatio, 1);

    return lerp(localProgress, easeInOutCubic(localProgress), 0.45);
}

function getBestSelectionFinalShiftProgress(progress) {
    return getSoftProgress(
        getWindowProgress(
            progress,
            BEST_SELECTION_FINAL_SHIFT_START,
            BEST_SELECTION_FINAL_SHIFT_END
        )
    );
}

function getCameraMetrics(scale, viewportWidth, viewportHeight) {
    const guideLineWorldX = getResponsiveGuideLineX(viewportWidth) / Math.max(scale, 0.001);
    const guideLineOffsetX = guideLineWorldX - GUIDE_LINE_X;
    const visibleWorldWidth = viewportWidth / Math.max(scale, 0.001);
    const visibleWorldHeight = viewportHeight / Math.max(scale, 0.001);
    const leadInWorld = BOTANICALS_HORIZONTAL_LEAD_IN / Math.max(scale, 0.001);
    const maxCameraX = Math.max(
        HORIZONTAL_WIDTH -
            GUIDE_LINE_X +
            guideLineWorldX -
            visibleWorldWidth +
            leadInWorld +
            BOTANICALS_HORIZONTAL_OVERSCAN / Math.max(scale, 0.001),
        0
    );
    const maxCameraY = Math.max(BASE_HEIGHT - visibleWorldHeight, 0);

    return {
        guideLineOffsetX,
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
    const endLength = totalLength * QUOTE_END_RATIO;
    const motionProgress = getSoftProgress(clamp01(progress + QUOTE_PROGRESS_OFFSET)) ** 1.35;
    const initialOffset = -3550;
    const currentOffset = Math.min(
        initialOffset + (endLength - initialOffset) * motionProgress,
        1900
    );

    return `${currentOffset}px`;
}

// Quote flow path draw window — aligned with start + early branches
const QUOTE_DRAW_WINDOW = [0.0, 0.42];

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

function getBestSelectionItemStyle(
    item,
    index,
    progress,
    visualOffsetX = 0,
    incomingScale = 1,
    visualOffsetY = 0,
    initialVisualOffsetX = visualOffsetX,
    initialVisualOffsetY = visualOffsetY,
    layoutScale = 1
) {
    const item1Reveal = progress >= BEST_SELECTION_ITEM_1_FADE_START ? 1 : 0;
    const item1FrontCoverActive =
        progress >= BEST_SELECTION_ITEM_1_FADE_START && progress <= BEST_SELECTION_PRODUCT_FADE_END;
    const item2EnterProgress = getWindowProgress(
        progress,
        BEST_SELECTION_ITEM_ENTRY_STARTS[1],
        BEST_SELECTION_ITEM_ENTRY_ENDS[1]
    );
    const item3EnterProgress = getWindowProgress(
        progress,
        BEST_SELECTION_ITEM_ENTRY_STARTS[2],
        BEST_SELECTION_ITEM_ENTRY_ENDS[2]
    );
    const item4EnterProgress = getWindowProgress(
        progress,
        BEST_SELECTION_ITEM_ENTRY_STARTS[3],
        BEST_SELECTION_ITEM_ENTRY_ENDS[3]
    );
    const item2Enter = getSoftProgress(item2EnterProgress);
    const item3Enter = getSoftProgress(item3EnterProgress);
    const item4Enter = getSoftProgress(item4EnterProgress);
    const item2Push = getGradualPushProgress(item2EnterProgress);
    const item3Push = getGradualPushProgress(item3EnterProgress);
    const item4Push = getGradualPushProgress(item4EnterProgress);
    const finalShift = getBestSelectionFinalShiftProgress(progress);
    const item2Opacity = getSoftProgress(getWindowProgress(item2EnterProgress, 0, 0.16));
    const item3Opacity = getSoftProgress(getWindowProgress(item3EnterProgress, 0, 0.16));
    const item4Opacity = getSoftProgress(getWindowProgress(item4EnterProgress, 0, 0.16));

    let x = index === 0 ? 0 : BOTANICALS_SELECTION_ENTRY_OFFSET_X * layoutScale;
    let y = 0;
    let scale = 1;
    const item1SwapScale = lerp(incomingScale, 1, item2Push);
    const compensatedVisualOffsetX =
        index === 0 ? lerp(initialVisualOffsetX, visualOffsetX, item2Push) : visualOffsetX;
    const compensatedVisualOffsetY =
        index === 0 ? lerp(initialVisualOffsetY, visualOffsetY, item2Push) : visualOffsetY;

    if (index === 0) {
        y = lerp(
            BEST_SELECTION_LAYOUT_STAGE_1[0].y * layoutScale,
            BEST_SELECTION_LAYOUT_STAGE_2[0].y * layoutScale,
            item2Push
        );
        x = lerp(
            BEST_SELECTION_LAYOUT_STAGE_1[0].x * layoutScale,
            BEST_SELECTION_LAYOUT_STAGE_2[0].x * layoutScale,
            item2Push
        );
        scale = lerp(
            item1SwapScale * BEST_SELECTION_LAYOUT_STAGE_1[0].scale,
            BEST_SELECTION_LAYOUT_STAGE_2[0].scale,
            item2Push
        );

        x = lerp(x, BEST_SELECTION_LAYOUT_STAGE_3[0].x * layoutScale, item3Push);
        y = lerp(y, BEST_SELECTION_LAYOUT_STAGE_3[0].y * layoutScale, item3Push);
        scale = lerp(scale, BEST_SELECTION_LAYOUT_STAGE_3[0].scale, item3Push);

        x = lerp(x, BEST_SELECTION_LAYOUT_STAGE_4[0].x * layoutScale, item4Push);
        y = lerp(y, BEST_SELECTION_LAYOUT_STAGE_4[0].y * layoutScale, item4Push);
        scale = lerp(scale, BEST_SELECTION_LAYOUT_STAGE_4[0].scale, item4Push);

        x = lerp(x, BEST_SELECTION_LAYOUT_FINAL[0].x * layoutScale, finalShift);
        y = lerp(y, BEST_SELECTION_LAYOUT_FINAL[0].y * layoutScale, finalShift);
        scale = lerp(scale, BEST_SELECTION_LAYOUT_FINAL[0].scale, finalShift);

        return {
            opacity: item1Reveal,
            x: x + compensatedVisualOffsetX,
            y: y + compensatedVisualOffsetY,
            scale,
            rotation: 0,
            zIndex: item1FrontCoverActive ? 10 : item.zIndex,
        };
    }

    if (index === 1) {
        x = lerp(BOTANICALS_SELECTION_ENTRY_OFFSET_X * layoutScale, 0, item2Enter);
        scale = incomingScale;

        x = lerp(x, BEST_SELECTION_LAYOUT_STAGE_3[1].x * layoutScale, item3Push);
        y = lerp(y, BEST_SELECTION_LAYOUT_STAGE_3[1].y * layoutScale, item3Push);
        scale = lerp(scale, BEST_SELECTION_LAYOUT_STAGE_3[1].scale, item3Push);

        x = lerp(x, BEST_SELECTION_LAYOUT_STAGE_4[1].x * layoutScale, item4Push);
        y = lerp(y, BEST_SELECTION_LAYOUT_STAGE_4[1].y * layoutScale, item4Push);
        scale = lerp(scale, BEST_SELECTION_LAYOUT_STAGE_4[1].scale, item4Push);

        x = lerp(x, BEST_SELECTION_LAYOUT_FINAL[1].x * layoutScale, finalShift);
        y = lerp(y, BEST_SELECTION_LAYOUT_FINAL[1].y * layoutScale, finalShift);
        scale = lerp(scale, BEST_SELECTION_LAYOUT_FINAL[1].scale, finalShift);

        return {
            opacity: item2Opacity,
            x: x + compensatedVisualOffsetX,
            y: y + compensatedVisualOffsetY,
            scale,
            rotation: 0,
            zIndex: item.zIndex,
        };
    }

    if (index === 2) {
        x = lerp(BOTANICALS_SELECTION_ENTRY_OFFSET_X * layoutScale, 0, item3Enter);
        scale = incomingScale;

        x = lerp(x, BEST_SELECTION_LAYOUT_STAGE_4[2].x * layoutScale, item4Push);
        y = lerp(y, BEST_SELECTION_LAYOUT_STAGE_4[2].y * layoutScale, item4Push);
        scale = lerp(scale, BEST_SELECTION_LAYOUT_STAGE_4[2].scale, item4Push);

        x = lerp(x, BEST_SELECTION_LAYOUT_FINAL[2].x * layoutScale, finalShift);
        y = lerp(y, BEST_SELECTION_LAYOUT_FINAL[2].y * layoutScale, finalShift);
        scale = lerp(scale, BEST_SELECTION_LAYOUT_FINAL[2].scale, finalShift);

        return {
            opacity: item3Opacity,
            x: x + compensatedVisualOffsetX,
            y: y + compensatedVisualOffsetY,
            scale,
            rotation: 0,
            zIndex: item.zIndex,
        };
    }

    x = lerp(BOTANICALS_SELECTION_ENTRY_OFFSET_X * layoutScale, 0, item4Enter);
    scale = lerp(incomingScale, BEST_SELECTION_LAYOUT_STAGE_4[3].scale, finalShift);

    x = lerp(x, BEST_SELECTION_LAYOUT_FINAL[3].x * layoutScale, finalShift);
    y = lerp(y, BEST_SELECTION_LAYOUT_FINAL[3].y * layoutScale, finalShift);
    scale = lerp(scale, BEST_SELECTION_LAYOUT_FINAL[3].scale, finalShift);

    return {
        opacity: item4Opacity,
        x: x + compensatedVisualOffsetX,
        y: y + compensatedVisualOffsetY,
        scale,
        rotation: 0,
        zIndex: item.zIndex,
    };
}

function HomeBotanicals() {
    const [stageScale, setStageScale] = useState(1);
    const [viewportSize, setViewportSize] = useState(() => {
        const {
            renderedViewportHeight,
            renderedViewportWidth,
            scrollShellHeight,
            shellHeight,
            stageOffsetY,
        } = getBotanicalsViewportMetrics();

        return {
            height: renderedViewportHeight,
            scrollShellHeight,
            shellHeight,
            stageOffsetY,
            width: renderedViewportWidth,
        };
    });
    const [sectionHeight, setSectionHeight] = useState(BASE_HEIGHT);
    const [animationScrollDistance, setAnimationScrollDistance] = useState(BASE_HEIGHT);
    const [selectionScrollDistance, setSelectionScrollDistance] = useState(BASE_HEIGHT);
    const [startPathProgress, setStartPathProgress] = useState(0);
    const [sectionProgress, setSectionProgress] = useState(0);
    const [quoteProgress, setQuoteProgress] = useState(0);
    const [selectionProgress, setSelectionProgress] = useState(0);
    const sectionRef = useRef(null);
    const viewportRef = useRef(null);
    const isCompactLayout = isCompactBotanicalsViewport(viewportSize.width);
    const bottleBounds = useBottleClipBounds();

    useLayoutEffect(() => {
        if (!isCompactLayout || !sectionRef.current || !viewportRef.current) {
            return undefined;
        }

        const viewportElement = viewportRef.current;
        const spacerElement = viewportElement.parentElement;

        if (
            spacerElement &&
            spacerElement.classList.contains('pin-spacer') &&
            spacerElement.parentNode
        ) {
            spacerElement.parentNode.insertBefore(viewportElement, spacerElement);
            spacerElement.parentNode.removeChild(spacerElement);
        }

        return undefined;
    }, [isCompactLayout]);

    useEffect(() => {
        const updateStageScale = () => {
            const {
                renderedViewportHeight,
                renderedViewportWidth,
                scrollShellHeight,
                shellHeight,
                stageOffsetY,
                stageUpScale,
            } = getBotanicalsViewportMetrics();

            setViewportSize({
                width: renderedViewportWidth,
                height: renderedViewportHeight,
                scrollShellHeight,
                shellHeight,
                stageOffsetY,
            });
            setStageScale(stageUpScale);
        };

        updateStageScale();
        window.addEventListener('resize', updateStageScale);

        return () => {
            window.removeEventListener('resize', updateStageScale);
        };
    }, []);

    useEffect(() => {
        const updateSectionMetrics = () => {
            const {
                renderedViewportHeight,
                renderedViewportWidth,
                scrollShellHeight,
                shellHeight,
                stageUpScale,
            } = getBotanicalsViewportMetrics();
            const { maxCameraX, cameraXStart } = getCameraMetrics(
                stageUpScale,
                renderedViewportWidth,
                renderedViewportHeight
            );
            const horizontalWindow = Math.max(
                HORIZONTAL_SCROLL_END - HORIZONTAL_SCROLL_START,
                0.01
            );
            const totalScrollDistance =
                (Math.max(maxCameraX - cameraXStart, 0) * stageUpScale) / horizontalWindow;
            const exitBuffer = scrollShellHeight * SECTION_EXIT_BUFFER_RATIO;
            const preHorizontalHoldDistance =
                scrollShellHeight * BOTANICALS_PRE_HORIZONTAL_HOLD_RATIO;
            const bottomBuffer = scrollShellHeight * BOTANICALS_BOTTOM_BUFFER_RATIO;
            const bestSelectionScrollDistance =
                scrollShellHeight * BOTANICALS_SELECTION_SCROLL_RATIO;

            setAnimationScrollDistance(totalScrollDistance);
            setSelectionScrollDistance(bestSelectionScrollDistance);
            setSectionHeight(
                shellHeight +
                    preHorizontalHoldDistance +
                    totalScrollDistance +
                    bestSelectionScrollDistance +
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
        if (isCompactLayout) {
            setStartPathProgress(0);
            setSectionProgress(0);
            setQuoteProgress(0);
            setSelectionProgress(0);

            return undefined;
        }

        let frameId = null;

        const updateProgress = () => {
            frameId = null;
            const section = sectionRef.current;

            if (!section) {
                return;
            }

            const rect = section.getBoundingClientRect();
            const { scrollShellHeight, shellHeight } = getBotanicalsViewportMetrics();
            const totalScrollDistance = Math.max(animationScrollDistance, 1);
            const preHorizontalHoldDistance =
                scrollShellHeight * BOTANICALS_PRE_HORIZONTAL_HOLD_RATIO;
            const entryStart = shellHeight * ENTRY_START_VIEWPORT_RATIO;
            const entryProgress = clamp01((entryStart - rect.top) / Math.max(entryStart, 1));
            const nextStartPathProgress = clamp01(
                (entryStart - rect.top) /
                    Math.max(scrollShellHeight * BOTANICALS_START_PATH_SCROLL_RATIO, 1)
            );
            const rawScrollDistance = Math.max(-rect.top, 0);
            const mainProgress = clamp01(
                Math.max(rawScrollDistance - preHorizontalHoldDistance, 0) / totalScrollDistance
            );
            const bestSelectionProgress = clamp01(
                Math.max(rawScrollDistance - preHorizontalHoldDistance - totalScrollDistance, 0) /
                    Math.max(selectionScrollDistance, 1)
            );
            const sectionProgress =
                entryProgress * BOTANICALS_ENTRY_PROGRESS_PORTION +
                mainProgress * (1 - BOTANICALS_ENTRY_PROGRESS_PORTION);

            setStartPathProgress(nextStartPathProgress);
            setSectionProgress(sectionProgress);
            setQuoteProgress(mainProgress);
            setSelectionProgress(bestSelectionProgress);
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
    }, [isCompactLayout, stageScale, animationScrollDistance, selectionScrollDistance]);

    useLayoutEffect(() => {
        if (isCompactLayout || !sectionRef.current || !viewportRef.current) {
            return undefined;
        }

        const trigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${Math.max(sectionHeight - viewportSize.shellHeight, 1)}`,
            pin: viewportRef.current,
            // `sectionHeight` already includes the extra scroll runway for the pinned viewport.
            pinSpacing: false,
            invalidateOnRefresh: true,
        });

        ScrollTrigger.refresh();

        return () => {
            trigger.kill(true);
        };
    }, [isCompactLayout, sectionHeight, viewportSize.shellHeight]);

    const quoteStartOffset = getQuoteStartOffset(quoteProgress);
    const screenScale = Math.max(stageScale, 0.001);
    const stageVerticalOffset = viewportSize.stageOffsetY ?? 0;
    const adjustedStartPathD = getAdjustedStartPathD(stageVerticalOffset, screenScale);
    const adjustedQuoteFlowPathD = QUOTE_FLOW_PATH_D.replace(START_PATH_D, adjustedStartPathD);
    const { guideLineOffsetX, maxCameraX, maxCameraY, cameraXStart } = getCameraMetrics(
        stageScale,
        viewportSize.width,
        viewportSize.height
    );
    const visibleViewportHeight = Math.min(
        viewportSize.height / screenScale,
        BOTANICALS_VIEWPORT_HEIGHT
    );
    const visibleViewportScreenHeight = visibleViewportHeight * screenScale;
    const shellScreenHeight = viewportSize.shellHeight;
    const phaseOneProgress = getSoftProgress(
        getWindowProgress(sectionProgress, 0, BOTANICALS_PHASE_ONE_END)
    );
    const phaseTwoProgress = getSoftProgress(
        getWindowProgress(quoteProgress, BOTANICALS_PHASE_ONE_END, BOTANICALS_PHASE_TWO_END)
    );
    const phaseThreeProgress = getSoftProgress(
        getWindowProgress(quoteProgress, BOTANICALS_PHASE_TWO_END, 1)
    );
    const phaseOneTargetCameraY = maxCameraY * BOTANICALS_PHASE_ONE_VERTICAL_TARGET_RATIO;
    const cameraYAfterPhaseOne = lerp(0, phaseOneTargetCameraY, phaseOneProgress);
    const centeredProductCameraY =
        PRODUCT.y +
        PRODUCT.height / 2 -
        visibleViewportHeight * BOTANICALS_FINAL_PRODUCT_CENTER_RATIO;
    const finalCameraYTarget = Math.max(
        phaseOneTargetCameraY,
        Math.min(centeredProductCameraY, maxCameraY)
    );
    const currentCameraY = lerp(cameraYAfterPhaseOne, finalCameraYTarget, phaseThreeProgress);
    const currentCameraX = lerp(cameraXStart, maxCameraX, phaseTwoProgress);
    const startLineStyle = getAbsoluteDrawStyle(
        startPathProgress,
        PATH_LENGTHS.start + stageVerticalOffset / screenScale
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
    const outlineFadeProgress = 1 - productRevealProgress;

    // 1. 선(가지, 머지선 등)이 먼저(0.88 ~ 0.94) 사라지도록 처리
    const linesFadeOutProgress = getSoftProgress(getWindowProgress(sectionProgress, 0.9, 0.97));
    const linesOpacity = 1 - linesFadeOutProgress;

    // 2. 병(Bottle)은 선(0.88~0.94)이 사실상 거의 지워지는 순간(0.94 ~ 1.0) 전후부터 짧고 부드럽게 타겟까지 이동합니다.
    const bestSelectionTransitionProgress = getSoftProgress(
        getWindowProgress(
            selectionProgress,
            BEST_SELECTION_PRODUCT_FADE_START,
            BEST_SELECTION_PRODUCT_FADE_END
        )
    );
    const productFadeOutProgress = bestSelectionTransitionProgress;
    const finalProductOpacity = productRevealProgress * (1 - productFadeOutProgress);
    // 폭발적인 낙하를 방지하고, 정확히 아이템1(item1)과 잔영이 겹치는 물리적 위치상인 400px 수준으로 교정!
    const productDropOffset = 0;

    const quoteFlowLineStyle = getSegmentDrawStyle(
        sectionProgress,
        QUOTE_DRAW_WINDOW,
        PATH_LENGTHS.quoteFlow + stageVerticalOffset / screenScale
    );
    const quoteExitOpacity =
        1 -
        getSoftProgress(
            getWindowProgress(
                sectionProgress,
                BOTANICALS_DRAW_SEQUENCE.product[0],
                BOTANICALS_DRAW_SEQUENCE.product[1]
            )
        );
    const quoteFlowOpacity = quoteExitOpacity;
    const quoteTextOpacity =
        getSoftProgress(
            getWindowProgress(sectionProgress, QUOTE_DRAW_WINDOW[0], QUOTE_DRAW_WINDOW[0] + 0.05)
        ) *
        quoteExitOpacity *
        (1 - getSoftProgress(getWindowProgress(selectionProgress, 0, 0.14)));
    const bestSelectionLayerOpacity =
        selectionProgress >= BEST_SELECTION_ITEM_ENTRY_STARTS[0] ? 1 : 0;
    const bestSelectionFinalShiftProgress = getBestSelectionFinalShiftProgress(selectionProgress);
    const bestSelectionContentProgress = getSoftProgress(
        getWindowProgress(bestSelectionFinalShiftProgress, 0.22, 1)
    );
    const productVisualCenterX = bottleBounds
        ? bottleBounds.x + bottleBounds.width / 2
        : PRODUCT.x + PRODUCT.width / 2;
    const productVisualCenterY = bottleBounds
        ? bottleBounds.y + bottleBounds.height / 2
        : PRODUCT.y + PRODUCT.height / 2;
    const productAnchorLeft =
        (productVisualCenterX + guideLineOffsetX - currentCameraX) * screenScale;
    const productAnchorTop =
        (productVisualCenterY - currentCameraY) * screenScale + stageVerticalOffset;
    const productImageAnchorLeft =
        (PRODUCT.x + guideLineOffsetX - currentCameraX + PRODUCT.width / 2) * screenScale;
    const productImageAnchorTop =
        (PRODUCT.y - currentCameraY + PRODUCT.height / 2) * screenScale + stageVerticalOffset;
    const bestSelectionSlotLeft = Math.round(productAnchorLeft + BEST_SELECTION_GROUP_SHIFT_X);
    const bestSelectionTopBoundHeight = Math.max(
        1,
        (productAnchorTop +
            BEST_SELECTION_LAYOUT_FINAL[0].y * screenScale -
            BEST_SELECTION_SLOT_SAFE_TOP_PADDING * screenScale) *
            2
    );
    const bestSelectionBottomBoundHeight = Math.max(
        1,
        (shellScreenHeight -
            productAnchorTop -
            BEST_SELECTION_SLOT_SAFE_TOP_PADDING * screenScale) *
            2
    );
    const bestSelectionItemHeight = Math.round(
        Math.min(
            PRODUCT.height * BEST_SELECTION_ITEM_SIZE_RATIO * screenScale,
            visibleViewportScreenHeight * BEST_SELECTION_ITEM_MAX_VIEWPORT_HEIGHT_RATIO,
            bestSelectionTopBoundHeight,
            bestSelectionBottomBoundHeight
        )
    );
    const bestSelectionItemWidth = Math.round(
        (PRODUCT.width / PRODUCT.height) * bestSelectionItemHeight
    );
    const bestSelectionIncomingScale =
        (PRODUCT.height * screenScale) / Math.max(bestSelectionItemHeight, 1);
    const bestSelectionSlotTop = Math.round(productAnchorTop);
    const bestSelectionRailHeight = Math.min(visibleViewportScreenHeight * 0.88, 860 * screenScale);
    const finalStackCenterXs = BEST_SELECTION_LAYOUT_FINAL.map(
        (layout) => bestSelectionSlotLeft + layout.x * screenScale
    );
    const finalStackCenterYs = BEST_SELECTION_LAYOUT_FINAL.map(
        (layout) => bestSelectionSlotTop + layout.y * screenScale
    );
    const finalStackLeft = Math.min(...finalStackCenterXs) - bestSelectionItemWidth / 2;
    const finalStackRight = Math.max(...finalStackCenterXs) + bestSelectionItemWidth / 2;
    const finalStackTop = Math.min(...finalStackCenterYs) - bestSelectionItemHeight / 2;
    const finalStackBottom = Math.max(...finalStackCenterYs) + bestSelectionItemHeight / 2;
    const finalStackCenterY = (finalStackTop + finalStackBottom) / 2;
    const contentScale = viewportSize.width / HOME_STAGE_BASE_WIDTH;
    const bestSelectionContentWidth = Math.round(
        clamp(
            Math.min(
                BEST_SELECTION_CONTENT_MAX_WIDTH * contentScale,
                viewportSize.width * BEST_SELECTION_CONTENT_WIDTH_RATIO
            ),
            BEST_SELECTION_CONTENT_MIN_WIDTH,
            BEST_SELECTION_CONTENT_MAX_WIDTH
        )
    );
    const bestSelectionContentGap = clamp(
        72 * contentScale,
        BEST_SELECTION_CONTENT_GAP_MIN,
        BEST_SELECTION_CONTENT_GAP_MAX
    );
    const bestSelectionContentEdgePadding = clamp(
        viewportSize.width * (120 / HOME_STAGE_BASE_WIDTH),
        BEST_SELECTION_CONTENT_EDGE_PADDING_MIN,
        BEST_SELECTION_CONTENT_EDGE_PADDING_MAX
    );
    const bestSelectionContentLeft = Math.round(
        clamp(
            finalStackRight + bestSelectionContentGap + BEST_SELECTION_CONTENT_SHIFT_X,
            bestSelectionContentEdgePadding,
            Math.max(
                viewportSize.width - bestSelectionContentWidth - bestSelectionContentEdgePadding,
                bestSelectionContentEdgePadding
            )
        )
    );
    const bestSelectionContentTop = Math.round(
        clamp(
            finalStackCenterY,
            bestSelectionContentEdgePadding,
            Math.max(
                viewportSize.shellHeight - bestSelectionContentEdgePadding,
                bestSelectionContentEdgePadding
            )
        )
    );
    const item1InitialVisualOffsetX = productImageAnchorLeft - bestSelectionSlotLeft;
    const item1InitialVisualOffsetY = productImageAnchorTop - bestSelectionSlotTop;
    const bestSelectionItems = BEST_SELECTION_ITEMS.map((item, index) => ({
        ...item,
        anchorLeft: bestSelectionSlotLeft,
        anchorTop: bestSelectionSlotTop,
        ...getBestSelectionItemStyle(
            item,
            index,
            selectionProgress,
            bestSelectionItemHeight * item.visualOffsetXRatio,
            bestSelectionIncomingScale,
            bestSelectionItemHeight * item.visualOffsetYRatio,
            index === 0
                ? item1InitialVisualOffsetX
                : bestSelectionItemHeight * item.visualOffsetXRatio,
            index === 0
                ? item1InitialVisualOffsetY
                : bestSelectionItemHeight * item.visualOffsetYRatio,
            screenScale
        ),
    }));

    return (
        <section
            ref={sectionRef}
            className={`home__botanicals${isCompactLayout ? ' is-compact' : ''}`}
            style={{
                height: isCompactLayout ? 'auto' : `${sectionHeight}px`,
                '--botanicals-shell-height': `${Math.round(viewportSize.shellHeight)}px`,
                '--botanicals-stage-offset-y': `${Math.round(stageVerticalOffset)}px`,
                '--botanicals-viewport-width': `${Math.round(
                    BOTANICALS_VIEWPORT_WIDTH * stageScale
                )}px`,
                '--botanicals-viewport-height': `${Math.round(
                    BOTANICALS_VIEWPORT_HEIGHT * stageScale
                )}px`,
            }}
        >
            {/* Desktop: full SVG horizontal scroll canvas */}
            <div className="home__botanicals-viewport" ref={viewportRef}>
                    <div className="home__botanicals-stage-clip">
                        <div
                            className="home__botanicals-stage"
                            style={{
                                width: HORIZONTAL_WIDTH,
                                height: BASE_HEIGHT,
                                transform: `translate3d(${-currentCameraX}px, ${-currentCameraY}px, 0) scale(${stageScale})`,
                            }}
                        >
                            <div
                                className="home__botanicals-track"
                                style={{
                                    width: HORIZONTAL_WIDTH,
                                    height: BASE_HEIGHT,
                                    transform: `translate3d(${guideLineOffsetX}px, 0px, 0px)`,
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
                                            <clipPath
                                                id={PRODUCT_CLIP_ID}
                                                clipPathUnits="userSpaceOnUse"
                                            >
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
                                                    strokeWidth: 2,
                                                    opacity: linesOpacity,
                                                }}
                                            />
                                        ))}

                                        <path
                                            className="botanical-flow__line botanical-flow__line--start"
                                            d={adjustedStartPathD}
                                            style={{
                                                ...startLineStyle,
                                                strokeWidth: 2,
                                                opacity: linesOpacity,
                                            }}
                                        />

                                        <path
                                            className="botanical-flow__line botanical-flow__line--merge"
                                            d={MERGE_PATH_D}
                                            style={{
                                                ...mergeLineStyle,
                                                strokeWidth: 2,
                                                opacity: linesOpacity,
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
                                                opacity: finalProductOpacity,
                                                transform: `translateY(${productDropOffset}px)`,
                                            }}
                                        />

                                        <path
                                            className="botanical-flow__bottle-outline"
                                            d={BOTTLE_OUTLINE_PATH}
                                            style={{
                                                ...outlineLineStyle,
                                                strokeWidth: 2,
                                                opacity: outlineFadeProgress,
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
                                                <path
                                                    id="botanical-flow-quote-path"
                                                    d={adjustedQuoteFlowPathD}
                                                />
                                            </defs>
                                            <path
                                                className="botanical-flow__line botanical-flow__line--quote"
                                                d={adjustedQuoteFlowPathD}
                                                style={{
                                                    ...quoteFlowLineStyle,
                                                    strokeWidth: 2,
                                                    opacity: quoteFlowOpacity,
                                                }}
                                            />
                                            <text
                                                className="botanical-flow__quote-text"
                                                dy={-QUOTE_BASELINE_SHIFT_Y}
                                                style={{ opacity: quoteTextOpacity }}
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
                                                    <img
                                                        src={ingredient.image}
                                                        alt={ingredient.label}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        className="home__botanicals-selection"
                        style={{ opacity: bestSelectionLayerOpacity }}
                    >
                        <div
                            className="home__botanicals-selection-rail"
                            aria-hidden="true"
                            style={{
                                left: bestSelectionSlotLeft,
                                top: bestSelectionSlotTop,
                                width: bestSelectionItemWidth * 0.76,
                                height: bestSelectionRailHeight,
                            }}
                        />

                        <div className="home__botanicals-selection-stack" aria-hidden="true">
                            {bestSelectionItems.map((item) => {
                                const itemStyle = {
                                    left: item.anchorLeft,
                                    top: item.anchorTop,
                                    height: bestSelectionItemHeight,
                                    opacity: item.opacity,
                                    zIndex: item.zIndex,
                                    transform: `translate(-50%, -50%) translate(${item.x}px, ${item.y}px) scale(${item.scale}) rotate(${item.rotation}deg)`,
                                };

                                if (item.id === 'item-1') {
                                    return (
                                        <svg
                                            key={item.id}
                                            className={`home__botanicals-selection-item home__botanicals-selection-item--${item.id}`}
                                            viewBox={`${PRODUCT.x} ${PRODUCT.y} ${PRODUCT.width} ${PRODUCT.height}`}
                                            preserveAspectRatio="none"
                                            style={{
                                                ...itemStyle,
                                                width: bestSelectionItemWidth,
                                            }}
                                        >
                                            <defs>
                                                <clipPath
                                                    id={BEST_SELECTION_ITEM_1_CLIP_ID}
                                                    clipPathUnits="userSpaceOnUse"
                                                >
                                                    <path d={BOTTLE_CLIP_PATH} />
                                                </clipPath>
                                            </defs>
                                            <image
                                                href={item.src}
                                                x={PRODUCT.x}
                                                y={PRODUCT.y}
                                                width={PRODUCT.width}
                                                height={PRODUCT.height}
                                                clipPath={`url(#${BEST_SELECTION_ITEM_1_CLIP_ID})`}
                                                preserveAspectRatio="none"
                                            />
                                        </svg>
                                    );
                                }

                                return (
                                    <img
                                        key={item.id}
                                        src={item.src}
                                        alt=""
                                        className={`home__botanicals-selection-item home__botanicals-selection-item--${item.id}`}
                                        style={itemStyle}
                                    />
                                );
                            })}
                        </div>

                        <div
                            className="home__botanicals-selection-content"
                            style={{
                                left: bestSelectionContentLeft,
                                right: 'auto',
                                top: bestSelectionContentTop,
                                width: bestSelectionContentWidth,
                                opacity: bestSelectionContentProgress,
                                transform: 'translate3d(0, -50%, 0)',
                            }}
                        >
                            <h3 className="home__botanicals-selection-title">
                                The Aesop
                                <span>Best Selection</span>
                            </h3>
                            <p className="home__botanicals-selection-description">
                                유행을 타지 않는 이솝의 철학과 피부 과학이 만나 탄생한 시대를
                                초월하여 사랑받는 상징적인 제품들을 소개합니다.
                            </p>
                            <Link to="/product/best" className="home__botanicals-selection-btn">
                                바로가기
                            </Link>
                        </div>
                    </div>
                </div>

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

                <div className="home__botanicals-mobile-best">
                    <h4 className="home__botanicals-mobile-best-title">
                        The Aesop
                        <span>Best Selection</span>
                    </h4>
                    <div className="home__botanicals-mobile-best-grid">
                        {BEST_SELECTION_ITEMS.map((item) => (
                            <div key={item.id} className="home__botanicals-mobile-best-item">
                                <img src={item.src} alt={item.alt} />
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                    <Link to="/product/best" className="home__botanicals-mobile-best-btn">
                        Explore selection
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default HomeBotanicals;
