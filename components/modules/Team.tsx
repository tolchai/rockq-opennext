'use client';

import cn from 'classnames';

import React, { useState } from 'react';
import Container from '../Container';
import { ModulesModulesTeamLayout } from '@/graphql/generated';
import Carousel from '../Carousel';
import Image from 'next/image';
import Modal from '../Modal';

import Plus from '@/public/images/ui/plus.svg';
import TeamOverlay from '../TeamOverlay';

interface TeamProps {
  module: ModulesModulesTeamLayout;
}

const Team: React.FC<TeamProps> = ({ module }) => {
  const { header, peopleRelationship: people, layout } = module;

  // const [openedDetail, setOpenedDetail] = useState(0);

  return (
    <div className='bg-alabaster-200'>
      <Container bordered>
        <div
          className={cn(
            'relative md:pt-12 md:px-12 md:pb-18 max-md:px-4 max-md:pt-18 max-md:pb-10 grid md:grid-cols-12',
            {},
          )}
        >
          {header && (
            <div
              className={cn(
                'text-content with-light-label max-md:mb-10 md:col-span-4',
                {},
              )}
              dangerouslySetInnerHTML={{ __html: header }}
            />
          )}
          <div className='relative md:col-span-7 md:col-start-6'>
            {people && people.nodes.length > 0 && (
              <div className='grid grid-cols-2 gap-x-4 md:gap-x-5 gap-y-6 md:gap-y-10 md:grid-cols-3'>
                {people.nodes?.map((item, i) => {
                  return (
                    <TeamSlide
                      key={i}
                      item={item}
                      // setOpenedDetail={setOpenedDetail}
                      i={i}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* <Modal
        height='small'
        open={openedDetail > 0}
        onClose={() => setOpenedDetail(0)}
      >
        {openedDetail > 0 && (
          <TeamOverlay item={people?.nodes[openedDetail - 1]} />
        )}
      </Modal> */}
      </Container>
    </div>
  );
};

// SLIDE/GRID ITEM

const TeamSlide = ({
  item,
  // setOpenedDetail,
  i,
}: {
  item: any;
  // setOpenedDetail: (value: number) => void;
  i: number;
}) => {
  const { title, featuredImage, personDetails } = item;
  return (
    <div
      // onClick={() => {
      //   setOpenedDetail(i + 1);
      // }}
      className='cursor-pointer group'
    >
      <div className='relative flex items-center justify-center p-2 bg-white md:p-6 aspect-square'>
        {featuredImage?.node.sourceUrl ? (
          <div className='absolute inset-0'>
            <Image
              src={featuredImage.node.sourceUrl}
              width={featuredImage.node.mediaDetails.width}
              height={featuredImage.node.mediaDetails.height}
              alt=''
              // layout='fill'
              // objectFit='cover'
              className='object-cover w-full h-full'
            />
            {/* <div className='absolute inset-0 bg-gradient-to-t from-black/60'></div> */}
          </div>
        ) : (
          <p className='h1'>
            {title
              .split(' ')
              .map((n: string) => n[0])
              .join('')
              .toUpperCase()}
          </p>
        )}
      </div>
      <div className='flex items-end justify-between gap-3 mt-3 md:relative'>
        <div className='relative flex-1'>
          <p
            className='body-large'
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p
            className='opacity-50 label'
            dangerouslySetInnerHTML={{ __html: personDetails.position }}
          />
        </div>
        {/* <span className='flex items-center justify-center w-10 h-10 transition-colors rounded-md cursor-pointer hover:bg-green-light-hover bg-green-light'>
          <span className='block w-full transition-transform group-hover:-rotate-90'>
            <Plus />
          </span>
        </span> */}
      </div>
    </div>
  );
};

// ROW

const TeamRow = ({
  item,
  setOpenedDetail,
  i,
}: {
  item: any;
  setOpenedDetail: (value: number) => void;
  i: number;
}) => {
  const { title, featuredImage, personDetails } = item;

  return (
    <div
      onClick={() => {
        setOpenedDetail(i + 1);
      }}
      className='flex items-center gap-4 cursor-pointer group md:gap-6'
    >
      <div className='flex items-center justify-center w-20 overflow-hidden bg-white rounded-sm aspect-square'>
        {featuredImage?.node.sourceUrl ? (
          <Image
            src={featuredImage.node.sourceUrl}
            width={featuredImage.node.mediaDetails.width}
            height={featuredImage.node.mediaDetails.height}
            alt=''
            // layout='fill'
            // objectFit='cover'
            className='object-cover w-full h-full'
          />
        ) : (
          <p className='text-18'>
            {title
              .split(' ')
              .map((n: string) => n[0])
              .join('')
              .toUpperCase()}
          </p>
        )}
      </div>
      <div className='flex items-end justify-between flex-1 gap-3 md:relative'>
        <div className='relative flex-1'>
          <p
            className='font-medium text-18'
            dangerouslySetInnerHTML={{ __html: title }}
          />
          <p
            className='text-neutral-600'
            dangerouslySetInnerHTML={{ __html: personDetails.position }}
          />
        </div>
        <span className='flex items-center justify-center w-10 h-10 transition-colors rounded-md cursor-pointer hover:bg-green-light-hover group bg-green-light'>
          <span className='block w-full transition-transform group-hover:-rotate-90'>
            <Plus />
          </span>
        </span>
      </div>
    </div>
  );
};

export default Team;
