import cn from 'classnames';

import React from 'react';
import Container from '../Container';
import { ModulesModulesMediaLayout } from '@/graphql/generated';

import Download from '@/public/images/ui/download.svg';
import Button from '../Button';
import Image from 'next/image';

interface MediaProps {
  module: ModulesModulesMediaLayout;
}

const Media: React.FC<MediaProps> = ({ module }) => {
  const { header, mediaPeople, mediaDownloads, mediaKit } = module;

  return (
    <Container background='powder'>
      <div className='grid grid-cols-1 gap-8 md:gap-4 max-md:p-2 md:grid-cols-2'>
        {header && (
          <div
            className='text-content md:mb-12'
            dangerouslySetInnerHTML={{ __html: header }}
          />
        )}
        <div className='md:row-span-2 md:flex md:flex-col md:justify-between'>
          {mediaDownloads && mediaDownloads.length > 0 && (
            <ul>
              {mediaDownloads.map((download, i) => {
                // console.log(download);
                const { label, file } = download;
                if (!file) return null;
                return (
                  <li
                    key={i}
                    className='border-b border-neutral-200 last:border-none'
                  >
                    <a
                      href={file.node.mediaItemUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-3 py-4 group md:py-6'
                    >
                      <span className='flex items-center justify-center w-10 h-10 transition-colors rounded-sm group-hover:bg-green-light-hover bg-green-light'>
                        <span className='w-6'>
                          <Download />
                        </span>
                      </span>
                      <div>
                        <p
                          className='font-medium leading-tight'
                          dangerouslySetInnerHTML={{
                            __html: label
                              ? label
                              : file.node.title || 'Download',
                          }}
                        />
                        {/* {file.node.mimeType} */}
                        <p className='leading-tight text-neutral-600'>
                          {file.node.mimeType === 'application/pdf' && 'PDF'}
                          {file.node.mimeType === 'application/zip' && 'ZIP'}
                          {file.node.mimeType === 'application/msword' && 'DOC'}
                          {file.node.mimeType === 'image/png' && 'PNG'}
                          {file.node.mimeType === 'image/jpg' && 'JPG'}
                          {file.node.mimeType === 'image/jpeg' && 'JPEG'}
                        </p>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
          {mediaKit?.node?.mediaItemUrl && (
            <div className='md:mt-auto'>
              <Button
                type='link'
                href={mediaKit?.node?.mediaItemUrl}
                color='black'
                label={'Download Media Kit'}
              />
            </div>
          )}
        </div>
        {mediaPeople && (
          <div className='flex gap-4 p-2 bg-white rounded-sm md:w-4/5 md:mt-auto md:gap-6'>
            {mediaPeople.image?.node?.sourceUrl && (
              <div className='w-1/3'>
                <div className='aspect-[1/1.2]'>
                  <Image
                    src={mediaPeople.image.node.sourceUrl}
                    alt={
                      mediaPeople.image.node.altText || 'Media contact image'
                    }
                    width={mediaPeople.image.node.mediaDetails?.width || 300}
                    height={mediaPeople.image.node.mediaDetails?.height || 300}
                    className='object-cover w-full h-full rounded-sm'
                  />
                </div>
              </div>
            )}
            <div className='flex flex-col w-2/3 py-2 md:py-3'>
              <div className='mb-5'>
                <p className='tag tag--platinum'>Press</p>
              </div>
              <div className='md:mt-auto'>
                <p
                  className='font-medium text-18'
                  dangerouslySetInnerHTML={{ __html: mediaPeople.name || '' }}
                ></p>
                {mediaPeople.email && (
                  <p className='mt-1 truncate'>
                    <a
                      href={`mailto:${mediaPeople.email}`}
                      className=' text-neutral-600'
                      dangerouslySetInnerHTML={{ __html: mediaPeople.email }}
                    />
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Media;
