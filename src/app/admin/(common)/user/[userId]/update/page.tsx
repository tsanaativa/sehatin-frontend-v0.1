import { UpdateUserForm } from '@/features/admin/components';
import { getOneUser } from '@/services/user';

const UpdateUser = async ({ params }: { params: { userId: number } }) => {
  const user = await getOneUser(params.userId);

  return <UpdateUserForm user={user} />;
};

export default UpdateUser;
