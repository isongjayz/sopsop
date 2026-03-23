import { Fragment, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    BRAND_STORY_ITEMS,
    BRAND_STORY_LINE_SEGMENTS,
    BRAND_STORY_NAV_ITEMS,
} from './homeBrandStoryData';

gsap.registerPlugin(ScrollTrigger);

const TIMING = {
    line: {
        baseDuration: 0.62,
        blend: 0.35,
    },
    icon: {
        baseDuration: 0.68,
        blend: 0.35,
    },
};

const MOBILE_BREAKPOINT = 600;

const getAverage = (values) => {
    if (!values.length) {
        return 1;
    }

    return values.reduce((sum, value) => sum + value, 0) / values.length;
};

const getBlendedDuration = (baseDuration, ratio, blend) =>
    baseDuration * (1 + (ratio - 1) * blend);

const getTotalPathLength = (paths) =>
    paths.reduce((sum, path) => (path ? sum + path.getTotalLength() : sum), 0);

const setIndexedRef =
    (collectionRef, index) =>
    (element) => {
        collectionRef.current[index] = element;
    };

const setNestedRef =
    (collectionRef, index, nestedIndex) =>
    (element) => {
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
                const averageSegmentHeight = getAverage(
                    BRAND_STORY_LINE_SEGMENTS.map((segment) => segment.height)
                );
                const iconPathGroups = BRAND_STORY_ITEMS.map(
                    (_, index) => iconPathRefs.current[index]?.filter(Boolean) ?? []
                );
                const iconPathLengths = iconPathGroups.map(getTotalPathLength);
                const averageIconPathLength = getAverage(iconPathLengths.filter(Boolean));
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

                const timeline = gsap.timeline({
                    defaults: { ease: 'none' },
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top bottom',
                        end: 'bottom 40%',
                        scrub: true,
                    },
                });

                BRAND_STORY_LINE_SEGMENTS.forEach((segmentData, index) => {
                    const segment = lineSegmentRefs.current[index];
                    const segmentDuration = getBlendedDuration(
                        TIMING.line.baseDuration,
                        segmentData.height / averageSegmentHeight,
                        TIMING.line.blend
                    );

                    if (segment) {
                        timeline.to(segment, {
                            scaleY: 1,
                            duration: segmentDuration,
                        });
                    }

                    const nav = navRefs.current[index];
                    const content = contentRefs.current[index];
                    const paths = iconPathGroups[index];
                    const iconPathLength = iconPathLengths[index];

                    if (!paths?.length || !iconPathLength) {
                        return;
                    }

                    const iconDuration = getBlendedDuration(
                        TIMING.icon.baseDuration,
                        iconPathLength / averageIconPathLength,
                        TIMING.icon.blend
                    );

                    paths.forEach((path, pathIndex) => {
                        const isGenesisPrimaryPath = index === 0 && pathIndex === 0;
                        const pathLength = path.getTotalLength();
                        const pathDuration = iconDuration * (pathLength / iconPathLength);

                        timeline.to(
                            path,
                            {
                                strokeDashoffset: 0,
                                duration: pathDuration,
                                ease: 'power2.out',
                                onStart: () => {
                                    if (isGenesisPrimaryPath) {
                                        path.setAttribute('stroke-linecap', 'butt');
                                    }
                                },
                                onComplete: () => {
                                    if (isGenesisPrimaryPath) {
                                        path.setAttribute('stroke-linecap', 'round');
                                    }
                                },
                                onReverseStart: () => {
                                    if (isGenesisPrimaryPath) {
                                        path.setAttribute('stroke-linecap', 'butt');
                                    }
                                },
                                onReverseComplete: () => {
                                    if (isGenesisPrimaryPath) {
                                        path.setAttribute('stroke-linecap', 'butt');
                                    }
                                },
                            },
                            pathIndex === 0 ? '>' : '<0.08'
                        );
                    });

                    timeline.to(
                        [nav, content].filter(Boolean),
                        {
                            opacity: 1,
                            duration: 0.42,
                            stagger: 0.08,
                            ease: 'power2.out',
                        },
                        '<0.1'
                    );
                });

                return () => {
                    if (genesisPrimaryPath) {
                        genesisPrimaryPath.setAttribute('stroke-linecap', 'round');
                    }
                };
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
                        <div
                            ref={setIndexedRef(navRefs, index)}
                            className="home__brand-story-nav"
                        >
                            {BRAND_STORY_NAV_ITEMS.map((navItem) => (
                                <span key={navItem} className={navItem === item.label ? 'active' : ''}>
                                    {navItem}
                                </span>
                            ))}
                        </div>

                        <div className={`home__brand-story-icon home__brand-story-icon--${item.id}`}>
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
                ))}
            </div>
        </section>
    );
}

export default HomeBrandStory;
