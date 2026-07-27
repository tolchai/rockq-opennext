import cn from 'classnames';

import React from 'react';
import Container from '../Container';
import { ModulesModulesServicesLayout, Service } from '@/graphql/generated';
import Link from 'next/link';
import Buttons from '../Buttons';

import Arrow from '@/public/images/ui/arrow.svg';

interface ServicesProps {
  module: ModulesModulesServicesLayout;
  services?: Service[];
}

const Services: React.FC<ServicesProps> = ({ module, services }) => {
  const { header, buttons } = module;
  return (
    <Container bordered={true} topBordered={true}>
      <div className='md:flex'>
        <div className='relative md:w-1/3 md:pb-18'>
          <div
            className={cn(
              'md:sticky border-b md:pt-18 md:pb-12  border-neutral-100 md:px-12 md:top-24',
            )}
          >
            {header && (
              <div className=' max-md:px-4 max-md:pb-8 max-md:pt-18'>
                <div
                  className='text-content'
                  dangerouslySetInnerHTML={{ __html: header }}
                />
              </div>
            )}
          </div>
        </div>
        <div className='md:w-2/3 md:border-l md:border-neutral-100 md:pb-18'>
          {services && services.length > 0 && (
            <ul>
              {services.map((service, index) => {
                if (!service) return null;

                return (
                  <li key={index} className='border-b border-neutral-100'>
                    <Link
                      href={service.uri || '#'}
                      className='relative block px-4 py-8 group md:flex md:items-center md:px-8 md:py-10'
                    >
                      <div className='absolute transition-opacity bg-white rounded-sm opacity-0 -inset-[1px] lg:group-hover:opacity-100'></div>
                      <div className='relative flex items-center gap-4 md:flex-1 md:gap-6'>
                        <div className='flex items-center transition-colors rounded-[0.1875rem] overflow-hidden justify-center w-10 h-10 lg:group-hover:bg-orange bg-orange md:bg-alabaster-200'>
                          {service.serviceDetails?.icon && (
                            <img
                              src={
                                service.serviceDetails.icon.node?.sourceUrl ||
                                ''
                              }
                              className='block w-full'
                              alt={service.title || ''}
                            />
                          )}
                        </div>
                        <div className='md:flex-1 md:flex md:items-center'>
                          <h3 className='h4 mobile-base md:flex-1'>
                            <strong
                              dangerouslySetInnerHTML={{
                                __html: service.title || '',
                              }}
                            />
                          </h3>
                          <p
                            className='md:flex-1 lg:pr-10'
                            dangerouslySetInnerHTML={{
                              __html:
                                service.serviceDetails?.menuSubheader || '',
                            }}
                          />
                        </div>
                      </div>
                      <span className='absolute items-center justify-center hidden w-10 h-10 text-white transition-opacity -translate-y-1/2 bg-black rounded-full opacity-0 lg:flex lg:group-hover:opacity-100 right-4 top-1/2'>
                        <span className='w-6'>
                          <Arrow />
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {buttons && buttons.length > 0 && (
            <div className='flex justify-center max-md:p-4 md:pt-12'>
              <Buttons buttons={buttons} />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Services;
