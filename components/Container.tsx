'use client';

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

// import { useAppContext } from "@/providers/AppProvider";
import cn from 'classnames';
// import React, { useEffect, useRef } from "react";

interface ContainerProps {
  // background?:
  //   | 'white'
  //   | 'platinum'
  //   | 'dun'
  //   | 'powder'
  //   | 'neutral-900'
  //   | 'transparent'
  //   | 'image';
  // verticalPadding?: boolean;
  horizontalPadding?: boolean;
  bordered?: boolean;
  topBordered?: boolean;
  // setBackground?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({
  // background = 'transparent',
  // verticalPadding = true,
  bordered = false,
  topBordered = false,
  horizontalPadding = true,
  // setBackground = true,
  className,
  children,
}) => {
  // const { setState } = useAppContext();

  // const containerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   let ctx = gsap.context(() => {
  //     const headerElement = document.querySelector("#header");
  //     const headerHeight =
  //       headerElement !== null ? headerElement.clientHeight / 2 : 0;

  //     ScrollTrigger.create({
  //       trigger: containerRef.current,
  //       start: () => `top top+=${headerHeight}`,
  //       end: () => `bottom top+=${headerHeight}`,
  //       // markers: process.env.NODE_ENV === "development" ? true : false,
  //       onEnter: () => {
  //         setState(background === "beige" ? "light" : "dark");
  //       },
  //       onEnterBack: () => {
  //         setState(background === "beige" ? "light" : "dark");
  //       },
  //     });
  //     // }
  //   });
  //   return () => ctx.revert(); // <-- CLEANUP!
  // }, [background, setState]);

  return (
    <div className={cn({ 'border-t border-neutral-100': topBordered })}>
      <div
        // ref={containerRef}
        className={cn(className, 'max-w-[1600px] mx-auto', {
          'px-2 md:px-10': horizontalPadding,
          // 'py-12 md:py-20': verticalPadding,
          // 'bg-neutral-900 text-white': background === 'neutral-900',
          // 'bg-neutral-300': background === 'dun',
          // 'bg-neutral-50': background === 'powder',
          // 'bg-white': background === 'white',
          // 'rounded-lg':
          //   background === 'powder' ||
          //   background === 'white' ||
          //   background === 'neutral-900',
          // 'bg-black text-white': background === 'black',
        })}
      >
        <div
          className={cn({ 'border-l border-r border-neutral-100': bordered })}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Container;
