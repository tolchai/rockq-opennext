import { Link } from '@/graphql/generated';
import cn from 'classnames';

import React from 'react';
import WebinarCard from './WebinarCard';
import Carousel from './Carousel';

interface WebinarsProps {
  externalLinks: Link[];
  currentLocale: string;
}

const Webinars: React.FC<WebinarsProps> = ({
  externalLinks,
  currentLocale,
}) => {
  const currentDateTime = new Date();

  const upcomingWebinars = externalLinks.filter((link) => {
    if (!link.date) return false;
    const webinarDate = new Date(link.date); // Assuming 'date' is a string in ISO format
    return webinarDate >= currentDateTime;
  });

  const pastWebinars = externalLinks.filter((link) => {
    if (!link.date) return false;
    const webinarDate = new Date(link.date);
    return webinarDate < currentDateTime;
  });

  return (
    <div className='md:grid md:grid-cols-2 lg:flex md:gap-12 lg:gap-28'>
      {upcomingWebinars && upcomingWebinars.length > 0 && (
        <div className='mb-8 md:mb-0 lg:w-1/3'>
          <p className='mb-4 font-medium md:mb-8'>Upcoming Webinars</p>
          <div className='relative'>
            <WebinarCard
              webinar={upcomingWebinars[0]}
              currentLocale={currentLocale}
            />
            <span className='absolute top-0 hidden w-px h-full md:block md:-right-6 lg:-right-14 bg-neutral-100'></span>
          </div>
        </div>
      )}
      {pastWebinars && pastWebinars.length > 0 && (
        <div className='relative md:flex-1'>
          <p className='mb-4 font-medium md:mb-8'>Past Webinars</p>
          <div className='-mr-2 lg:-mr-36'>
            <Carousel
              effect='slide'
              loop={false}
              slidesPerView='auto'
              slideClassName='lg:w-[50%]! pr-2 md:pr-4 h-auto'
              withNavigation={true}
              navigationPosition='absolute'
            >
              {pastWebinars?.map((item, i) => {
                return (
                  <WebinarCard
                    webinar={item}
                    currentLocale={currentLocale}
                    key={i}
                  />
                );
              })}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default Webinars;
