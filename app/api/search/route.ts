export const runtime = 'edge';

import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const locale = searchParams.get('locale') || 'cs';

  if (!q) {
    return NextResponse.json({ data: { posts: { nodes: [] } } });
  }

  const graphqlQuery = {
    query: `
      query Search($search: String!, $locale: LanguageCodeFilterEnum!) {
        funds(where: {orderby: { field: MENU_ORDER, order: ASC }, search: $search, status: PUBLISH, language: $locale}, first: 10) {
          nodes {
            id
            title
            slug
            uri
          }
        }
        people(where: {orderby: { field: MENU_ORDER, order: ASC }, search: $search, status: PUBLISH, language: $locale}, first: 10) {
          nodes {
            id
            title
            personDetails {
              bio
              position
            }
            featuredImage {
              node {
                sourceUrl
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
        }
        posts(where: {search: $search, status: PUBLISH, language: $locale}, first: 10) {
          nodes {
            id
            title
            uri
            slug
            date
            featuredImage {
              node {
                sourceUrl
                mediaDetails {
                  width
                  height
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      search: q,
      locale: locale.toUpperCase() as 'CS' | 'EN',
    },
  };

  const graphqlEndpoint = process.env.GRAPHQL_ENDPOINT;

  const wpRes = await fetch(graphqlEndpoint as string, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphqlQuery),
  });

  const json = await wpRes.json();

  return NextResponse.json(json);
}
