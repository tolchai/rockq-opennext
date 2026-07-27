'use client';

import cn from 'classnames';

import React, { useTransition } from 'react';
import Container from '../Container';
import {
  GlobalSettings,
  ModulesModulesContactsLayout,
} from '@/graphql/generated';
import Image from 'next/image';

import MapPin from '@/public/images/ui/map-pin.svg';
import Button from '../Button';
import Social from '../Social';

interface ContactsProps {
  module: ModulesModulesContactsLayout;
  options: GlobalSettings;
}

const Contacts: React.FC<ContactsProps> = ({ module, options }) => {
  const { header } = module;
  const { map, email } = options;

  return (
    <Container bordered>
      <div className='grid grid-cols-1 gap-8 px-4 pb-10 pt-18 md:pb-12 md:px-12 md:grid-cols-2'>
        <div>
          {header && (
            <div
              className='mb-8 md:mb-16 body-large-wrap text-content'
              dangerouslySetInnerHTML={{ __html: header }}
            />
          )}
          <div className='md:flex md:gap-16'>
            <div>
              <h2 className='mb-2 uppercase text-12 text-neutral-600 md:mb-8 label'>
                Address
              </h2>
              {map?.address && (
                <p
                  className='text-black whitespace-pre-wrap body-large'
                  dangerouslySetInnerHTML={{ __html: map?.address || '' }}
                />
              )}
            </div>
            <div className='mt-8 md:mt-0'>
              <h2 className='mb-2 uppercase text-12 text-neutral-600 md:mb-8 label'>
                Email
              </h2>
              {email && (
                <a
                  href={`mailto:${email}`}
                  className='text-black body-large hover:underline'
                >
                  {email}
                </a>
              )}
            </div>
          </div>
          <div className='mt-8 md:mt-16'>
            <h2 className='mb-2 uppercase text-12 text-neutral-600 md:mb-8 label'>
              Follow Us
            </h2>
            <Social options={options} />
          </div>
          {/* <div>
            {map?.googleMapsLink && (
              <Button
                type='link'
                href={map?.googleMapsLink || ''}
                label={'View on Google Maps'}
                color='black'
              />
            )}
          </div> */}
        </div>
        <div>
          <Image
            src={map?.mapImage?.node.sourceUrl || ''}
            alt={map?.mapImage?.node.altText || 'Map image'}
            width={map?.mapImage?.node.mediaDetails?.width || 300}
            height={map?.mapImage?.node.mediaDetails?.height || 300}
            className='block w-full'
          />
        </div>
      </div>
    </Container>
  );
};

export default Contacts;
