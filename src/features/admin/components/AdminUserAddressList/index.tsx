'use client';
import { DataTable } from '@/components/common';
import { USER_ADDRESS_COLUMN_LIST } from '@/constants/tables';
import { deleteUserAddress } from '@/features/profile/actions/profile';
import { getOneUser } from '@/services/user';
import { Address } from '@/types/Address';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AdminUserAddressList = () => {
  const { userId } = useParams();

  const [allAddresses, setAllAddresses] = useState<Address[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const fetchAllAddresses = async () => {
    try {
      const res = await getOneUser(parseInt(`${userId}`));
      setAllAddresses(res.addresses);
    } catch (error: any) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteUserAddress(`${userId}`, id);
      toast.error('successfully deleted');
      fetchAllAddresses();
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  return (
    <div className="mt-6">
      <DataTable
        className="mt-8"
        dataList={allAddresses}
        columnList={USER_ADDRESS_COLUMN_LIST}
        tabelName="address"
        loading={isLoading}
        userId={`${userId}`}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default AdminUserAddressList;
