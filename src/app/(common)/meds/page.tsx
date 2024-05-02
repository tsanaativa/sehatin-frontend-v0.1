import CategoriesSection from '@/features/meds/components/CategoriesSection';
import MedsByCategories from '@/features/meds/components/MedsByCategories';
import { LoginData } from '@/types/LoginData';
import cookiesStore from '@/utils/cookies';

const Meds = () => {
  const user = cookiesStore.get<LoginData>(
    process.env.NEXT_PUBLIC_USER_LOCAL_KEY || ''
  )?.user;

  return (
    <div className="w-full bg-light rounded-tr-2xl rounded-tl-2xl flex justify-center px-1 md:px-6 md:rounded-none">
      <div className="max-w-[1150px] py-4 w-full px-4 sm:px-6 md:py-10">
        <div className="flex flex-col">
          <CategoriesSection />
          <MedsByCategories user={user} />
        </div>
      </div>
    </div>
  );
};

export default Meds;
