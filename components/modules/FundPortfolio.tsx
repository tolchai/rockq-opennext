import cn from 'classnames';

import React from 'react';
import Container from '../Container';
import { ModulesModulesFundPortfolioLayout } from '@/graphql/generated';
import Image from 'next/image';
import Logo from '../Logo';
import { PostTypes } from '@/lib/types';

interface FundPortfolio extends PostTypes {
  module: ModulesModulesFundPortfolioLayout;
}

const FundPortfolio: React.FC<FundPortfolio> = ({ module, postType }) => {
  const { header, portfolioItems } = module;

  return (
    <Container
      bordered={postType === 'page' || postType === 'service'}
      topBordered
    >
      <div
        className={cn('flex flex-col', {
          'md:flex-row  md:pt-18 md:px-12 md:pb-30 ': postType === 'page',
        })}
      >
        {header && (
          <div
            className={cn({
              'md:pr-8 md:w-5/12 max-md:px-4 max-md:pb-10 max-md:pt-18':
                postType === 'page',
              'md:pt-18 md:pb-12 md:px-12 max-md:px-4 max-md:pb-10 max-md:pt-18 border-neutral-100':
                postType === 'service',
            })}
          >
            <div
              className={cn(
                'text-content text-content--slightly-reduced-margin body-large-wrap p-to-gray',
                {
                  'md:w-2/5': postType === 'service',
                },
              )}
              dangerouslySetInnerHTML={{ __html: header }}
            />
          </div>
        )}

        <ul
          className={cn(
            'grid grid-cols-2 border-t  border-neutral-100 md:flex-1',
            {
              'md:grid-cols-4 md:pb-10 pb-6 ': postType === 'service',
              'border-l': postType === 'page',
            },
          )}
        >
          {portfolioItems?.map((item, i) => {
            if (!item) return null;

            // if (!logo?.node) return null;

            const classes = cn(
              'flex border-neutral-100 relative border-r border-b flex-col justify-center items-center aspect-[1.21/1]',
              {
                'max-md:border-r-0 ': i % 2 === 1,
                'lg:border-r-0': (i + 1) % 4 === 0,
                // 'bg-neutral-50 ': !item.exited && item.logo?.node,
                // 'border-b-0':
                //   postType === 'service' &&
                //   portfolioItems &&
                //   i >= portfolioItems.length - 2,
                // 'md:border-b md:border-b-0':
                //   postType === 'service' &&
                //   portfolioItems &&
                //   i >= portfolioItems.length - 4,
              },
            );

            return (
              <li key={i}>
                {item.withUrl && item.url ? (
                  <a
                    href={item.url}
                    className={classes}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <FundPortfolioItemContent item={item} />
                  </a>
                ) : (
                  <div className={classes}>
                    <FundPortfolioItemContent item={item} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </Container>
  );
};

const FundPortfolioItemContent: React.FC<{ item: any }> = ({ item }) => {
  const { logo, exited } = item;

  return (
    <>
      <span
        className={cn('w-full', {
          'opacity-50': exited,
        })}
        // style={{
        //   width:
        //     mimeType === 'image/svg+xml'
        //       ? `${width / 12}rem`
        //       : `${width / (width < 100 ? 12 : 28)}rem`,
        // }}
      >
        {logo?.node ? (
          <Logo logo={logo.node} />
        ) : (
          <p className='w-full px-4 font-medium text-center text-14 text-neutral-600'>
            And many more
          </p>
        )}
      </span>
      {exited && (
        <span className='absolute px-2 py-1 leading-none rounded-sm text-12 right-4 top-4 bg-neutral-50'>
          Exited
        </span>
      )}
    </>
  );
};

export default FundPortfolio;
