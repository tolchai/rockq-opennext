import cn from 'classnames';

import React from 'react';
import Container from '../Container';
import { ModulesModulesClientsLayout, Testimonial } from '@/graphql/generated';
import Logo from '../Logo';

interface ClientsProps {
  module: ModulesModulesClientsLayout;
}

const Clients: React.FC<ClientsProps> = ({ module }) => {
  const { header, clientItems } = module;
  return (
    <Container bordered>
      {header && (
        <div
          className='mb-8 body-large-wrap md:text-center pt-18 max-md:px-4 md:pt-30 md:mx-auto md:w-1/2 md:mb-18 text-content'
          dangerouslySetInnerHTML={{ __html: header }}
        />
      )}
      <div className='pb-6 md:pb-10'>
        <ul
          className={cn(
            'grid-cols-2 hidden md:grid lg:grid-cols-4 border-t border-neutral-100 md:flex-1',
          )}
        >
          {clientItems?.map((item, i) => {
            if (!item) return null;

            const classes = cn(
              'flex border-neutral-100 relative border-r border-b flex-col justify-center items-center md:aspect-video lg:aspect-[1.21/1]',
              {
                // 'md:max-lg:col-s'
                'md:max-lg:border-r-0': (i + 1) % 2 === 0,
                'lg:border-r-0': (i + 1) % 4 === 0,
              },
            );

            // Type-narrow the logo layout
            if (
              item.fieldGroupName ===
                'ModulesModulesClientItemsClientLogoLayout' &&
              'clientLogoImage' in item &&
              item.clientLogoImage?.node
            ) {
              return (
                <li key={i} className={classes}>
                  <div className='md:max-lg:scale-150'>
                    <Logo logo={item.clientLogoImage.node} />
                  </div>
                </li>
              );
            }

            // Type-narrow the testimonial layout
            if (
              item.fieldGroupName ===
                'ModulesModulesClientItemsClientTestimonialLayout' &&
              'testimonialReference' in item
            ) {
              const testimonialNode = item.testimonialReference?.nodes?.[0];
              const testimonial =
                testimonialNode?.__typename === 'Testimonial'
                  ? (testimonialNode as Testimonial)
                  : null;

              if (!testimonial) return null;

              const hasNumber = testimonial.testimonialDetails?.withNumber;

              return (
                <li
                  key={i}
                  className={cn(classes, {
                    group: hasNumber,
                  })}
                >
                  <div
                    className={cn('md:px-12', {
                      'group-hover:opacity-0 transition-opacity': hasNumber,
                    })}
                  >
                    <p
                      dangerouslySetInnerHTML={{
                        __html: testimonial.content || '',
                      }}
                    />
                    <p
                      className='font-semibold md:mt-6'
                      dangerouslySetInnerHTML={{
                        __html:
                          '&mdash; ' +
                          (testimonial.testimonialDetails?.author?.name || '') +
                          (testimonial.testimonialDetails?.author?.company
                            ? `, ${testimonial.testimonialDetails.author.company}`
                            : ''),
                      }}
                    />
                  </div>
                  {hasNumber && (
                    <div className='absolute text-center transition-opacity opacity-0 group-hover:opacity-100 top-1/2 left-1/2 -translate-1/2'>
                      <p className='h2'>
                        <strong
                          dangerouslySetInnerHTML={{
                            __html:
                              testimonial.testimonialDetails?.number?.value ||
                              '',
                          }}
                        />
                      </p>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            testimonial.testimonialDetails?.number?.label || '',
                        }}
                      />
                    </div>
                  )}
                </li>
              );
            }

            return null;
          })}
        </ul>
      </div>
    </Container>
  );
};

export default Clients;
