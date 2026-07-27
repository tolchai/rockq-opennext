import cn from 'classnames';

import React, { Suspense } from 'react';
import Container from '../Container';
import {
  ModulesModulesOpportunitiesLayout,
  Opportunity,
  OpportunityCategory,
} from '@/graphql/generated';

import Arrow from '@/public/images/ui/arrow-thin.svg';
import { fetchOpportunities } from '@/lib/api';
import OpportunitiesInner from './OpportunitiesInner';

interface OpportunitiesProps {
  module: ModulesModulesOpportunitiesLayout;
}

const Opportunities: React.FC<OpportunitiesProps> = async ({ module }) => {
  const data = await fetchOpportunities();

  if (!data) return null;

  const { opportunities, opportunityCategories } = data;

  return (
    <Suspense>
      <OpportunitiesInner
        module={module}
        opportunities={(opportunities?.nodes as Opportunity[]) || []}
        opportunityCategories={
          (opportunityCategories?.nodes as OpportunityCategory[]) || []
        }
      />
    </Suspense>
  );
};

export default Opportunities;
