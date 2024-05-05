type CounterProps = {
  value: number;
  max: number;
  isAvailable: boolean;
  counterClass: React.ComponentPropsWithoutRef<'div'>['className'];
  updateValue: (value: number) => void;
};

const Counter = ({
  value,
  max,
  counterClass,
  isAvailable,
  updateValue,
}: CounterProps) => {
  const buttonClass = (disabled: boolean) =>
    `w-4 h-4 md:w-6 md:h-6 rounded-[3px] font-poppins text-xs md:text-base font-bold ${disabled ? 'bg-gray-lighter text-dark-gray cursor-not-allowed' : 'bg-primary-dark text-white'}`;
  return (
    <div className={`px-4 md:px-0 ml-[114px] mt-[10px] ${counterClass}`}>
      <div className="flex items-center w-[72px] md:w-28 justify-between mb-2">
        <button
          onClick={() => updateValue(value - 1)}
          disabled={value <= 0 || !isAvailable}
          className={buttonClass(value <= 0 || !isAvailable)}
        >
          -
        </button>
        <span className="font-semibold text-dark text-xs md:text-base">
          {isAvailable ? value : 0}
        </span>
        <button
          onClick={() => updateValue(value + 1)}
          disabled={value >= max || !isAvailable}
          className={buttonClass(value >= max || !isAvailable)}
        >
          +
        </button>
      </div>
      {!isAvailable && (
        <span className="text-xs md:text-base text-danger font-medium">
          Out of stock
        </span>
      )}
    </div>
  );
};

export default Counter;
