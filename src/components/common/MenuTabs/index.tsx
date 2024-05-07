import React from 'react';

type MenuTabsProps = {
  options: string[];
  selected: string;
  onSelect: (selected: string) => void;
};

const MenuTabs = ({ options, selected, onSelect }: MenuTabsProps) => {
  return (
    <div className={`flex gap-x-4 w-full overflow-x-auto peer my-5`}>
      {options.map((option, idx) => (
        <React.Fragment key={idx}>
          <label
            htmlFor={option}
            className={`capitalize text-sm text-center min-w-32 block rounded-md py-2 cursor-pointer border ${option !== selected ? 'text-dark-gray bg-light border border-gray-light' : 'bg-primary-light text-primary-dark border-primary-dark font-semibold'}`}
          >
            {option}
          </label>
          <input
            type="radio"
            id={option}
            className={`${option} peer/${option}`}
            name="status"
            hidden
            checked={option === selected}
            onChange={() => onSelect(option)}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default MenuTabs;
