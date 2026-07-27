'use client';

import cn from 'classnames';
import { useRouter } from 'next/navigation';

import Arrow from '@/public/images/ui/arrow.svg';

interface BackButtonProps {
  background?: 'light' | 'dark';
}

const BackButton: React.FC<BackButtonProps> = ({ background = 'light' }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (window.history.length > 2) {
          router.back();
        } else {
          router.push('/');
        }
      }}
      className='flex items-center gap-3 cursor-pointer group'
    >
      <span
        className={cn(
          'flex items-center justify-center transition-colors rotate-180 border rounded-md appearance-none w-9 h-9 outline-0',
          {
            'border-neutral-200': background === 'light',
            'border-neutral-900 bg-neutral-900': background === 'dark',
          }
        )}
      >
        <span className='block w-4 transition-transform lg:group-hover:translate-x-[0.15em]'>
          <Arrow />
        </span>
      </span>
      <span
        className={cn('font-medium transition-colors text-14', {
          'text-neutral-600 group-hover:text-neutral-900':
            background === 'light',
          'text-neutral-300 group-hover:text-neutral-200':
            background === 'dark',
        })}
      >
        Zpět
      </span>
    </button>
  );
};

export default BackButton;
