'use client';
import { useRef, useState } from 'react';
import { Icon } from '..';
import { icons } from 'lucide-react';

type SelectorProps = {
  id: string;
  name: string;
  placeholder?: string;
  invalid?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  message?: string;
  selectorClass?: string;
  pickerClass?: string;
  options: Record<string, string>;
  selected: string;
  append?: keyof typeof icons;
  isLoading?: boolean;
  onSelect: (text: string) => void;
};

const Selector = ({
  id,
  name,
  placeholder,
  invalid,
  disabled,
  message,
  selectorClass,
  pickerClass,
  options,
  selected,
  append,
  isLoading,
  onSelect,
}: SelectorProps) => {
  const [input, setInput] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const picker = useRef<HTMLDivElement>(null);
  const pickerWrapper = useRef<HTMLDivElement>(null);

  const handleResetOptionsPos = () => {
    picker.current?.blur();
    if (!Object.values(options).includes(input)) {
      setInput('');
    }
    setTimeout(() => {
      setFilteredOptions(options);
      picker.current?.scrollTo(0, 0);
    }, 300);
  };

  const handleSelect = (option: string) => {
    setInput(options[option]);
    onSelect(option);
    setTimeout(() => {
      pickerWrapper.current?.classList.remove('md:hover:scale-y-100');
    }, 0);
    setTimeout(() => {
      picker.current?.scrollTo(0, 0);
    }, 300);
  };

  const handleHoverSelector = () => {
    if (!pickerWrapper.current?.classList.contains('md:hover:scale-y-100')) {
      pickerWrapper.current?.classList.add('md:hover:scale-y-100');
    }
  };

  const handleInput = (value: string) => {
    setInput(value);
    const filtered = Object.fromEntries(
      Object.entries(options).filter(([_, o]) =>
        o.toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilteredOptions(filtered);
  };
  return (
    <div
      className="flex flex-col gap-3 relative"
      onMouseLeave={handleResetOptionsPos}
    >
      <div
        id="selector"
        onMouseOver={handleHoverSelector}
        className={`border-[1px] peer relative h-14 rounded-[10px] overflow-hidden w-full flex transition-colors duration-300
        ${invalid ? 'border-danger' : 'border-gray-light hover:border-gray [&:has(:focus)]:border-primary'}
        ${disabled || isLoading ? 'bg-gray-light hover:border-gray-light cursor-not-allowed' : ''} ${selectorClass}`}
      >
        <input
          id={id}
          type="text"
          disabled={disabled || isLoading}
          spellCheck="false"
          value={input}
          onChange={({ target }) =>
            handleInput((target as HTMLInputElement).value)
          }
          autoComplete="new-password"
          placeholder={placeholder}
          className={`px-[14px] outline-none border-none w-full bg-transparent h-full text-primary-text leading-[150%]
          ${disabled || isLoading ? 'cursor-not-allowed' : ''}`}
        />
        <i className="pr-4 h-full flex items-center">
          <Icon
            name={isLoading ? 'LoaderCircle' : append ?? 'ChevronDown'}
            size={24}
            className={`${isLoading ? 'animate-spin' : ''} stroke-gray`}
          />
        </i>
      </div>
      {!(isLoading || disabled) && (
        <>
          <div
            ref={pickerWrapper}
            className={`fixed left-0 bottom-0 md:absolute w-full h-full top-14 z-[2] transition-transform will-change-transform duration-500 md:origin-top scale-y-0 md:peer-hover:scale-y-100
            md:hover:scale-y-100 md:peer-hover:[&_label]:translate-x-0 group ${pickerClass ?? ''}`}
          >
            <div
              ref={picker}
              className="bg-light w-full flex flex-col rounded-[10px] border-[1px] border-gray-light
                overflow-y-auto overflow-x-hidden h-72 absolute top-2"
            >
              {Object.keys(filteredOptions).map((option, idx) => (
                <label
                  key={`${option}-${idx}`}
                  htmlFor={`${option}-${idx}`}
                  style={{
                    transition: `${idx < 5 ? 0.5 + (idx + 1) * 0.2 : 0}s`,
                  }}
                  className={`min-h-14 w-full px-[14px] flex items-center will-change-transform
                    border-b-[1px] text-primary-text border-gray-light last:border-none cursor-pointer
                    ${idx < 5 ? 'md:-translate-x-full md:group-hover:translate-x-0' : ''}
                    ${options[selected] == options[option] ? 'bg-primary-light' : 'hover:bg-primary-light'}`}
                >
                  {options[option]}
                  <input
                    type="radio"
                    name={name}
                    id={`${option}-${idx}`}
                    onInput={() => handleSelect(option)}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
          </div>
          {message && message.length > 0 && <span>{message}</span>}
        </>
      )}
    </div>
  );
};

export default Selector;
