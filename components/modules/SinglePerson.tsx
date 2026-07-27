'use client';

import cn from 'classnames';

import React, { useState } from 'react';
import Container from '../Container';
import { ModulesModulesSinglePersonLayout } from '@/graphql/generated';
import Image from 'next/image';

import Plus from '@/public/images/ui/plus.svg';
import TeamOverlay from '../TeamOverlay';
import Modal from '../Modal';

interface SinglePersonProps {
  module: ModulesModulesSinglePersonLayout;
}

const SinglePerson: React.FC<SinglePersonProps> = ({ module }) => {
  const { header, backgroundImage, selectedPerson } = module;

  const displayedAuthor = {
    name: selectedPerson?.nodes[0]?.title || '',
    position: selectedPerson?.nodes[0]?.personDetails?.position || '',
    portrait: selectedPerson?.nodes[0]?.featuredImage,
    bio: selectedPerson?.nodes[0]?.personDetails?.bio || '',
  };

  const [openedDetail, setOpenedDetail] = useState<boolean>(false);

  return (
    <Container verticalPadding={false} horizontalPadding={false}>
      <div
        className={cn(
          'rounded-xl max-md:aspect-[1/1.2] overflow-hidden relative',
          {}
        )}
      >
        {backgroundImage?.node.sourceUrl && (
          <div className='max-md:absolute max-md:inset-0'>
            <Image
              src={backgroundImage.node.sourceUrl}
              width={backgroundImage.node.mediaDetails?.width || 0}
              height={backgroundImage.node.mediaDetails?.height || 0}
              alt=''
              // layout='fill'
              // objectFit='cover'
              className='object-cover w-full h-full'
            />
          </div>
        )}

        <div
          className={cn(
            'md:absolute md:inset-0 h-full relative justify-end flex flex-col gap-6 md:flex-row md:items-end md:justify-between px-4 pt-8 pb-4 md:px-12 md:py-12',
            {}
          )}
        >
          {header && (
            <div
              className={cn('text-content text-white', {})}
              dangerouslySetInnerHTML={{ __html: header }}
            ></div>
          )}
          <div>
            <div className='flex items-center gap-4 p-2 bg-white rounded-lg md:gap-6'>
              {displayedAuthor.portrait?.node.sourceUrl && (
                <div className='w-12 h-12 overflow-hidden rounded-lg md:w-14 md:h-14'>
                  <Image
                    src={displayedAuthor.portrait.node.sourceUrl}
                    width={
                      displayedAuthor.portrait.node.mediaDetails?.width || 0
                    }
                    height={
                      displayedAuthor.portrait.node.mediaDetails?.height || 0
                    }
                    alt=''
                    // layout='fill'
                    // objectFit='cover'
                    className='object-cover w-full h-full'
                  />
                </div>
              )}
              <div className='pr-4 flex-1'>
                {displayedAuthor.name && (
                  <p
                    className='md:font-medium'
                    dangerouslySetInnerHTML={{ __html: displayedAuthor.name }}
                  />
                )}
                {displayedAuthor.position && (
                  <p
                    className='text-12 text-neutral-600'
                    dangerouslySetInnerHTML={{
                      __html: displayedAuthor.position,
                    }}
                  />
                )}
              </div>
              {displayedAuthor.bio && (
                <span
                  className='flex items-center justify-center mr-2 transition-colors rounded-md cursor-pointer w-10 h-10  hover:bg-green-light-hover group bg-green-light'
                  onClick={() => {
                    setOpenedDetail(true);
                  }}
                >
                  <span className='block w-full transition-transform group-hover:-rotate-90'>
                    <Plus />
                  </span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        height='small'
        open={openedDetail}
        onClose={() => setOpenedDetail(false)}
      >
        {openedDetail && <TeamOverlay item={selectedPerson?.nodes[0]} />}
      </Modal>
    </Container>
  );
};

export default SinglePerson;
