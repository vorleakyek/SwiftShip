import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext, FormEvent } from 'react';
import { getUserInfo } from '../data';
import { AppContext } from '../components/AppContext';

export default function LoginUserPaymentPage({ setCard }) {
  const { user, card } = useContext(AppContext);
  const [isError, setIsError] = useState(false);
  const [userInfo, setUserInfo] = useState({
    address: '',
    city: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    state: '',
    zipCode: '',
    email: '',
  });

  const navigate = useNavigate();
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!card) {
      setIsError(true);
    } else {
      setIsError(false);
      navigate('/check-out');
    }
  }

  useEffect(() => {
    async function getInfo() {
      const userInfo = await getUserInfo(user.userID);
      if (userInfo) setUserInfo(userInfo);
    }

    getInfo();
  }, []);

  const {
    firstName,
    lastName,
    address,
    city,
    zipCode,
    phoneNumber,
    state,
    email,
  } = userInfo;

  return (
    <div className="max-w-5xl">
      <div className="text-center">
        <h1 className="font-bold py-2 ">Checkout</h1>
        <div className="bg-neutral-300 py-1 px-3 font-semibold text-left">
          <h2>1. Shipping and billing address</h2>
        </div>
        <div className="flex py-3">
          <div className="text-left mx-auto">
            <p>
              {' '}
              <span className="font-semibold inline">Name:</span> {firstName}{' '}
              {lastName}
            </p>
            <p>
              <span className="font-semibold inline">Email:</span> {email}
            </p>
            <div className="flex">
              <span className="inline font-semibold ">Address: </span>
              <div className="inline-block ml-1">
                {address},
                <span className="m-0">
                  {city}, {state} {zipCode}
                </span>
              </div>
            </div>
            <p>
              {' '}
              <span className="font-semibold inline">Phone Number:</span>{' '}
              {phoneNumber}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-neutral-300 py-1 px-3 font-semibold text-left">
          <h2>2. Payment Information</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="pt-3">
            <p>Credit Card</p>
          </div>
          <div className="flex justify-center">
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
          <div>
            <label htmlFor="card-info">
              <span className="mr-2 mt-3 font-semibold">
                Debit/Credit Card Number:
              </span>
              <div className="ml-3">
                <input
                  id="card-info"
                  name="card-info"
                  type="number"
                  className={`input-box w-1/2 md:w-1/3 ${
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
          <div className="flex justify-center pt-2">
            <button className="bg-amber-400 rounded-3xl px-5 py-1 my-3">
              Review Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
