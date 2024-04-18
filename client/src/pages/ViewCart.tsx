import YellowButton from '../components/YellowButton';
import CartItem from '../components/CartItem';
import { useEffect, useState } from 'react';
import { type ItemInCart } from './ItemPage.tsx';

export default function ViewCart() {
  const [itemsInCart, setItemsInCart] = useState<ItemInCart[]>([]);

  useEffect(() => {
    const itemsAddedInCartString = localStorage.getItem('itemsInCart');
    const itemsAddedInCart: ItemInCart[] = itemsAddedInCartString
      ? JSON.parse(itemsAddedInCartString)
      : null;
    setItemsInCart(itemsAddedInCart);
  }, []);

  function handleCheckout() {
    console.log('checkout');
  }

  return (
    <div className="max-w-5xl">
      <h1 className="font-semibold my-3">My Cart</h1>
      {itemsInCart.map((item) => (
        <CartItem item={item} key={item.itemID} />
      ))}
      <YellowButton content="Checkout" handleClick={handleCheckout} />
    </div>
  );
}
