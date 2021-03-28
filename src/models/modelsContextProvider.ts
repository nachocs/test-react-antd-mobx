import { Instance } from 'mobx-state-tree';
import { createContext, useContext } from 'react';
import { RootModelType } from './rootModel';

export type RootInstance = Instance<RootModelType>;
export const RootStoreContext = createContext<null | RootInstance>(null);
export const { Provider } = RootStoreContext;

export function useStore() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}
