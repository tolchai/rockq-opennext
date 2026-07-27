import cn from 'classnames';
import { FormikValues } from 'formik';

interface SelectProps {
  background?: 'gray' | 'black';
  formik: FormikValues;
  label: string;
  options: any[];
  name: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  formik,
  label,
  name,
  background = 'gray',
  options,
  className,
}) => {
  return (
    <div className='relative'>
      <select
        name={name}
        onChange={formik.handleChange}
        value={formik.values[name]}
        className={cn(
          'block w-full appearance-none rounded-4xl px-6 py-5 text-16 transition-spacing focus:outline-0',
          {
            ['bg-white text-dark']: background === 'gray',
            ['bg-white/10 text-white']: background === 'black',
          }
        )}
      >
        <option value=''>{label}</option>
        {options.map((option) => (
          <option key={option.slug} value={option.title || ''}>
            {option.title}
          </option>
        ))}
      </select>
      {!formik.values[name] && formik.touched[name] && formik.errors[name] && (
        <div className='px-5 pt-2 text-12 text-red'>
          {formik.errors[name].toString()}
        </div>
      )}
    </div>
  );
};

export default Select;
