'use client';

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, useGSAP);

import Image from 'next/image';
import cn from 'classnames';

import Link from 'next/link';

import Container from './Container';
import Tags from './Tags';
import Button from './Button';

import { slugify } from '@/utils/utils';

import { GlobalSettings, Service, Solution } from '@/graphql/generated';

import Logo from '@/public/images/ui/logo.svg';
import Menu from '@/public/images/ui/menu.svg';
import Close from '@/public/images/ui/close.svg';
import Phone from '@/public/images/ui/phone.svg';
import Email from '@/public/images/ui/mail.svg';
import Search from '@/public/images/ui/search.svg';
import Triangle from '@/public/images/ui/triangle.svg';
import Chevron from '@/public/images/ui/chevron.svg';
import { PostTypes } from '@/lib/types';
import { set } from 'date-fns';

interface HeaderProps extends PostTypes {
  modules: any[];
  headerMenu?: any[];
  options: GlobalSettings;
  services?: Service[];
  solutions?: Solution[];
  slug?: string;
}

const Header: React.FC<HeaderProps> = ({
  modules,
  headerMenu,
  postType = 'page',
  options,
  services,
  solutions,
  slug,
}) => {
  const [openedMenu, setOpenedMenu] = useState(false);
  // const [scrolled, setScrolled] = useState(postType === 'fund' ? true : false);
  const [openedServices, setOpenedServices] = useState(false);
  const [openedSolutions, setOpenedSolutions] = useState(false);

  useEffect(() => {
    if (!openedMenu) {
      setOpenedServices(false);
      setOpenedSolutions(false);
    }
  }, [openedMenu]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 0) {
  //       setScrolled(true);
  //     } else {
  //       setScrolled(false);
  //       setDesktopOpenedMenu(false);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  const containerRef = useRef<HTMLElement>(null);

  // useGSAP(
  //   () => {
  //     if (
  //       postType === 'page' &&
  //       !slug &&
  //       !sessionStorage.getItem('homepageVisited')
  //     ) {
  //       gsap.set('.a-content', { pointerEvents: 'none' });

  //       gsap.to('.a-content', {
  //         // yPercent: -50,
  //         duration: 1,
  //         opacity: 1,
  //         delay: 3,
  //         ease: 'power2.out',
  //         onComplete: () => {
  //           gsap.set('.a-content', { pointerEvents: 'auto' });
  //         },
  //       });

  //       // set sessionStorage to indicate homepage visited
  //       if (typeof window !== 'undefined') {
  //         sessionStorage.setItem('homepageVisited', 'true');
  //       }
  //     } else {
  //       gsap.set('.a-content', { opacity: 1 });
  //     }
  //   },
  //   {
  //     scope: containerRef,
  //   }
  // );

  const isActive = (uri: string, i: number) => {
    const servicesSlugs = ['service'];
    const oportunitySlugs = ['opportunity'];

    if (
      (slug && uri.includes(slug)) ||
      (!slug && i === 0 && postType === 'page') ||
      (!slug &&
        postType === 'service' &&
        servicesSlugs.some((s) => uri.includes(s))) ||
      (!slug &&
        postType === 'opportunity' &&
        oportunitySlugs.some((s) => uri.includes(s)))
    ) {
      return true;
    }
    return false;
  };

  return (
    <header
      ref={containerRef}
      className='fixed left-0 z-30 w-full top-2 md:top-6'
    >
      <Container className='relative'>
        <div className='relative flex items-center justify-between h-12 pl-5 pr-1 md:pl-8 md:pr-2 md:h-14'>
          <div className='absolute z-20 lg:z-10 backdrop-blur-[10px] inset-0 rounded-full overflow-hidden bg-white/90'></div>
          <div
            className={cn('z-30 w-22 transition-opacity', {
              // 'max-lg:opacity-0 max-lg:pointer-events-none': openedMenu,
            })}
          >
            <Link href={'/'} className='block text-black'>
              <Logo />
            </Link>
          </div>
          <div
            className={
              cn('max-lg:relative z-10')
              // 'fixed top-0 px-2 md:px-4 max-lg:py-[0.375rem] left-0 z-20 w-full'
            }
          >
            <div>
              {headerMenu && headerMenu.length > 0 && (
                <>
                  <nav
                    className={cn(
                      ' max-lg:bg-alabaster-100 pt-22 px-4 md:pt-32 md:px-14 lg:p-0 lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 max-lg:fixed max-lg:inset-0',
                      {
                        'max-lg:opacity-0 max-lg:pointer-events-none':
                          !openedMenu,
                      },
                    )}
                  >
                    <ul className='flex flex-col lg:flex-row'>
                      {services && services.length > 0 && (
                        <li
                          className={cn(
                            'px-3 max-lg:p-4 font-medium max-lg:text-black lg:text-neutral-500 lg:hover:text-black max-lg:!text-20 lg:text-14 group/dropdown',
                            {},
                          )}
                        >
                          <div
                            className='flex items-center justify-between gap-1'
                            onClick={() => {
                              setOpenedServices(!openedServices);
                              setOpenedSolutions(false);
                            }}
                          >
                            Platform
                            <i
                              className={cn(
                                'group-hover/dropdown:rotate-180 hidden transition-transform lg:inline-block w-0 h-0 border-solid border-t-[0.43125rem] border-r-[0.25rem] border-l-[0.25rem] border-b-0 border-l-transparent border-r-transparent border-b-transparent',
                                {
                                  'max-lg:rotate-180': openedServices,
                                },
                              )}
                            ></i>
                            <span
                              className={cn(
                                'flex items-center transition-transform justify-center w-8 h-8 rounded-full lg:hidden bg-alabaster-200',
                                {
                                  'rotate-90': !openedServices,
                                  '-rotate-90': openedServices,
                                },
                              )}
                            >
                              <span className='w-full scale-150'>
                                <Chevron />
                              </span>
                            </span>
                          </div>
                          <div
                            className={cn(
                              'lg:absolute   lg:pt-8 lg:opacity-0 lg:group-hover/dropdown:opacity-100 lg:pointer-events-none lg:group-hover/dropdown:pointer-events-auto lg:transition-opacity lg:w-[48rem] lg:-translate-x-1/2 lg:left-1/2 lg:text-white',
                              {
                                'max-lg:hidden': !openedServices,
                              },
                            )}
                          >
                            <div className='w-full h-full lg:text-white md:rounded-xl lg:bg-black'>
                              <p className='hidden border-b lg:block border-white/10 h5 md:px-10 md:py-8'>
                                <strong>Platform</strong>
                              </p>
                              <ul className='gap-6 py-6 md:py-10 max-lg:-mb-6 lg:px-10 md:columns-2 md:gap-10'>
                                {services.map((service, i) => {
                                  const { title, uri, serviceDetails } =
                                    service;
                                  return (
                                    <li
                                      key={i}
                                      className='break-inside-avoid max-lg:pb-6'
                                    >
                                      <Link
                                        href={uri || '#'}
                                        className='group/item'
                                      >
                                        <div className='flex items-center gap-4 md:gap-5'>
                                          <div className='flex items-center rounded-[0.1875rem] transition-colors overflow-hidden justify-center w-10 h-10 bg-alabaster-200 lg:group-hover/item:bg-orange'>
                                            {service.serviceDetails?.icon && (
                                              <img
                                                src={
                                                  service.serviceDetails.icon
                                                    .node?.sourceUrl || ''
                                                }
                                                className='w-full'
                                                alt={title || ''}
                                              />
                                            )}
                                          </div>
                                          <div className='flex-1'>
                                            <p className='text-black transition-colors lg:text-white lg:group-hover/item:text-orange'>
                                              <strong
                                                dangerouslySetInnerHTML={{
                                                  __html: title || '',
                                                }}
                                              />
                                            </p>
                                            <p
                                              className='lg:text-white/60'
                                              dangerouslySetInnerHTML={{
                                                __html:
                                                  serviceDetails?.menuSubheader ||
                                                  '',
                                              }}
                                            />
                                          </div>
                                        </div>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </li>
                      )}
                      {solutions && solutions.length > 0 && (
                        <li
                          className={cn(
                            'px-3 font-medium  max-lg:text-black max-lg:!text-20 max-lg:p-4 lg:text-14 group/dropdown lg:text-neutral-500 lg:hover:text-black',
                            {},
                          )}
                        >
                          <div
                            className='flex items-center justify-between gap-1'
                            onClick={() => {
                              setOpenedSolutions(!openedSolutions);
                              setOpenedServices(false);
                            }}
                          >
                            Solutions
                            <i
                              className={cn(
                                'group-hover/dropdown:rotate-180 hidden transition-transform lg:inline-block w-0 h-0 border-solid border-t-[0.43125rem] border-r-[0.25rem] border-l-[0.25rem] border-b-0 border-l-transparent border-r-transparent border-b-transparent',
                                {
                                  'max-lg:rotate-180': openedSolutions,
                                },
                              )}
                            ></i>
                            <span
                              className={cn(
                                'flex items-center transition-transform justify-center w-8 h-8 rounded-full lg:hidden bg-alabaster-200',
                                {
                                  'rotate-90': !openedSolutions,
                                  '-rotate-90': openedSolutions,
                                },
                              )}
                            >
                              <span className='w-full scale-150'>
                                <Chevron />
                              </span>
                            </span>
                          </div>
                          <div
                            className={cn(
                              'lg:absolute lg:pt-8 lg:opacity-0 lg:group-hover/dropdown:opacity-100 lg:pointer-events-none lg:group-hover/dropdown:pointer-events-auto lg:transition-opacity lg:w-[48rem] lg:-translate-x-1/2 lg:left-1/2 lg:text-white',
                              {
                                'max-lg:hidden': !openedSolutions,
                              },
                            )}
                          >
                            <div className='w-full h-full lg:text-white md:rounded-xl lg:bg-black'>
                              <p className='hidden border-b lg:block h5 md:px-10 md:py-8 border-white/10'>
                                <strong>Solutions</strong>
                              </p>
                              <ul className='py-6 md:py-10 max-lg:-mb-6 lg:px-10 md:columns-2 md:gap-5'>
                                {solutions.map((solution, i) => {
                                  const { title, uri, solutionDetails } =
                                    solution;
                                  return (
                                    <li
                                      key={i}
                                      className='break-inside-avoid max-lg:pb-6'
                                    >
                                      <Link
                                        href={uri || '#'}
                                        className='group/item'
                                      >
                                        <div>
                                          <p className='text-black transition-colors lg:text-white lg:group-hover/item:text-orange'>
                                            <strong
                                              dangerouslySetInnerHTML={{
                                                __html: title || '',
                                              }}
                                            />
                                          </p>
                                          <p
                                            className='lg:text-white/60'
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                solutionDetails?.menuSubheader ||
                                                '',
                                            }}
                                          />
                                        </div>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        </li>
                      )}
                      {headerMenu.map((menuItem: any, i: number) => {
                        const { title, uri } = menuItem;
                        return (
                          <li
                            key={i}
                            className='px-3 font-medium max-lg:p-4 max-lg:!text-20 lg:text-14'
                          >
                            <Link
                              href={uri}
                              className='transition-colors max-lg:text-black lg:text-neutral-500 lg:hover:text-black'
                            >
                              <div className='relative'>{title}</div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </>
              )}

              <div
                className={cn(
                  'fixed  max-lg:bottom-4 max-lg:transition-opacity max-lg:px-6 max-lg:left-0 md:max-lg:left-1/2 md:max-lg:-translate-x-1/2 max-md:w-full lg:z-20 lg:relative',
                  {
                    'max-lg:opacity-0 max-lg:pointer-events-none': !openedMenu,
                  },
                )}
              >
                <Button
                  type='link'
                  label='Work with us'
                  href='/contact'
                  className='md:py-[0.875rem] md:px-4'
                  mobileSize='small'
                />
              </div>
            </div>
          </div>
          <div className='top-0 right-0 z-20 flex justify-center lg:hidden'>
            <button
              onClick={() => setOpenedMenu(!openedMenu)}
              className={cn(
                'relative block h-10 bg-alabaster-200 w-10 rounded-full appearance-none overflow-hidden',
                {
                  // 'bg-white/70': openedMenu,
                  // 'bg-white': !openedMenu,
                },
              )}
            >
              <span
                className={cn(
                  ' h-10 w-10 flex items-center justify-center transition-[margin]',
                  {
                    ['-mt-10']: openedMenu,
                  },
                )}
              >
                <span className='w-6'>
                  <Menu />
                </span>
              </span>
              <span className='flex items-center justify-center w-10 h-10'>
                <div className='w-6'>
                  <Close />
                </div>
              </span>
            </button>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
