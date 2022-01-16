import { useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState<boolean>(false);

  const signin = () => !user && setUser(true);

  const signout = () => user && setUser(false);

  return { user, signin, signout };
};
