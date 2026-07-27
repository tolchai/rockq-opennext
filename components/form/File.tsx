'use client';

import cn from 'classnames';
import { useRef, useState } from 'react';

import Plus from '@/public/images/ui/plus.svg';

interface FileProps {
  label: string;
  name: string;
  className?: string;
}

const File: React.FC<FileProps> = ({ label, name, className }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');

  const ALLOWED_EXT = ['pdf', 'doc', 'docx'];

  const handleClick = () => {
    inputRef.current?.click(); // otevře dialog
  };

  const handleChange = () => {
    const files = inputRef.current?.files;
    if (!files || !files[0]) return;

    const file = files[0];

    const ext = file.name.split('.').pop()?.toLowerCase();

    if (!ext || !ALLOWED_EXT.includes(ext)) {
      alert('Invalid file type. Please upload a PDF or DOC file.');

      if (inputRef.current) {
        inputRef.current.value = '';
      }

      setFileName('');

      return;
    }

    setFileName(file.name);
  };

  return (
    <div className='relative'>
      <input
        type='file'
        name={name}
        id={name}
        className='hidden'
        ref={inputRef}
        onChange={handleChange}
        accept='.pdf, .doc, .docx'
      />
      {/* {formik.touched[name] && formik.errors[name] && (
        <div className='error'>{formik.errors[name].toString()}</div>
      )} */}
      <button
        type='button'
        className='flex items-center w-full gap-4 p-4 text-left border border-dashed rounded-md cursor-pointer group text-neutral-200 text-14 border-neutral-400'
        onClick={handleClick}
      >
        <span className='flex items-center justify-center transition-colors rounded-sm group-hover:bg-green-light-hover w-9 h-9 bg-green-light'>
          <span className='w-full'>
            <Plus />
          </span>
        </span>
        {fileName || label}
      </button>
    </div>
  );
};

export default File;
