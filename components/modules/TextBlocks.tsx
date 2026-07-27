import cn from 'classnames';

import React from 'react';
import Container from '../Container';
import { ModulesModulesTextBlocksLayout } from '@/graphql/generated';
import Image from 'next/image';
import Logo from '../Logo';

interface TextBlocksProps {
  module: ModulesModulesTextBlocksLayout;
}

const TextBlocks: React.FC<TextBlocksProps> = ({ module }) => {
  const { header, textBlocks } = module;
  return (
    <Container>
      {header && (
        <div
          className='mb-10 text-center text-content md:mb-20'
          dangerouslySetInnerHTML={{ __html: header }}
        />
      )}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {textBlocks?.map((block, i) => {
          const content = block?.content;
          const image = block?.image;
          return (
            <div
              key={i}
              className={cn(
                'flex flex-col md:flex-row gap-4 p-6 md:py-12 rounded-lg md:p-4 bg-neutral-50',
                {
                  // 'md:items-center md:flex-row md:gap-10':
                }
              )}
            >
              {image && image.node && (
                <div className='w-1/2 md:w-1/3 md:px-4 md:flex md:flex-col md:justify-center md:items-center'>
                  <div>
                    <Logo logo={image.node} />
                  </div>
                </div>
              )}
              {content && (
                <div
                  className='md:w-2/3 body-small-wrap text-neutral-600 text-content'
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              )}
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default TextBlocks;
