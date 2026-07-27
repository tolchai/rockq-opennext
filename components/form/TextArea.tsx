import cn from 'classnames';
import { FormikValues } from 'formik';

interface TextareaProps {
  background?: 'green' | 'white';
  formik: FormikValues;
  label: string;
  name: string;
  type?: 'text' | 'email' | 'number';
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  formik,
  label,
  type = 'text',
  name,
  background = 'white',
  className,
}) => {
  return (
    <div className='relative text-black'>
      <label
        htmlFor={name}
        className={cn('absolute left-0 block text-xs transition-all', {
          ['top-3']: formik.values[name],
          ['opacity-65']: formik.values[name] && !formik.errors[name],
          ['top-0 opacity-0']: !formik.values[name],
          ['text-orange opacity-100']:
            formik.values[name] && formik.touched[name] && formik.errors[name],
        })}
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        placeholder={label}
        className={cn(
          className,
          'w-full text-20 h-40 border-b border-ash transition-spacing focus:outline-0',
          {
            ['text-dark placeholder:text-dark/65']:
              background === 'white' && !formik.errors[name],
            ['text-white placeholder:text-white/65']:
              background === 'green' && !formik.errors[name],
            ['pb-2 pt-6']: formik.values[name],
            ['py-4']: !formik.values[name],
            ['text-orange placeholder:text-orange']:
              formik.touched[name] && formik.errors[name],
          }
        )}
      />
    </div>
  );
};

export default Textarea;
