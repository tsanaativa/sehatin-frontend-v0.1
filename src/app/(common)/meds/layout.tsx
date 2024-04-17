import AddressCard from '@/components/common/AddressCard';
import SearchBar from '@/components/common/SearchBar';

const MedsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-primary-dark bg-gradient-to-r from-slate-900/0 to-primary/40">
      <div className="py-5 px-4 relative sm:px-6 flex flex-col gap-4">
        <AddressCard />
        <SearchBar />
      </div>
      <div className="w-full bg-light rounded-tr-2xl rounded-tl-2xl p-5">
        {children}
      </div>
    </div>
  );
};

export default MedsLayout;
