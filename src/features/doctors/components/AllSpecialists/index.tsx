import NoDataFound from '@/components/common/NoDataFound';
import { getSpecialists } from '@/services/specialist';
import { Specialist } from '@/types/Doctor';
import Link from 'next/link';

const AllSpecialists = async () => {
  let specialists: Specialist[] | undefined;
  specialists = await getSpecialists();

  return (
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
  );
};

export default AllSpecialists;
