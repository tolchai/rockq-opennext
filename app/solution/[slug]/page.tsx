export const dynamic = 'force-static';

// import { useTranslations } from 'next-intl';

import CTAs from '@/components/CTAs';
import FundHeader from '@/components/FundHeader';
import FundHero from '@/components/ServiceHero';
import Layout from '@/components/Layout';
import Modules from '@/components/Modules';
import {
  fetchPageByUri,
  fetchServiceByUri,
  fetchSolutionByUri,
} from '@/lib/api';
import { createApolloClient } from '@/lib/apolloClient';
import { gql } from '@apollo/client';
import pages from 'next/dist/build/templates/pages';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ServiceHero from '@/components/ServiceHero';

type P = { slug: string };

// export const dynamicParams = false;

export async function generateStaticParams() {
  const client = createApolloClient(process.env.GRAPHQL_ENDPOINT as string);

  const query = gql`
    query AllSolutions {
      solutions(first: 50) {
        nodes {
          slug
        }
      }
    }
  `;

  try {
    const { data } = await client.query({
      query,
      fetchPolicy: 'network-only',
    });

    const paths = (data?.solutions?.nodes ?? []).map(
      (solution: { slug: string }) => ({
        slug: solution.slug,
      }),
    );

    console.log(paths);

    return paths;
  } catch (e) {
    console.error('Error in generateStaticParams [solution/slug]:', e);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<P> }) {
  const { slug } = await params;

  // if (!isAllowed(slug) || !hasLocale(routing.locales, locale)) {
  //   return {};
  // }

  const data = await fetchSolutionByUri(slug ? slug : '');

  if (!data.solution) {
    return {};
  }

  const { solution: page, options } = data;
  return {
    title: page?.seo?.title,
    description: page?.seo?.metaDesc,
    icons: [
      {
        url:
          options?.globalSettings?.favicon?.node?.sourceUrl || '/favicon.png',
        type: 'image/png',
      },
    ],
    openGraph: {
      title: page?.seo?.openGraphTitle || page?.seo?.title,
      description: page?.seo?.openGraphDescription || page?.seo?.metaDesc,
      images: page?.seo?.openGraphImage?.sourceUrl
        ? [{ url: page?.seo?.openGraphImage.sourceUrl }]
        : [],
    },
  };
}

export default async function Solution({ params }: { params: Promise<P> }) {
  const { slug } = await params;

  const data = await fetchSolutionByUri(slug ? slug : '');

  if (!data.solution) {
    notFound();
  }

  const {
    solution: page,
    options,
    headerMenu,
    footerMenu,
    services,
    solutions,
  } = data;
  return (
    <Layout
      options={options.globalSettings}
      headerMenu={headerMenu?.nodes || []}
      footerMenu={footerMenu?.nodes || []}
      postType='solution'
      services={services?.nodes || []}
      solutions={solutions?.nodes || []}
      // showFooter={false}
    >
      <ServiceHero page={page} postType='solution' />
      <Modules
        modules={page.modules?.modules ?? []}
        options={options.globalSettings}
        postType='solution'
      />
    </Layout>
  );
}
