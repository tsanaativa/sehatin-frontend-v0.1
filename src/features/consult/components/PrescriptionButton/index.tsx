'use client';

import { Button } from '@/components/common';
import { useState } from 'react';
import ModalPrescription from '../ModalPrescription';
import Link from 'next/link';
import { Consultation } from '@/types/Consultation';

type PrescriptionButtonProps = {
  consultation: Consultation;
  notify: (url: string) => void;
  isDoctor: boolean;
};

const PrescriptionButton = ({
  notify,
  consultation,
  isDoctor,
}: PrescriptionButtonProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      {consultation.prescription_url ? (
        <div>
          <Link href={consultation.prescription_url} target="_blank">
            <Button
              variant="outlined-primary"
              className="hidden text-center rounded ps-4 pe-5 py-2 gap-2 w-full md:block"
              onClick={() => setShowModal(true)}
            >
              View Prescription
            </Button>
            <div
              className="hover:bg-gray-lighter gap-2 flex items-center cursor-pointer capitalize justify-between py-2 px-3 md:hidden"
              role="button"
              onClick={() => setShowModal(true)}
            >
              View Prescription
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
                Prescribe Medicine
              </Button>
              <div
                className="hover:bg-gray-lighter gap-2 flex items-center cursor-pointer capitalize justify-between py-2 px-3 md:hidden"
                role="button"
                onClick={() => setShowModal(true)}
              >
                Prescribe Medicine
              </div>
              <ModalPrescription
                patientBirthDate={consultation.patient_birth_date}
                notify={notify}
                onShowModal={setShowModal}
                showModal={showModal}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PrescriptionButton;
