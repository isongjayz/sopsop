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
// 0에서 0.12로 복구하여, 화면 하단에서 섹션이 올라오는 도중(진입 중)에도 
// 전체 스크롤 애니메이션 진행률의 12% 선행 할당을 허용합니다!
export const BOTANICALS_ENTRY_PROGRESS_PORTION = 0.02;

export const BOTANICALS_DRAW_SEQUENCE = {
    start: [0, 0.16],
    // start: [0.0, 0.08],
    branches: {
        // 기존 0.26(26% 구간) 동안 그려지던 속도를 0.40(40% 구간)으로 늘려 스크롤 대비 천천히 그려지도록 수정
        'line-top': [0.08, 0.48],
        'line-upper': [0.16, 0.53],
        'line-middle': [0.18, 0.58],
        'line-lower': [0.23, 0.63],
        'line-bottom': [0.28, 0.68],
    },
    ingredients: [
        // 가지 그리는 속도에 맞춰 라벨 텍스트도 더 부드럽고 천천히 나타나도록 구간 연장
        [0.15, 0.40],
        [0.20, 0.45],
        [0.25, 0.50],
        [0.30, 0.55],
    ],
    merge: [0.56, 0.72],
    outline: [0.74, 0.84],
    product: [0.84, 0.94],
};
