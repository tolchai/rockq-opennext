export const dynamic = 'force-static';
// export const revalidate = 3600;

import CTAs from '@/components/CTAs';
import Layout from '@/components/Layout';
import Modules from '@/components/Modules';
import { createApolloClient } from '@/lib/apolloClient';
import { fetchPageByUri } from '@/lib/api';
import { gql } from '@apollo/client';
import { notFound } from 'next/navigation';

type P = { slug: string };

// Pokud máš v obsahu jen jednourovňové slugs, tohle stačí.
// Pokud bys měl víc úrovní, tak sem dej složku [[...slug]] (ale psal jsi, že nechceš).
export async function generateStaticParams() {
  const client = createApolloClient(process.env.GRAPHQL_ENDPOINT as string);

  const query = gql`
    query EssentialPages {
      pages(first: 50, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
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

    const slugs: string[] = (data?.pages?.nodes ?? [])
      .map((n: { slug: string }) => n.slug)
      .filter((s: string) => s && s !== 'homepage' && !s.includes('/')); // jen jednosegmentové

    const paths = slugs.map((s) => ({ slug: s }));
    console.log(`Generated ${paths.length} static paths for [slug]`);
    return paths;
  } catch (e) {
    console.error('Error in generateStaticParams [slug]:', e);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<P> }) {
  const { slug } = await params;

  try {
    const uri = `/${slug}`;
    const data = await fetchPageByUri(uri);
    if (!data?.page) return {};

    const { page, options } = data;

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
        title: page?.seo?.opengraphTitle || page?.seo?.title,
        description: page?.seo?.opengraphDescription || page?.seo?.metaDesc,
        images: page?.seo?.opengraphImage?.sourceUrl
          ? [{ url: page?.seo?.opengraphImage?.sourceUrl }]
          : [],
      },
    };
  } catch (e) {
    console.error('Error generating metadata [slug]:', e);
    return {};
  }
}

export default async function Page({ params }: { params: Promise<P> }) {
  const { slug } = await params;

  try {
    if (!slug || slug === 'homepage') {
      notFound();
    }

    const uri = `/${slug}`;
    const data = await fetchPageByUri(uri);
    if (!data?.page) notFound();

    const { page, options, services, solutions, headerMenu, footerMenu } = data;

    return (
      <Layout
        modules={page.modules?.modules ?? []}
        headerMenu={headerMenu?.nodes ?? []}
        footerMenu={footerMenu?.nodes ?? []}
        services={services?.nodes || []}
        solutions={solutions?.nodes || []}
        options={options?.globalSettings}
        postType='page'
        slug={slug}
      >
        <Modules
          modules={page.modules?.modules ?? []}
          options={options?.globalSettings}
          services={services?.nodes || []}
        />
      </Layout>
    );
  } catch (e) {
    console.error('Error rendering [slug] page:', e);
    notFound();
  }
}
