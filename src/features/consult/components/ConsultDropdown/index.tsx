'use client';

import { useOutsideClick } from '@/hooks/useOutsideClick';
import { useState } from 'react';
import EndChatButton from '../EndChatButton';
import { EllipsisVertical } from 'lucide-react';
import MedicalCertButton from '../MedicalCertButton';
import { Consultation } from '@/types/Consultation';
import PrescriptionButton from '../PrescriptionButton';

type ConsultDropdownProps = {
  onEndChat: () => void;
  notifyCert: (url: string) => void;
  notifyPrescription: (url: string) => void;
  consultation: Consultation;
  isDoctor: boolean;
};

const ConsultDropdown = ({
  onEndChat,
  notifyCert,
  notifyPrescription,
  consultation,
  isDoctor,
}: ConsultDropdownProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const ref = useOutsideClick(() => {
    setShowDropdown(false);
  });

  return (
    <>
      {!(isDoctor && !!consultation.ended_at) && (
        <div className="relative cursor-pointer">
          <div onClick={() => setShowDropdown(true)}>
            <EllipsisVertical />
          </div>
          <div
            className={`mt-2 min-w-56 absolute right-0 bg-light border border-gray-light rounded ${!showDropdown ? 'hidden' : ''}`}
            ref={ref}
          >
            <MedicalCertButton
              notify={notifyCert}
              consultation={consultation}
              isDoctor={isDoctor}
            />
            <PrescriptionButton
              notify={notifyPrescription}
              consultation={consultation}
              isDoctor={isDoctor}
            />
            {!!!consultation.ended_at && (
              <EndChatButton onConfirm={onEndChat} isDoctor={isDoctor} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ConsultDropdown;
