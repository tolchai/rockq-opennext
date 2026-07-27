'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP, ScrollTrigger);

import cn from 'classnames';

import React, { useRef } from 'react';
import Container from './Container';
import { Cta } from '@/graphql/generated';
import Buttons from './Buttons';
import Image from 'next/image';

interface CTAsProps {
  ctas: Cta[];
}

const CTAs: React.FC<CTAsProps> = ({ ctas }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // numbers

      // gsap.set('.a-bg', { width: 0 });
      // gsap.set('.a-content', { opacity: 0 });

      if (!ctas || ctas.length === 0) {
        return null;
      }

      ScrollTrigger.batch('.a-cta', {
        onEnter: (elements, triggers) => {
          gsap.from(elements, {
            y: 20,
            opacity: 0,
            stagger: 0.75,
            duration: 1,
            ease: 'power2.out',
          });
        },
        once: true,
      });

      ScrollTrigger.batch('.a-bg', {
        onEnter: (elements, triggers) => {
          gsap.from(elements, {
            scale: 1.2,
            opacity: 0,
            stagger: 0.5,
            duration: 1,
            // delay: 0.5,
            ease: 'power2.out',
          });
        },
        once: true,
      });

      // ScrollTrigger.batch('.a-content', {
      //   onEnter: (elements, triggers) => {
      //     gsap.to(elements, {
      //       opacity: 1,
      //       stagger: 0.1,
      //       delay: 0.75,
      //       duration: 1,
      //       ease: 'power2.out',
      //     });
      //   },
      //   once: true,
      // });
    },
    {
      scope: containerRef,
    }
  );

  if (!ctas || ctas.length === 0) {
    return null;
  }

  return (
    <Container verticalPadding={false} horizontalPadding={false}>
      <div
        ref={containerRef}
        className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'
      >
        {ctas.map((cta, i) => {
          const { content, cTADetails, featuredImage } = cta;
          return (
            <div
              key={i}
              className={cn(
                'md:py-16 flex a-cta px-4 py-8 relative overflow-hidden flex-col rounded-lg',
                {
                  'md:px-16 max-md:aspect-[1/1.2] ': i === 0,
                  'lg:col-span-2': i === 0 && ctas.length > 1,
                  'md:col-span-2 lg:col-span-3 aspect-[2.4/1]':
                    i === 0 && ctas.length === 1,
                  'aspect-square': i === 1,
                  'md:px-8': i !== 0,
                  'bg-black text-white':
                    cTADetails?.backgroundColor === 'black' ||
                    cTADetails?.backgroundColor === 'image',
                  'bg-neutral-300': cTADetails?.backgroundColor === 'tan',
                }
              )}
            >
              {cta.cTADetails?.backgroundColor === 'tan' && (
                <div className='absolute inset-3 md:inset-6 bg-dots'></div>
              )}
              {cta.cTADetails?.backgroundColor === 'image' &&
                featuredImage?.node?.sourceUrl && (
                  <div className='absolute inset-0 a-bg '>
                    <Image
                      src={featuredImage.node.sourceUrl}
                      alt={featuredImage.node.altText || ''}
                      width={featuredImage.node?.mediaDetails?.width || 0}
                      height={featuredImage.node?.mediaDetails?.height || 0}
                      className='object-cover w-full h-full'
                    />
                  </div>
                )}
              {content && (
                <div
                  className={cn(
                    'relative a-content text-content text-content--reduced-margin',
                    {
                      'lg:w-3/5': i === 0,
                    }
                  )}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              )}
              {cTADetails?.buttons && cTADetails?.buttons.length > 0 && (
                <div className='relative mt-auto a-buttons'>
                  <Buttons buttons={cTADetails.buttons} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default CTAs;
