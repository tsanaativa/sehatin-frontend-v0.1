'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

type ViewMoreButtonProps = {
  label: string;
  children: React.ReactNode;
};
const ViewMoreButton = ({ label, children }: ViewMoreButtonProps) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      <div
        className="text-primary-dark cursor-pointer flex items-center gap-1"
        onClick={() => setShow(!show)}
      >
        {label} {!show ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </div>
      {show && <>{children}</>}
    </>
  );
};

export default ViewMoreButton;
