import { parseISO, format } from 'date-fns';

import cn from 'classnames';

import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

import React from 'react';

import { Opportunity, Post } from '@/graphql/generated';
import Image from 'next/image';
import BackButton from './BackButton';
import Container from './Container';

interface OpportunityContentProps {
  page: Opportunity;
}

const OpportunityContent: React.FC<OpportunityContentProps> = ({ page }) => {
  const { content } = page;

  return (
    <Container className='max-md:-my-8'>
      <div
        className='text-content text-content--detail text-content--opportunity cm'
        dangerouslySetInnerHTML={{ __html: content || '' }}
      />
    </Container>
  );
};

export default OpportunityContent;
