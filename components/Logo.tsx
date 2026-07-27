import cn from 'classnames';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  logo: any;
}

const Logo: React.FC<LogoProps> = ({ logo }) => {
  const {
    sourceUrl,
    mimeType,
    mediaDetails: { width, height },
    imageFileDetails,
  } = logo;

  return (
    <div className='h-full px-5'>
      <span className='flex flex-col items-center justify-center h-full'>
        <Image
          src={sourceUrl}
          width={width ?? 100}
          height={height ?? 100}
          unoptimized={true}
          // unoptimized={mimeType === 'image/svg+xml'}
          alt=''
          className='block max-w-full'
          style={{
            width: imageFileDetails?.width
              ? imageFileDetails.width / 16 + 'rem'
              : mimeType === 'image/svg+xml'
              ? `${(width > 200 || width === 0 ? 200 : width) / 16}rem`
              : `${(width > 400 || width === 0 ? 400 : width) / 32}rem`,
          }}
          // layout='responsive'
        />
        {/* {imageFileDetails?.width} */}
      </span>
    </div>
  );
};
export default Logo;
