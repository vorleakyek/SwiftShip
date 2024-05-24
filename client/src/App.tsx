import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ItemPage from './pages/ItemPage';
import ViewCart from './pages/ViewCart';
import CheckoutPage from './pages/CheckoutPage';
import LoginUserPaymentPage from './pages/LoginUserPaymentPage';
import { type OrderSummary, AppContext } from './components/AppContext';
import { type ItemInCart } from './pages/ItemPage';
import GuestCheckoutPage from './pages/GuestCheckoutPage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import './index.css';
import './App.css';
import BookPage from './pages/BookPage';
import SearchResultPage from './pages/SearchResultPage';
import { RegistrationForm } from './pages/RegistrationForm';
import CustomerService from './pages/CustomerService';

export default function App() {
  const [user, setUser] = useState();
  const [token, setToken] = useState<string>();
  const [isAuthorizing, setIsAuthorizing] = useState(true);

  const [itemsInCart, setItemsInCart] = useState<ItemInCart[]>([]);
  const [orderID, setOrderID] = useState(0);
  const [category, setCategory] = useState<string>('');
  const [searchKeyWords, setSearchKeyWords] = useState('Books');
  const [showGuestCheckOut, setShowGuestCheckOut] = useState(false);
  const [card, setCard] = useState('');

  const [orderSummary, setOrderSummary] = useState<OrderSummary>({
    totalItems: 0,
    price: 0,
    tax: 0,
    shippingCost: 0,
    totalAmount: 0,
    earlyDeliveryDate: '',
    lateDeliveryDate: '',
  });

  const contextValue = {
    itemsInCart,
    orderSummary,
    orderID,
    handleSignIn,
    handleSignOut,
    user,
    token,
    card,
  };

  const tokenKey = 'swift-ship';

  useEffect(() => {
    // If user logged in previously on this browser, authorize them
    const auth = localStorage.getItem(tokenKey);
    if (auth) {
      const a = JSON.parse(auth);
      setUser(a.user);
      setToken(a.token);
    }
    setIsAuthorizing(false);
  }, []);

  if (isAuthorizing) return null;

  function handleSignIn(auth) {
    localStorage.setItem(tokenKey, JSON.stringify(auth));
    setUser(auth.user);
    setToken(auth.token);
  }

  function handleSignOut() {
    localStorage.removeItem(tokenKey);
    setUser(undefined);
    setToken(undefined);
  }

  return (
    <AppContext.Provider value={contextValue}>
      <Routes>
        <Route
          path="/"
          element={
            <NavBar
              setCategory={setCategory}
              setSearchKeyWords={setSearchKeyWords}
            />
          }>
          <Route index element={<HomePage />} />
          <Route path="sign-up" element={<RegistrationForm />} />
          <Route path="customer-service" element={<CustomerService />} />
          <Route path="Books" element={<BookPage category={category} />} />
          <Route path="Clothes" element={<BookPage category={category} />} />
          <Route
            path="PetSupplies"
            element={<BookPage category={category} />}
          />
          <Route path="Kitchens" element={<BookPage category={category} />} />
          <Route path="Toys" element={<BookPage category={category} />} />
          <Route path="Games" element={<BookPage category={category} />} />
          <Route
            path="products/:itemID"
            element={
              <ItemPage
                setItemsInCart={setItemsInCart}
                setOrderSummary={setOrderSummary}
              />
            }
          />
          <Route
            path="search-result"
            element={<SearchResultPage searchKeyWords={searchKeyWords} />}
          />
          <Route
            path="view-cart"
            element={
              <ViewCart
                setItemsInCart={setItemsInCart}
                setOrderSummary={setOrderSummary}
                setShowGuestCheckOut={setShowGuestCheckOut}
              />
            }
          />
          <Route
            path="guest-checkout"
            element={
              <GuestCheckoutPage
                showGuestCheckOut={showGuestCheckOut}
                setShowGuestCheckOut={setShowGuestCheckOut}
              />
            }
          />
          <Route
            path="login-payment"
            element={<LoginUserPaymentPage setCard={setCard} />}
          />
          <Route
            path="shipping"
            element={<ShippingPage setOrderID={setOrderID} />}
          />
          <Route path="payment" element={<PaymentPage />} />
          <Route
            path="check-out"
            element={
              <CheckoutPage
                setItemsInCart={setItemsInCart}
                setOrderSummary={setOrderSummary}
              />
            }
          />
          <Route
            path="order-confirmation"
            element={
              <OrderConfirmationPage
                setItemsInCart={setItemsInCart}
                setOrderSummary={setOrderSummary}
              />
            }
          />
        </Route>
      </Routes>
      <Footer />
    </AppContext.Provider>
  );
}
