import cn from 'classnames';

import React from 'react';
import Container from '../Container';
import { ModulesModulesGalleryLayout } from '@/graphql/generated';
import Carousel from '../Carousel';
import Image from 'next/image';

interface GalleryProps {
  module: ModulesModulesGalleryLayout;
}

const Gallery: React.FC<GalleryProps> = ({ module }) => {
  const { images } = module;

  if (!images || images.nodes.length === 0) {
    return null;
  }

  return (
    <Container
      verticalPadding={false}
      horizontalPadding={false}
      className='relative'
    >
      <Carousel
        effect='slide'
        loop={true}
        className='overflow-hidden rounded-xl'
        // slidesPerView='auto'
        autoPlay={true}
        // slideClassName='md:w-2/5 md:w-[33.33%]! lg:w-[25%]! max-md:w-[80%]! pr-2 md:pr-4 h-auto'
        withNavigation={true}
        withPagination={true}
        navigationClasses='absolute right-4 bottom-4 md:right-8 md:bottom-8'
        navigationBackground='dark'
        paginationClasses='absolute right-24 md:right-32 bottom-7 md:bottom-12'
      >
        {images.nodes?.map((item, i) => {
          return (
            <div className='aspect-square md:aspect-video' key={i}>
              <Image
                src={item?.sourceUrl || ''}
                alt={item?.altText || ''}
                width={item?.mediaDetails?.width || 800}
                height={item?.mediaDetails?.height || 800}
                className='object-cover w-full h-full'
              />
            </div>
          );
        })}
      </Carousel>
    </Container>
  );
};

export default Gallery;
