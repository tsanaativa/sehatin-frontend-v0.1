import React from 'react';

type SkeletonProps = {
  children: React.ReactNode;
};

const Skeleton = ({ children }: SkeletonProps) => {
  return <div className={`animate-pulse overflow-hidden`}>{children}</div>;
};

export default Skeleton;
