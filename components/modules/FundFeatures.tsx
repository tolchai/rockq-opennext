'use client';

import cn from 'classnames';

import React, { useState } from 'react';
import Container from '../Container';
import { ModulesModulesFundFeaturesLayout } from '@/graphql/generated';
import Icon from '../Icon';

import Chevron from '@/public/images/ui/chevron.svg';
import Image from 'next/image';

import styles from './FundFeatures.module.css';

interface FundFeatures {
  module: ModulesModulesFundFeaturesLayout;
}

const FundFeatures: React.FC<FundFeatures> = ({ module }) => {
  const { header, features, image, withImageBackground } = module;

  const [openedDetail, setOpenedDetail] = useState<number>(0);

  return (
    <Container
      className='relative'
      // background={withImageBackground ? 'neutral-900' : 'transparent'}
    >
      <div
        className={cn({
          'grid grid-cols-1 gap-4 lg:grid-cols-2': withImageBackground,
        })}
      >
        {withImageBackground && image?.node?.sourceUrl && (
          <div className='relative aspect-square lg:aspect-[1/1.13] overflow-hidden rounded-xl'>
            <div className='absolute inset-0'>
              <Image
                src={image.node.sourceUrl}
                alt={image.node.altText || ''}
                width={image.node?.mediaDetails?.width || 500}
                height={image.node?.mediaDetails?.height || 500}
                unoptimized={image?.node?.mimeType === 'image/svg+xml'}
                className='object-cover w-full h-full'
              />
            </div>
          </div>
        )}
        <div
          className={cn('grid relative grid-cols-1 gap-4 md:gap-10', {
            'md:grid-cols-2': !withImageBackground,
            'py-8 md:px-12 md:flex md:flex-col md:py-16 bg-white rounded-xl overflow-hidden':
              withImageBackground,
          })}
        >
          {header && (
            <div className='relative'>
              <div
                className={cn('text-content mb-8 max-md:px-4', {
                  // 'md:mb-40': withImageBackground,
                  'md:sticky md:top-24': !withImageBackground,
                })}
                dangerouslySetInnerHTML={{ __html: header }}
              />
            </div>
          )}
          <ul
            className={cn('flex  flex-col gap-4', {
              'md:mt-auto max-md:px-4': withImageBackground,
            })}
          >
            {features?.map((feature, i) => {
              const icon = feature?.icon;
              const title = feature?.title;
              const description = feature?.description;
              return (
                <li
                  key={i}
                  className={cn('flex gap-5 md:gap-8 overflow-hidden', {
                    'p-6 backdrop-blur-md transition-colors rounded-lg md:px-8 md:py-10':
                      !withImageBackground,
                    'bg-neutral-50 text-neutral-900': !withImageBackground,
                    // 'bg-neutral-50/20 border-neutral-800':
                    //   withImageBackground && openedDetail !== i,
                    // 'border-neutral-50':
                    //   withImageBackground && openedDetail === i,
                    // border: withImageBackground,
                  })}
                >
                  {!withImageBackground && (
                    <div>
                      <div className='p-px rounded-lg bg-gradient-to-tl from-neutral-800 to-neutral-300'>
                        <div className='flex items-center justify-center w-12 h-12 text-white bg-black rounded-lg aspect-square'>
                          {icon && icon.length > 0 && (
                            <Icon icon={icon[0] as string} />
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className='flex-1'>
                    <div
                      onClick={() =>
                        setOpenedDetail(i === openedDetail ? -1 : i)
                      }
                      className={cn(
                        'flex items-center justify-between transition-[padding]',
                        {
                          'max-lg:pt-1':
                            openedDetail !== i && !withImageBackground,
                          'max-lg:pt-0':
                            openedDetail === i && !withImageBackground,
                          // 'lg:pt-1': openedDetail !== i && withImageBackground,
                          // 'lg:pt-0': openedDetail === i && withImageBackground,
                          'cursor-pointer': withImageBackground,
                        },
                      )}
                    >
                      <div className={cn('flex-1', {})}>
                        {title && (
                          <h3
                            className='h4'
                            dangerouslySetInnerHTML={{ __html: title }}
                          />
                        )}
                      </div>
                      <span
                        className={cn(
                          'flex items-center border border-neutral-200 rounded-sm justify-center w-8 h-8  md:w-9 md:h-9',
                          {
                            'lg:hidden': !withImageBackground,
                            // 'bg-neutral-900 text-white': withImageBackground,
                          },
                        )}
                      >
                        <span
                          className={cn('w-full transition-transform', {
                            'rotate-90': openedDetail !== i,
                            ['-rotate-90']: openedDetail === i,
                          })}
                        >
                          <Chevron />
                        </span>
                      </span>
                    </div>
                    <div
                      className={cn('grid overflow-hidden transition-all', {
                        'max-lg:grid-rows-[0fr]': openedDetail !== i,
                        'max-lg:grid-rows-[1fr]': openedDetail === i,
                        'lg:grid-rows-[0fr]':
                          openedDetail !== i && withImageBackground,
                        'lg:grid-rows-[1fr]':
                          openedDetail === i && withImageBackground,
                      })}
                    >
                      {description && (
                        <div className='overflow-hidden '>
                          <div
                            className={cn(styles.feature, ' text-neutral-600', {
                              'pt-3 md:pt-6': !withImageBackground,
                              'py-3 md:py-6': withImageBackground,
                            })}
                            dangerouslySetInnerHTML={{ __html: description }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default FundFeatures;
