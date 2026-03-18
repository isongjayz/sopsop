/**
 * 홈 컴포넌트 엔트리 포인트
 * 
 * 홈 페이지의 모든 섹션을 내보내고(export), 각각의 SCSS 파일을 하나로 모읍니다.
 * 섹션별 로직과 스타일을 그룹 폴더 내에 유지하여 관리 효율성을 높였습니다.
 */

import './HomeHero/style.scss';
import './HomeStory/style.scss';
import './HomeSections/style.scss';

export { default as HomeHero } from './HomeHero';
export { default as HomeBrandStory } from './HomeStory/HomeBrandStory';
export { default as HomeValues } from './HomeStory/HomeValues';
export { default as HomeBotanicals } from './HomeStory/HomeBotanicals';
export { default as HomeBestSelection } from './HomeSections/HomeBestSelection';
export { default as HomeQuote } from './HomeSections/HomeQuote';
export { default as HomeGiftGuide } from './HomeSections/HomeGiftGuide';
export { default as HomeCoda } from './HomeSections/HomeCoda';
