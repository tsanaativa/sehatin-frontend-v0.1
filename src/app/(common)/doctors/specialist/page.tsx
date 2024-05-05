import NoDataFound from '@/components/common/NoDataFound';
import { getSpecialists } from '@/services/specialist';
import { Specialist } from '@/types/Doctor';
import Link from 'next/link';

const Specialists = async () => {
  let specialists: Specialist[] | undefined;
  specialists = await getSpecialists();

  return (
    <div className="w-full bg-light rounded-tr-2xl rounded-tl-2xl flex justify-center px-1 md:px-6 md:rounded-none">
      <div className="max-w-[1150px] py-4 w-full px-4 sm:px-6 md:py-10">
        <div className="pb-4">
          <span className="font-poppins font-semibold text-dark md:text-2xl">
            Choose Specialist
          </span>
          <div>
            {specialists?.length > 0 ? (
              <div className="bg-light rounded-lg border border-gray-light mt-3 flex flex-col md:grid md:grid-cols-3 md:grid-flow-row md:mt-5 md:text-lg">
                {specialists.map((specialist, idx) => (
                  <Link
                    key={idx}
                    href={`/doctors/search?specialistId=${specialist.id}`}
                  >
                    <div
                      key={idx}
                      className={`border-gray-light px-3 py-2 h-full ${idx + 1 !== specialists?.length && 'border-b md:border-b-0'} md:py-3 md:px-4 ${idx % 3 !== 2 && 'md:border-e'}`}
                    >
                      {specialist.name}
                    </div>
                  </Link>
                ))}
                {Array.from({ length: 3 - (specialists?.length % 3) }).map(
                  (val, idx) => (
                    <div
                      key={idx}
                      className={`hidden border-gray-light py-3 px-4 h-full ${idx !== 2 - ((specialists?.length || 0) % 3) && 'border-e'} md:block`}
                    ></div>
                  )
                )}
              </div>
            ) : (
              <NoDataFound className="py-16" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialists;
