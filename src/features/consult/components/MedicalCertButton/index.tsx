'use client';

import { Button } from '@/components/common';
import { useState } from 'react';
import ModalMedicalCert from '../ModalMedicalCert';
import { Consultation } from '@/types/Consultation';
import Link from 'next/link';

type MedicalCertButtonProps = {
  notify: (url: string) => void;
  consultation: Consultation;
  isDoctor: boolean;
};

const MedicalCertButton = ({
  notify,
  consultation,
  isDoctor,
}: MedicalCertButtonProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      {consultation.certificate_url ? (
        <div>
          <Link href={consultation.certificate_url} target="_blank">
            <Button
              variant="outlined-primary"
              className="hidden text-center rounded ps-4 pe-5 py-2 gap-2 w-full md:block"
              onClick={() => setShowModal(true)}
            >
              View Medical Certificate
            </Button>
            <div
              className="hover:bg-gray-lighter gap-2 flex items-center cursor-pointer capitalize justify-between py-2 px-3 md:hidden"
              role="button"
              onClick={() => setShowModal(true)}
            >
              View Medical Certificate
            </div>
          </Link>
        </div>
      ) : (
        <>
          {!isDoctor && (
            <>
              <Button
                variant="outlined-primary"
                className="hidden text-center rounded ps-4 pe-5 py-2 gap-2 w-full md:block"
                onClick={() => setShowModal(true)}
              >
                Create Medical Certificate
              </Button>
              <div
                className="hover:bg-gray-lighter gap-2 flex items-center cursor-pointer capitalize justify-between py-2 px-3 md:hidden"
                role="button"
                onClick={() => setShowModal(true)}
              >
                Create Medical Certificate
              </div>
              <ModalMedicalCert
                onShowModal={setShowModal}
                showModal={showModal}
                notify={notify}
                patientBirthDate={consultation.patient_birth_date}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MedicalCertButton;
