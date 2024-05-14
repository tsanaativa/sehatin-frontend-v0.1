const JumpDots = (props: React.ComponentPropsWithoutRef<'div'>) => {
  return (
    <div
      {...props}
      className={`w-full [&>*]:w-2 [&>*]:h-2 [&>*]:rounded-full [&>*]:bg-white flex items-center justify-center gap-1.5 ${props.className}`}
    >
      <span className="animate-[jumpDots_1.05s_infinite]"></span>
      <span className="animate-[jumpDots_1.05s_infinite_0.1s]"></span>
      <span className="animate-[jumpDots_1.05s_infinite_0.2s]"></span>
    </div>
  );
};

export default JumpDots;
