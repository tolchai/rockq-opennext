import { ButtonRecord, SharedRecord } from '@/graphql/generated';
import cn from 'classnames';

import Logo from '/public/logo.svg';
import Link from 'next/link';
import Footer from './Footer';
import Button from './Button';

interface ButtonsProps {
  buttons: any[];
  color?: 'green' | 'transparent';
  // align?: 'left' | 'center' | 'right';
  // background?: "light" | "dark";
  // size?: 'small' | 'normal';
  // margined?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
}

const Buttons: React.FC<ButtonsProps> = ({
  buttons,
  // align = 'left',
  // margined = true,
  fullWidth = false,
  // size = 'normal',
  // background,
  color: presetColor = 'green',
  onClick,
}) => {
  return (
    <div
      className={cn('flex gap-2 flex-wrap list-none md:items-center', {
        // ['mt-6']: margined,
        // ['justify-center']: align === 'center',
        // ['justify-end']: align === 'right',
      })}
    >
      {buttons.length > 0 &&
        buttons.map((button, i) => {
          const { label, type, url, page, color } = button;

          let href = '';

          switch (type[0]) {
            // case 'internal': {
            //   if (targetInternal?.__typename === 'PageRecord') {
            //     href = `/${targetInternal.slug || ''}`;
            //   }
            //   // else if (targetInternal?.__typename === "FormatRecord") {
            //   //   href = `/format/${targetInternal?.slug || ""}`;
            //   // }
            //   break;
            // }
            case 'internal': {
              href = page?.nodes[0]?.uri || '';
              break;
            }
            case 'external': {
              href = url || '';
              break;
            }
            default: {
              href = '#';
              break;
            }
          }

          return (
            <div key={i} className={cn({ 'flex-1': fullWidth })}>
              <Button
                label={label ? label : ''}
                href={href}
                type={
                  type[0] === 'internal' || type[0] === 'external'
                    ? 'link'
                    : type[0]
                }
                color={color}
                // background={background}
                onClick={onClick}
                // size={size}
                fullWidth={fullWidth}
              />
            </div>
          );
        })}
    </div>
  );
};

export default Buttons;
