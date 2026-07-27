'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP, ScrollTrigger);

import cn from 'classnames';

import React, { Fragment, useRef, useState } from 'react';

import Close from '@/public/images/ui/close.svg';
import { Fund, Service, Solution } from '@/graphql/generated';
import Button from './Button';
import Image from 'next/image';
import Tags from './Tags';
import Modal from './Modal';
import ContactForm from './ContactForm';
import BackButton from './BackButton';

import bgFund from '@/public/images/bgs/fund-banner.jpg';
import bgFunAlt from '@/public/images/bgs/hero-funds.png';

import Carousel from './Carousel';
import { slugify } from '@/utils/utils';
import Logo from './Logo';

import Marquee from 'react-fast-marquee';
// import { he } from 'date-fns/locale';
import LocalNav from './LocalNav';
import Container from './Container';
import BgImage from './BgImage';

interface ServiceHeroProps {
  page: Service | Solution;
  postType?: 'service' | 'solution';
  logo?: any;
}

const ServiceHero: React.FC<ServiceHeroProps> = ({ page, postType, logo }) => {
  const { title, content } = page;
  const containerRef = useRef<HTMLDivElement>(null);

  const logoUrl =
    postType === 'service' && 'serviceDetails' in page
      ? page?.serviceDetails?.icon?.node?.sourceUrl
      : undefined;

  return (
    <div className='relative pb-4 md:pb-10'>
      <BgImage imageNumber={2} />
      <Container>
        <div
          ref={containerRef}
          className='relative md:p-12 md:h-screen px-4 pt-48 pb-10  md:max-h-[34rem] rounded-b-lg md:rounded-b-xl flex flex-col md:flex-row md:items-end bg-white'
        >
          <div className='md:w-2/3 md:pr-16'>
            <p className='mb-4 label md:mb-10 opacity-70'>
              {postType === 'service' ? 'Platform' : 'Solution'} /
            </p>
            <div className='flex items-center gap-4 md:gap-6'>
              {logoUrl && (
                <div className='w-10 h-10 md:w-14 rounded-xs md:h-14 bg-orange'>
                  <img src={logoUrl} alt={`${title} logo`} />
                </div>
              )}
              <h1 dangerouslySetInnerHTML={{ __html: title || '' }} />
            </div>
          </div>

          <div
            className='mt-6 md:flex-1 md:mt-0 body-large-wrap text-content'
            dangerouslySetInnerHTML={{ __html: content || '' }}
          />
        </div>
      </Container>
    </div>
  );
};

export default ServiceHero;
