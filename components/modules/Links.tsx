'use client';

import cn from 'classnames';

import React from 'react';
import Container from '../Container';
import { ModulesModulesLinksLayout } from '@/graphql/generated';
import Link from 'next/link';

import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

import Arrow from '@/public/images/ui/arrow-thin.svg';

interface LinksProps {
  module: ModulesModulesLinksLayout;
}

interface ItemArrowProps {
  type: 'internal' | 'external' | 'onpage';
}

const Links: React.FC<LinksProps> = ({ module }) => {
  const { header, links } = module;
  return (
    <Container>
      <div className='mb-10 md:mb-30'>
        <div className=' md:w-1/2'>
          {header && (
            <div
              className='text-content p-to-h3 h2-to-label'
              dangerouslySetInnerHTML={{ __html: header }}
            />
          )}
        </div>
      </div>
      {links && links?.length > 0 && (
        <ul className='flex flex-col gap-2 md:gap-4 md:flex-row'>
          {links.map((link, i) => {
            if (!link || !link?.type) return null;
            const { label, url, type, page, moduleId } = link;

            let href = '';

            switch (type[0]) {
              case 'internal': {
                href = page?.nodes[0].uri || '';
                break;
              }
              case 'external': {
                href = url || '';
                break;
              }
              case 'onpage': {
                href = `#${moduleId || ''}`;
                break;
              }
              default: {
                href = '#';
                break;
              }
            }

            const classes = cn(
              'bg-white rounded-lg group justify-between items-center flex p-4 md:p-6',
              {}
            );

            return (
              <li key={i} className='md:flex-1 h4'>
                {type[0] === 'internal' ? (
                  <Link href={href} className={classes}>
                    {label}
                    <ItemArrow type={type[0]} />
                  </Link>
                ) : (
                  <a
                    href={href}
                    target={type[0] === 'external' ? '_blank' : '_self'}
                    className={classes}
                    rel={
                      type[0] === 'external' ? 'noopener noreferrer' : undefined
                    }
                    onClick={(e) => {
                      if (type[0] === 'onpage') {
                        e?.preventDefault();

                        const target = document.querySelector(href);
                        if (target) {
                          gsap.to(window, {
                            duration: 0.5,
                            scrollTo: {
                              y:
                                target.getBoundingClientRect().top +
                                window.scrollY,
                              autoKill: false,
                              offsetY:
                                document.querySelector('header')
                                  ?.clientHeight || 0,
                            },
                          });
                        }
                      }
                    }}
                  >
                    {label}
                    <ItemArrow type={type[0]} />
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </Container>
  );
};

const ItemArrow: React.FC<ItemArrowProps> = ({ type }) => (
  <span
    className={cn(
      'w-10 h-10 bg-green-light flex  items-center justify-center rounded-sm'
    )}
  >
    <span
      className={cn('w-6 transition-transform', {
        'group-hover:translate-x-0.5': type === 'internal' || type === 'onpage',
        // 'rotate-90 group-hover:translate-y-0.5': type === 'onpage',
        '-rotate-45 group-hover:-translate-y-0.5 group-hover:translate-x-0.5':
          type === 'external',
      })}
    >
      <Arrow />
    </span>
  </span>
);

export default Links;
