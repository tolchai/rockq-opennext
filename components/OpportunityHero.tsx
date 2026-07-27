import { parseISO, format } from 'date-fns';

import cn from 'classnames';

import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

import React from 'react';

import { Opportunity, OpportunityCompany, Post } from '@/graphql/generated';
import Image from 'next/image';
import BackButton from './BackButton';
import Button from './Button';

import Arrow from '@/public/images/ui/arrow.svg';

interface OpportunityHeroProps {
  page: Opportunity;
}

const OpportunityHero: React.FC<OpportunityHeroProps> = ({ page }) => {
  const {
    title,
    opportunityTypes,
    opportunityLocations,
    opportunityDetails,
    opportunityCompanies,
  } = page;

  return (
    <div className='max-md:pt-1'>
      <div className='flex-1 px-6 lg:min-h-[calc(100vh-10.5rem)]  py-10 bg-white md:flex md:flex-col rounded-xl md:px-16 md:py-20'>
        <div>
          <div>
            <BackButton />
          </div>
          <h1 className='my-6 md:my-8 lg:w-3/4'>{title}</h1>
          <ul className='flex gap-2 mb-1'>
            {opportunityTypes?.nodes && opportunityTypes?.nodes.length > 0 && (
              <li className='text-14 text-neutral-600'>
                {opportunityTypes?.nodes.map((type) => type?.name).join(', ')}
              </li>
            )}
            {opportunityTypes?.nodes &&
              opportunityTypes?.nodes.length > 0 &&
              opportunityLocations?.nodes &&
              opportunityLocations?.nodes.length > 0 && (
                <li className='text-14 text-neutral-600'>•</li>
              )}

            {opportunityLocations?.nodes &&
              opportunityLocations?.nodes.length > 0 && (
                <li className='text-14 text-neutral-600'>
                  {opportunityLocations?.nodes
                    .map((location) => location?.name)
                    .join(', ')}
                </li>
              )}
          </ul>
        </div>
        {opportunityDetails?.externalUrl && (
          <div className='flex mt-6 md:mt-auto'>
            <Button
              type='link'
              href={opportunityDetails.externalUrl}
              label={t('sign_up')}
            />
          </div>
        )}
      </div>
      {opportunityCompanies && opportunityCompanies?.nodes.length > 0 && (
        <div className='flex flex-col gap-2 mt-2 '>
          {opportunityCompanies?.nodes.map(
            (company: OpportunityCompany, index) => {
              const { name, opportunityCompanyDetails } = company;

              const logo = company?.opportunityCompanyDetails?.logo?.node;
              return (
                <div
                  key={index}
                  className='flex items-center gap-3 py-2 pl-2 pr-4 bg-white rounded-lg max-md:flex-wrap'
                >
                  {logo?.sourceUrl && (
                    <div className='relative flex items-center justify-center w-16 h-16 p-2 shrink-0 bg-neutral-50'>
                      <Image
                        src={logo.sourceUrl}
                        alt={company.name || 'Company logo'}
                        className='h-auto max-w-full'
                        width={logo.mediaDetails.width}
                        height={logo.mediaDetails.height}
                        unoptimized={true}
                        style={{
                          objectFit: 'contain',
                          width:
                            logo.mimeType === 'image/svg+xml'
                              ? `${logo.mediaDetails.width / 12}rem`
                              : `${
                                  logo.mediaDetails.width /
                                  (logo.mediaDetails.width < 100 ? 12 : 28)
                                }rem`,
                        }}
                      />
                    </div>
                  )}
                  <p
                    className={cn('flex-1 font-semibold', {
                      'pl-1': !logo?.sourceUrl,
                    })}
                  >
                    {name}
                  </p>
                  {company?.opportunityCompanyDetails?.website && (
                    <a
                      className={cn(
                        'flex items-center gap-3 ml-auto group text-14'
                      )}
                      href={company.opportunityCompanyDetails.website}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      {t('visit_website')}
                      <span className='flex items-center justify-center w-10 h-10 transition-colors rounded-sm bg-green-light '>
                        <span className='w-4 transition-transform -rotate-45 group-hover:-translate-y-[0.1rem] group-hover:translate-x-[0.1rem]'>
                          <Arrow />
                        </span>
                      </span>
                    </a>
                  )}
                </div>
              );
            }
          )}
        </div>
      )}
    </div>
  );
};

export default OpportunityHero;
