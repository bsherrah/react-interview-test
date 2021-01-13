import { useReactiveVar } from '@apollo/client';
import { appStateVar } from '../apollo/cache';

export function useAppState() {
  useReactiveVar(appStateVar);

  const { isLoggedIn, products, user } = appStateVar();

  const setIsLoggedIn = (status) => {
    appStateVar({
      ...appStateVar(),
      isLoggedIn: status,
    });
  };
  const setUser = (user) => {
    appStateVar({
      ...appStateVar(),
      user,
    });
  };
  const setProducts = (products) => {
    appStateVar({
      ...appStateVar(),
      products,
    });
  };

  return {
    isLoggedIn,
    products,
    user,
    setIsLoggedIn,
    setUser,
    setProducts,
  };
}
