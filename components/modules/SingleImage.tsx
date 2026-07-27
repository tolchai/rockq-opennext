import cn from 'classnames';

import React from 'react';
import Container from '../Container';
import { ModulesModulesSingleImageLayout } from '@/graphql/generated';
import Image from 'next/image';

interface SingleImageProps {
  module: ModulesModulesSingleImageLayout;
}

const SingleImage: React.FC<SingleImageProps> = ({ module }) => {
  const { image } = module;
  if (!image) return null;
  return (
    <div className='overflow-hidden rounded-xl'>
      <Image
        src={image.node.sourceUrl}
        width={image.node.mediaDetails?.width || 0}
        height={image.node.mediaDetails?.height || 0}
        alt=''
        // layout='fill'
        // objectFit='cover'
        className='block w-full'
      />
    </div>
  );
};

export default SingleImage;
