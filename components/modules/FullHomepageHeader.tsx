'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP, ScrollTrigger);

import cn from 'classnames';

import React, { useRef } from 'react';
import Container from '../Container';
import { ModulesModulesFullHomepageHeaderLayout } from '@/graphql/generated';
import Buttons from '../Buttons';

import bgHero from '@/public/images/bgs/hero-new-4.png';
import Image from 'next/image';
import Carousel from '../Carousel';

import Motto from '@/public/images/ui/motto.svg';
import BgImage from '../BgImage';

interface FullHomepageHeaderProps {
  module: ModulesModulesFullHomepageHeaderLayout;
}

const FullHomepageHeader: React.FC<FullHomepageHeaderProps> = ({ module }) => {
  const { homepageHeaderHeader, homepageHeaderContent, buttons } = module;

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className='relative pb-4 md:pb-10'>
      <BgImage imageNumber={1} />
      <Container className='relative md:h-full'>
        <div
          ref={containerRef}
          className='relative flex flex-col md:flex-row items-end px-4 pb-6 pt-30 rounded-b-lg md:rounded-b-xl bg-white max-h-[calc(100vh-5rem)] md:max-h-[45rem] h-screen md:p-12 md:gap-5 '
        >
          <div className='md:w-2/3'>
            {homepageHeaderHeader && (
              <div dangerouslySetInnerHTML={{ __html: homepageHeaderHeader }} />
            )}
            {buttons && buttons.length > 0 && (
              <div className='mt-8'>
                <Buttons buttons={buttons} />
              </div>
            )}
          </div>

          {homepageHeaderContent && (
            <div
              className='relative md:flex-1 max-md:mt-auto body-large-wrap text-content'
              dangerouslySetInnerHTML={{ __html: homepageHeaderContent }}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default FullHomepageHeader;
