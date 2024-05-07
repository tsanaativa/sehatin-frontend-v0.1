import OnlineToggle from '@/features/doctors/components/OnlineToggle';
import { Consultation } from '@/types/Consultation';
import { User } from '@/types/User';
import { redirect } from 'next/navigation';

type ConsultationHistoryProps = {
  user: User;
};

const ConsultationHistory = ({ user }: ConsultationHistoryProps) => {
  let history: Consultation[] = [];

  if (!user) {
    redirect('/auth/login');
  }

  return (
    <div className="flex justify-center">
      <div className="max-w-[1150px] bg-light w-full -mt-2 z-20 py-4 px-4 rounded-tl-lg rounded-tr-lg sm:px-6 md:py-10 md:top-0 md:rounded-tl-none md:rounded-tr-none md:mt-0">
        <div className="flex justify-between">
          <h2 className="text-xl text-center font-semibold font-poppins md:text-start md:text-2xl">
            My Consultation History{user.is_online?.toString()}
          </h2>
          {user.role === 'doctor' && (
            <OnlineToggle defaultIsOnline={user.is_online} />
          )}
        </div>
        <div
          className={`flex gap-x-4 w-full overflow-x-auto peer ${user.role === 'doctor' ? 'my-6' : 'my-5'}`}
        >
          <input
            type="radio"
            id="all"
            className="all peer/all"
            name="status"
            defaultChecked
            hidden
          />
          <label
            htmlFor="all"
            className="bg-light border border-gray-light font-bold text-sm text-dark-gray text-center min-w-32 block rounded-md py-2 cursor-pointer peer-checked/all:bg-primary-light peer-checked/all:text-primary-dark peer-checked/all:border-primary-dark"
          >
            All
          </label>
          <label
            htmlFor="ongoing"
            className="bg-light border border-gray-light font-bold text-sm text-dark-gray text-center min-w-32 block rounded-md py-2 cursor-pointer peer-checked/ongoing:bg-primary-light peer-checked/ongoing:text-primary-dark peer-checked/ongoing:border-primary-dark"
          >
            Ongoing
          </label>
          <input
            type="radio"
            id="completed"
            className="completed peer/completed"
            name="status"
            hidden
          />
          <label
            htmlFor="completed"
            className="bg-light border border-gray-light font-bold text-sm text-dark-gray text-center min-w-32 block rounded-md py-2 cursor-pointer peer-checked/completed:bg-primary-light peer-checked/completed:text-primary-dark peer-checked/completed:border-primary-dark"
          >
            Completed
          </label>
          <input
            type="radio"
            id="canceled"
            className="canceled peer/canceled"
            name="status"
            hidden
          />
        </div>
      </div>
    </div>
  );
};

export default ConsultationHistory;
