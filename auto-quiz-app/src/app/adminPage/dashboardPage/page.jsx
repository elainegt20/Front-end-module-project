import AdminDashboard from '../../components/Admin/AdminDashboard';
import { getUsers } from '../../actions/adminActions';

const DashboardPage = async () => {
  const users = await getUsers();
  return (
    <>
      <AdminDashboard usersList={users} />
    </>
  );
};

export default DashboardPage;
