'use client';

import cn from 'classnames';

import React, { useState } from 'react';
import Container from '../Container';
import { ModulesModulesFaqsLayout } from '@/graphql/generated';

import Plus from '@/public/images/ui/plus.svg';

interface FAQsProps {
  module: ModulesModulesFaqsLayout;
}

const FAQs: React.FC<FAQsProps> = ({ module }) => {
  const { header, faqs } = module;

  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <Container bordered>
      <div className='flex flex-col pb-10 md:px-12 pt-18 max-md:px-4 md:py-18 md:flex-row'>
        {header && (
          <div className='md:w-1/3 max-md:mb-3 text-content'>
            <p className='label'>FAQ</p>
          </div>
        )}
        <div className='md:flex-1'>
          <div className='mb-8 md:mb-12'>
            {header && (
              <h2 className='h3'>
                <strong dangerouslySetInnerHTML={{ __html: header }} />
              </h2>
            )}
          </div>
          {faqs && faqs.length > 0 && (
            <ul className='md:-mt-4'>
              {faqs.map((item, i) => {
                const { question, answer } = item;
                return (
                  <li
                    key={i}
                    className={cn(' border-neutral-100 border-t')}
                    onClick={() => {
                      if (i === activeIndex) {
                        setActiveIndex(-1);
                      } else {
                        setActiveIndex(i);
                      }

                      // setTimeout(() => {
                      //   ScrollTrigger.refresh();
                      // }, 300);
                    }}
                  >
                    <div className='flex items-center gap-4 py-4 cursor-pointer group'>
                      <p
                        className='flex-1 text-black text-18'
                        dangerouslySetInnerHTML={{ __html: question }}
                      />
                      <span className='flex items-center justify-center w-10 h-10 rounded-full bg-alabaster-200'>
                        <span
                          className={cn('w-6 transition-transform', {
                            ['rotate-45']: i === activeIndex,
                          })}
                        >
                          <Plus />
                        </span>
                      </span>
                    </div>
                    <div
                      className={cn(
                        'grid overflow-hidden transition-all duration-300',
                        {
                          ['grid-rows-[0fr]']: i !== activeIndex,
                          ['grid-rows-[1fr]']: i === activeIndex,
                        },
                      )}
                    >
                      <div className={cn('overflow-hidden')}>
                        <div
                          className='pb-6 pr-10 md:pr-16 text-neutral-700 text-content'
                          dangerouslySetInnerHTML={{ __html: answer }}
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </Container>
  );
};

export default FAQs;
