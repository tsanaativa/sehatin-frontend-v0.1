'use client';
import { useEffect, useRef, useState } from 'react';
import { Icon, Input } from '..';
import { icons } from 'lucide-react';
import { overflowHandler } from '@/utils/helper';
import useDebounce from '@/hooks/useDebounce';

type SelectorProps = {
  id: string;
  wrapperId?: string;
  name: string;
  placeholder?: string;
  invalid?: boolean;
  disabled?: boolean;
  searchable?: boolean;
  message?: string;
  selectorClass?: React.ComponentPropsWithoutRef<'div'>['className'];
  pickerClass?: React.ComponentPropsWithoutRef<'div'>['className'];
  options: Record<string, string>;
  selected: string;
  append?: keyof typeof icons;
  isLoading?: boolean;
  required?: boolean;
  gridView?: string;
  onSearch?: (text: string) => void;
  onSelect: (text: string) => void;
};

const Selector = ({
  id,
  wrapperId,
  name,
  placeholder,
  invalid,
  disabled,
  searchable,
  message,
  selectorClass,
  pickerClass,
  options,
  selected,
  append,
  isLoading,
  required,
  gridView,
  onSearch,
  onSelect,
}: SelectorProps) => {
  const [input, setInput] = useState({
    current: options[selected],
    previous: '',
  });

  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showPane, setShowPane] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window && window?.innerWidth);
  useEffect(() => {
    if (typeof window !== undefined)
      window.addEventListener('resize', () => {
        setScreenWidth(window.innerWidth);
      });
  });

  const picker = useRef<HTMLDivElement>(null);
  const pickerWrapper = useRef<HTMLDivElement>(null);
  const inputInPane = useRef<HTMLInputElement>(null);

  const getSelectedOpt = () => {
    const currentInput = required
      ? input['previous']
      : input['current'] == ''
        ? ''
        : input['previous'];
    setInput({ ...input, current: currentInput });
    if (input['previous'] !== '') onSelect(currentInput);
  };

  const handleOnSelectorBlur = () => {
    if (screenWidth >= 768) {
      picker.current?.blur();
      if (!Object.values(options).includes(input['current'])) getSelectedOpt();
      setTimeout(() => {
        setFilteredOptions(options);
        picker.current?.scrollTo(0, 0);
      }, 300);
    }
  };

  const OnSelectorClick = () => {
    setShowPane(true);
    inputInPane.current?.focus();
  };

  const handleClosePane = () => {
    setShowPane(false);
    setTimeout(() => {
      picker.current?.scrollTo(0, 0);
    }, 300);
    getSelectedOpt();
  };

  const handleSelect = (option: string) => {
    setInput({ previous: options[option], current: options[option] });
    onSelect(option);
    setShowPane(false);
    if (screenWidth >= 768) {
      setTimeout(() => {
        pickerWrapper.current?.classList.remove('md:hover:scale-y-100');
      }, 0);
    }
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
    setInput({ ...input, current: value });
    if (!onSearch) {
      const filtered = Object.fromEntries(
        Object.entries(options).filter(([_, o]) =>
          o.toLowerCase().includes(value.toLowerCase())
        )
      );
      setFilteredOptions(filtered);
    }
  };

  const optionsTransition = (idx: number) =>
    screenWidth >= 768 && !gridView
      ? {
          transition: `${idx < 5 ? 0.5 + (idx + 1) * 0.2 : 0}s`,
        }
      : {};

  const debounce = useDebounce(input['current'], 500);
  useEffect(() => {
    if (debounce && onSearch) {
      onSearch(debounce);
    }
  }, [debounce, onSearch]);

  useEffect(() => {
    if (screenWidth < 768 && wrapperId && showPane) {
      overflowHandler({ type: 'hidden', targetId: wrapperId });
      const el = document.getElementById(wrapperId);
      if (el) el.scrollTo(0, 0);
    } else overflowHandler({ type: 'auto', targetId: wrapperId });
  }, [screenWidth, showPane, wrapperId]);
  return (
    <div
      className="flex flex-col gap-1 relative"
      onMouseLeave={handleOnSelectorBlur}
    >
      <div
        id="selector"
        onMouseOver={handleHoverSelector}
        onClick={OnSelectorClick}
        className={`border peer relative h-14 rounded-[10px] overflow-hidden w-full flex transition-colors duration-300
        ${invalid ? 'border-danger' : 'border-gray-light hover:border-gray [&:has(:focus)]:border-primary'}
        ${disabled || isLoading ? 'bg-gray-light hover:border-gray-light cursor-not-allowed' : ''} ${selectorClass}`}
      >
        <input
          id={id}
          type="text"
          disabled={disabled || isLoading}
          spellCheck="false"
          value={input['current'] || ''}
          readOnly={(!searchable && screenWidth >= 768) || screenWidth < 768}
          onChange={({ target }) =>
            handleInput((target as HTMLInputElement).value)
          }
          autoComplete="new-password"
          placeholder={placeholder}
          className={`px-[14px] outline-none border-none w-full bg-transparent h-full text-primary-text leading-[150%] ${(!searchable && screenWidth >= 768) || screenWidth < 768 ? 'cursor-pointer' : ''}
          ${disabled || isLoading ? '!cursor-not-allowed' : ''}`}
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
            className={`fixed left-0 bottom-0 ${screenWidth < 768 ? (showPane ? 'scale-100 bg-dark/60 [transition:transform_0s_ease-in-out,background_0.3s_ease-in-out]' : 'scale-0 bg-dark/0 [transition:transform_0s_ease-in-out_0.3s,background_0.3s_ease-in-out]') : ''} md:absolute w-full h-full md:top-14 z-[2] md:transition-transform md:will-change-transform md:duration-500 md:origin-top md:scale-y-0 md:peer-hover:scale-y-100
            md:hover:scale-y-100 md:peer-hover:[&_label]:translate-x-0 group ${pickerClass ?? ''}`}
          >
            <button
              type="button"
              onClick={handleClosePane}
              className={`absolute inset-0 ${screenWidth < 768 ? (showPane ? 'bg-dark/60 [transition:transform_0s_ease-in-out,background_0.3s_ease-in-out]' : ' bg-dark/0 [transition:transform_0s_ease-in-out_0.3s,background_0.3s_ease-in-out]') : ''} `}
            ></button>
            <div
              ref={picker}
              className={`bg-light w-full ${gridView ? `grid ${gridView} [&>*]:grid [&>*]:place-items-center` : 'flex flex-col'} md:rounded-[10px] border border-gray-light overflow-y-auto z-[3] overflow-x-hidden md:h-72 absolute bottom-0 md:top-2 ${screenWidth < 768 ? 'transition-transform duration-300' : ''} ${showPane ? 'translate-y-0' : 'translate-y-full md:translate-y-0 '} ${searchable ? 'h-full' : 'h-[calc(50vh+5.75rem)] rounded-t-2xl'}`}
            >
              {searchable && screenWidth < 768 && (
                <label
                  htmlFor="search-option"
                  aria-label="search-option"
                  className="sticky top-0 bg-light"
                >
                  <Input
                    ref={inputInPane}
                    type="text"
                    id="search-option"
                    prepend="Search"
                    append="PanelBottomClose"
                    onAppend={handleClosePane}
                    name="search-option"
                    placeholder="Search specialty here ..."
                    value={input['current']}
                    onChange={({ target }) =>
                      handleInput((target as HTMLInputElement).value)
                    }
                    inputClass="w-full border-t-0 border-x-0 border-b-2"
                  />
                </label>
              )}
              {Object.keys(filteredOptions).map((option, idx) => (
                <label
                  key={`${option}-${idx}`}
                  htmlFor={`${option}-${idx}`}
                  style={optionsTransition(idx)}
                  className={`min-h-14 w-full px-[14px] flex items-center md:will-change-transform
                    border-b-[1px] text-primary-text border-gray-light last:border-none cursor-pointer text-left
                    ${idx < 5 ? 'md:-translate-x-full md:group-hover:translate-x-0' : ''}
                    ${options[selected] == options[option] ? 'bg-primary-light' : 'hover:bg-primary-light'}`}
                >
                  {options[option]}
                  <input
                    type="radio"
                    name={name}
                    value={option}
                    id={`${option}-${idx}`}
                    onInput={() => handleSelect(option)}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
          </div>
          {message && message.length > 0 && (
            <span
              className={`${invalid ? 'text-danger' : 'text-primary-text'} text-xs`}
            >
              {message}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default Selector;
