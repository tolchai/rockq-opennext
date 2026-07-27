export const dynamic = 'force-static';
// export const revalidate = 3600;

import CTAs from '@/components/CTAs';
import Layout from '@/components/Layout';
import Modules from '@/components/Modules';
import { notFound } from 'next/navigation';
import { fetchPageByUri } from '@/lib/api';

export async function generateMetadata() {
  try {
    const uri = `/homepage`;
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
          ? [{ url: page?.seo?.opengraphImage.sourceUrl }]
          : [],
      },
    };
  } catch (e) {
    console.error('Error generating homepage metadata:', e);
    return {};
  }
}

export default async function Page() {
  try {
    const uri = `/homepage`;
    const data = await fetchPageByUri(uri);
    if (!data?.page) notFound();

    const { page, options, services, solutions, headerMenu, footerMenu } = data;

    return (
      <Layout
        modules={page?.modules?.modules ?? []}
        headerMenu={headerMenu?.nodes ?? []}
        footerMenu={footerMenu?.nodes ?? []}
        options={options?.globalSettings}
        services={services?.nodes || []}
        solutions={solutions?.nodes || []}
        postType='page'
      >
        <Modules
          modules={page?.modules?.modules ?? []}
          options={options?.globalSettings}
          services={services?.nodes || []}
        />
      </Layout>
    );
  } catch (e) {
    console.error('Error rendering homepage:', e);
    notFound();
  }
}
