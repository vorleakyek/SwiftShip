import { createContext } from 'react';

type AppContextValues = {
  selectedQuantity: number;
  updateSelectedQuantity: (quantity: number) => void;
};

export const AppContext = createContext<AppContextValues>({
  selectedQuantity: 1,
  updateSelectedQuantity: () => undefined,
});
