import cn from 'classnames';

import React from 'react';
import Container from '../Container';
import {
  ModulesModulesSteps,
  ModulesModulesStepsLayout,
  Post,
} from '@/graphql/generated';
import Buttons from '../Buttons';
import { PostTypes } from '@/lib/types';
import BgImage from '../BgImage';
// import { Steps } from '@/graphql/generated';

import styles from './Steps.module.css';

interface StepsProps extends PostTypes {
  module: ModulesModulesStepsLayout;
}

const Steps: React.FC<StepsProps> = ({ module, postType }) => {
  const { header, steps, contentAlignment, buttons } = module;

  return (
    <div
      className={cn('relative', {
        // 'bg-ash': contentAlignment === 'top-center',
        'border-t border-neutral-100':
          (contentAlignment === 'left' && postType !== 'service') ||
          (contentAlignment === 'top-left' && postType === 'service'),
        'py-6 md:py-10':
          (contentAlignment === 'left' && postType === 'service') ||
          contentAlignment === 'top-center',
        ' border-b border-neutral-100':
          contentAlignment === 'top-left' && postType === 'service',
      })}
    >
      {((contentAlignment === 'left' && postType === 'service') ||
        contentAlignment === 'top-center') && <BgImage imageNumber={2} />}

      <Container
        className='relative'
        bordered={
          contentAlignment === 'top-left' ||
          (contentAlignment === 'left' && postType === 'solution')
        }
      >
        <div
          className={cn({
            'bg-white md:py-18 md:px-12 rounded-lg md:rounded-xl':
              contentAlignment === 'top-center',
            'max-md: bg-white':
              contentAlignment === 'left' && postType === 'service',
          })}
        >
          <div
            className={cn(' max-md:px-4 max-md:pt-12', {
              // 'bg-white': contentAlignment === 'top-center',
              'md:pt-18 md:pb-30 md:px-12':
                contentAlignment === 'top-left' && postType === 'page',
              'md:flex': contentAlignment === 'left',
              'md:p-10 bg-white rounded-lg md:rounded-xl':
                contentAlignment === 'left' && postType === 'service',
              'max-md:pb-6':
                contentAlignment === 'left' && postType === 'solution',
            })}
          >
            {header && (
              <div
                className={cn('max-md:mb-8 text-content max-w-xl ', {
                  'text-center mx-auto': contentAlignment === 'top-center',
                  'md:w-1/3 md:border-r border-neutral-100':
                    contentAlignment === 'left',
                  'md:py-12 md:px-12':
                    contentAlignment === 'left' && postType !== 'service',
                  'md:pr-30 md:pb-12':
                    contentAlignment === 'left' && postType === 'service',
                  'md:pt-18 md:pl-10 md:pb-12':
                    contentAlignment === 'top-left' && postType === 'service',
                  'body-large-wrap': postType === 'service',
                })}
                dangerouslySetInnerHTML={{ __html: header }}
              />
            )}
            {steps && steps.length > 0 && (
              <ul
                className={cn(
                  'max-md:border-t max-md:border-l max-md:border-r max-md:border-neutral-100 flex md:flex-wrap flex-col md:flex-row',
                  {
                    'bg-white md:mt-12':
                      contentAlignment === 'top-left' && postType === 'page',
                    'md:border-t md:border-l md:border-neutral-100':
                      contentAlignment === 'top-center',
                    'md:mt-18': contentAlignment === 'top-center',
                    'md:flex-1': contentAlignment === 'left',
                    'md:border-t md:border-neutral-100':
                      contentAlignment === 'top-left' && postType === 'service',
                    'md:border-t md:border-b md:border-neutral-100':
                      contentAlignment === 'left' && postType === 'service',
                  },
                )}
              >
                {steps.map((step, i) => {
                  if (!step) return null;
                  const { title, content } = step;
                  return (
                    <li
                      key={i}
                      className={cn(
                        styles.step,
                        'max-md:border-b max-md:border-neutral-100 md:py-12 px-8 py-10 md:px-12',
                        {
                          'md:border-r border-neutral-100':
                            contentAlignment === 'top-left' &&
                            postType === 'page',
                          'md:border-r md:border-b border-neutral-100 ':
                            contentAlignment === 'top-center',
                          'md:border-r-0':
                            (contentAlignment === 'top-left' &&
                              // postType === 'service' &&
                              (i + 1) % 3 === 0) ||
                            (contentAlignment === 'left' &&
                              postType === 'solution' &&
                              (i + 1) % 2 === 0),
                          'md:w-1/3': contentAlignment !== 'left',
                          'md:w-1/2': contentAlignment === 'left',
                          // no bottom boder for last row
                          ' md:border-neutral-100 md:border-r md:border-b':
                            contentAlignment === 'left' ||
                            (contentAlignment === 'top-left' &&
                              postType === 'service'),
                          'md:border-b-0':
                            contentAlignment === 'left' &&
                            steps.length % 2 === 0 &&
                            i >= steps.length - 2,
                          'md:border-b-0 md:border-r-0':
                            contentAlignment === 'left' &&
                            steps.length % 2 !== 0 &&
                            i === steps.length - 1,
                        },
                      )}
                    >
                      <p className='mb-8 label opacity-60'>
                        {(i + 1).toString().padStart(3, '0')}
                      </p>
                      <h3 className='h5'>
                        <strong
                          dangerouslySetInnerHTML={{ __html: title || '' }}
                        />
                      </h3>
                      {content && (
                        <div
                          className={cn('mt-4', styles.content)}
                          dangerouslySetInnerHTML={{ __html: content }}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          {buttons && buttons.length > 0 && (
            <div
              className={cn('pt-8 max-md:pb-8 md:pt-12', {
                'flex justify-center': contentAlignment === 'top-center',
                'flex justify-center md:pb-12':
                  contentAlignment === 'top-left' && postType === 'service',

                'md:absolute max-md:-mb-4 max-md:flex max-md:justify-center md:left-20 md:bottom-10':
                  contentAlignment === 'left' && postType === 'service',
              })}
            >
              <Buttons buttons={buttons} />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Steps;
