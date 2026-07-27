'use client';

import React, { useState, useCallback } from 'react';

import cn from 'classnames';

// import { useReCaptcha } from "next-recaptcha-v3";

import axios from 'axios';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from './form/Input';
import Textarea from './form/TextArea';
// import Button from "./Button";
import Checkbox from './form/Checkbox';
import Select from './form/Select';
import Button from './Button';
import { AttributionHiddenClient } from './AttributionHiddenClient';
import { Fund } from '@/graphql/generated';
// import { AnimLink } from "./AnimLink";
// import Heading from "./Heading";
// import { CareerRecord, CompanyRecord } from "@/graphql/generated";
// import { useRouter } from "@/navigation";
// import GoogleCaptchaWrapper from "./RecaptchaWrapper";

import Chevron from '@/public/images/ui/chevron.svg';
import File from './form/File';

interface ContactFormProps {
  formId: number;
  type?: 'contact' | 'fund' | 'opportunity' | 'overlay';
  background?: 'dark' | 'light';
  customText?: string;
  zapierHook?: string;
  pageTitle?: string;
  funds?: Fund[];
  selectedFund?: Fund | null;
  setSelectedFund?: (fund: Fund | null) => void;
}

interface FormValues {
  name: string;
  // phone: string;
  email: string;
  role?: string;
  // resume?: string;
  message?: string;
  page_title?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  formId,
  type = 'contact',
  background = 'light',
  customText,
  zapierHook,
  pageTitle = '',
  selectedFund,
  setSelectedFund,
  funds,
}) => {
  // console.log(zapierHook);

  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const formRef = React.useRef<HTMLFormElement>(null);

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, 'Name must be minimum 2')
      .max(100, 'Name must not be more than 100 characters')
      .required('Name is required'),
    // phone: Yup.string()
    //   // .matches(
    //   //   /^(\+?\d{1,3}[- ]?)?\d{10}$/,
    //   //   'Phone number must be a valid format'
    //   // )
    //   .required('Phone number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    // linkedin url validation
    linkedin:
      type === 'opportunity'
        ? Yup.string()
            .matches(/linkedin/i, 'Please provide a LinkedIn profile URL')
            .nullable()
        : Yup.string().nullable(),
  });

  // if (activeVariant?.fields.indexOf("resume") !== -1) {
  //   validationSchema = validationSchema.shape({
  //     resume: Yup.string().url("Invalid URL"),
  //   });
  // }

  // if (activeVariant?.fields.indexOf("linkedin") !== -1) {
  //   validationSchema = validationSchema.shape({
  //     linkedin: Yup.string().url("Invalid URL"),
  //   });
  // }

  // console.log(validationSchema);

  const handleSubmit = async (values: FormValues) => {
    // only select values from the form that are in the active variant

    console.log('values', values);

    // const action = formRef.current?.getAttribute('action');
    // const method = formRef.current?.getAttribute('method');

    // console.log(action, method);

    const body = new FormData(formRef.current as HTMLFormElement);
    // body.append('_wpcf7_unit_tag', formId.toString());
    body.append('zapier_hook', zapierHook ? zapierHook : '');

    // console.log(zapierHook);

    const nonEmptyBody = new FormData();
    body.forEach((value, key) => {
      if (value) {
        nonEmptyBody.append(key, value);
        console.log(key, value);
      }
    });

    const res = await fetch(`/api/form`, {
      method: 'POST',
      // headers: { 'Content-Type': 'application/json' },
      body: nonEmptyBody,
    });

    const data = await res.json();
    console.log('data', data);

    if (data.status === 'mail_sent' || data.status === 'success') {
      setSent(true);
      setSubmitting(false);

      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({ event: 'form_submit_valid' });
        // console.log('DL event pushed');
      }
    } else {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      // phone: '',
      // resume: "",
      // linkedin: '',
      role: '',
      message: '',
      page_title: pageTitle,
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  // const formEndpoint = process.env.FORM_ENDPOINT;

  return (
    <div className={cn('grid grid-cols-1 gap-3')}>
      {/* {zapierHook} */}
      {sent ? (
        <div className='flex flex-col justify-center text-center'>
          <p className='h3 md:mb-8'>Thank you!</p>
          <p
            className={cn('text-14', {
              'text-gray-dark': background === 'light',
              'text-white': background === 'dark',
            })}
          >
            We will get back to you soon.
          </p>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} ref={formRef}>
          {/* <input type="hidden" name="_gotcha" /> */}
          <div
            className={cn('grid grid-cols-1 gap-4', {
              'md:grid-cols-2': type === 'fund' || type === 'opportunity',
            })}
          >
            <div>
              {type === 'fund' && customText && (
                <div
                  className='body-large-wrap md:pr-32 p-to-opacity text-content text-content--reduced-margin'
                  dangerouslySetInnerHTML={{ __html: customText }}
                />
              )}
              {type === 'opportunity' && (
                <div className='body-large-wrap max-md:p-4 md:pr-32 p-to-opacity text-content text-content--reduced-margin'>
                  <p className='h1'>Jobs</p>
                  <p>Find your next opportunity with us.</p>
                </div>
              )}
              {/* // : (
              //   <>
              //     <p className='mb-3 h3'>Chci vědět více</p>
              //     <p
              //       className={cn('mb-2 body-small ', {
              //         'text-gray-dark': background === 'light',
              //         'text-white': background === 'dark',
              //       })}
              //     >
              //       Nechte nám na sebe kontakt a my se vám ozveme s dalšími
              //       informacemi.
              //     </p>
              //   </>
              // )} */}
            </div>
            <div className={cn('grid grid-cols-1 gap-4', {})}>
              <div className='relative '>
                <Input
                  formik={formik}
                  label={`Name*`}
                  name='firstname'
                  // background={background}
                />
              </div>

              {/* <div className='relative '>
                <Input
                  formik={formik}
                  label={`Surname*`}
                  name='lastname'
                  // background={background}
                />
              </div> */}

              <div className='relative '>
                <Input
                  formik={formik}
                  label={`Email*`}
                  name='email'
                  type='email'
                  // background={background}
                  pattern='.+\.[a-zA-Z]{2,6}'
                />
              </div>

              <div className='relative '>
                <Input
                  formik={formik}
                  label={`Role in company`}
                  name='role'
                  type='text'
                  // background={background}
                  // pattern='^(\+?\d{1,3}[- ]?)?\d{10}$'
                />
              </div>

              {/* {type === 'opportunity' && (
                <div className='relative '>
                  <Input
                    formik={formik}
                    label={`LinkedIn Profile URL`}
                    name='linkedin'
                    type='text'
                    // background={background}
                  />
                  <p className='my-4 text-center text-12 text-neutral-300'>
                    or
                  </p>
                  <div
                    className={cn('relative ', {
                      // hidden: activeVariant?.fields.indexOf("phone") === -1,
                    })}
                  >
                    <File name='attachment' label='Upload CV' />
                  </div>
                </div>
              )} */}
              <div className='relative '>
                <Textarea
                  formik={formik}
                  label={`Message`}
                  name='message'
                  // background={background}
                />

                <input type='hidden' name='page_title' value={pageTitle} />
              </div>

              <AttributionHiddenClient />

              <p
                className={cn('leading-normal mb-6 text-12', {
                  'text-black/50 ': background === 'light',
                  'text-neutral-300': background === 'dark',
                })}
              >
                {type === 'opportunity' ? (
                  <>
                    Your personal data will be processed in accordance with our{' '}
                    <a
                      href='/en/privacy'
                      target='_blank'
                      className='underline hover:no-underline'
                      rel='noopener noreferrer'
                    >
                      Privacy Policy
                    </a>
                  </>
                ) : (
                  <>
                    I agree that Rockaway GP a.s., ID: 232 78 757, and the
                    managers and administrators of the relevant investment funds
                    may contact me to provide information, offers, invitations
                    or other commercial communications regarding investment
                    funds for which Rockaway GP a.s. is the founder, promoter,
                    manager, administrator, general partner or professional
                    adviser, or an affiliated person, as defined in the{' '}
                    <a
                      href='/en/privacy'
                      target='_blank'
                      className='underline hover:no-underline'
                      rel='noopener noreferrer'
                    >
                      Privacy Policy
                    </a>
                    . You can withdraw your consent at any time by clicking on
                    the unsubscribe link in the relevant commercial
                    communication or by email at{' '}
                    <a
                      href='mailto:fondy@rockawaycapital.com'
                      className='underline hover:no-underline'
                      rel='noopener noreferrer'
                    >
                      fondy@rockawaycapital.com
                    </a>
                    .
                  </>
                )}
              </p>
              <div className='md:flex'>
                <div>
                  <Button
                    type='control'
                    label={'Send Message'}
                    // color={background === "green" ? "white" : "green"}
                    disabled={submitting}
                    fullWidth={true}
                    // onClick={formik.handleSubmit}
                    className={
                      cn()
                      // 'text-center w-full text-16 font-medium text-white bg-blue rounded-full py-5 px-8',
                      // {
                      //   ['cursor-not-allowed']: submitting,
                      // }
                    }
                  />
                </div>
                {/* <button
              type='submit'
              className={cn(
                'text-center block w-full leading-none text-14 font-semibold uppercase font-museo  bg-green transition-colors py-4 px-8',
                {
                  'cursor-not-allowed': submitting,
                }
              )}
              disabled={submitting}
            >
              Submit
            </button> */}
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
