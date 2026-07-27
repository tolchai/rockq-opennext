import cn from 'classnames';

import React from 'react';
import Container from '../Container';
import { GlobalSettings, ModulesModulesFormLayout } from '@/graphql/generated';
import ContactForm from '../ContactForm';
import BgImage from '../BgImage';

interface FormProps {
  module: ModulesModulesFormLayout;
  formId?: number;
  options: GlobalSettings;
  formIntro?: string;
  zapierHook?: string;
}

const Form: React.FC<FormProps> = ({
  module,
  options,
  formId,
  formIntro,
  zapierHook,
}) => {
  const { mainFormId, mainZapierHook } = options;

  const { customFormIntro, withCustomFormIntro } = module;

  return (
    <div className='relative py-6 md:py-10'>
      <BgImage imageNumber={1} />
      <Container className='relative'>
        <div className='px-4 py-8 bg-white rounded-lg md:p-12 md:rounded-xl '>
          <div className='relative'>
            <ContactForm
              formId={formId ? formId : mainFormId}
              type='fund'
              background='light'
              customText={
                withCustomFormIntro && customFormIntro
                  ? customFormIntro
                  : formIntro
              }
              zapierHook={zapierHook ? zapierHook : mainZapierHook}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Form;
