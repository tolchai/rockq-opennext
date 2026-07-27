import { Link } from '@/graphql/generated';
import cn from 'classnames';
import { cs } from 'date-fns/locale';

import { parseISO, format } from 'date-fns';
import Button from './Button';

interface WebinarCardProps {
  webinar: Link;
  currentLocale: string;
}

const WebinarCard: React.FC<WebinarCardProps> = ({
  webinar,
  currentLocale,
}) => {
  const { title, date, externalLinks } = webinar;

  if (!externalLinks?.url) {
    return null;
  }

  return (
    <a
      href={externalLinks.url}
      className='flex flex-col aspect-[2/1] bg-white p-4 rounded-lg md:p-6'
      target='_blank'
      rel='noreferrer noopener'
    >
      <p className='h4' dangerouslySetInnerHTML={{ __html: title || '' }} />
      {date && (
        <p className='mt-2 text-sm text-neutral-500'>
          {format(
            parseISO(date),
            currentLocale === 'cs' ? 'd. MMMM, yyyy' : 'MMMM d, yyyy',
            {
              locale: currentLocale === 'cs' ? cs : undefined,
            }
          )}
        </p>
      )}
      <div className='flex mt-auto'>
        <Button
          type='faux'
          color='black'
          label={externalLinks.label || 'Learn more'}
        />
      </div>
    </a>
  );
};

export default WebinarCard;
