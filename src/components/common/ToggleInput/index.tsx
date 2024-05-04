import React from 'react';

type ToggleInputProps = {
  label: string;
};

const ToggleInput = ({ label }: ToggleInputProps) => {
  return (
    <label className="flex items-center cursor-pointer">
      <span className="me-3 font-medium">{label}</span>
      <input type="checkbox" value="" className="sr-only peer" />
      <div className="relative w-11 h-6 bg-gray rounded-full peer peer-focus:ring-4 peer-focus:ring-primary-border dark:peer-focus:ring-primary dark:bg-gray peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-light after:border-gray after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
    </label>
  );
};

export default ToggleInput;
