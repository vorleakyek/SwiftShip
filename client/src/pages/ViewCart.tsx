import YellowButton from '../components/YellowButton';
import CartItem from '../components/CartItem';

export default function ViewCart() {
  function handleCheckout() {
    console.log('checkout');
  }

  return (
    <div className="max-w-5xl">
      <h1 className="font-semibold my-3">My Cart</h1>
      <CartItem />
      <CartItem />
      <YellowButton content="Checkout" handleClick={handleCheckout} />
    </div>
  );
}
