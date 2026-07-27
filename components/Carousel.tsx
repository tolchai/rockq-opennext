'use client';

import cn from 'classnames';

import gsap from 'gsap';
// import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectFade, Autoplay } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';

// import { Swiper as SwiperClass} from 'swiper/types';

import Arrow from '@/public/images/ui/arrow.svg';
// import ArrowRight from "/public/arrow-right.svg";

interface CarouselProps {
  // activeIndex?: number | undefined;
  allowTouchMove?: boolean;
  autoPlay?: boolean;
  className?: string;
  children: React.ReactNode[];
  slideClassName?: string;
  centeredSlides?: boolean;
  loop?: boolean;
  effect?: 'fade' | 'slide';
  slidesPerView?: number | 'auto';
  // handleActiveIndex?: (index: number) => void;
  setActiveIndex?: (index: number) => void;
  withNavigation?: boolean;
  withPagination?: boolean;
  background?: 'image' | 'transparent';
  mobileNavigationPosition?: 'top' | 'bottom';
  navigationPosition?: 'static' | 'absolute';
  navigationBackground?: 'light' | 'dark';
  navigationClasses?: string;
  paginationClasses?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  // activeIndex,
  className,
  children,
  loop = false,
  slideClassName,
  autoPlay = false,
  effect = 'fade',
  allowTouchMove = true,
  // background = "transparent",
  centeredSlides = false,
  slidesPerView = 1,
  setActiveIndex,
  // handleActiveIndex,
  withNavigation = false,
  withPagination = false,
  mobileNavigationPosition = 'top',
  navigationPosition = 'static',
  navigationClasses = '',
  paginationClasses = '',
  navigationBackground = 'light',
}) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | false>(
    false,
  );
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current realIndex

  // useEffect(() => {
  //   if (activeIndex !== undefined && swiperInstance) {
  //     swiperInstance.slideTo(activeIndex);
  //   }
  // }, [activeIndex, swiperInstance, handleActiveIndex]);

  // const slidePrevRef = useRef<HTMLLIElement>(null);
  // const slideNextRef = useRef<HTMLLIElement>(null);

  // const paginationRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (!swiperInstance) return;

  //   const handler = () => {
  //     // swiperInstance.update();
  //     // setLocked(swiperInstance.isLocked);

  //     if (swiperInstance.isLocked && !loop) {
  //       setShowNavigation(false);
  //     } else {
  //       setShowNavigation(true);
  //     }
  //   };

  //   window.addEventListener('resize', handler);
  //   return () => window.removeEventListener('resize', handler);
  // }, [swiperInstance]);

  // useEffect(() => {
  //   if (!swiperInstance) return;

  //   const handler = () => {
  //     // swiperInstance.update();
  //     // setLocked(swiperInstance.isLocked);

  //     console.log('swiperInstance.isLocked', swiperInstance.isLocked);

  //     // if (swiperInstance.isLocked && !loop) {
  //     //   setShowNavigation(false);
  //     // } else {
  //     //   setShowNavigation(true);
  //     // }
  //   };

  //   window.addEventListener('resize', handler);
  //   return () => window.removeEventListener('resize', handler);
  // }, [swiperInstance]);

  return (
    <>
      <Swiper
        allowTouchMove={allowTouchMove}
        autoplay={
          autoPlay
            ? {
                delay: 5000,
                disableOnInteraction: true,
              }
            : false
        }
        className={cn(className, 'h-full w-full')}
        speed={500}
        effect={effect}
        pagination={
          withPagination
            ? {
                type: 'fraction',

                renderFraction: (currentClass, totalClass) => {
                  return `<span class="text-20 font-semibold ${currentClass}"></span><span class="text-20 font-semibold text-ash"> / </span><span class="text-ash font-semibold text-20 ${totalClass}"></span>`;
                },
              }
            : false
        }
        centeredSlides={centeredSlides}
        fadeEffect={
          effect === 'fade'
            ? {
                crossFade: true,
              }
            : undefined
        }
        loop={loop}
        slidesPerView={slidesPerView}
        modules={[Pagination, Navigation, EffectFade, Autoplay]}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper);
          ScrollTrigger.refresh();
        }}
        onSlideChange={(swiper) => {
          setCurrentIndex(swiper.realIndex); // Update the current index
          if (setActiveIndex) {
            setActiveIndex(swiper.realIndex);
          }
        }}
      >
        {children?.map((child, i) => (
          <SwiperSlide key={i} className={cn(slideClassName)}>
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
      {/* {withPagination && (
        <ul
          className={cn(
            'absolute z-10 flex justify-center gap-1',
            paginationClasses,
            {
              'bottom-3 right-4': !paginationClasses,
            }
          )}
        >
          {children?.map((child, i) => (
            <li
              key={i}
              className='flex items-end h-1 cursor-pointer'
              onClick={() => {
                if (swiperInstance) {
                  swiperInstance.slideTo(i);
                }
              }}
            >
              <span
                className={cn(
                  'block w-[0.375rem] h-[0.375rem] bg-white rounded-full transition-all',
                  {
                    'opacity-30': currentIndex !== i, // Use currentIndex instead of swiperInstance?.realIndex
                  }
                )}
              ></span>
            </li>
          ))}
        </ul>
      )} */}
      {withNavigation && (
        <div
          className={cn('flex z-10 absolute', navigationClasses, {
            'bottom-0 md:right-auto md:left-50 right-0': !navigationClasses,
          })}
        >
          <ul
            className={cn('flex gap-1', {
              // '-top-18 right-0 absolute': mobileNavigationPosition === 'top',
              // 'mt-4': mobileNavigationPosition === 'bottom',
              // 'mt-4 md:mt-8': !navigationClasses,
              'opacity-0 pointer-events-none': swiperInstance?.isLocked,
            })}
          >
            <li
              // ref={slidePrevRef}
              className={cn(
                'flex items-center justify-center bg-black hover:bg-black-hover transition-colors text-white w-10 h-10 rounded-full cursor-pointer  group',
                {},
              )}
              onClick={() => {
                if (swiperInstance) {
                  // if there is a previous or if its looped slidePrev, otherwise slideTo last
                  if (swiperInstance.isBeginning && !loop) {
                    swiperInstance.slideTo(swiperInstance.slides.length - 1);
                  } else {
                    swiperInstance.slidePrev();
                  }
                }
              }}
            >
              <span className='block w-6 transition-transform rotate-180 group-hover:-translate-x-[0.15em]'>
                <Arrow />
              </span>
            </li>
            <li
              // ref={slidePrevRef}
              className={cn(
                'flex items-center justify-center bg-black hover:bg-black-hover transition-colors text-white w-10 h-10 rounded-full cursor-pointer group',
                {},
              )}
              onClick={() => {
                if (swiperInstance) {
                  if (swiperInstance.isEnd && !loop) {
                    swiperInstance.slideTo(0);
                  } else {
                    swiperInstance.slideNext();
                  }
                }
              }}
            >
              <span className='block w-6 transition-transform group-hover:translate-x-[0.15em]'>
                <Arrow />
              </span>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Carousel;
