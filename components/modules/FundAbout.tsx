'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'gsap/dist/SplitText';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

import cn from 'classnames';

import React, { useRef } from 'react';
import Container from '../Container';
import { ModulesModulesFundAboutLayout } from '@/graphql/generated';
import Image from 'next/image';
import Buttons from '../Buttons';

interface FundAbout {
  module: ModulesModulesFundAboutLayout;
}

const FundAbout: React.FC<FundAbout> = ({ module }) => {
  const { description, numbers, logo, buttons } = module;

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // text

      // make a duplicate of the original text and add it to the dom next to the original with absolute positioning

      const originalText = document.querySelector('.a-description');
      if (!originalText) return;
      const duplicateText = originalText.cloneNode(true) as HTMLElement;
      duplicateText.style.position = 'absolute';
      duplicateText.style.top = '0';
      duplicateText.style.left = '0';
      duplicateText.style.width = '100%';
      duplicateText.style.pointerEvents = 'none';
      duplicateText.style.color = '#817c75';
      duplicateText.style.overflow = 'hidden';
      duplicateText.classList.remove('a-description', 'relative', 'z-[5]');
      duplicateText.classList.add('a-description-duplicate');
      originalText.parentNode?.appendChild(duplicateText);

      const sts = [];

      const splitOriginal = new SplitText('.a-description-duplicate p', {
        type: 'lines',
        linesClass: 'overflow-hidden whitespace-nowrap divided-line',
      });

      const splitMask = new SplitText('.a-description p', {
        type: 'lines',
        linesClass: 'overflow-hidden whitespace-nowrap divided-line',
      });

      splitMask.lines.forEach((line, i) => {
        const animAppear = gsap.timeline({ paused: true }).fromTo(
          line,
          { width: '0%' },
          { width: '100%' }
          // { ease: 'power2.out', duration: 1 }
        );

        const st = ScrollTrigger.create({
          trigger: line,
          animation: animAppear,
          start: 'top 50%',
          end: 'bottom 50%',
          // markers: process.env.NODE_ENV === 'development' ? true : false,
          scrub: true,
        });
      });

      // numbers

      gsap.set('.a-bg', { width: 0 });
      gsap.set('.a-content', { opacity: 0 });

      ScrollTrigger.batch('.a-bg', {
        onEnter: (elements, triggers) => {
          gsap.to(elements, {
            width: '100%',
            stagger: 0.1,
            duration: 1,
            ease: 'power2.out',
          });
        },
        once: true,
      });

      ScrollTrigger.batch('.a-content', {
        onEnter: (elements, triggers) => {
          gsap.to(elements, {
            opacity: 1,
            stagger: 0.1,
            delay: 0.75,
            duration: 1,
            ease: 'power2.out',
          });
        },
        once: true,
      });
    },
    {
      scope: containerRef,
    }
  );

  return (
    <Container>
      <div ref={containerRef}>
        <div className='md:flex max-md:px-4 md:justify-between '>
          <div
            className={cn('', {
              'md:w-1/2': logo?.node?.sourceUrl,
              'md:w-3/4': !logo?.node?.sourceUrl,
            })}
          >
            {description && (
              <div className='relative'>
                <div
                  className='relative z-[5] a-description text-content first-p-to-h3 h2-to-label'
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            )}
            {buttons && buttons.length > 0 && (
              <div className='mt-8 md:mt-10'>
                <Buttons buttons={buttons} color='green' />
              </div>
            )}
          </div>
          {logo?.node?.sourceUrl && (
            <div className='max-md:mt-8 md:pl-6 md:flex-1 lg:flex lg:justify-end lg:items-start'>
              <div className='relative p-14 max-md:my-20 md:w-2/3'>
                <Image
                  src={logo.node.sourceUrl}
                  width={logo.node.mediaDetails?.width || 100}
                  height={logo.node.mediaDetails?.height || 100}
                  alt='Fund logo'
                  // className='max-h-20 md:max-h-32'
                  className='w-full'
                  unoptimized={true}
                />
                {/* <ul className='absolute inset-0'>
                <li className='absolute top-0 left-0 w-1 h-1 bg-black rounded-full'></li>
                <li className='absolute top-0 right-0 w-1 h-1 bg-black rounded-full'></li>
                <li className='absolute bottom-0 left-0 w-1 h-1 bg-black rounded-full'></li>
                <li className='absolute bottom-0 right-0 w-1 h-1 bg-black rounded-full'></li>
              </ul> */}
              </div>
            </div>
          )}
        </div>
        {numbers && numbers.length > 0 && (
          <ul className='flex flex-col gap-2 mt-12 md:gap-4 md:mt-30 md:flex-row'>
            {numbers?.map((number, i) => {
              if (!number) return null;
              const { value, label } = number;
              return (
                <li
                  key={i}
                  className={cn(
                    'relative overflow-hidden gap-4 p-6 rounded-lg',
                    {
                      'md:w-1/3': numbers.length === 1,
                      'md:flex-1': numbers.length > 1,
                    }
                  )}
                >
                  <div className='absolute top-0 left-0 w-full h-full rounded-lg a-bg bg-neutral-50'></div>
                  {label && value && (
                    <div className='relative flex items-center justify-between a-content'>
                      <p
                        className='label text-neutral-600'
                        dangerouslySetInnerHTML={{ __html: label }}
                      />
                      <p
                        className='h4 whitespace-nowrap'
                        dangerouslySetInnerHTML={{ __html: value }}
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Container>
  );
};

export default FundAbout;
