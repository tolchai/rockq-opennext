'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP, ScrollTrigger);

import cn from 'classnames';

import React from 'react';

import { Fund } from '@/graphql/generated';
import Tags from './Tags';

import Image from 'next/image';

import bgFund from '@/public/images/bgs/fund-banner.jpg';
import Arrow from '@/public/images/ui/arrow.svg';
import Link from 'next/link';

interface FundCardProps {
  fund: Fund;
}

const FundCard: React.FC<FundCardProps> = ({ fund }) => {
  const { slug, fundDetails } = fund;
  const fundType = fundDetails?.fundType;
  const withDetailLink = fundDetails?.withDetailLink;
  // const shortDescription = fundDetails?.shortDescription;

  const classes = cn(
    'relative block overflow-hidden group transition-colors rounded-lg',
    {
      'bg-green': fundType === 'main',
      // 'bg-white': fundType === 'sub',
      'hover:bg-neutral-90 hover:text-white': withDetailLink,
    }
  );

  if (withDetailLink && slug) {
    return (
      <Link
        // locale={undefined}
        href={`/fund/${slug}`}
        className={classes}
      >
        <FundCardContent fund={fund} />
      </Link>
    );
  } else {
    return (
      <div className={classes}>
        <FundCardContent fund={fund} />
      </div>
    );
  }
};

const FundCardContent: React.FC<FundCardProps> = ({ fund }) => {
  const { title, fundDetails } = fund;
  const fundTags = fundDetails?.fundTags;
  const fundType = fundDetails?.fundType;
  const netAssetValue = fundDetails?.netAssetValue;

  const containerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.set('.a-bg', { width: 0 });
      gsap.set('.a-content', { opacity: 0 });

      gsap.to('.a-bg', {
        width: '100%',
        duration: 1,
        // opacity: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.a-bg',
          start: 'top 80%',
          end: 'bottom 20%',
          // toggleActions: 'play none none reverse',
        },
      });

      gsap.to('.a-content', {
        opacity: 1,
        duration: 1,
        // opacity: 0,
        delay: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.a-content',
          start: 'top 80%',
          end: 'bottom 20%',
          // toggleActions: 'play none none reverse',
        },
      });
    },
    {
      scope: containerRef,
    }
  );

  return (
    <div ref={containerRef}>
      {fundType === 'sub' && (
        <div className='absolute inset-0 bg-white a-bg'></div>
      )}
      <div className='relative p-4 a-content lg:flex lg:items-end md:gap-4 md:p-8'>
        {fundDetails?.withDetailLink && (
          <div className='absolute inset-0 transition-opacity opacity-0 group-hover:opacity-100 bg-neutral-900'>
            <Image
              src={bgFund}
              alt=''
              placeholder='blur'
              width={2784}
              height={1620}
              className='object-cover w-full h-full opacity-80'
            />
          </div>
        )}
        <div
          className={cn('relative flex-1 lg:flex lg:flex-col ', {
            'lg:min-h-56': fundDetails?.fundType === 'main',
          })}
        >
          {title && (
            <h3
              className='mb-6 uppercase mobile-br h2 md:mb-10 lg:min-h-[2.2em]'
              dangerouslySetInnerHTML={{
                __html: title.replace(/ /g, '<br>'),
              }}
            />
          )}
          {fundTags && fundTags.length > 0 && (
            <Tags tags={fundTags} className='mt-auto' />
          )}
        </div>
        {netAssetValue && (
          <div className='lg:text-right max-lg:mt-12 max-lg:pr-12'>
            <p className='label text-neutral-600'>Net asset value</p>
            <p
              className='h3'
              dangerouslySetInnerHTML={{ __html: netAssetValue }}
            />
          </div>
        )}
        {fundDetails?.withDetailLink && (
          <span className='absolute flex items-center justify-center w-10 h-10 mt-2 transition-opacity rounded-sm lg:group-hover:opacity-100 lg:opacity-0 right-4 bottom-4 md:right-8 md:bottom-8 bg-green-light md:mt-4 text-neutral-900 '>
            <span className='w-4'>
              <Arrow />
            </span>
          </span>
        )}
      </div>
    </div>
  );
};

export default FundCard;
