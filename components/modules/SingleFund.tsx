import cn from 'classnames';

import React from 'react';
import Container from '../Container';
import { Fund, ModulesModulesSingleFundLayout } from '@/graphql/generated';
import Tags from '../Tags';
import Button from '../Button';
import Image from 'next/image';

import bgFund from '@/public/images/bgs/fund-ra-main.png';
import Link from 'next/link';

interface SingleFundProps {
  module: ModulesModulesSingleFundLayout;
}

const SingleFund: React.FC<SingleFundProps> = ({ module }) => {
  const { header, fund } = module;

  if (!fund || fund.nodes?.length === 0) return null;

  const mainFund = fund.nodes[0] as Fund;

  if (!mainFund) return null;

  return (
    <Container verticalPadding={false} horizontalPadding={false}>
      <div className='gap-8 p-2 bg-neutral-50 rounded-xl md:p-8 md:flex-col lg:flex-row md:flex lg:gap-12'>
        {header && (
          <div
            className='mb-2 md:mb-0 max-md:w-2/3 md:w-48 max-md:pt-8 max-md:p-4 text-neutral-600 body-large-wrap'
            dangerouslySetInnerHTML={{ __html: header }}
          />
        )}
        <div className='md:flex-1'>
          <Link href={`/fund/${mainFund.slug}`} className='group'>
            <div className={cn('flex flex-col md:flex-row gap-2')}>
              <div className='relative md:w-1/2 transition-all duration-500 lg:group-hover:w-[55%] overflow-hidden rounded-lg flex flex-col group-hover:bg-black group-hover:text-white justify-between px-4 py-8 md:px-6 bg-green md:h-[32rem]'>
                <div className='absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100'>
                  <Image
                    src={bgFund}
                    alt=''
                    placeholder='blur'
                    className='object-cover w-full h-full'
                  />
                </div>
                <div className='relative'>
                  {mainFund.title && (
                    <h3
                      className='uppercase mobile-br h1'
                      dangerouslySetInnerHTML={{
                        __html: mainFund.title.replace(/ /g, '<br>'),
                      }}
                    />
                  )}
                  {mainFund.fundDetails?.fundTags &&
                    mainFund.fundDetails.fundTags.length > 0 && (
                      <Tags
                        tags={mainFund.fundDetails.fundTags}
                        className='mt-6 md:mt-10'
                        background='green'
                      />
                    )}
                </div>
                <div className='relative flex items-end justify-between gap-4 max-md:mt-20'>
                  <Button
                    type='faux'
                    groupHover='green'
                    label={t('explore')}
                    color='black'
                  />
                </div>
              </div>
              <div className='relative hidden bg-black rounded-lg md:flex-col md:flex-1 md:flex md:p-8'>
                <div className='absolute inset-6 bg-dots-white'></div>
                {mainFund.fundDetails?.heroDisplay === 'records' && (
                  <ul className='relative text-white'>
                    {mainFund.fundDetails?.trackRecord?.map((item, i) => {
                      if (!item) return null;
                      const { label, value } = item;
                      return (
                        <li
                          key={i}
                          className='pt-6 border-t first:border-t-0 first:pt-0 mb-9 border-white/30 md:mb-12 last:mb-0'
                        >
                          {label && (
                            <p
                              className='mb-4 label text-neutral-300'
                              dangerouslySetInnerHTML={{ __html: label }}
                            />
                          )}
                          {value && (
                            <p
                              className='mb-6 leading-none font-head text-56'
                              dangerouslySetInnerHTML={{ __html: value }}
                            />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
                {(mainFund.content ||
                  mainFund.fundDetails?.shortDescription) && (
                  <div
                    className='relative text-neutral-300 md:mt-auto md:w-1/2 lg:w-64'
                    dangerouslySetInnerHTML={
                      mainFund.fundDetails?.shortDescription
                        ? {
                            __html: mainFund.fundDetails?.shortDescription,
                          }
                        : { __html: mainFund.content ?? '' }
                    }
                  />
                )}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default SingleFund;
