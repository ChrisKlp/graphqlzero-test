import { useQuery } from '@apollo/client';
import { USERS } from '../graphql/queries';
import { Users } from '../graphql/__generated__/Users';

const Home: React.FC = () => {
  const { data, loading, error } = useQuery<Users>(USERS);

  console.log(data);

  return <div />;
};

export default Home;
