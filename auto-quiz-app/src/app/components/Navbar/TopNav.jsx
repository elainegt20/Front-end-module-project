import { auth } from '../../../auth';
import TopNavClient from './TopNavClient';

const TopNav = async () => {
  const session = await auth();

  return <TopNavClient session={session} />;
};

export default TopNav;
