'use client';

import { Button, Modal } from '@/components/common';
import { Doctor } from '@/types/Doctor';
import { MessageCircleMore, X } from 'lucide-react';
import Link from 'next/link';
import DoctorDetailCard from '../DoctorDetailCard';

type ModalDoctorDetailProps = {
  isAuthenticated: boolean;
  doctor: Doctor;
  onShowModal: (showModal: boolean) => void;
  showModal: boolean;
};

const ModalDoctorDetail = ({
  doctor,
  isAuthenticated,
  onShowModal,
  showModal,
}: ModalDoctorDetailProps) => {
  return (
    <Modal onClick={() => onShowModal(false)} showModal={showModal}>
      <div className="flex items-center justify-between font-poppins font-semibold text-sm px-4 pt-4 md:text-lg">
        <div></div>
        <X
          className="text-gray cursor-pointer"
          onClick={() => onShowModal(false)}
        />
      </div>
      <div
        className={`flex flex-col items-center gap-y-2 max-h-[500px] md:min-w-[500px] h-full overflow-y-auto`}
      >
        <DoctorDetailCard doctor={doctor} />
        <div className="flex justify-between items-center w-full border-t border-gray-light px-4 py-3">
          <div className="w-full">
            <p>Consultation Fee:</p>
            <p className="font-semibold text-secondary text-lg">
              Rp {doctor.fee.toLocaleString('id')}
            </p>
          </div>
          <Link href={`/consult/start/${doctor.id}`}>
            <Button
              className="flex items-center text-nowrap justify-center gap-x-2 ps-4 pe-5"
              variant="primary"
              disabled={!isAuthenticated}
            >
              <MessageCircleMore size={14} /> Chat Now
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDoctorDetail;
