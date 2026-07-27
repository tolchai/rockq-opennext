import cn from 'classnames';

import React from 'react';
import Container from '../Container';
import {
  ModulesModulesTestimonialsLayout,
  Testimonial,
} from '@/graphql/generated';
import Carousel from '../Carousel';
import Image from 'next/image';

interface TestimonialsProps {
  module: ModulesModulesTestimonialsLayout;
}

const Testimonials: React.FC<TestimonialsProps> = ({ module }) => {
  const { header, selectedTestimonials } = module;
  return (
    <Container bordered>
      <div className='pb-10 pt-18 max-md:px-4 md:py-18'>
        {header && (
          <div
            className='mb-12 md:text-center md:w-1/3 text-content md:mx-auto'
            dangerouslySetInnerHTML={{ __html: header }}
          />
        )}

        {selectedTestimonials && selectedTestimonials.nodes.length > 0 && (
          <div className='relative px-4 py-8 bg-white rounded-xs md:w-4/5 lg:w-2/3 md:mx-auto md:p-10'>
            <div className='relative'>
              <Carousel
                effect='fade'
                autoPlay={true}
                // allowTouchMove={true}
                withPagination={true}
                withNavigation={true}
                slideClassName='h-full'
                // paginationClasses='right-4 bottom-4 md:bottom-8 md:right-8'
                // activeIndex={activeIndex}
              >
                {selectedTestimonials.nodes.map((testimonial, i) => {
                  if (!testimonial) return null;
                  const { content, testimonialDetails } =
                    testimonial as Testimonial;
                  return (
                    <div
                      key={i}
                      className='flex flex-col gap-6 pb-14 md:pb-32 md:gap-20 md:flex-row'
                    >
                      {content && (
                        <div
                          className='text-content md:flex-1 md:order-2 p-to-h3'
                          dangerouslySetInnerHTML={{ __html: content }}
                        />
                      )}
                      {testimonialDetails?.author && (
                        <div>
                          <div className='relative w-20 md:w-30'>
                            <Image
                              src={
                                testimonialDetails.author.photo?.node
                                  .sourceUrl || ''
                              }
                              alt=''
                              width={
                                testimonialDetails?.author?.photo?.node
                                  ?.mediaDetails?.width || 80
                              }
                              height={
                                testimonialDetails.author.photo?.node
                                  ?.mediaDetails?.height || 80
                              }
                              className='block object-cover w-full mb-3 aspect-square'
                            />
                          </div>
                          {testimonialDetails.author.name && (
                            <p
                              className='body-large'
                              dangerouslySetInnerHTML={{
                                __html: testimonialDetails.author.name,
                              }}
                            />
                          )}
                          {testimonialDetails.author.company && (
                            <p
                              className='label opacity-70'
                              dangerouslySetInnerHTML={{
                                __html: testimonialDetails.author.company,
                              }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Testimonials;
