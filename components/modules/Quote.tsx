'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP, ScrollTrigger);

import cn from 'classnames';

import React, { useRef, useState } from 'react';
import Container from '../Container';
import { ModulesModulesQuotesLayout } from '@/graphql/generated';
import Image from 'next/image';

import Plus from '@/public/images/ui/plus.svg';
import TeamOverlay from '../TeamOverlay';
import Modal from '../Modal';

interface QuoteProps {
  module: ModulesModulesQuotesLayout;
}

const Quote: React.FC<QuoteProps> = ({ module }) => {
  const {
    quote,
    authorType,
    authorSelect,
    author,
    position,
    image,
    imageLayout,
    portrait,
    withImage,
  } = module;

  const displayedAuthor =
    authorType === 'custom'
      ? {
          name: author || '',
          position: position || '',
          portrait: portrait,
        }
      : {
          name: authorSelect?.nodes[0]?.title || '',
          position: authorSelect?.nodes[0]?.personDetails?.position || '',
          portrait: authorSelect?.nodes[0]?.featuredImage,
          bio: authorSelect?.nodes[0]?.personDetails?.bio || '',
        };

  const [openedDetail, setOpenedDetail] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.a-quote', {
        y: 10,
        duration: 1,
        opacity: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.a-quote',
          start: 'top 80%',
          end: 'bottom 20%',
          // toggleActions: 'play none none reverse',
        },
      });

      gsap.from('.a-author', {
        y: 10,
        duration: 1,
        opacity: 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.a-author',
          start: 'top 80%',
          end: 'bottom 20%',
          // toggleActions: 'play none none reverse',
          delay: 0.2, // Small stagger delay
        },
      });
    },
    {
      scope: containerRef,
    },
  );

  return (
    <Container>
      <div
        ref={containerRef}
        className={cn('', {
          'bg-neutral-300': !withImage,
          'grid grid-cols-1 gap-2 md:gap-5 py-6 md:py-10 md:grid-cols-2':
            withImage && imageLayout === 'side',
        })}
      >
        {withImage && image?.node.sourceUrl && (
          <div
            className={cn({
              'max-md:absolute max-md:inset-0': imageLayout === 'background',
              'md:order-2 rounded-xs overflow-hidden ': imageLayout === 'side',
            })}
          >
            <Image
              src={image.node.sourceUrl}
              width={image.node.mediaDetails?.width || 0}
              height={image.node.mediaDetails?.height || 0}
              alt=''
              // layout='fill'
              // objectFit='cover'
              className='object-cover w-full h-full'
            />
          </div>
        )}

        <div
          className={cn('', {
            'flex flex-col justify-between h-full md:px-12 md:py-12 px-4 pt-18 pb-8  bg-white rounded-xs':
              withImage,
            'md:absolute relative md:inset-0  md:px-16 md:py-20':
              withImage && imageLayout === 'background',

            'p-6 md:p-16 lg:p-40 lg:pb-20': !withImage,
          })}
        >
          {quote && (
            <div
              className={cn('a-quote text-content p-to-h3 mobile-p-to-h4', {})}
              dangerouslySetInnerHTML={{ __html: quote }}
            ></div>
          )}
          {displayedAuthor && (
            <div className={cn('mt-12 md:mt-20 a-author', {})}>
              <div className='flex flex-col gap-4'>
                {displayedAuthor.portrait?.node.sourceUrl && (
                  <div className='relative w-12 h-12 md:w-30 md:h-30'>
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
                <div>
                  {displayedAuthor.name && (
                    <p
                      className='body-large'
                      dangerouslySetInnerHTML={{ __html: displayedAuthor.name }}
                    />
                  )}
                  {displayedAuthor.position && (
                    <p
                      className='label text-neutral-600'
                      dangerouslySetInnerHTML={{
                        __html: displayedAuthor.position,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        height='small'
        open={openedDetail}
        onClose={() => setOpenedDetail(false)}
      >
        {openedDetail && <TeamOverlay item={authorSelect?.nodes[0]} />}
      </Modal>
    </Container>
  );
};

export default Quote;
