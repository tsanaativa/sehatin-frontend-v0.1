import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { icons } from 'lucide-react';
import Icon from '../Icon';

type InputProps = ComponentPropsWithoutRef<'input'> & {
  invalid?: boolean;
  disabled?: boolean;
  prepend?: string;
  append?: string;
  message?: string;
  inputClass?: ComponentPropsWithoutRef<'div'>['className'];
  valueMode?: string;
  onAppend?: () => void;
};

const Input = forwardRef<HTMLInputElement | null, InputProps>(
  (
    {
      invalid,
      disabled,
      prepend,
      append,
      message,
      inputClass,
      valueMode,
      onAppend,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1">
        <div
          className={`border relative h-14 rounded-[10px] overflow-hidden w-full flex transition-colors duration-300
          ${invalid ? 'border-danger' : 'border-gray-light hover:border-gray [&:has(:focus)]:border-primary-dark'}
          ${disabled ? 'bg-gray-light hover:border-gray-light' : ''} ${inputClass}`}
        >
          {prepend && !disabled && (
            <i className="pl-4 h-full flex items-center">
              {prepend in icons ? (
                <Icon
                  name={prepend as keyof typeof icons}
                  size={24}
                  className="stroke-gray"
                />
              ) : (
                <span className="text-gray not-italic">{prepend}</span>
              )}
            </i>
          )}
          <button
            type="button"
            onClick={onAppend}
            className={`px-[14px] outline-none border-none w-full h-full flex items-center leading-[150%]
            ${typeof valueMode == 'string' ? 'block z-[1]' : 'hidden'} ${valueMode == '' ? 'text-gray' : 'text-primary-text'}`}
          >
            {valueMode == '' ? props.placeholder : valueMode}
          </button>
          <input
            {...props}
            ref={ref}
            disabled={disabled}
            spellCheck="false"
            autoComplete="new-password"
            className={`px-[14px] outline-none border-none w-full h-full text-primary-text leading-[150%]
            [-webkit-background-clip:text] bg-clip-text [transition:background-color_5000s_ease-in-out_0s]
            ${typeof valueMode == 'string' ? 'absolute invisible' : ''} ${disabled ? 'cursor-not-allowed' : ''}`}
          />
          {append && !disabled && (
            <button
              type="button"
              onClick={onAppend}
              aria-label="append-button"
              className="border-none pr-4 h-full flex items-center group/append"
            >
              <Icon
                name={append as keyof typeof icons}
                size={24}
                className={`stroke-gray transition-colors duration-300 ${invalid ? 'group-hover/append:stroke-danger' : 'group-hover/append:stroke-primary-dark'}`}
              />
            </button>
          )}
        </div>
        {message && message.length > 0 && (
          <span
            className={`${invalid ? 'text-danger' : 'text-primary-text'} text-xs`}
          >
            {message}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
