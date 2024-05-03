import CategorizeCard from '@/components/common/CategorizeCard';
import CategorizeSection from '@/components/common/CategorizeSection';
import { DUMMY_DOCTOR } from '@/constants/dummy';
import { DISPLAYED_SPECIALISTS } from '@/constants/specialists';
import DoctorCard from '@/features/doctors/components/DoctorCard';
import DoctorsBySpecialists from '@/features/doctors/components/DoctorsBySpecialists';
import { getUser } from '@/services/user';

const Doctors = () => {
  const user = getUser();

  return (
    <div className="w-full bg-light rounded-tr-2xl rounded-tl-2xl flex justify-center px-1 md:px-6 md:rounded-none">
      <div className="max-w-[1150px] py-4 w-full px-4 sm:px-6 md:py-10">
        <div className="flex flex-col">
          <CategorizeSection
            title={'My Recent Doctors'}
            seeAllUrl={`/doctors/recent`}
          >
            <div className="overflow-x-auto">
              <div className="flex flex-wrap min-w-max gap-3 sm:gap-4 md:gap-6 ">
                {Array.from({ length: 4 }).map((val, idx) => (
                  <DoctorCard
                    key={idx}
                    width="w-[160px]"
                    doctor={DUMMY_DOCTOR}
                    isMini
                    isAuthenticated={!!user}
                  />
                ))}
              </div>
            </div>
          </CategorizeSection>
          <CategorizeSection
            title={'Specialists'}
            seeAllUrl={`/doctors/specialist`}
            className="mt-6 md:mt-16"
          >
            <div className="grid grid-cols-4 gap-x-52 gap-y-4 overflow-x-auto md:gap-x-6 md:text-lg">
              {DISPLAYED_SPECIALISTS.map((specialist, idx) => (
                <CategorizeCard
                  key={idx}
                  link={`/doctors/search?specialistId=${specialist.id}`}
                  icon={specialist.icon}
                  name={specialist.name}
                />
              ))}
            </div>
          </CategorizeSection>
          <DoctorsBySpecialists isAuthenticated={!!user} />
        </div>
      </div>
    </div>
  );
};

export default Doctors;
