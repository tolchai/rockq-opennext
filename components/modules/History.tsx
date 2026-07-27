import cn from 'classnames';

import React from 'react';
import Container from '../Container';
import { ModulesModulesHistoryLayout } from '@/graphql/generated';
import Carousel from '../Carousel';

interface HistoryProps {
  module: ModulesModulesHistoryLayout;
}

const History: React.FC<HistoryProps> = ({ module }) => {
  const { header, history } = module;

  const [activeIndex, setActiveIndex] = React.useState(0);

  // const handleActiveIndex = (index: number) => {
  //   setActiveIndex(index);
  // };

  return (
    <Container>
      <div className='relative'>
        {header && (
          <h2 className='mb-12' dangerouslySetInnerHTML={{ __html: header }} />
        )}
        <div className='relative'>
          <div className='max-md:-mr-4 md:-mr-20'>
            <Carousel
              effect='slide'
              loop={false}
              slidesPerView='auto'
              slideClassName='md:w-1/3! lg:w-[22%]! max-md:w-[80%]! h-auto'
              withNavigation={true}
              setActiveIndex={setActiveIndex}
              // activeIndex={activeIndex}
            >
              {history?.map((item, i) => {
                const { year, content } = item;
                return (
                  <div key={i} className='relative pt-1'>
                    <div className='relative pt-5 pr-6 border-t border-black/10'>
                      <span
                        className={cn(
                          'absolute transition-all left-0 h-2 -top-1',
                          {
                            'bg-black w-8': activeIndex === i,
                            ' bg-gray-mid  w-2': activeIndex !== i,
                          }
                        )}
                      ></span>
                      <p
                        className='mb-10 label'
                        dangerouslySetInnerHTML={{ __html: year }}
                      />
                      <div className={cn('text-content text-gray-dark')}>
                        <div
                          dangerouslySetInnerHTML={{ __html: content }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default History;
