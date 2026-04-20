export const HOME_STAGE_BASE_WIDTH = 1920;
export const HOME_STAGE_BASE_HEIGHT = 1024;
export const HOME_STAGE_MAX_WIDTH = HOME_STAGE_BASE_WIDTH;
export const HOME_MOBILE_MAX_WIDTH = 600;
export const HOME_TABLET_MAX_WIDTH = 1023;
export const HOME_DESKTOP_MAX_WIDTH = 1600;
export const HOME_STAGE_DESIGN_GUIDE_LINE_X = 552;
export const HOME_STAGE_DESKTOP_GUIDE_LINE_X = 320;
export const HOME_STAGE_TABLET_GUIDE_LINE_X = 220;

export function getHomeStageMetrics(width) {
    const viewportWidth = Math.max(Math.round(width || HOME_STAGE_BASE_WIDTH), 1);
    const stageWidth = Math.min(viewportWidth, HOME_STAGE_MAX_WIDTH);
    const stageScale = stageWidth / HOME_STAGE_BASE_WIDTH;
    const stageUpScale = Math.max(stageScale, 1);
    let guideLineX = HOME_STAGE_DESIGN_GUIDE_LINE_X;

    if (viewportWidth <= HOME_TABLET_MAX_WIDTH) {
        guideLineX = HOME_STAGE_TABLET_GUIDE_LINE_X;
    } else if (viewportWidth <= HOME_DESKTOP_MAX_WIDTH) {
        guideLineX = HOME_STAGE_DESKTOP_GUIDE_LINE_X;
    }

    return {
        guideLineX: Math.round(guideLineX),
        stageHeight: Math.round(
            (stageWidth * HOME_STAGE_BASE_HEIGHT) / HOME_STAGE_BASE_WIDTH
        ),
        stageScale,
        stageUpScale,
        stageWidth,
    };
}
