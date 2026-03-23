import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VALUES_LAYOUT, VALUE_ITEMS } from './homeValuesData';

gsap.registerPlugin(ScrollTrigger);

const VALUES_SECTION_HEIGHT = VALUES_LAYOUT.itemHeight * VALUE_ITEMS.length;
const VALUES_LINE_D = `M${VALUES_LAYOUT.lineX} 0 L${VALUES_LAYOUT.lineX} ${VALUES_LAYOUT.itemHeight}`;

function ValuesCard({ item, className = '', cardRef = null }) {
    return (
        <div ref={cardRef} className={`home__values-item ${className}`.trim()}>
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
    const contentRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const lastIndexRef = useRef(0);

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

            const path = linePathRef.current;
            const pathLength = path.getTotalLength();
            const lineEase = gsap.parseEase('power1.inOut');
            const mm = gsap.matchMedia();

            const setLineProgress = (progress) => {
                gsap.set(path, {
                    strokeDashoffset: pathLength * (1 - progress),
                });
            };

            mm.add(`(min-width: ${VALUES_LAYOUT.mobileBreakpoint + 1}px)`, () => {
                lastIndexRef.current = 0;
                setActiveIndex(0);

                gsap.set(path, {
                    strokeDasharray: pathLength,
                    strokeDashoffset: pathLength,
                });

                gsap.set(contentRef.current, {
                    opacity: 1,
                    y: 0,
                });

                const entryTrigger = ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: 'top 40%',
                    end: 'top top',
                    scrub: true,
                    onUpdate: (self) => {
                        if (lastIndexRef.current !== 0) {
                            lastIndexRef.current = 0;
                            setActiveIndex(0);
                        }

                        setLineProgress(self.progress);
                    },
                });

                const valuesTrigger = ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: `+=${VALUES_LAYOUT.itemHeight * (VALUE_ITEMS.length - 1)}`,
                    pin: viewportRef.current,
                    // 섹션 높이에서 이미 스크롤 길이를 확보해 둔 상태라 추가 spacer는 필요 없습니다.
                    pinSpacing: false,
                    scrub: true,
                    onUpdate: (self) => {
                        if (self.progress <= 0) {
                            if (lastIndexRef.current !== 0) {
                                lastIndexRef.current = 0;
                                setActiveIndex(0);
                            }

                            setLineProgress(0);
                            return;
                        }

                        const totalProgress = Math.min(
                            VALUE_ITEMS.length - 1.0001,
                            self.progress * (VALUE_ITEMS.length - 1)
                        );
                        const nextIndex = Math.min(
                            VALUE_ITEMS.length - 1,
                            Math.floor(totalProgress) + 1
                        );
                        const stageProgress = totalProgress - Math.floor(totalProgress);
                        const blendedProgress =
                            stageProgress * (1 - VALUES_LAYOUT.lineBlend) +
                            lineEase(stageProgress) * VALUES_LAYOUT.lineBlend;

                        setLineProgress(blendedProgress);

                        if (nextIndex !== lastIndexRef.current) {
                            lastIndexRef.current = nextIndex;

                            gsap.fromTo(
                                contentRef.current,
                                { opacity: 0, y: 20 },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.3,
                                    ease: 'power2.out',
                                    overwrite: 'auto',
                                }
                            );

                            setActiveIndex(nextIndex);
                        }
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
                    <div className="home__values-svg-wrap" aria-hidden="true">
                        <svg
                            viewBox={`0 0 ${VALUES_LAYOUT.frameWidth} ${VALUES_LAYOUT.itemHeight}`}
                            preserveAspectRatio="none"
                            className="home__values-svg"
                        >
                            <path
                                className="home__values-line-base"
                                d={VALUES_LINE_D}
                                strokeWidth="2"
                                fill="none"
                                vectorEffect="non-scaling-stroke"
                            />
                            <path
                                ref={linePathRef}
                                className="home__values-line-path"
                                d={VALUES_LINE_D}
                                strokeWidth="2"
                                fill="none"
                                vectorEffect="non-scaling-stroke"
                            />
                        </svg>
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
