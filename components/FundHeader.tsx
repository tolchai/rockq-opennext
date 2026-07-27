import cn from 'classnames';

import Logo from '@/public/images/ui/logo.svg';

import Link from 'next/link';
import Button from './Button';
import BackButton from './BackButton';

const FundHeader: React.FC = () => {
  return (
    <header className='fixed top-0 left-0 z-50 flex items-center justify-between w-full px-2 py-4 border-b backdrop-blur-md md:px-4 lg:px-6 border-neutral-200 md:py-7'>
      <div className='hidden md:block'>
        <BackButton />
      </div>
      <Link
        href='/'
        className='md:-translate-y-1/2 md:absolute md:-translate-x-1/2 md:left-1/2 md:top-1/2'
      >
        <span className='block w-36 md:w-40'>
          <Logo />
        </span>
      </Link>
      <div>
        <Button
          type='link'
          color='green'
          label='Chci vědět více'
          // onClick={() => setOpenedContact(true)}
          href='#form'
        />
      </div>
    </header>
  );
};

export default FundHeader;
