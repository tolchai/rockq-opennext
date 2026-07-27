import cn from 'classnames';

import React from 'react';
import Container from '../Container';
import { ModulesModulesLegalLayout } from '@/graphql/generated';

import Arrow from '@/public/images/ui/arrow.svg';
import Download from '@/public/images/ui/download.svg';

interface LegalProps {
  module: ModulesModulesLegalLayout;
}

const Legal: React.FC<LegalProps> = ({ module }) => {
  const { header, legalBlocks } = module;

  const r2url =
    'https://pub-2ca469bbae0d4a1d88d2f7df7c48b4fc.r2.dev/wp-content/uploads/'; // process.env.R2_URL;

  return (
    <Container>
      <div className='md:w-2/3 md:mx-auto'>
        {header && (
          <div
            className='text-content'
            dangerouslySetInnerHTML={{ __html: header }}
          ></div>
        )}
        {legalBlocks && legalBlocks.length > 0 && (
          <ul>
            {legalBlocks.map((block, i) => {
              const { __typename, blockTitle } = block;

              return (
                <li
                  key={i}
                  className='pb-6 my-6 border-b md:my-10 border-neutral-200 md:pb-10 last:border-0 last:mb-0 last:pb-0'
                >
                  {blockTitle && (
                    <h2
                      className='mb-4 h3 md:mb-6'
                      dangerouslySetInnerHTML={{ __html: blockTitle }}
                    />
                  )}
                  {__typename ===
                    'ModulesModulesLegalBlocksLegalContentLayout' &&
                    block?.blockContent && (
                      <div
                        className='text-content text-neutral-700 text-content--detail'
                        dangerouslySetInnerHTML={{
                          __html: block.blockContent,
                        }}
                      />
                    )}
                  {__typename === 'ModulesModulesLegalBlocksLegalLinksLayout' &&
                    block?.links && (
                      <ul className=''>
                        {block.links.map((link, j) => {
                          const { url, label } = link;
                          return (
                            <li key={j} className='mb-2'>
                              <a
                                href={url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='relative pl-8 text-neutral-700 hover:underline'
                              >
                                <span className='absolute top-[0.1em] left-0 w-4'>
                                  <Arrow />
                                </span>
                                <span
                                  dangerouslySetInnerHTML={{ __html: label }}
                                />
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  {__typename ===
                    'ModulesModulesLegalBlocksLegalDownloadsLayout' &&
                    block?.downloadSections && (
                      <ul className=''>
                        {block.downloadSections.map((download, i) => {
                          const { sectionTitle, subsections } = download;
                          return (
                            <li key={i} className='mb-10 md:mb-14 last:mb-0'>
                              <h3 className='md:mb-4 h4'>{sectionTitle}</h3>
                              <ul>
                                {subsections?.map((subsection, j) => {
                                  const { subsectionTitle, subsectionFiles } =
                                    subsection;

                                  const subsectionId = `subsection-${i}-${j}`;

                                  return (
                                    <li key={j} className='md:mb-4 last:mb-0'>
                                      <h4
                                        className='mb-2 h5'
                                        // onClick={() => {
                                        //   if (openedSubsection === subsectionId) {
                                        //     setOpenedSubsection(null);
                                        //   } else {
                                        //     setOpenedSubsection(subsectionId);
                                        //   }
                                        // }}
                                      >
                                        {subsectionTitle}
                                        {/* <span
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
                                        </span> */}
                                      </h4>

                                      <ul>
                                        {subsectionFiles?.map((item, k) => {
                                          const {
                                            fileName,
                                            file,
                                            downloadUrl,
                                            mediaItemUrl,
                                          } = item;

                                          return (
                                            <li key={k}>
                                              <a
                                                href={
                                                  downloadUrl
                                                    ? downloadUrl
                                                    : `${r2url}${file.node.file}`
                                                }
                                                className='relative pl-8 text-neutral-700 hover:underline'
                                                target='_blank'
                                                rel='noopener noreferrer'
                                              >
                                                <span className='block w-4 left-0 top-[0.1em] absolute'>
                                                  <Download />
                                                </span>
                                                <span
                                                  dangerouslySetInnerHTML={{
                                                    __html: fileName,
                                                  }}
                                                />
                                              </a>
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    </li>
                                  );
                                })}
                              </ul>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Container>
  );
};

export default Legal;
