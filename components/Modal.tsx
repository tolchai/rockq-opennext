'use client';

import cn from 'classnames';

import { useRef, useEffect, useState } from 'react';

import Close from '@/public/images/ui/close.svg';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  size?: 'small' | 'normal' | 'full';
  height?: 'small' | 'normal' | 'full';
  background?: 'white' | 'black';
  children: React.ReactNode;
};

export default function Modal({
  open,
  onClose,
  size = 'normal',
  height = 'normal',
  background = 'white',
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // CLOSE DIALOG ON ESCAPE KEY

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && dialogRef.current?.open) {
        dialogRef.current.close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      setIsVisible(true);
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      if (dialog.open) {
        // Spustit fade-out a pak zavřít
        setIsVisible(false);
        setTimeout(() => {
          dialog.close();
        }, 300); // musí odpovídat délce animace
      }
    }

    const handleClose = () => {
      setIsVisible(false);
      document.body.style.overflow = ''; // Obnovit overflow po zavření dialogu
      onClose();
    };

    dialog.addEventListener('close', handleClose);
    return () => dialog.removeEventListener('close', handleClose);
  }, [open, onClose]);

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        'fixed z-30 md:p-5 overflow-hidden p-2 m-0 w-full backdrop-blur-sm h-full max-w-full max-h-full transition-opacity bg-black/70 md:bg-black/50 md:flex md:justify-center md:items-center',
        {
          'opacity-0 pointer-events-none': !isVisible,
        }
      )}
    >
      <div
        className='absolute inset-0'
        onClick={() => dialogRef.current?.close()}
      />
      <div
        className={cn(
          'w-full relative max-md:max-h-full overflow-y-auto w-custom-scrollbar rounded-xl',
          {
            'bg-white text-black': background === 'white',
            'bg-black text-white': background === 'black',
            // 'max-w-[80rem]': size === 'full',
            'max-w-[52rem]': size === 'normal',
            'max-w-[28rem]': size === 'small',
            'md:max-h-[90vh]': height === 'normal',
            'md:max-h-[70vh]': height === 'small',
            'md:h-[calc(100vh-2.5rem)]': size === 'full',
          }
        )}
      >
        {children}
        {/* {height === 'normal' && ( */}
        <button
          onClick={() => dialogRef.current?.close()}
          className={cn(
            ' flex items-center justify-center w-10 h-10 transition-colors rounded-md appearance-none cursor-pointer md:w-10 md:h-10 group outline-0 top-5 right-5 ',
            {
              absolute: height === 'normal',
              'absolute md:fixed': height === 'small' || height === 'full',
              'md:top-7 md:right-7': height === 'full',
              'bg-green-light text-neutral-900 hover:bg-green-light-hover':
                background === 'white',
              'bg-neutral-900 text-white hover:text-neutral-900 hover:bg-green':
                background === 'black',
            }
          )}
          aria-label='Zavřít dialog'
        >
          <span className='block w-full px-1 transition-transform group-hover:-rotate-90'>
            <Close />
          </span>
        </button>
        {/* )} */}
      </div>
    </dialog>
  );
}
