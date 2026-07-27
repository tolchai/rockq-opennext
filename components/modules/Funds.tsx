'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(useGSAP, ScrollTrigger);

import cn from 'classnames';

import React, { useMemo, useRef } from 'react';
import Container from '../Container';
import { Fund, ModulesModulesFundsLayout } from '@/graphql/generated';

import Modal from '../Modal';
import Image from 'next/image';
import ContactForm from '../ContactForm';
import Tags from '../Tags';

import Chevron from '@/public/images/ui/chevron.svg';
import { slugify } from '@/utils/utils';
import Buttons from '../Buttons';
import Button from '../Button';
import FundCard from '../FundCard';
import Logo from '../Logo';

import bgFund from '@/public/images/bgs/fund-ra-main.png';
import Link from 'next/link';

interface FundsProps {
  module: ModulesModulesFundsLayout;
  funds?: Fund[];
}

const Funds: React.FC<FundsProps> = ({ module, funds: fundPages }) => {
  const {
    header,
    content,
    fundSelection,
    selectedFunds,
    withSeparatedMainFund,
    mainFundIntro,
    buttons,
  } = module;

  // const [openedDetail, setOpenedDetail] = React.useState(0);

  // let count = 0;

  const fundsToShow =
    fundSelection === 'all' ? fundPages : selectedFunds?.nodes;

  // if (!fundsToShow || fundsToShow.length === 0) return null;

  const t = useTranslations('general');

  const mainFund = useMemo(() => {
    if (!withSeparatedMainFund) return null;
    return fundPages?.find((fund) => fund.fundDetails?.fundType === 'main');
  }, [fundPages, withSeparatedMainFund]);

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // gsap.from('.a-main-intro', {
      //   y: 20,
      //   duration: 1,
      //   opacity: 0,
      //   ease: 'power2.out',
      //   scrollTrigger: {
      //     trigger: '.a-main-intro',
      //     start: 'top 80%',
      //     end: 'bottom 20%',
      //     // toggleActions: 'play none none reverse',
      //   },
      // });

      // gsap.from('.a-main-fund', {
      //   y: 20,
      //   duration: 1,
      //   opacity: 0,
      //   ease: 'power2.out',
      //   scrollTrigger: {
      //     trigger: '.a-main-fund',
      //     start: 'top 80%',
      //     end: 'bottom 20%',
      //     // toggleActions: 'play none none reverse',
      //     delay: 0.4, // Small stagger delay
      //   },
      // });

      ScrollTrigger.batch('.a-main-fund', {
        onEnter: (elements, triggers) => {
          gsap.from(elements, {
            opacity: 0,
            y: 20,
            stagger: 0.5,
            duration: 1,
            ease: 'power2.out',
          });
        },
        once: true,
      });

      // ScrollTrigger.batch('.a-fund', {
      //   onEnter: (elements, triggers) => {
      //     gsap.from(elements, {
      //       opacity: 0,
      //       y: 10,
      //       stagger: 0.3,
      //       duration: 1,
      //       ease: 'power2.out',
      //     });
      //   },
      //   once: true,
      // });
    },
    {
      scope: containerRef,
    }
  );

  return (
    <Container background='powder'>
      <div ref={containerRef}>
        {header && (
          <h2
            className='mb-16 text-center max-md:px-4 md:mb-28 h1'
            dangerouslySetInnerHTML={{ __html: header }}
          />
        )}

        {withSeparatedMainFund && mainFund && (
          <div className='mb-16 a-main-fund md:mb-48'>
            {mainFundIntro && (
              <div
                className='mb-6 max-md:px-4 text-content perex-wrap md:mb-12'
                dangerouslySetInnerHTML={{ __html: mainFundIntro }}
              />
            )}
            <Link
              href={`/fund/${mainFund.slug}`}
              className='block a-main-fund group'
            >
              <div className={cn('relative flex flex-col md:flex-row gap-2')}>
                <div className='relative md:w-1/2 transition-all duration-500 lg:group-hover:w-[55%] overflow-hidden rounded-lg flex flex-col group-hover:bg-black group-hover:text-white justify-between px-4 py-8 md:px-6 bg-green md:h-[32rem]'>
                  <div className='absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100'>
                    <Image
                      src={bgFund}
                      alt=''
                      placeholder='blur'
                      className='object-cover w-full h-full'
                    />
                  </div>
                  <div className='relative'>
                    {mainFund.title && (
                      <h3
                        className='uppercase mobile-br h1'
                        dangerouslySetInnerHTML={{
                          __html: mainFund.title.replace(/ /g, '<br>'),
                        }}
                      />
                    )}
                    {mainFund.fundDetails?.fundTags &&
                      mainFund.fundDetails?.fundTags?.length > 0 && (
                        <Tags
                          tags={mainFund.fundDetails.fundTags}
                          className='mt-6 transition-opacity md:mt-10'
                          background='green'
                        />
                      )}
                  </div>
                  <div className='relative flex items-end justify-between gap-4 max-md:mt-20'>
                    <Button
                      type='faux'
                      groupHover='green'
                      label={t('explore')}
                      color='black'
                    />
                  </div>
                </div>
                <div className='relative hidden bg-black rounded-lg md:flex md:flex-col md:flex-1 md:p-8'>
                  <div className='absolute inset-6 bg-dots-white'></div>
                  {mainFund.fundDetails?.heroDisplay === 'records' && (
                    <ul className='relative text-white'>
                      {mainFund.fundDetails?.trackRecord?.map((item, i) => {
                        const label = item?.label;
                        const value = item?.value;
                        return (
                          <li
                            key={i}
                            className='pt-6 border-t first:border-t-0 first:pt-0 mb-9 border-white/30 md:mb-12 last:mb-0'
                          >
                            <p
                              className='mb-4 label text-neutral-300'
                              dangerouslySetInnerHTML={{ __html: label ?? '' }}
                            />
                            <p
                              className='mb-6 leading-none font-head text-56'
                              dangerouslySetInnerHTML={{ __html: value ?? '' }}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {(mainFund.content ||
                    mainFund.fundDetails?.shortDescription) && (
                    <div
                      className='relative text-neutral-300 md:mt-auto md:w-1/2 lg:w-64'
                      dangerouslySetInnerHTML={
                        mainFund.fundDetails?.shortDescription
                          ? {
                              __html: mainFund.fundDetails?.shortDescription,
                            }
                          : { __html: mainFund.content ?? '' }
                      }
                    />
                  )}
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          {content && (
            <div>
              <div
                className={cn(
                  'text-content md:sticky md:top-24 max-md:px-4 perex-wrap md:pr-24'
                )}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          )}
          <div>
            <ul className='flex flex-col gap-4'>
              {fundsToShow?.map((fundPage, i) => {
                const fundType = fundPage.fundDetails?.fundType;

                if (withSeparatedMainFund && fundType === 'main') {
                  return null;
                }

                return (
                  <li className='a-fund' key={i}>
                    <FundCard fund={fundPage} />
                  </li>
                );
              })}
            </ul>
            {buttons && buttons.length > 0 && (
              <div className='mt-6 max-md:flex max-md:justify-center'>
                <div>
                  <Buttons buttons={buttons} fullWidth={true} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <Modal open={openedDetail > 0} onClose={() => setOpenedDetail(0)}>
        {openedDetail > 0 && <FundsOverlay item={funds?.[openedDetail - 1]} />}
      </Modal> */}
    </Container>
  );
};

// OVERLAY

const FundsOverlay = ({
  item,
}: // setOpenedDetail,
{
  item?: any;
  // setOpenedDetail: (value: number) => void;
}) => {
  if (!item) return null;

  const { name, subfunds, formId } = item;

  return (
    <>
      <div className='px-6 py-8 md:px-14 md:py-16'>
        <h3 className='mb-8 md:mb-14 max-md:pr-10'>{name}</h3>
        {subfunds?.map((subfund: any, i: number) => {
          const { name, description, logos } = subfund;
          return (
            <div
              key={i}
              className='pb-10 mb-10 border-b border-black/10 last:border-0 last:mb-0 last:pb-0'
            >
              <h4
                className='mb-6 h2'
                dangerouslySetInnerHTML={{ __html: name }}
              ></h4>
              <div
                className='text-gray-dark text-content'
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
              {logos?.nodes?.length > 0 && (
                <ul className='flex flex-wrap items-center gap-6 mt-8 md:gap-8'>
                  {logos.nodes.map((logo: any, i: number) => (
                    <li key={i}>
                      <Logo logo={logo} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
      {formId && (
        <div className='px-6 py-8 bg-gray-light md:px-14 md:py-16'>
          <span className='hidden'>{formId}</span>
          <ContactForm formId={formId} type='fund' />
        </div>
      )}
    </>
  );
};

export default Funds;
