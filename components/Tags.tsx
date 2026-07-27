import cn from 'classnames';

interface TagsProps {
  tags: any;
  background?: 'powder' | 'platinum' | 'green';
  className?: string;
}

const Tags: React.FC<TagsProps> = ({
  tags,
  className,
  background = 'powder',
}) => {
  return (
    <ul className={cn(className, 'flex flex-wrap gap-2')}>
      {tags.map((tag, i) => {
        const { fundTagFeatured = false, fundTagName } = tag;
        return (
          <li
            key={i}
            className={cn(
              'inline-block px-[0.375rem] py-1 font-medium transition-colors leading-[1.2] rounded-sm  text-12',
              {
                'bg-neutral-50 text-neutral-800':
                  (background === 'powder' || background === 'green') &&
                  !fundTagFeatured,
                'bg-neutral-100 text-neutral-800':
                  background === 'platinum' && !fundTagFeatured,
                'bg-neutral-600 text-white': fundTagFeatured,
                // 'bg-white text-neutral-900 group-hover:bg-green group-hover:text-neutral-900':
                //   fundTagFeatured && background === 'green',
              }
            )}
            dangerouslySetInnerHTML={{ __html: fundTagName }}
          />
        );
      })}
    </ul>
  );
};

export default Tags;
