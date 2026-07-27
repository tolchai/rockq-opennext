import { parseISO, format } from 'date-fns';

import cn from 'classnames';

import React from 'react';

import MapPin from '@/public/images/ui/map-pin.svg';

import { GlobalSettings, Opportunity, Post } from '@/graphql/generated';
import Image from 'next/image';
import BackButton from './BackButton';
import Container from './Container';
import Button from './Button';

interface OpportunityFooterProps {
  options: GlobalSettings;
}

const OpportunityFooter: React.FC<OpportunityFooterProps> = ({ options }) => {
  const {
    opportunitiesContactPerson,
    opportunitiesContactEmail,
    opportunitiesContactImage,
    map,
  } = options;

  return (
    <Container
      verticalPadding={false}
      horizontalPadding={false}
      className='mt-2 md:mt-4'
    >
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div className='gap-4 p-6 rounded-lg bg-neutral-50 md:py-12 md:px-16'>
          <div className='flex gap-4 pb-4 mb-4 border-b last:m-0 last:pb-0 last:border-0 border-neutral-100 md:gap-6'>
            {opportunitiesContactImage?.node.sourceUrl && (
              <div className='w-1/3'>
                <div className='aspect-[1/1.2]'>
                  <Image
                    src={opportunitiesContactImage.node.sourceUrl}
                    alt={
                      opportunitiesContactImage.node.altText ||
                      'Media contact image'
                    }
                    width={
                      opportunitiesContactImage.node.mediaDetails?.width || 300
                    }
                    height={
                      opportunitiesContactImage.node.mediaDetails?.height || 300
                    }
                    className='object-cover w-full h-full rounded-sm'
                  />
                </div>
              </div>
            )}
            <div className='flex flex-col w-2/3 py-2 md:py-3'>
              <div>
                <p className='tag tag--platinum'>HR</p>
              </div>
              <div className='mt-auto'>
                <p
                  className='font-medium text-18'
                  dangerouslySetInnerHTML={{
                    __html: opportunitiesContactPerson || '',
                  }}
                ></p>
                {opportunitiesContactEmail && (
                  <p className='mt-1 truncate'>
                    <a
                      href={`mailto:${opportunitiesContactEmail}`}
                      className=' text-neutral-600'
                    >
                      {opportunitiesContactEmail}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='relative p-4 overflow-hidden rounded-lg max-md:aspect-square'>
          <div className='absolute inset-0'>
            <Image
              src={map?.mapImage?.node.sourceUrl || ''}
              alt={map?.mapImage?.node.altText || 'Map image'}
              width={map?.mapImage?.node.mediaDetails?.width || 300}
              height={map?.mapImage?.node.mediaDetails?.height || 300}
              className='object-cover w-full h-full'
            />
          </div>
          <div className='relative flex flex-col gap-4 px-4 py-5 rounded-sm md:justify-between md:items-center md:flex-row bg-white/70 backdrop-blur-md md:p-8'>
            <div>
              <h2 className='mb-2 label'>Office</h2>
              {map?.address && (
                <p className='h5'>
                  <a
                    href={map?.googleMapsLink || ''}
                    target='_blank'
                    rel='noreferrer'
                    dangerouslySetInnerHTML={{ __html: map?.address || '' }}
                  />
                </p>
              )}
            </div>
            <div>
              {map?.googleMapsLink && (
                <Button
                  type='link'
                  href={map?.googleMapsLink || ''}
                  label={'Show on Google Maps'}
                  color='black'
                />
              )}
            </div>
          </div>
          <span className='absolute w-12 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
            <MapPin />
          </span>
        </div>
      </div>
    </Container>
  );
};

export default OpportunityFooter;
