import AllSpecialists from '@/features/doctors/components/AllSpecialists';

const Specialist = () => {
  return (
    <div className="w-full bg-light rounded-tr-2xl rounded-tl-2xl flex justify-center px-1 md:px-6 md:rounded-none">
      <div className="max-w-[1150px] py-4 w-full px-4 sm:px-6 md:py-10">
        <div className="pb-4">
          <span className="font-poppins font-semibold text-dark md:text-2xl">
            Choose Specialist
          </span>
          <AllSpecialists />
        </div>
      </div>
    </div>
  );
};

export default Specialist;
