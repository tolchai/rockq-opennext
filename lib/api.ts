import { gql } from '@apollo/client';
import { createApolloClient } from './apolloClient';
import { unstable_cache } from 'next/cache';

import {
  GetOpportunitiesDocument,
  GetOpportunitiesQuery,
  GetOpportunitiesQueryVariables,
  GetOpportunityByUriDocument,
  GetOpportunityByUriQuery,
  GetOpportunityByUriQueryVariables,
  GetPageByUriDocument,
  GetPageByUriQuery,
  GetPageByUriQueryVariables,
  GetServiceByUriDocument,
  GetServiceByUriQuery,
  GetServiceByUriQueryVariables,
  GetSharedContentDocument,
  GetSharedContentQuery,
  GetSharedContentQueryVariables,
  GetSolutionByUriDocument,
  GetSolutionByUriQuery,
  GetSolutionByUriQueryVariables,
} from '@/graphql/generated';

export const fetchSharedContent = unstable_cache(
  async () => {
    const client = createApolloClient(process.env.GRAPHQL_ENDPOINT as string);

    try {
      const { data } = await client.query<
        GetSharedContentQuery,
        GetSharedContentQueryVariables
      >({
        query: GetSharedContentDocument,
        fetchPolicy: 'cache-first',
      });

      return data ?? null;
    } catch (error) {
      console.error('Error fetching shared content:', error);
      return null;
    }
  },
  ['shared-content'],
  { revalidate: false, tags: ['shared-content'] },
);

export const fetchOpportunities = unstable_cache(
  async () => {
    const client = createApolloClient(process.env.GRAPHQL_ENDPOINT as string);

    try {
      const { data } = await client.query<
        GetOpportunitiesQuery,
        GetOpportunitiesQueryVariables
      >({
        query: GetOpportunitiesDocument,
        fetchPolicy: 'cache-first',
      });

      return data ?? null;
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      return null;
    }
  },
  ['opportunities'],
  { revalidate: false, tags: ['opportunities'] },
);

const fetchPageCore = unstable_cache(
  async (uri: string) => {
    const client = createApolloClient(process.env.GRAPHQL_ENDPOINT as string);

    try {
      const { data } = await client.query<
        GetPageByUriQuery,
        GetPageByUriQueryVariables
      >({
        query: GetPageByUriDocument,
        variables: {
          uri,
        },
        fetchPolicy: 'cache-first',
      });

      return data;
    } catch (error) {
      console.error('Error fetching page by URI:', error);
      throw error;
    }
  },
  ['page-core'],
  { revalidate: false, tags: ['page-core'] },
);

export const fetchPageByUri = async (uri: string) => {
  const [pageData, sharedData] = await Promise.all([
    fetchPageCore(uri),
    fetchSharedContent(),
  ]);

  return {
    page: pageData?.page,
    options: sharedData?.options,
    services: sharedData?.services,
    solutions: sharedData?.solutions,
    // opportunities: sharedData?.opportunities,
    headerMenu: sharedData?.headerMenu,
    footerMenu: sharedData?.footerMenu,
    // externalLinks: sharedData?.links,
  };
};

const fetchServiceCore = unstable_cache(
  async (uri: string) => {
    const client = createApolloClient(process.env.GRAPHQL_ENDPOINT as string);

    try {
      const { data } = await client.query<
        GetServiceByUriQuery,
        GetServiceByUriQueryVariables
      >({
        query: GetServiceByUriDocument,
        variables: {
          uri,
        },
        fetchPolicy: 'cache-first',
      });

      return data;
    } catch (error) {
      console.error('Error fetching fund by URI:', error);
      throw error;
    }
  },
  ['fund-core'],
  { revalidate: false, tags: ['fund'] },
);

// Combined fund data with shared content
export const fetchServiceByUri = async (uri: string) => {
  const [serviceData, sharedData] = await Promise.all([
    fetchServiceCore(uri),
    fetchSharedContent(),
  ]);

  return {
    service: serviceData?.service,
    options: sharedData?.options,
    services: sharedData?.services,
    solutions: sharedData?.solutions,
    headerMenu: sharedData?.headerMenu,
    footerMenu: sharedData?.footerMenu,
  };
};

const fetchSolutionCore = unstable_cache(
  async (uri: string) => {
    const client = createApolloClient(process.env.GRAPHQL_ENDPOINT as string);

    try {
      const { data } = await client.query<
        GetSolutionByUriQuery,
        GetSolutionByUriQueryVariables
      >({
        query: GetSolutionByUriDocument,
        variables: {
          uri,
        },
        fetchPolicy: 'cache-first',
      });

      return data;
    } catch (error) {
      console.error('Error fetching fund by URI:', error);
      throw error;
    }
  },
  ['fund-core'],
  { revalidate: false, tags: ['fund'] },
);

// Combined fund data with shared content
export const fetchSolutionByUri = async (uri: string) => {
  const [solutionData, sharedData] = await Promise.all([
    fetchSolutionCore(uri),
    fetchSharedContent(),
  ]);

  return {
    solution: solutionData?.solution,
    options: sharedData?.options,
    services: sharedData?.services,
    solutions: sharedData?.solutions,
    headerMenu: sharedData?.headerMenu,
    footerMenu: sharedData?.footerMenu,
  };
};

// Core opportunity data
const fetchOpportunityCore = unstable_cache(
  async (uri: string) => {
    const client = createApolloClient(process.env.GRAPHQL_ENDPOINT as string);

    try {
      const { data } = await client.query<
        GetOpportunityByUriQuery,
        GetOpportunityByUriQueryVariables
      >({
        query: GetOpportunityByUriDocument,
        variables: {
          uri,
        },
        fetchPolicy: 'cache-first',
      });

      return data;
    } catch (error) {
      console.error('Error fetching opportunity by URI:', error);
      throw error;
    }
  },
  ['opportunity'],
  { revalidate: false, tags: ['opportunity'] },
);

// Combined opportunity data with shared content
export const fetchOpportunityByUri = async (uri: string) => {
  const [opportunityData, sharedData] = await Promise.all([
    fetchOpportunityCore(uri),
    fetchSharedContent(),
  ]);

  return {
    opportunity: opportunityData?.opportunity,
    options: sharedData?.options,
    services: sharedData?.services,
    solutions: sharedData?.solutions,
    // posts: sharedData?.posts,
    // opportunities: sharedData?.opportunities,
    headerMenu: sharedData?.headerMenu,
    footerMenu: sharedData?.footerMenu,
  };
};

// For backward compatibility, keep fetchPageData as alias
// export const fetchPageData = fetchPageByUri;
