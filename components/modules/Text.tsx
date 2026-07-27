import cn from 'classnames';

import React from 'react';
import Container from '../Container';
import { ModulesModulesTextLayout } from '@/graphql/generated';
import Buttons from '../Buttons';
import ContactBadge from '../ContactBadge';
import Image from 'next/image';
import { PostTypes } from '@/lib/types';
import BgImage from '../BgImage';

import styles from './Text.module.css';

interface TextProps extends PostTypes {
  module: ModulesModulesTextLayout;
}

const Text: React.FC<TextProps> = ({ module, postType }) => {
  const {
    content,
    withContactLink,
    withSecondaryContent,
    secondaryContent,
    withImage,
    image,
    buttons,
  } = module;
  return (
    <div
      className={cn('relative', {
        'py-6 md:py-10': withContactLink,
      })}
    >
      {withContactLink && <BgImage imageNumber={2} />}
      <Container
        className='relative'
        bordered={!withContactLink}
        topBordered={!withContactLink && !!buttons && buttons.length > 0}
      >
        <div
          className={cn('max-lg:py-18 max-lg:px-4', {
            'bg-white md:p-12 rounded-lg md:rounded-xl': withContactLink,
            // 'md:pt-18 md:pb-30 md:px-12':
            //   !withContactLink &&
            //   (!buttons || buttons.length === 0) &&
            //   !withImage,
            'md:w-5/6':
              !withContactLink &&
              (!buttons || buttons.length === 0) &&
              !withImage &&
              postType === 'service',
            'md:py-28 md:px-12': !withContactLink && !withImage,
            'grid gap-5 px-4 md:px-12 md:grid-cols-2 md:py-18': withImage,
          })}
        >
          <div className={cn({})}>
            {content && (
              <div
                className={cn('text-content', styles.content, {
                  'md:w-2/3': withContactLink && withSecondaryContent,
                })}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
            {buttons && buttons.length > 0 && (
              <div className={cn('mt-8 md:mt-12', {})}>
                <Buttons buttons={buttons} />
              </div>
            )}
            {withSecondaryContent && secondaryContent && (
              <div
                className={cn('mt-8 text-content text-neutral-600', {
                  'md:w-1/3 md:ml-auto md:mt-30 body-large-wrap':
                    withContactLink,
                  'md:columns-2 md:w-2/3 md:mt-18 md:ml-auto md:gap-10':
                    !withContactLink,
                })}
                dangerouslySetInnerHTML={{ __html: secondaryContent }}
              />
            )}
            {withContactLink && (
              <div className='mt-8 md:w-1/3 md:ml-auto'>
                <ContactBadge />
              </div>
            )}
          </div>
          {withImage && image && image.node && (
            <div>
              <Image
                src={image.node.sourceUrl || ''}
                alt={image.node.altText || 'Image'}
                width={image.node.mediaDetails?.width || 300}
                height={image.node.mediaDetails?.height || 300}
                className='block w-full h-auto'
              />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Text;
