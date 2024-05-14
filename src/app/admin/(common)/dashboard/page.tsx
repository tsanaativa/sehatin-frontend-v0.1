import { getUser } from '@/services/session';

const Dashboard = async () => {
  const user = await getUser();
  return (
    <div>
      <span>Dashboard</span>
      <h1>Welcome, {user?.name}</h1>
    </div>
  );
};

export default Dashboard;
