import { Fragment, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    BRAND_STORY_ITEMS,
    BRAND_STORY_LINE_SEGMENTS,
    BRAND_STORY_NAV_ITEMS,
} from './homeBrandStoryData';
import {
    BRAND_STORY_DRAW_SEQUENCE,
    STORY_PROGRESS_BLEND,
} from './homeStoryMotion';

gsap.registerPlugin(ScrollTrigger);

const MOBILE_BREAKPOINT = 600;

const clamp01 = (value) => Math.max(0, Math.min(1, value));

const getWindowProgress = (progress, start, end) =>
    clamp01((progress - start) / Math.max(end - start, 0.0001));

const easeOutCubic = (value) => 1 - (1 - value) ** 3;
const getSoftProgress = (value) =>
    value * (1 - STORY_PROGRESS_BLEND) + easeOutCubic(value) * STORY_PROGRESS_BLEND;

const setIndexedRef = (collectionRef, index) => (element) => {
    collectionRef.current[index] = element;
};

const setNestedRef = (collectionRef, index, nestedIndex) => (element) => {
    if (!collectionRef.current[index]) {
        collectionRef.current[index] = [];
    }

    collectionRef.current[index][nestedIndex] = element;
};

function BrandStoryTitle({ segments }) {
    return segments.map((segment, index) => (
        <Fragment key={`${segment.text}-${index}`}>
            {segment.strong ? <strong>{segment.text}</strong> : segment.text}
        </Fragment>
    ));
}

