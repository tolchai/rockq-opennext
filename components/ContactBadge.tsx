import cn from 'classnames';

import React from 'react';

import contactBadge from '@/public/images/ui/contact-badge.png';
import Image from 'next/image';
import Link from 'next/link';

import Arrow from '@/public/images/ui/arrow.svg';

const ContactBadge: React.FC = () => {
  return (
    <div className=''>
      <Link
        href='/contact'
        className='relative inline-flex items-center gap-4 p-2 pr-4 rounded-lg group md:pr-20 bg-alabaster-100'
      >
        <div className='w-12 rounded-[0.1875rem] overflow-hidden'>
          <Image
            src={contactBadge}
            alt='Contact Badge'
            width={48}
            height={48}
            className='block w-full'
          />
        </div>
        <div>
          <p className='text-neutral-400'>Contact</p>
          <p className='font-semibold '>Book a call</p>
        </div>
        <span className='absolute items-center justify-center hidden w-10 h-10 text-white transition-opacity -translate-y-1/2 bg-black rounded-full opacity-0 lg:flex lg:group-hover:opacity-100 right-2 top-1/2'>
          <span className='w-6'>
            <Arrow />
          </span>
        </span>
      </Link>
    </div>
  );
};

export default ContactBadge;
