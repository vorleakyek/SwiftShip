import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './index.css';
import './App.css';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ItemPage from './pages/ItemPage';
import ViewCart from './pages/ViewCart';
import CheckoutPage from './pages/CheckoutPage';
import { type OrderSummary,AppContext } from './components/AppContext';
import { ItemInCart } from './pages/ItemPage';
import GuestCheckoutPage from './pages/GuestCheckoutPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';

export default function App() {
  const [itemsInCart, setItemsInCart] = useState<ItemInCart[]>([]);
  const [orderID, setOrderID] = useState(0);
  const [orderSummary, setOrderSummary] = useState<OrderSummary>({
    totalItems: 0,
    price: 0,
    tax: 0,
    shippingCost: 0,
    totalAmount: 0,
    earlyDeliveryDate: '',
    lateDeliveryDate: ''
  });

  const contextValue = {
    itemsInCart,
    orderSummary,
    orderID
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<HomePage />} />
          <Route
            path="products/:itemID"
            element={<ItemPage setItemsInCart={setItemsInCart} />}
          />
          <Route
            path="view-cart"
            element={<ViewCart setItemsInCart={setItemsInCart} setOrderSummary={setOrderSummary} />}
          />
          <Route path="guest-checkout" element={<GuestCheckoutPage />} />
          <Route
            path="shipping"
            element={<ShippingPage orderID={orderID} setOrderID={setOrderID} />}
          />
          <Route path="payment" element={<PaymentPage orderID={orderID} />} />
          <Route
            path="check-out"
            element={
              <CheckoutPage setItemsInCart={setItemsInCart} orderID={orderID} orderSummary={orderSummary} setOrderSummary={setOrderSummary} />
            }
          />
          <Route
            path="order-confirmation"
            element={<OrderConfirmationPage />}
          />
        </Route>
      </Routes>
      <Footer />
    </AppContext.Provider>
  );
}
