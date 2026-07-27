'use client';

import cn from 'classnames';

import React, { useState } from 'react';
import Container from '../Container';
import { ModulesModulesInvestorsInfoLayout } from '@/graphql/generated';

import Download from '@/public/images/ui/download.svg';
import Chevron from '@/public/images/ui/chevron.svg';
import Modal from '../Modal';
import Button from '../Button';

interface InvestorsInfoProps {
  module: ModulesModulesInvestorsInfoLayout;
}

const InvestorsInfo: React.FC<InvestorsInfoProps> = ({ module }) => {
  const [displayedItems, setDisplayedItems] = useState(16);

  const { header, contentRepeater, downloads } = module;

  const [openedDownloads, setOpenedDownloads] = useState(false);

  const [openedSubsection, setOpenedSubsection] = useState<string | null>(null);

  const r2url =
    'https://pub-2ca469bbae0d4a1d88d2f7df7c48b4fc.r2.dev/wp-content/uploads/'; // process.env.R2_URL;

  return (
    <Container>
      <div className='relative max-md:px-4'>
        <div className='md:w-1/2 md:mb-10'>
          {header && (
            <div
              className='md:min-h-20'
              dangerouslySetInnerHTML={{ __html: header }}
            />
          )}
        </div>
        <ul className='relative grid grid-cols-1 gap-4 md:gap-y-8 lg:grid-cols-4 md:grid-cols-2'>
          {contentRepeater?.map((item, i) => {
            const { title, description } = item;
            return (
              <li
                key={i}
                className={cn(
                  'py-6 border-b md:py-0 md:pr-4 md:border-r md:border-b-0 border-neutral-200',
                  {
                    'md:max-lg:border-r-0': (i + 1) % 2 === 0, // Right column on tablet (2nd, 4th, 6th...)
                    'lg:border-r-0': (i + 1) % 4 === 0, // Fourth column on desktop (4th, 8th, 12th...)
                  }
                )}
              >
                <p
                  className='font-medium'
                  dangerouslySetInnerHTML={{ __html: title }}
                />
                <p
                  className='text-neutral-600'
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </li>
            );
          })}
        </ul>
        {/* {contentRepeater && displayedItems < contentRepeater.length && (
          <div className='flex justify-center mt-6 md:mt-16 md:justify-start'>
            <Button
              type='control'
              onClick={() => setDisplayedItems((prev) => prev + 16)}
              label={t('load_more')}
              color='black'
            />
          </div>
        )} */}
        {downloads && downloads.length > 0 && (
          <div className='relative mt-4 md:mt-10'>
            <div
              className='inline-flex items-center gap-4 px-4 py-2 font-medium bg-white rounded-lg cursor-pointer max-md:mt-6 group text-14'
              onClick={() => setOpenedDownloads(true)}
            >
              <div className='md:pl-2'>
                <p className='font-medium'>Downloads</p>
              </div>
              <span className='flex items-center justify-center w-10 h-10 rounded-md group-hover:bg-green-light-hover bg-green-light'>
                <span className='block w-6 transition-transform group-hover:translate-y-[0.15em]'>
                  <Download />
                </span>
              </span>
            </div>
          </div>
        )}
      </div>
      <Modal open={openedDownloads} onClose={() => setOpenedDownloads(false)}>
        <div className='px-6 py-8 md:px-14 md:py-16'>
          <h3 className='mb-8 md:mb-14 max-md:pr-12'>Downloads</h3>
          <ul>
            {downloads?.map((download, i) => {
              const { sectionTitle, subsections } = download;
              return (
                <li key={i} className='mb-10 md:mb-14 last:mb-0'>
                  <h4 className='md:mb-4 h2'>{sectionTitle}</h4>
                  <ul>
                    {subsections?.map((subsection, j) => {
                      const { subsectionTitle, subsectionFiles } = subsection;

                      const subsectionId = `subsection-${i}-${j}`;

                      return (
                        <li key={j}>
                          <h5
                            className='flex items-center justify-between py-6 border-b cursor-pointer h4 border-black/30'
                            onClick={() => {
                              if (openedSubsection === subsectionId) {
                                setOpenedSubsection(null);
                              } else {
                                setOpenedSubsection(subsectionId);
                              }
                            }}
                          >
                            <span className='flex-1'>{subsectionTitle}</span>
                            <span
                              className={cn(
                                'flex items-center justify-center w-8 h-8 transition-transform md:w-10 md:h-10',
                                {
                                  'rotate-90':
                                    openedSubsection !== subsectionId,
                                  ['-rotate-90']:
                                    openedSubsection === subsectionId,
                                }
                              )}
                            >
                              <span className='w-full'>
                                <Chevron />
                              </span>
                            </span>
                          </h5>
                          <div
                            className={cn(
                              'grid overflow-hidden transition-all duration-300',
                              {
                                ['grid-rows-[0fr]']:
                                  openedSubsection !== subsectionId,
                                ['grid-rows-[1fr]']:
                                  openedSubsection === subsectionId,
                              }
                            )}
                          >
                            <ul className='overflow-hidden'>
                              {subsectionFiles?.map((item, k) => {
                                const {
                                  fileName,
                                  file,
                                  downloadUrl,
                                  mediaItemUrl,
                                } = item;

                                if (!file) return null;

                                return (
                                  <li
                                    key={k}
                                    className='py-6 border-b border-black/10'
                                  >
                                    <a
                                      href={
                                        downloadUrl
                                          ? downloadUrl
                                          : `${r2url}${file.node.file}`
                                      }
                                      className='flex items-center gap-2 text-gray-dark'
                                      target='_blank'
                                      rel='noopener noreferrer'
                                    >
                                      <span className='block w-8 h-8 md:w-10 md:h-10'>
                                        <span className='w-full'>
                                          <Download />
                                        </span>
                                      </span>
                                      <span
                                        className='flex-1'
                                        dangerouslySetInnerHTML={{
                                          __html: fileName,
                                        }}
                                      />
                                    </a>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </Modal>
    </Container>
  );
};

export default InvestorsInfo;
