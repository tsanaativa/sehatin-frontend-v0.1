import Image from 'next/image';
import defaultImage from '@/assets/images/default-avatar.svg';

const AdminHeader = () => {
  return (
    <div className="w-full h-24 flex items-center justify-end gap-x-4 bg-white-fe border-b border-gray-light pr-12">
      <Image src={defaultImage} alt="" />
      <span className="font-medium text-sm text-dark">Admin bin Admin</span>
    </div>
  );
};

export default AdminHeader;
