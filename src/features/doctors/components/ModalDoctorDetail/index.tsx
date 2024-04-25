import { Button, Modal } from '@/components/common';
import { Doctor } from '@/types/Doctor';
import { getYearsOfExp } from '@/utils/doctor';
import { MessageCircleMore, X } from 'lucide-react';
import Image from 'next/image';

type ModalDoctorDetailProps = {
  doctor: Doctor;
  onShowModal: (showModal: boolean) => void;
  showModal: boolean;
};

const ModalDoctorDetail = ({
  doctor,
  onShowModal,
  showModal,
}: ModalDoctorDetailProps) => {
  const yearsOfExp = getYearsOfExp(doctor.work_start_year);
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
        <div className="px-4 py-8 flex flex-col items-center gap-y-2 ">
          <div className="relative w-fit h-fit">
            <Image
              src={doctor.photo_url}
              className="object-cover rounded-full w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
              width={300}
              height={300}
              alt=""
            />
            <div
              className={`absolute bottom-1 right-[0.4rem] rounded-full border border-light ${doctor.is_online ? 'bg-green' : 'bg-gray'} w-4 h-4`}
            ></div>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-poppins font-medium text-dark text-lg">
              {doctor.name}
            </span>
            <div className="font-semibold text-sm text-dark-gray md:text-base">
              {doctor.specialist.name}
            </div>
            <div className="font-semibold text-sm text-dark-gray md:text-base">
              {yearsOfExp} of experience
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center w-full border-t border-gray-light px-4 py-3">
          <div className="w-full">
            <p>Consultation Fee:</p>
            <p className="font-semibold text-secondary text-lg">
              Rp {doctor.fee.toLocaleString('id')}
            </p>
          </div>
          <Button
            className="flex items-center text-nowrap justify-center gap-x-2 ps-4 pe-5"
            variant="primary"
          >
            <MessageCircleMore size={14} /> Chat Now
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDoctorDetail;
