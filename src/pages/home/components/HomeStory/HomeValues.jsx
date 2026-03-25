import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VALUES_LAYOUT, VALUE_ITEMS } from './homeValuesData';
import {
    STORY_PROGRESS_BLEND,
    VALUES_DRAW_SEQUENCE,
    VALUES_ENTRY_PROGRESS_PORTION,
} from './homeStoryMotion';

gsap.registerPlugin(ScrollTrigger);

const VALUES_SECTION_HEIGHT = VALUES_LAYOUT.itemHeight * VALUE_ITEMS.length;

const clamp01 = (value) => Math.max(0, Math.min(1, value));
const getWindowProgress = (progress, start, end) =>
    clamp01((progress - start) / Math.max(end - start, 0.0001));
const easeOutCubic = (value) => 1 - (1 - value) ** 3;
const getSoftProgress = (value) =>
    value * (1 - STORY_PROGRESS_BLEND) + easeOutCubic(value) * STORY_PROGRESS_BLEND;

function ValuesCard({ item, className = '', cardRef = null }) {
    return (
        <div
            ref={cardRef}
            className={`home__values-item home__values-item--${item.id} ${className}`.trim()}
        >
            <div className="home__values-image">
                <img src={item.image} alt={item.alt} />
            </div>
            <div className="home__values-content">
                <h3 className="font-serif">{item.title}</h3>
                <h4>{item.subtitle}</h4>
                <p>{item.body}</p>
            </div>
        </div>
    );
}

function HomeValues() {
    const sectionRef = useRef(null);
    const viewportRef = useRef(null);
    const linePathRef = useRef(null);
    const lineBaseRef = useRef(null);
    const contentRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const lastIndexRef = useRef(0);
    const [lineHeight, setLineHeight] = useState(VALUES_LAYOUT.itemHeight);

    // Track line height to match viewport of the pinned area
    useEffect(() => {
        const updateLineHeight = () => {
            if (viewportRef.current) {
                setLineHeight(viewportRef.current.offsetHeight);
            }
        };

        updateLineHeight();
        window.addEventListener('resize', updateLineHeight);

        return () => window.removeEventListener('resize', updateLineHeight);
    }, []);

    useGSAP(
        () => {
            if (
                !sectionRef.current ||
                !viewportRef.current ||
                !linePathRef.current ||
                !contentRef.current
            ) {
                return undefined;
            }

            const pathLength = lineHeight;
            const mm = gsap.matchMedia();

            mm.add(`(min-width: ${VALUES_LAYOUT.mobileBreakpoint + 1}px)`, () => {
                lastIndexRef.current = 0;
                setActiveIndex(0);

                gsap.set(linePathRef.current, {
                    height: 0,
                });

                const setValuesState = (progress) => {
                    let nextIndex = 0;

                    VALUES_DRAW_SEQUENCE.content.forEach((window, index) => {
                        const localProgress = getWindowProgress(progress, window[0], window[1]);

                        if (localProgress > 0) {
                            nextIndex = index;
                        }
                    });

                    if (nextIndex !== lastIndexRef.current) {
                        lastIndexRef.current = nextIndex;
                        setActiveIndex(nextIndex);
                    }

                    const contentWindow = VALUES_DRAW_SEQUENCE.content[nextIndex];
                    const lineProgress = getSoftProgress(
                        getWindowProgress(progress, contentWindow[0], contentWindow[1])
                    );
                    const contentProgress = getSoftProgress(
                        getWindowProgress(progress, contentWindow[0], contentWindow[1])
                    );

                    gsap.set(linePathRef.current, {
                        height: `${lineHeight * lineProgress}px`,
                    });

                    gsap.set(contentRef.current, {
                        y: (1 - contentProgress) * 20,
                    });
                };

                setValuesState(0);

                const entryTrigger = ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: 'top 40%',
                    end: 'top top',
                    scrub: true,
                    onUpdate: (self) => {
                        const entryProgress = self.progress * VALUES_ENTRY_PROGRESS_PORTION;
                        setValuesState(entryProgress);
                    },
                });

                const valuesTrigger = ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: `+=${VALUES_LAYOUT.itemHeight * (VALUE_ITEMS.length - 1)}`,
                    pin: viewportRef.current,
                    pinSpacing: false,
                    scrub: true,
                    onUpdate: (self) => {
                        const mainProgress =
                            VALUES_ENTRY_PROGRESS_PORTION +
                            self.progress * (1 - VALUES_ENTRY_PROGRESS_PORTION);
                        setValuesState(mainProgress);
                    },
                });

                ScrollTrigger.refresh();

                return () => {
                    entryTrigger.kill();
                    valuesTrigger.kill();
                };
            });

            mm.add(`(max-width: ${VALUES_LAYOUT.mobileBreakpoint}px)`, () => {
                lastIndexRef.current = 0;
                setActiveIndex(0);

                return undefined;
            });

            return () => {
                mm.revert();
            };
        },
        { scope: sectionRef }
    );

    const activeItem = VALUE_ITEMS[activeIndex];

    return (
        <section
            className="home__values"
            ref={sectionRef}
            style={{ '--values-section-height': `${VALUES_SECTION_HEIGHT}px` }}
        >
            <div className="home__values-inner">
                    <div ref={viewportRef} className="home__values-viewport">
                    <div className="home__values-line-wrap" aria-hidden="true">
                        <span ref={lineBaseRef} className="home__values-line-base" style={{ height: `${lineHeight}px` }} />
                        <span ref={linePathRef} className="home__values-line-path" style={{ height: 0 }} />
                    </div>

                    <div className="home__values-stage">
                        <ValuesCard item={activeItem} cardRef={contentRef} />
                    </div>
                </div>

                <div className="home__values-mobile-list">
                    {VALUE_ITEMS.map((item) => (
                        <ValuesCard
                            key={item.title}
                            item={item}
                            className="home__values-item--stacked"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HomeValues;