function HomeBrandStory() {
    const containerRef = useRef(null);
    const lineSegmentRefs = useRef([]);
    const navRefs = useRef([]);
    const contentRefs = useRef([]);
    const iconPathRefs = useRef(BRAND_STORY_ITEMS.map(() => []));

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add(`(min-width: ${MOBILE_BREAKPOINT + 1}px)`, () => {
                const iconPathGroups = BRAND_STORY_ITEMS.map(
                    (_, index) => iconPathRefs.current[index]?.filter(Boolean) ?? []
                );
                const genesisPrimaryPath = iconPathGroups[0]?.[0];

                gsap.set(lineSegmentRefs.current.filter(Boolean), {
                    scaleY: 0,
                    transformOrigin: 'top center',
                });

                gsap.set(navRefs.current.filter(Boolean), {
                    opacity: 0,
                });

                gsap.set(contentRefs.current.filter(Boolean), {
                    opacity: 0,
                });

                iconPathGroups.forEach((paths, iconIndex) => {
                    paths.forEach((path, pathIndex) => {
                        const pathLength = path.getTotalLength();
                        const isGenesisPrimaryPath = iconIndex === 0 && pathIndex === 0;

                        gsap.set(path, {
                            strokeDasharray: pathLength,
                            strokeDashoffset: pathLength,
                        });

                        path.setAttribute(
                            'stroke-linecap',
                            isGenesisPrimaryPath ? 'butt' : 'round'
                        );
                    });
                });

                const setProgressState = (progress) => {
                    lineSegmentRefs.current.forEach((segment, index) => {
                        if (!segment) {
                            return;
                        }

                        const window = BRAND_STORY_DRAW_SEQUENCE.lines[index];
                        const localProgress = getSoftProgress(
                            getWindowProgress(progress, window[0], window[1])
                        );

                        gsap.set(segment, { scaleY: localProgress });
                    });

                    iconPathGroups.forEach((paths, index) => {
                        const window = BRAND_STORY_DRAW_SEQUENCE.icons[index];
                        const localProgress = getSoftProgress(
                            getWindowProgress(progress, window[0], window[1])
                        );

                        paths.forEach((path, pathIndex) => {
                            const isGenesisPrimaryPath = index === 0 && pathIndex === 0;
                            const pathLength = path.getTotalLength();

                            gsap.set(path, {
                                strokeDashoffset: pathLength * (1 - localProgress),
                            });

                            if (isGenesisPrimaryPath) {
                                path.setAttribute(
                                    'stroke-linecap',
                                    localProgress >= 1 ? 'round' : 'butt'
                                );
                            }
                        });
                    });

                    BRAND_STORY_ITEMS.forEach((_, index) => {
                        const window = BRAND_STORY_DRAW_SEQUENCE.text[index];
                        const localProgress = getSoftProgress(
                            getWindowProgress(progress, window[0], window[1])
                        );
                        const nav = navRefs.current[index];
                        const content = contentRefs.current[index];

                        gsap.set([nav, content].filter(Boolean), {
                            opacity: localProgress,
                            y: (1 - localProgress) * 20,
                        });
                    });
                };

                setProgressState(0);

                const trigger = ScrollTrigger.create({
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom 40%',
                    scrub: true,
                    onUpdate: (self) => {
                        setProgressState(self.progress);
                    },
                });

                return () => {
                    if (genesisPrimaryPath) {
                        genesisPrimaryPath.setAttribute('stroke-linecap', 'round');
                    }

                    trigger.kill();
                };
            });

            mm.add(`(max-width: ${MOBILE_BREAKPOINT}px)`, () => {
                const iconPathGroups = BRAND_STORY_ITEMS.map(
                    (_, index) => iconPathRefs.current[index]?.filter(Boolean) ?? []
                );

                gsap.set(lineSegmentRefs.current.filter(Boolean), {
                    clearProps: 'transform,transformOrigin',
                });
                gsap.set(navRefs.current.filter(Boolean), {
                    clearProps: 'opacity,transform',
                });
                gsap.set(contentRefs.current.filter(Boolean), {
                    clearProps: 'opacity,transform',
                });

                iconPathGroups.forEach((paths) => {
                    paths.forEach((path) => {
                        gsap.set(path, {
                            clearProps: 'strokeDasharray,strokeDashoffset',
                        });
                        path.setAttribute('stroke-linecap', 'round');
                    });
                });

                return undefined;
            });

            return () => {
                mm.revert();
            };
        },
        { scope: containerRef }
    );

    return (
        <section className="home__brand-story" ref={containerRef}>
            <div className="home__brand-story-inner">
                <div className="home__brand-story-line" aria-hidden="true">
                    {BRAND_STORY_LINE_SEGMENTS.map((segment, index) => {
                        const lineStyle = {
                            left: 'var(--brand-story-line-x)',
                            top: `${segment.top}px`,
                            height: `${segment.height}px`,
                        };

                        return (
                            <div key={`${segment.top}-${segment.height}`}>
                                <span className="home__brand-story-line-base" style={lineStyle} />
                                <span
                                    ref={setIndexedRef(lineSegmentRefs, index)}
                                    className="home__brand-story-line-path"
                                    style={lineStyle}
                                />
                            </div>
                        );
                    })}
                </div>

                {BRAND_STORY_ITEMS.map((item, index) => (
                    <div
                        key={item.id}
                        className={`home__brand-story-block home__brand-story-block--${item.id}`}
                    >
                        <div className="home__brand-story-info">
                            <div
                                ref={setIndexedRef(navRefs, index)}
                                className="home__brand-story-nav"
                            >
                                {BRAND_STORY_NAV_ITEMS.map((navItem) => (
                                    <span
                                        key={navItem}
                                        className={navItem === item.label ? 'active' : ''}
                                    >
                                        {navItem}
                                    </span>
                                ))}
                            </div>

                            <div
                                ref={setIndexedRef(contentRefs, index)}
                                className={`home__brand-story-content home__brand-story-content--${item.id}`}
                            >
                                <h3 className="font-serif brand-story-year">{item.heading}</h3>
                                <h4 className="brand-story-title">
                                    <BrandStoryTitle segments={item.titleSegments} />
                                </h4>
                                <p>{item.description}</p>
                            </div>
                        </div>

                        <div
                            className={`home__brand-story-icon home__brand-story-icon--${item.id}`}
                        >
                            <svg
                                className={item.svg.className}
                                width={item.svg.width}
                                height={item.svg.height}
                                viewBox={item.svg.viewBox}
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {item.svg.paths.map((path, pathIndex) => (
                                    <path
                                        key={`${item.id}-${pathIndex}`}
                                        ref={setNestedRef(iconPathRefs, index, pathIndex)}
                                        d={path.d}
                                        stroke="#603B2D"
                                        strokeWidth="2"
                                        strokeLinecap={path.strokeLinecap}
                                        strokeLinejoin="round"
                                        fill="none"
                                    />
                                ))}
                            </svg>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default HomeBrandStory;
