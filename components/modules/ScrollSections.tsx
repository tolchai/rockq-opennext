'use client';

import cn from 'classnames';

import React, { useRef } from 'react';
import { ModulesModulesScrollSectionsLayout } from '@/graphql/generated';
import Container from '../Container';
import ContactBadge from '../ContactBadge';
import { se } from 'date-fns/locale';
import { slugify } from '@/utils/utils';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import BgImage from '../BgImage';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollSectionsProps {
  module: ModulesModulesScrollSectionsLayout;
}

const ScrollSections: React.FC<ScrollSectionsProps> = ({ module }) => {
  const { header, scrollSections } = module;

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  useGSAP(
    () => {
      if (!scrollSections || scrollSections.length === 0) return;

      scrollSections.forEach((section, index) => {
        if (
          !section ||
          !section.sectionTitle ||
          typeof section.sectionTitle !== 'string'
        )
          return;

        const sectionElement = document.getElementById(
          slugify(section.sectionTitle),
        );

        if (sectionElement) {
          ScrollTrigger.create({
            trigger: sectionElement,
            start: 'top 40%',
            end: 'bottom 40%',
            onEnter: () => setActiveIndex(index),
            onEnterBack: () => setActiveIndex(index),
          });
        }
      });
    },
    { scope: containerRef, dependencies: [scrollSections] },
  );

  return (
    <div className='relative bg-alabaster-200'>
      {/* <BgImage imageNumber={2} sticky /> */}
      <Container bordered>
        <div ref={containerRef} className='px-4 pt-10 pb-6 md:p-10 md:pt-28'>
          <div className='relative md:flex md:gap-5'>
            <div className='relative md:w-1/3'>
              <div className='md:flex md:pr-12 md:h-[calc(100vh-10rem)] max-md:mb-12 md:sticky md:top-28 md:flex-col md:justify-between'>
                {header && (
                  <div
                    className='max-md:mb-8 body-large-wrap with-light-label text-content'
                    dangerouslySetInnerHTML={{ __html: header }}
                  />
                )}
                <ContactBadge />
              </div>
            </div>
            {scrollSections && scrollSections.length > 0 && (
              <div className='md:flex-1'>
                <ul>
                  {scrollSections.map((section, index) => {
                    if (!section) return null;
                    const {
                      sectionTitle,
                      sectionContent,
                      sectionIllustration,
                    } = section;

                    return (
                      <li
                        key={index}
                        id={slugify(sectionTitle ?? '')}
                        className='relative border-t max-md:pt-2 border-neutral-100'
                      >
                        <p className='md:absolute md:left-0 flex gap-[0.375rem] items-center md:top-10 label'>
                          <span
                            className={cn('w-2 h-2 transition-colors', {
                              'bg-orange': activeIndex === index,
                              'bg-ash': activeIndex !== index,
                            })}
                          ></span>
                          <span className=' opacity-60'>
                            {(index + 1).toString().padStart(3, '0')}
                          </span>
                        </p>
                        <div className='md:ml-20 md:pl-10 md:border-l md:border-neutral-100'>
                          {sectionTitle && (
                            <h3 className='py-4 md:pt-10 h5'>
                              <strong
                                dangerouslySetInnerHTML={{
                                  __html: sectionTitle,
                                }}
                              />
                            </h3>
                          )}
                          <div
                            className={cn('transition-opacity duration-500', {
                              'opacity-0': activeIndex !== index,
                            })}
                          >
                            {sectionContent && (
                              <div
                                className='text-content md:pt-2'
                                dangerouslySetInnerHTML={{
                                  __html: sectionContent,
                                }}
                              />
                            )}

                            <div className='w-1/2 py-12 mx-auto md:w-1/3'>
                              {sectionIllustration ? (
                                <img
                                  src={sectionIllustration.node.sourceUrl || ''}
                                  alt={
                                    sectionIllustration.node.altText ||
                                    sectionTitle ||
                                    ''
                                  }
                                  className='block w-full'
                                />
                              ) : (
                                <div className='aspect-[8/1]'></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ScrollSections;
