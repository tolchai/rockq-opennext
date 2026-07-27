import { GlobalSettings } from '@/graphql/generated';
import cn from 'classnames';

import ArrowLong from '@/public/images/ui/arrow-long.svg';

interface SocialProps {
  options: GlobalSettings;
}

const Social: React.FC<SocialProps> = ({ options }) => {
  const { facebook, linkedin, twitter, additionalLinks } = options || {};

  return (
    <ul className='flex flex-col gap-1'>
      {linkedin && (
        <li>
          <a
            href={linkedin}
            className='inline-flex gap-[0.125rem]'
            target='_blank'
            rel='noopener noreferrer'
          >
            <span className='flex items-center justify-center w-4 h-4 text-black/50 bg-ash'>
              <span className='w-3'>
                <ArrowLong />
              </span>
            </span>
            <span className='flex items-center px-1 leading-none bg-white text-black/50 text-12'>
              LinkedIn
            </span>
          </a>
        </li>
      )}
      {facebook && (
        <li>
          <a
            href={facebook}
            className='inline-flex gap-[0.125rem]'
            target='_blank'
            rel='noopener noreferrer'
          >
            <span className='flex items-center justify-center w-4 h-4 text-black/50 bg-ash'>
              <span className='w-3'>
                <ArrowLong />
              </span>
            </span>
            <span className='flex items-center px-1 leading-none bg-white text-black/50 text-12'>
              Facebook
            </span>
          </a>
        </li>
      )}
      {twitter && (
        <li>
          <a
            href={twitter}
            className='inline-flex gap-[0.125rem]'
            target='_blank'
            rel='noopener noreferrer'
          >
            <span className='flex items-center justify-center w-4 h-4 text-black/50 bg-ash'>
              <span className='w-3'>
                <ArrowLong />
              </span>
            </span>
            <span className='flex items-center px-1 leading-none bg-white text-black/50 text-12'>
              Twitter
            </span>
          </a>
        </li>
      )}
      {additionalLinks &&
        additionalLinks.length > 0 &&
        additionalLinks.map((link) => (
          <li key={link?.url}>
            <a
              href={link?.url || '#'}
              className='inline-flex gap-[0.125rem]'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='flex items-center justify-center w-4 h-4 text-black/50 bg-ash'>
                <span className='w-3'>
                  <ArrowLong />
                </span>
              </span>
              <span className='flex items-center px-1 leading-none bg-white text-black/50 text-12'>
                {link?.label}
              </span>
            </a>
          </li>
        ))}
    </ul>
  );
};

export default Social;
