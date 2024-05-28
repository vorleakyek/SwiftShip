import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useState, useEffect, useContext } from 'react';
import { getShippingInformation } from '../data';
import { AppContext } from '../components/AppContext';

type Shipping = {
  address: string;
  city: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  selectedState: string;
  zipCode: string;
};

export default function PaymentPage() {
  const { orderID } = useContext(AppContext);
  const navigate = useNavigate();
  const [card, setCard] = useState('');
  const [email, setEmail] = useState('');
  const [billingInfo, setBillingInfo] = useState<Shipping>({
    address: '',
    city: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    selectedState: '',
    zipCode: '',
  });

  const {
    firstName,
    lastName,
    address,
    city,
    zipCode,
    phoneNumber,
    selectedState,
  } = billingInfo;

  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getInfo() {
      const existing = await getShippingInformation(orderID);

      if (existing)
        setBillingInfo({
          firstName: existing.guestFirstName,
          lastName: existing.guestLastName,
          address: existing.guestAddress,
          city: existing.guestCity,
          zipCode: existing.guestZipCode,
          phoneNumber: existing.guestPhoneNumber,
          selectedState: existing.guestState,
        });
    }
    getInfo();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!card || !email) {
      setIsError(true);
    } else {
      setIsError(false);

      try {
        const req = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderID, card, email }),
        };

        console.log('update req', req);
        const res = await fetch('api/guest-checkout/payment', req);
        if (!res.ok) {
          alert('error');
          throw new Error(`fetch Error ${res.status}`);
        }
        const paymentInfo = await res.json();
        console.log('shipping info', paymentInfo);
      } catch (err) {
        alert(`Error registering user: ${err}`);
      }

      navigate('/check-out');
    }
  }

  return (
    <div className="max-w-5xl text-left mt-2">
      <Link to={'/shipping'}>
        <p className="text-left text-sm mb-1 text-blue-700">Previous</p>
      </Link>

      <div className="bg-neutral-300 py-1 px-3 font-semibold">
        <h1>2. Payment</h1>
      </div>

      <div className="ml-7 pt-5">
        <div>
          <h1 className="font-semibold">Payment Information </h1>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="pt-3">
              <p>Credit Card</p>
            </div>
            <div className="flex">
              <img
                src="https://www.static-jcpenney.com/prod7/yoda-checkout/assets/static/images/visa-new.svg"
                alt="visa"
              />
              <img
                src="https://www.static-jcpenney.com/prod7/yoda-checkout/assets/static/images/master-new.svg"
                alt="master"
              />
              <img
                src="https://www.static-jcpenney.com/prod7/yoda-checkout/assets/static/images/discover-new.svg"
                alt="discover"
              />
              <img
                src="https://www.static-jcpenney.com/prod7/yoda-checkout/assets/static/images/amex-new.svg"
                alt="america-express"
              />
            </div>
            <div className="pt-3">
              <label htmlFor="card-info">
                <span className="mr-2 mt-3">Debit/Credit Card Number:</span>
                <div className="ml-3">
                  <input
                    id="card-info"
                    name="card-info"
                    type="number"
                    className={`input-box ${
                      !card && isError ? 'red-border' : 'gray-border'
                    } `}
                    value={card}
                    onChange={(e) => setCard(e.target.value)}
                  />
                  <span
                    className={`text-sm text-red-600 m-0 pl-2 ${
                      !card && isError ? '' : 'hidden'
                    }`}>
                    Card number field is required
                  </span>
                </div>
              </label>
            </div>

            <div className="pt-5">
              <p className="font-semibold">Shipping and billing address</p>
              <div className="pt-3">
                <p>
                  Name: {firstName} {lastName}
                </p>
                <div className="flex">
                  <span className="inline m-0">Address: </span>{' '}
                  <div className="inline-block ml-1">
                    {address},{' '}
                    <span className="m-0">
                      {city}, {selectedState} {zipCode}
                    </span>
                  </div>{' '}
                </div>
                <p>Phone: {phoneNumber}</p>
              </div>
            </div>

            <div className="pt-5">
              <p className="font-semibold">Order Contact Information</p>

              <label className="flex items-start" htmlFor="email">
                <span className="mr-2 mt-3">Email:</span>
                <div className="flex flex-col">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`input-box ${
                      !email && isError ? 'red-border' : 'gray-border'
                    } `}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span
                    className={`text-sm text-red-600 m-0 pl-2 ${
                      !email && isError ? '' : 'hidden'
                    }`}>
                    Email field is required
                  </span>
                </div>
              </label>
            </div>

            <div className="flex justify-center pt-2">
              <button className="bg-amber-400 rounded-3xl px-5 py-1 my-3">
                Review Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
