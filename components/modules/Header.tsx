'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

import cn from 'classnames';

import React, { useRef } from 'react';
import Container from '../Container';
import { ModulesModulesHeaderLayout } from '@/graphql/generated';
import Image from 'next/image';

import Arrow from '@/public/images/ui/arrow.svg';
import Carousel from '../Carousel';

interface HeaderProps {
  module: ModulesModulesHeaderLayout;
}

const Header: React.FC<HeaderProps> = ({ module }) => {
  const { header, illustrationType, image, gallery } = module;

  const containerRef = useRef<HTMLDivElement>(null);

  // const data = await fetchPosts(locale || 'cs', 4);

  useGSAP(
    () => {
      // gsap.set('.a-wrap', { opacity: 1 });

      gsap.to('.a-header', {
        // yPercent: -50,
        duration: 0.5,
        opacity: 1,
        delay: 0.5,
        ease: 'power2.out',
      });

      gsap.to('.a-button', {
        // yPercent: -50,
        duration: 0.5,
        opacity: 1,
        delay: 0.5,
        ease: 'power2.out',
      });

      if (illustrationType !== 'none') {
        const timeline = gsap.timeline();

        timeline
          .to('.a-img', {
            opacity: 1, // First, fade in the image
            duration: 0.5,
            ease: 'power2.out',
          })
          .to('.a-img', {
            scale: 1, // Then, scale down to its final size
            duration: 1,
            ease: 'power2.out',
          });
      }
    },
    {
      scope: containerRef,
    },
  );

  return (
    <Container>
      <div
        ref={containerRef}
        className={cn(
          'text-center pt-32 pb-10 max-md:px-4 md:pb-18 md:pt-56',
          {},
        )}
      >
        {header && (
          <div className='opacity-0 a-header m-header'>
            <div
              className={cn('text-content max-w-2xl mx-auto')}
              dangerouslySetInnerHTML={{ __html: header }}
            />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Header;
