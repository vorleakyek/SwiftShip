import YellowButton from '../components/YellowButton';
import CartItem from '../components/CartItem';
import { useEffect, useState, useContext } from 'react';
import { type ItemInCart } from './ItemPage.tsx';
import OrderSummary from '../components/OrderSummary.tsx';
import { AppContext } from '../components/AppContext';
import { useNavigate } from 'react-router-dom';
import { calculateOrderSummary } from '../data.tsx';

export default function ViewCart({
  setItemsInCart,
  setOrderSummary,
  setShowGuestCheckOut,
}) {
  const [isUpdated, setIsUpdated] = useState(false);
  const { itemsInCart, user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const itemsAddedInCartString = localStorage.getItem('itemsInCart');
    const itemsAddedInCart: ItemInCart[] = itemsAddedInCartString
      ? JSON.parse(itemsAddedInCartString)
      : [];
    console.log('itemAddedInCart', itemsAddedInCart);
    setItemsInCart(itemsAddedInCart);
  }, [isUpdated]);

  useEffect(() => {
    const updateOrderSummary = calculateOrderSummary(itemsInCart);
    setOrderSummary(updateOrderSummary);
  }, [itemsInCart]);

  function handleCheckout() {
    if (!user) {
      setShowGuestCheckOut(true);
      navigate('/guest-checkout');
    } else {
      navigate('/login-payment');
    }
  }

  const isEmptyCart = itemsInCart.length === 0;

  // console.log('itemsInCart',itemsInCart)

  return (
    <div className="max-w-5xl">
      <h1 className="font-semibold my-3">My Cart</h1>
      <hr />
      {itemsInCart.map((item) => (
        <CartItem
          item={item}
          key={item.itemID}
          setIsUpdated={setIsUpdated}
          setOrderSummary={setOrderSummary}
        />
      ))}

      {isEmptyCart && (
        <p className="py-10 bg-slate-50">
          There are no items added to the cart.
        </p>
      )}
      {!isEmptyCart && <OrderSummary setOrderSummary={setOrderSummary} />}
      {!isEmptyCart && (
        <YellowButton content="Checkout" handleClick={handleCheckout} />
      )}
    </div>
  );
}
