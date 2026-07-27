'use client';

import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

import cn from 'classnames';

import React, { use } from 'react';
import Container from './Container';

import { GlobalSettings, Service, Solution } from '@/graphql/generated';

import Logo from '@/public/images/ui/logo.svg';
import Q from '@/public/images/ui/q.svg';

import FooterMotto from '@/public/images/ui/footer-motto.svg';
import Link from 'next/link';
import Social from './Social';

interface FooterProps {
  options: GlobalSettings;
  headerMenu?: any[];
  footerMenu?: any[];
  services?: Service[];
  solutions?: Solution[];
}

const Footer: React.FC<FooterProps> = ({
  options,
  headerMenu,
  footerMenu,
  services,
  solutions,
}) => {
  const { rockqFooterQuote } = options;

  return (
    <div className='py-12 bg-black text-white/50 max-md:px-4 md:pb-10'>
      <Container className={cn('relative', {})}>
        <footer>
          <div className='grid grid-cols-1 gap-12 mb-12 md:grid-cols-2 md:gap-5'>
            <div>
              <div
                className='flex items-center justify-center w-8 h-8 mb-6 text-black cursor-pointer md:mb-8 bg-orange'
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector('main');
                  if (target) {
                    gsap.to(window, {
                      duration: 0.5,
                      scrollTo: {
                        y: target.getBoundingClientRect().top + window.scrollY,
                        // offsetY: -offset,
                        autoKill: false,
                      },
                    });
                  }
                }}
              >
                <span className='block w-5'>
                  <Q />
                </span>
              </div>
              {rockqFooterQuote && (
                <div
                  className='text-content md:w-1/2'
                  dangerouslySetInnerHTML={{
                    __html: rockqFooterQuote,
                  }}
                />
              )}
              <div className='mt-6 md:mt-8'>
                <Social options={options} />
              </div>
            </div>
            <div className='grid grid-cols-1 gap-12 md:gap-x-5 md:gap-y-18 md:grid-cols-2'>
              {services && services.length > 0 && (
                <div>
                  <p className='label'>Platform</p>
                  <ul className='flex flex-col gap-2 mt-6 md:mt-8'>
                    {services.map((service) => {
                      const { title, uri } = service;
                      return (
                        <li key={uri} className='font-medium text-14'>
                          <Link
                            href={uri || '#'}
                            className='text-white hover:underline'
                          >
                            {title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {solutions && solutions.length > 0 && (
                <div>
                  <p className='label'>Solutions</p>
                  <ul className='flex flex-col gap-2 mt-6 md:mt-8'>
                    {solutions.map((solution) => {
                      const { title, uri } = solution;
                      return (
                        <li key={uri} className='font-medium text-14'>
                          <Link
                            href={uri || '#'}
                            className='text-white hover:underline'
                          >
                            {title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {headerMenu && headerMenu.length > 0 && (
                <div>
                  <p className='label'>About & Resources</p>
                  <ul className='flex flex-col gap-2 mt-6 md:mt-8'>
                    {headerMenu.map((menuItem) => {
                      const { title, uri } = menuItem;
                      return (
                        <li key={uri} className='font-medium text-14'>
                          <Link
                            href={uri}
                            className='text-white hover:underline'
                          >
                            {title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className='grid grid-cols-1 gap-5 md:items-end md:grid-cols-2'>
            <div className='flex flex-col gap-12 md:order-2 md:flex-row md:items-end md:justify-between md:gap-8'>
              <ul className='flex flex-wrap gap-4 md:gap-8'>
                {footerMenu &&
                  footerMenu.length > 0 &&
                  footerMenu.map((menuItem) => {
                    const { title, uri } = menuItem;
                    return (
                      <li key={uri} className='text-14'>
                        <a
                          href={uri}
                          className='hover:underline'
                          target='_blank'
                        >
                          {title}
                        </a>
                      </li>
                    );
                  })}
              </ul>
              <div className='flex flex-col items-end uppercase body-small-wrap'>
                <p className=' text-white/30'>
                  Created by{' '}
                  <a
                    href='https://trau.studio'
                    target='_blank'
                    className='hover:underline'
                    rel='noopener noreferrer'
                  >
                    TRAU
                  </a>
                </p>
                <p className=' md:order-2'>
                  &copy; {new Date().getFullYear()} RockQ
                </p>
              </div>
            </div>
            <div>
              <a
                href='#'
                className='block text-white md:w-80'
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector('main');
                  if (target) {
                    gsap.to(window, {
                      duration: 0.5,
                      scrollTo: {
                        y: target.getBoundingClientRect().top + window.scrollY,
                        // offsetY: -offset,
                        autoKill: false,
                      },
                    });
                  }
                }}
              >
                <Logo />
              </a>
            </div>
          </div>
        </footer>
      </Container>
    </div>
  );
};

export default Footer;
