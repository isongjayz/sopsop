export const STORY_PROGRESS_BLEND = 0.35;

export const BRAND_STORY_DRAW_SEQUENCE = {
    lines: [
        [0.0, 0.18],
        [0.24, 0.42],
        [0.5, 0.72],
        [0.82, 1.0],
    ],
    icons: [
        [0.18, 0.24],
        [0.42, 0.5],
        [0.72, 0.82],
    ],
    text: [
        [0.16, 0.26],
        [0.4, 0.52],
        [0.7, 0.84],
    ],
};

export const VALUES_DRAW_SEQUENCE = {
    content: [
        [0, 0.18],
        [0.22, 0.4],
        [0.44, 0.62],
        [0.66, 0.84],
    ],
};

export const VALUES_ENTRY_PROGRESS_PORTION = 0.18;
export const BOTANICALS_ENTRY_PROGRESS_PORTION = 0;

export const BOTANICALS_DRAW_SEQUENCE = {
    start: [0.0, 0.08],
    branches: {
        // 'line-top': [0.12, 0.38],
        // 'line-bottom': [0.18, 0.42],
        // 'line-upper': [0.22, 0.46],
        // 'line-lower': [0.26, 0.5],
        // 'line-middle': [0.3, 0.54],
        'line-top': [0.12, 0.38],
        'line-upper': [0.18, 0.42],
        'line-middle': [0.22, 0.46],
        'line-lower': [0.26, 0.5],
        'line-bottom': [0.3, 0.54],
    },
    ingredients: [
        [0.2, 0.34],
        [0.26, 0.4],
        [0.32, 0.46],
        [0.38, 0.52],
    ],
    merge: [0.56, 0.72],
    outline: [0.74, 0.84],
    product: [0.85, 0.94],
};
