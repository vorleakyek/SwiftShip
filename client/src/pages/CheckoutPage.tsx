import { useNavigate } from 'react-router-dom';
import { AppContext } from '../components/AppContext';
import { useContext, useEffect, useState } from 'react';
import YellowButton from '../components/YellowButton';
import { getShippingInformation } from '../data';
import { getUserInfo } from '../data';

export default function CheckoutPage({ setItemsInCart, setOrderSummary }) {
  const { user, card, itemsInCart, orderID, orderSummary } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    selectedState: '',
    zipCode: '',
  });

  const [earlyArrivalDate, setEarlyArrivalDate] = useState('');
  const [lateDeliveryDate, setLateDeliveryDate] = useState('');

  const { firstName, lastName, address, city, zipCode, selectedState } =
    guestInfo;

  const { totalItems, totalAmount, price, shippingCost, tax } = orderSummary;

  useEffect(() => {
    const storedItemsInCart = JSON.parse(localStorage.getItem('itemsInCart')!);
    setItemsInCart(storedItemsInCart);

    async function getGuessInfo() {
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

    async function getLoginUserInfo() {
      const userInfo = await getUserInfo(user.userID);
      const { firstName, lastName, address, city, zipCode, state } = userInfo;

      setGuestInfo({
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        selectedState: state,
        zipCode: zipCode,
      });
    }

    if (!user) {
      getGuessInfo();
    } else {
      getLoginUserInfo();
    }

    const currentDate = new Date();
    const earlyArrival = new Date(
      currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
    ); // 7 days from now
    const delivery = new Date(currentDate.getTime() + 10 * 24 * 60 * 60 * 1000); // 10 days from now

    setEarlyArrivalDate(formatDate(earlyArrival));
    setLateDeliveryDate(formatDate(delivery));
  }, []);

  function formatDate(date) {
    const options = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  async function handlePlaceOrder() {
    //update the orderNumber, totalAmount, orderDate
    try {
      setOrderSummary((prev) => ({
        ...prev,
        earlyDeliveryDate: earlyArrivalDate,
        lateDeliveryDate,
      }));

      if (!user) {
        const req = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderID, orderSummary }),
        };

        console.log('update req', req);
        const res = await fetch('api/guest-checkout/order', req);
        if (!res.ok) {
          console.error('error');
          throw new Error(`fetch Error ${res.status}`);
        }
        const paymentInfo = await res.json();
        console.log('shipping info', paymentInfo);
      } else {
        const req = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderSummary, card, user }),
        };

        console.log('update req', req);
        const res = await fetch('api/login-user-checkout/order', req);
        if (!res.ok) {
          throw new Error(`fetch Error ${res.status}`);
        }
        const paymentInfo = await res.json();
        console.log('shipping info', paymentInfo);
      }
    } catch (err) {
      console.error(`Error registering user: ${err}`);
    }

    navigate('/order-confirmation');
  }

  async function handleCancelOrder() {
    //delete info from the database
    try {
      const url = `api/guest-checkout/order/${orderID}`;
      const req = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await fetch(url, req);
      if (!res.ok) {
        console.log(`fetch Error ${res.status}`);
        throw new Error(`fetch Error ${res.status}`);
      }
    } catch (err) {
      console.error(`Error registering user: ${err}`);
    }
    navigate('/');
  }

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
            Arriving {earlyArrivalDate} - {lateDeliveryDate}
          </p>
          <p className="pb-1">
            Name: {firstName} {lastName}
          </p>
          <div className="flex pb-1 mb-3">
            <span className="inline m-0">Address: </span>
            <div className="inline-block ml-1">
              {address},
              <span className="m-0">
                {city}, {selectedState} {zipCode}
              </span>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <div className="flex pt-3">
        <div className="text-left">
          <h3 className="pl-3 font-semibold pb-2">Order Summary</h3>
          <div className="pl-10 text-sm">
            <p className="pb-1">Items: {totalItems}</p>
            <p className="pb-1">Price: ${price}</p>
            <p className="pb-1">Tax: ${tax}</p>
            <p className="pb-1">
              Shipping: {shippingCost === 0 ? 'Free' : '$8.99'}
            </p>
            <p className="pb-1">Total: ${totalAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div>
        <YellowButton content="Cancel" handleClick={handleCancelOrder} />
        <YellowButton content="Place Order" handleClick={handlePlaceOrder} />
      </div>
    </div>
  );
}

//Should remove the items in carts and updat the state properly
