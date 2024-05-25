import { createContext } from 'react';
import { ItemInCart } from '../pages/ItemPage';

export type OrderSummary = {
  totalItems: number;
  price: number;
  tax: number;
  shippingCost: number;
  totalAmount: number;
  earlyDeliveryDate: string;
  lateDeliveryDate: string;
};

type AppContextValues = {
  itemsInCart: ItemInCart[];
  orderSummary: OrderSummary;
  orderID: number;
  user: any;
  card: any;
  handleSignIn: (auth) => void;
  handleSignOut: () => void;
};

export const AppContext = createContext<AppContextValues>({
  itemsInCart: [],
  orderSummary: {
    totalItems: 0,
    price: 0,
    tax: 0,
    shippingCost: 0,
    totalAmount: 0,
    earlyDeliveryDate: '',
    lateDeliveryDate: '',
  },
  orderID: 0,
  user: '',
  card: '',
  handleSignIn: () => undefined,
  handleSignOut: () => undefined,
});
