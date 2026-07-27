import cn from 'classnames';

import React from 'react';
import Container from '../Container';
import { ModulesModulesAboutLayout } from '@/graphql/generated';
import Image from 'next/image';

interface AboutProps {
  module: ModulesModulesAboutLayout;
}

const About: React.FC<AboutProps> = ({ module }) => {
  const { header, contentHTML, points } = module;

  return (
    <Container background='platinum'>
      <div className='grid grid-cols-1 gap-6 mb-20 md:mb-24 md:grid-cols-2'>
        {header && (
          <div>
            <h2 dangerouslySetInnerHTML={{ __html: header }} />
          </div>
        )}
        <div
          className={cn('text-content body-big-wrap text-[#929698] ')}
          dangerouslySetInnerHTML={{ __html: contentHTML }}
        ></div>
      </div>
      <ul className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        {points?.map((point, i) => {
          const { title, content, illustration } = point;
          return (
            <li
              key={i}
              className={cn(
                'md:px-14 flex gap-8 md:gap-20 rounded-lg flex-col p-8 md:py-16',
                {
                  'bg-neutral-900 text-white': i === 0,
                  'bg-neutral-300': i === 3,
                  'bg-neutral-50': i === 1 || i === 2,
                  'max-md:order-3': i === 2,
                }
              )}
            >
              {illustration?.node.sourceUrl && (
                <div
                  className={cn('max-md:-mx-8', {
                    'md:order-2': i === 1 || i === 3,
                  })}
                >
                  <Image
                    src={illustration.node.sourceUrl}
                    width={illustration.node.mediaDetails.width}
                    height={illustration.node.mediaDetails.height}
                    alt=''
                    // layout='responsive'
                    className='block w-full'
                  />
                </div>
              )}
              <div className='max-md:pb-8'>
                <h3
                  className='mb-8'
                  dangerouslySetInnerHTML={{ __html: title }}
                />
                <div
                  className={cn('text-content opacity-80')}
                  dangerouslySetInnerHTML={{ __html: content }}
                ></div>
              </div>
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default About;
