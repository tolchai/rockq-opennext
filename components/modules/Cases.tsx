import cn from 'classnames';

import React from 'react';
import Container from '../Container';
import {
  ModulesModulesCaseStudiesLayout,
  CaseStudy,
} from '@/graphql/generated';
import Carousel from '../Carousel';
import Image from 'next/image';
import BgImage from '../BgImage';
import Logo from '../Logo';

interface CasesProps {
  module: ModulesModulesCaseStudiesLayout;
}

const Cases: React.FC<CasesProps> = ({ module }) => {
  const { selectedCaseStudies } = module;
  return (
    <div className='relative py-6 md:py-10'>
      <BgImage imageNumber={2} />
      <Container>
        {selectedCaseStudies && selectedCaseStudies.nodes.length > 0 && (
          <div className='relative px-4 pb-10 bg-white md:rounded-xl pt-18 md:p-12'>
            <div className='relative max-md:pb-10'>
              <div className='mb-4 text-content md:mb-8'>
                <h2 className='label'>Case study</h2>
              </div>
              <Carousel
                effect='fade'
                autoPlay={true}
                // allowTouchMove={true}
                withPagination={false}
                withNavigation={true}
                slideClassName='h-full'
                navigationClasses='md:right-4 md:bottom-4'
                // paginationClasses='right-4 bottom-4 md:bottom-8 md:right-8'
                // activeIndex={activeIndex}
              >
                {selectedCaseStudies.nodes.map((caseStudy, i) => {
                  if (!caseStudy) return null;
                  const { content, caseStudyDetails, featuredImage } =
                    caseStudy as CaseStudy;
                  return (
                    <div key={i} className='max-md:pb-4'>
                      {content && (
                        <div
                          className='text-content md:w-2/3 p-to-h2'
                          dangerouslySetInnerHTML={{ __html: content }}
                        />
                      )}
                      <div className='flex gap-4 p-4 mt-8 md:ml-auto md:gap-5 md:w-1/3 bg-alabaster-100 md:mt-30'>
                        <div className='flex-1'>
                          <h3 className='mb-4 h5 md:mb-6'>
                            <strong>Problems solved</strong>
                          </h3>
                          {caseStudyDetails?.problemsSolved && (
                            <ul className='flex flex-col gap-5'>
                              {caseStudyDetails.problemsSolved.map(
                                (problem, idx) => (
                                  <li key={idx} className='flex'>
                                    <span className='mr-2 text-orange'>•</span>
                                    <span>{problem?.title}</span>
                                  </li>
                                ),
                              )}
                            </ul>
                          )}
                        </div>
                        <div className='w-20'>
                          <div className='flex items-center justify-center rounded-xs aspect-square'>
                            <div className='-mx-3'>
                              <Logo logo={featuredImage?.node} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Carousel>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Cases;
