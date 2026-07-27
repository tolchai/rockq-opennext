'use client';

import { useAppContext } from '@/providers/AppProvider';
import cn from 'classnames';
// import AnimLink from "next/link";

import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

// import { AnimLink } from "./AnimLink";
import Link from 'next/link';

import Arrow from '@/public/images/ui/arrow.svg';

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  color?: 'green' | 'transparent' | 'black' | 'white';
  mobileColor?: 'green' | 'transparent' | 'black' | 'white';
  groupHover?: 'green' | 'transparent' | 'black' | 'white';
  fullWidth?: boolean;
  href?: string;
  type: 'link' | 'contact' | 'control' | 'faux';
  // size?: "small" | "normal";
  mobileSize?: 'small' | 'normal';
  onClick?: () => void;
  label: string;
  withTransition?: boolean;
  // animation?: boolean;
  // arrowColor?: "default" | "gold";
  // arrowDirection?: "right" | "down";
  // offset?: number;
}

// interface ArrowButtonProps {
//   color: "default" | "gold";
//   direction: "right" | "down";
// }

const Button: React.FC<ButtonProps> = ({
  className,
  href,
  color = 'black',
  groupHover,
  mobileColor,
  mobileSize,
  disabled = false,
  fullWidth = false,
  // background = "transparent",
  type = 'link',
  onClick,
  // size,
  label,
  withTransition = true,
  // animation = true,
  // arrowColor = "default",
  // arrowDirection = "right",
  // offset = 0,
}) => {
  const buttonClassName = cn(
    className,
    'text-center flex bg-black text-white hover:bg-black-hover leading-none justify-center min-w-24 gap-2 rounded-full text-14 font-medium p-4 md:px-5',
    {
      'w-full': fullWidth,
      'cursor-pointer': !disabled,
      'cursor-not-allowed': disabled,
      // 'bg-green hover:bg-green-hover text-black group-hover:bg-green-hover':
      //   color === 'green',
      // 'bg-black text-white hover:bg-black-hover ': color === 'black',
      // 'group-hover:bg-black-hover': color === 'black' && !groupHover,
      // 'group-hover:bg-green group-hover:text-black group-hover:hover:bg-green group-hover:hover:text-black':
      //   groupHover === 'green',
      // 'bg-white text-black hover:bg-neutral-100 group-hover:bg-neutral-100':
      //   color === 'white',
      // 'max-md:bg-green max-md:text-black': mobileColor === 'green',
      // 'border hover:bg-black hover:text-white': color === 'transparent',
      'transition-colors': withTransition,
      'max-md:px-3': mobileSize === 'small',
      group: type === 'link' && href?.startsWith('http'),
      // "bg-white/15 backdrop-blur-sm hover:bg-white/20": color === "gray",
      // "text-14 py-2 px-3": size === "small",
      // "text-16 py-4 px-5": size === "normal",
      // '':
      //   (state === 'dark' || state === 'light') && color === 'transparent',
    },
  );

  const { setOpenedContactOverlay } = useAppContext();

  if (type === 'link' && href?.charAt(0) === '/') {
    return (
      <>
        {/* {animation ? (
          <AnimLink href={href} className={buttonClassName} onClick={onClick}>
            {color === "arrow" && (
              <ArrowButton color={arrowColor} direction={arrowDirection} />
            )}
            {label}
          </AnimLink>
        ) : ( */}
        <Link
          href={href}
          className={buttonClassName}
          onClick={onClick}
          // scroll={false}
        >
          <span dangerouslySetInnerHTML={{ __html: label }} />
        </Link>
        {/* )} */}
      </>
    );
  } else if (type === 'link' && href?.charAt(0) === '#') {
    return (
      <a
        href={href}
        className={buttonClassName}
        onClick={(e) => {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            gsap.to(window, {
              duration: 0.5,
              scrollTo: {
                y: target.getBoundingClientRect().top + window.scrollY,
                autoKill: false,
                offsetY: document.querySelector('header')?.clientHeight || 0,
              },
            });
          }
        }}
      >
        <span dangerouslySetInnerHTML={{ __html: label }} />
      </a>
    );
  } else if (type === 'link' && href) {
    return (
      <a
        href={href}
        className={buttonClassName}
        target='_blank'
        rel='noopener noreferrer'
      >
        <span dangerouslySetInnerHTML={{ __html: label }} />
        <span className='w-4 transition-transform -rotate-45 group-hover:translate-x-[0.1rem] group-hover:-translate-y-[0.1rem]'>
          <Arrow />
        </span>
      </a>
    );
  } else if (type === 'control') {
    return (
      <button
        type='submit'
        className={buttonClassName}
        onClick={() => {
          if (onClick && !disabled) {
            onClick();
          }
        }}
      >
        <span dangerouslySetInnerHTML={{ __html: label }} />
      </button>
    );
  } else if (type === 'contact') {
    return (
      <a
        href={href || '#'}
        className={buttonClassName}
        onClick={(e) => {
          e.preventDefault();
          setOpenedContactOverlay(true);
        }}
      >
        <span dangerouslySetInnerHTML={{ __html: label }} />
      </a>
    );
  } else if (type === 'faux') {
    return (
      <span className={buttonClassName}>
        <span dangerouslySetInnerHTML={{ __html: label }} />
      </span>
    );
  }
};

export default Button;
