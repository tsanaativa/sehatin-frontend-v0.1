import React from 'react';

type ToggleInputProps = {
  label: string;
} & React.ComponentPropsWithoutRef<'input'>;

const ToggleInput = ({ label, ...props }: ToggleInputProps) => {
  return (
    <label className="flex items-center justify-between cursor-pointer w-full">
      <span className="me-3">{label}</span>
      <input type="checkbox" className="sr-only peer" {...props} />
      <div className="relative w-11 h-6 bg-gray rounded-full peer peer-focus:ring-4 peer-focus:ring-primary-border dark:peer-focus:ring-primary dark:bg-light peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
    </label>
  );
};

export default ToggleInput;
