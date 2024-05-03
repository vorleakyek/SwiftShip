import OrderSummary from '../components/OrderSummary';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../components/AppContext';
import { useContext, useEffect, useState } from 'react';
import YellowButton from '../components/YellowButton';
// import { IoIosArrowBack } from 'react-icons/io';
import { getShippingInformation } from '../data';

export default function CheckoutPage({ setItemsInCart, orderID }) {
  const { itemsInCart } = useContext(AppContext);
  const navigate = useNavigate();

  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    selectedState: '',
    zipCode: '',
  });

  const { firstName, lastName, address, city, zipCode, selectedState } =
    guestInfo;

  useEffect(() => {
    const storedItemsInCart = JSON.parse(localStorage.getItem('itemsInCart')!);
    setItemsInCart(storedItemsInCart);

    async function getInfo() {
      const existing = await getShippingInformation(orderID);

      if (existing)
        setGuestInfo({
          firstName: existing.guestFirstName,
          lastName: existing.guestLastName,
          address: existing.guestAddress,
          city: existing.guestCity,
          zipCode: existing.guestZipCode,
          selectedState: existing.guestState,
        });
    }
    getInfo();
  }, []);

  function formatDate(date) {
    const options = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const currentDate = new Date();
  const earlyArrival = new Date(
    currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
  ); // 7 days from now
  const delivery = new Date(currentDate.getTime() + 10 * 24 * 60 * 60 * 1000); // 10 days from now

  return (
    <div className="max-w-5xl">
      {/* <div className="mt-3">
        <Link to={'/payment'}>
          <p className="text-left text-sm  text-blue-700">
            <IoIosArrowBack className="inline text-blue-600" /> Return to Cart
          </p>
        </Link>
      </div> */}
      <div className="bg-neutral-300 py-1 pl-3 mt-3">
        <p className="text-left text-lg font-semibold">3. Review</p>
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
          <p className="pb-1">
            Arriving {formatDate(earlyArrival)} - {formatDate(delivery)}
          </p>
          <p className="pb-1">
            Name: {firstName} {lastName}
          </p>
          <p className="flex pb-1 mb-3">
            <span className="inline m-0">Address: </span>{' '}
            <div className="inline-block ml-1">
              {address},{' '}
              <span className="m-0">
                {city}, {selectedState} {zipCode}
              </span>
            </div>{' '}
          </p>
        </div>
      </div>
      <hr />
      <OrderSummary itemsInCart={itemsInCart} />
      <YellowButton
        content="Place Order"
        handleClick={() => navigate('/order-confirmation')}
      />
    </div>
  );
}
