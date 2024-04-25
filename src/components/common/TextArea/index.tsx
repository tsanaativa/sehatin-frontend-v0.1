import { ComponentPropsWithoutRef, forwardRef } from 'react';

type TextAreaProps = ComponentPropsWithoutRef<'textarea'> & {
  invalid?: boolean;
  disabled?: boolean;
  message?: string;
  inputClass?: ComponentPropsWithoutRef<'div'>['className'];
  valueMode?: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ invalid, disabled, message, inputClass, valueMode, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        <div
          className={`border-[1px] relative h-14 rounded-[10px] overflow-hidden w-full flex transition-colors duration-300 min-h-[100px]
          ${invalid ? 'border-danger' : 'border-gray-light hover:border-gray [&:has(:focus)]:border-primary-dark'}
          ${disabled ? 'bg-gray-light hover:border-gray-light' : ''} ${inputClass}`}
        >
          <textarea
            {...props}
            ref={ref}
            disabled={disabled}
            spellCheck="false"
            className={`px-[14px] outline-none border-none w-full h-full text-primary-text leading-[150%]
            [-webkit-background-clip:text] bg-clip-text [transition:background-color_5000s_ease-in-out_0s] py-3
            ${typeof valueMode == 'string' ? 'absolute invisible' : ''} ${disabled ? 'cursor-not-allowed' : ''}`}
          ></textarea>
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

TextArea.displayName = 'TextArea';

export default TextArea;
