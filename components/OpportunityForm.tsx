import bgFund from '@/public/images/bgs/form.png';

import React from 'react';

import { Opportunity } from '@/graphql/generated';
import Image from 'next/image';
import Container from './Container';
import ContactForm from './ContactForm';

interface OpportunityFormProps {
  page: Opportunity;
  formId: number;
  zapierHook?: string;
}

const OpportunityForm: React.FC<OpportunityFormProps> = ({
  page,
  formId,
  zapierHook,
}) => {
  // console.log('formId', formId);
  return (
    <Container verticalPadding={false} horizontalPadding={false}>
      <div className='relative p-2 overflow-hidden text-white bg-black md:px-16 md:py-20 rounded-xl'>
        <div className='absolute inset-0'>
          <Image
            src={bgFund}
            alt=''
            placeholder='blur'
            width={2784}
            height={1620}
            className='object-cover w-full h-full'
          />
        </div>
        <div className='relative'>
          <ContactForm
            formId={formId}
            type='opportunity'
            background='dark'
            zapierHook={zapierHook}
            pageTitle={page?.title || ''}
          />
        </div>
      </div>
    </Container>
  );
};

export default OpportunityForm;
