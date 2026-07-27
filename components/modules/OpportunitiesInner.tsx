'use client';

import cn from 'classnames';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Container from '../Container';
import {
  ModulesModulesOpportunitiesLayout,
  Opportunity,
  OpportunityCategory,
} from '@/graphql/generated';

import Arrow from '@/public/images/ui/arrow-thin.svg';
import Link from 'next/link';

interface OpportunitiesInnerProps {
  module: ModulesModulesOpportunitiesLayout;
  opportunities?: Opportunity[];
  opportunityCategories?: OpportunityCategory[];
}

const OpportunitiesInner: React.FC<OpportunitiesInnerProps> = ({
  module,
  opportunities,
  opportunityCategories: categories,
}) => {
  const { header } = module;

  // Group opportunities by category
  const groupedOpportunities = React.useMemo(() => {
    if (!opportunities || !categories) return {};

    const groups: Record<string, Opportunity[]> = {};

    // Initialize groups for all categories
    categories.forEach((category) => {
      if (category.slug) {
        groups[category.slug] = [];
      }
    });

    // Add an "Uncategorized" group for opportunities without categories
    groups['uncategorized'] = [];

    // Group opportunities
    opportunities.forEach((opportunity) => {
      const opportunityCategories =
        opportunity.opportunityCategories?.nodes || [];

      if (opportunityCategories.length === 0) {
        groups['uncategorized'].push(opportunity);
      } else {
        opportunityCategories.forEach((category) => {
          if (category?.slug && groups[category.slug]) {
            groups[category.slug].push(opportunity);
          }
        });
      }
    });

    // Remove empty groups
    Object.keys(groups).forEach((key) => {
      if (groups[key].length === 0) {
        delete groups[key];
      }
    });

    return groups;
  }, [opportunities, categories]);

  return (
    <Container bordered={true} topBordered={true}>
      <div className='md:flex'>
        <div className='relative md:w-1/3 md:pb-18'>
          <div
            className={cn(
              'md:sticky border-b pb-10 pt-18 md:pb-12 px-4 border-neutral-100 md:px-12 md:top-24',
            )}
          >
            {header && (
              <div>
                <div
                  className='text-content'
                  dangerouslySetInnerHTML={{ __html: header }}
                />

                <p className='mt-5 opacity-50 body-large'>
                  {opportunities?.length || 0} open position
                  {opportunities && opportunities.length !== 1 ? 's' : ''}
                </p>

                {/* {categories && categories.length > 0 && (
                  <div className='mt-6 md:mt-10'>
                    <ul className='flex gap-2 md:flex-wrap'>
                      {categories.map((category) => (
                        <li key={category.slug}>
                          <button
                            onClick={() => handleCategoryToggle(category.slug)}
                            className={cn(
                              'inline-block py-1 px-[0.375rem] text-neutral-900 cursor-pointer leading-none rounded-sm text-12 transition-colors',
                              {
                                'bg-green-light': selectedCategories.includes(
                                  category.slug
                                ),
                                'bg-white  hover:bg-neutral-100':
                                  !selectedCategories.includes(category.slug),
                              }
                            )}
                          >
                            {category.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )} */}
              </div>
            )}
          </div>
        </div>
        <div className='md:w-2/3 md:border-l md:border-neutral-100 md:pb-18'>
          {opportunities && opportunities.length > 0 ? (
            <div>
              {Object.entries(groupedOpportunities).map(
                ([categorySlug, categoryOpportunities]) => {
                  const category = categories?.find(
                    (cat) => cat.slug === categorySlug,
                  );
                  const categoryName =
                    categorySlug === 'uncategorized'
                      ? 'Other'
                      : category?.name || categorySlug;

                  return (
                    <div key={categorySlug}>
                      <h3 className='p-4 uppercase border-b text-neutral-600 border-neutral-100 body-small md:px-8 md:py-6'>
                        {categoryName} ({categoryOpportunities.length})
                      </h3>
                      <ul>
                        {categoryOpportunities.map((opportunity, i) => {
                          const {
                            title,
                            slug,
                            opportunityLocations,
                            opportunityTypes,
                          } = opportunity;
                          if (!slug || !title) return null;
                          return (
                            <li key={i} className='border-b border-neutral-100'>
                              <a
                                href={
                                  opportunity.opportunityDetails?.externalUrl ||
                                  ''
                                }
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex flex-wrap p-4 max-md:gap-2 md:p-8 md:flex-nowrap md:items-center md:justify-between'
                              >
                                <h4 className='h5 md:flex-2 max-md:w-full'>
                                  <strong
                                    dangerouslySetInnerHTML={{ __html: title }}
                                  />
                                </h4>
                                <>
                                  {opportunityTypes &&
                                    opportunityTypes?.nodes.length > 0 && (
                                      <p className='md:flex-1 text-neutral-600'>
                                        {opportunityTypes?.nodes
                                          .map((type) => type?.name)
                                          .join(', ')}
                                      </p>
                                    )}
                                </>
                                <>
                                  {opportunityLocations &&
                                    opportunityLocations?.nodes.length > 0 && (
                                      <p className='md:flex-1 text-neutral-600'>
                                        {opportunityLocations?.nodes
                                          .map((location) => location?.name)
                                          .join(', ')}
                                      </p>
                                    )}
                                </>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                },
              )}
            </div>
          ) : (
            <div className='py-12 text-center'>
              <p className='text-neutral-600'>No opportunities found</p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default OpportunitiesInner;
