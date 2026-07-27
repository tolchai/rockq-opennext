import cn from 'classnames';

import bg01x1440 from '@/public/images/bgs/bg-01-1440.jpg';
import bg01x1920 from '@/public/images/bgs/bg-01-1920.jpg';
import bg01x2560 from '@/public/images/bgs/bg-01-2560.jpg';

import bg02x1440 from '@/public/images/bgs/bg-02-1440.jpg';
import bg02x1920 from '@/public/images/bgs/bg-02-1920.jpg';
import bg02x2560 from '@/public/images/bgs/bg-02-2560.jpg';

interface BgImageProps {
  imageNumber: 1 | 2;
  sticky?: boolean;
}

const BgImage: React.FC<BgImageProps> = ({ imageNumber, sticky }) => {
  const images =
    imageNumber === 1
      ? { x1440: bg01x1440, x1920: bg01x1920, x2560: bg01x2560 }
      : { x1440: bg02x1440, x1920: bg02x1920, x2560: bg02x2560 };

  return (
    <div
      className={cn('absolute inset-0', {
        'overflow-hidden': !sticky,
        // 'h-screen': sticky,
        // '': !sticky,
      })}
    >
      <div
        className={cn('flex items-end justify-center', {
          'h-screen sticky top-0': sticky,
          'h-full': !sticky,
        })}
      >
        <picture className='flex items-end justify-center h-full'>
          <source media='(max-width: 1440px)' srcSet={images.x1440.src} />
          <source media='(max-width: 1920px)' srcSet={images.x1920.src} />
          <img
            src={images.x2560.src}
            alt=''
            className='block w-auto h-full min-w-full min-h-full'
            // object-cover object-bottom
          />
        </picture>
      </div>
    </div>
  );
};

export default BgImage;
