import cn from 'classnames';

import React from 'react';
import Container from '../Container';
import { ModulesModulesNumbersLayout } from '@/graphql/generated';

interface Numbers {
  module: ModulesModulesNumbersLayout;
}

const Numbers: React.FC<Numbers> = ({ module }) => {
  const { numbers } = module;
  return (
    <Container>
      <ul className='flex flex-col gap-20 text-center md:justify-center md:flex-row'>
        {numbers?.map((number, i) => {
          if (!number) return null;
          const { value, label } = number;
          return (
            <li key={i} className='md:flex-1'>
              <p
                className='text-36 font-head'
                dangerouslySetInnerHTML={{ __html: value }}
              />
              <div className='flex justify-center h-px mx-5 my-6 md:my-5 bg-black/10 md:mx-10'>
                <span className='block h-[3px] bg-black w-8 -translate-y-1/2'></span>
              </div>
              <p
                className='text-gray-dark'
                dangerouslySetInnerHTML={{ __html: label }}
              />
            </li>
          );
        })}
      </ul>
    </Container>
  );
};

export default Numbers;
