import YellowButton from '../components/YellowButton';
import CartItem from '../components/CartItem';
import { useEffect, useState } from 'react';
import { type ItemInCart } from './ItemPage.tsx';
import OrderSummary from '../components/OrderSummary.tsx';

export default function ViewCart() {
  const [itemsInCart, setItemsInCart] = useState<ItemInCart[]>([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const itemsAddedInCartString = localStorage.getItem('itemsInCart');
    const itemsAddedInCart: ItemInCart[] = itemsAddedInCartString
      ? JSON.parse(itemsAddedInCartString)
      : null;
    setItemsInCart(itemsAddedInCart);
  }, [isUpdated]);

  function handleCheckout() {
    console.log('checkout');
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
      {!isEmptyCart && <OrderSummary itemsInCart={itemsInCart} />}
      {!isEmptyCart && (
        <YellowButton content="Checkout" handleClick={handleCheckout} />
      )}
    </div>
  );
}
