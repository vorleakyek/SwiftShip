import YellowButton from '../components/YellowButton';
import CartItem from '../components/CartItem';
import { useEffect, useState, useContext } from 'react';
import { type ItemInCart } from './ItemPage.tsx';
import OrderSummary from '../components/OrderSummary.tsx';
import { AppContext } from '../components/AppContext';
import { useNavigate } from 'react-router-dom';

export default function ViewCart({ setItemsInCart, setTotalAmount }) {
  const [isUpdated, setIsUpdated] = useState(false);
  const { itemsInCart } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const itemsAddedInCartString = localStorage.getItem('itemsInCart');
    const itemsAddedInCart: ItemInCart[] = itemsAddedInCartString
      ? JSON.parse(itemsAddedInCartString)
      : null;
    setItemsInCart(itemsAddedInCart);
  }, [isUpdated]);

  function handleCheckout() {
    navigate('/guest-checkout');
  }

  const isEmptyCart = itemsInCart.length === 0 ? true : false;

  return (
    <div className="max-w-5xl">
      <h1 className="font-semibold my-3">My Cart</h1>
      <hr />
      {itemsInCart.map((item) => (
        <CartItem
          item={item}
          key={item.itemID}
          itemsInCart={itemsInCart}
          setIsUpdated={setIsUpdated}
        />
      ))}
      {isEmptyCart && <p>There are no items added to the cart.</p>}
      {!isEmptyCart && <OrderSummary itemsInCart={itemsInCart} setTotalAmount={setTotalAmount} />}
      {!isEmptyCart && (
        <YellowButton content="Checkout" handleClick={handleCheckout} />
      )}
    </div>
  );
}
