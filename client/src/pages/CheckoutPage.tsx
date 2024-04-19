import OrderSummary from '../components/OrderSummary';
import { Link } from 'react-router-dom';
import { AppContext } from '../components/AppContext';
import { useContext, useEffect } from 'react';
import YellowButton from '../components/YellowButton';
import { IoIosArrowBack } from 'react-icons/io';

export default function CheckoutPage({ setItemsInCart }) {
  const { itemsInCart } = useContext(AppContext);

  useEffect(() => {
    const storedItemsInCart = JSON.parse(localStorage.getItem('itemsInCart')!);
    setItemsInCart(storedItemsInCart);
  }, []);

  return (
    <div>
      <div>
        <Link to={'/view-cart'}>
          <p className="text-left text-sm  text-blue-700">
            {' '}
            <IoIosArrowBack className="inline text-blue-600" /> Return to Cart
          </p>
        </Link>
      </div>
      <div>
        <h2 className="text-lg text-left pt-3 pl-3">Items to ship</h2>
        <div className="flex py-5 px-10">
          {itemsInCart.map((item) => (
            <div key={item.itemID} className="w-24">
              <img src={item.imageUrl} alt={item.name} />
            </div>
          ))}
        </div>
        <div className="text-left text-sm pl-10">
          <p className="pb-1">Arriving March 28 - April 16</p>
          <p className="pb-1">First LastName</p>
          <p className="pb-1">Adress:</p>
        </div>
      </div>
      <hr />
      <OrderSummary itemsInCart={itemsInCart} />
      <YellowButton
        content="Place Order"
        handleClick={() => console.log('click')}
      />
    </div>
  );
}
