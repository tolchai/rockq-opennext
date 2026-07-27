import cn from 'classnames';

import React, { Fragment } from 'react';
import Container from '../Container';
import {
  Fund,
  FundSector,
  ModulesModulesFundSectorsLayout,
} from '@/graphql/generated';
import Tags from '../Tags';
import FundCard from '../FundCard';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import Logo from '../Logo';

interface FundSectorsProps {
  module: ModulesModulesFundSectorsLayout;
  fundSectors?: FundSector[];
}

const FundSectors: React.FC<FundSectorsProps> = ({ module, fundSectors }) => {
  const { header } = module;
  return (
    <Container>
      {header && (
        <div
          className='mb-16 p-to-h3 max-md:p-4 text-content md:w-1/2 md:mt-10 md:mb-20'
          dangerouslySetInnerHTML={{ __html: header }}
        />
      )}
      {fundSectors && fundSectors.length > 0 && (
        <ul className='flex flex-col gap-6 max-md:-mx-2 md:gap-4'>
          {fundSectors.map((sector, i) => {
            const { name, description, funds, fundSectorDetails } = sector;
            return (
              <li
                key={i}
                className='grid grid-cols-1 p-2 bg-neutral-50 md:p-12 rounded-xl md:rounded-xl md:grid-cols-2'
              >
                <div className='flex flex-col md:gap-10 max-md:px-6 max-md:py-8 md:pr-28'>
                  {name && (
                    <h2
                      className='h3 max-md:mb-8'
                      dangerouslySetInnerHTML={{ __html: name }}
                    />
                  )}
                  {description && (
                    <div
                      className='text-content text-neutral-600'
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  )}
                  {fundSectorDetails?.companies?.nodes &&
                    fundSectorDetails?.companies?.nodes?.length > 0 && (
                      <div className='pt-8 mt-8 border-t grayscale md:mt-auto border-neutral-100 md:py-7'>
                        <Marquee
                          gradient={true}
                          gradientColor='#f9f7f3'
                          speed={30}
                        >
                          <div className='flex items-center'>
                            {[...Array(3)].map((el, i) => (
                              <Fragment key={i}>
                                {fundSectorDetails?.companies?.nodes.map(
                                  (logo, i) => (
                                    <Logo key={i} logo={logo} />
                                  )
                                )}
                              </Fragment>
                            ))}
                          </div>
                        </Marquee>
                      </div>
                    )}
                </div>
                {funds && funds.nodes?.length > 0 && (
                  <ul className='flex flex-col gap-2 md:gap-4'>
                    {(funds.nodes as Fund[]).map((fund, j) => {
                      return (
                        <li key={j}>
                          <FundCard fund={fund} />
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
    </Container>
  );
};

export default FundSectors;
