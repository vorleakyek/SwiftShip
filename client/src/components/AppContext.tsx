import { createContext } from 'react';
import { ItemInCart } from '../pages/ItemPage';

type AppContextValues = {
  itemsInCart: ItemInCart[];
};

export const AppContext = createContext<AppContextValues>({
  itemsInCart: [],
});
