import { ComponentPropsWithoutRef } from 'react';
import JumpDots from './JumpDots';

type LoadingProps = ComponentPropsWithoutRef<'div'> & {
  name: 'jump-dots';
};

const Loading = ({ name, ...props }: LoadingProps) => {
  return (
    <div className="w-full grid place-items-center">
      {name == 'jump-dots' && <JumpDots {...props} />}
    </div>
  );
};

export default Loading;
