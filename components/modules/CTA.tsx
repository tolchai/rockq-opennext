import cn from 'classnames';

import React from 'react';
import Container from '../Container';
import { ModulesModulesCtaLayout } from '@/graphql/generated';
import Buttons from '../Buttons';
import Image from 'next/image';

// import RichText from '../RichText';

interface CtaProps {
  module: ModulesModulesCtaLayout;
}

const Cta: React.FC<CtaProps> = ({ module }) => {
  const { content, image, buttons } = module;

  return (
    <Container
      background='powder'
      verticalPadding={false}
      horizontalPadding={false}
      className='p-2 md:p-4'
    >
      <div className='flex flex-col gap-8 md:gap-12 md:flex-row'>
        <div className='relative max-md:p-4 md:px-12 md:py-8 md:flex-1 md:flex md:flex-col'>
          {content && (
            <div
              className='text-content'
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          )}
          {buttons && buttons?.length > 0 && (
            <div className='mt-8 md:mt-auto'>
              <Buttons buttons={buttons} color='green' />
            </div>
          )}
        </div>
        {image?.node?.sourceUrl && (
          <div className='md:w-1/3 lg:w-1/4'>
            <div className='overflow-hidden rounded-sm aspect-square'>
              <Image
                src={image.node.sourceUrl}
                alt=''
                width={image.node.mediaDetails?.width ?? 500}
                height={image.node.mediaDetails?.height ?? 500}
                className='object-cover w-full h-full'
              />
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Cta;
