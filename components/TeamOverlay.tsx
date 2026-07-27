import cn from 'classnames';
import Image from 'next/image';

import React from 'react';

interface TeamOverlayProps {
  item: any;
}

const TeamOverlay: React.FC<TeamOverlayProps> = ({ item }) => {
  if (!item) return null;

  const { title, personDetails, featuredImage } = item;

  return (
    <div className='md:flex'>
      <div className='px-6 py-8 md:flex-1 md:px-14 md:py-16'>
        <h3 className='text-2xl' dangerouslySetInnerHTML={{ __html: title }} />
        {personDetails?.position && (
          <p
            className='text-14 text-gray-dark'
            dangerouslySetInnerHTML={{ __html: personDetails.position }}
          />
        )}
        {personDetails?.bio && (
          <div
            className='mt-6 text-content text-gray-dark'
            dangerouslySetInnerHTML={{ __html: personDetails.bio }}
          />
        )}
      </div>
      {featuredImage?.node.sourceUrl && (
        <div className='relative bg-white md:sticky md:top-0 md:max-h-[70vh] md:w-1/2'>
          <Image
            src={featuredImage.node.sourceUrl}
            width={featuredImage.node.mediaDetails.width}
            height={featuredImage.node.mediaDetails.height}
            alt=''
            className='object-cover object-top w-full h-full'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/60'></div>
        </div>
      )}
    </div>
  );
};

export default TeamOverlay;
