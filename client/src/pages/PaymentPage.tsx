import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useState, useEffect } from 'react';
import {getShippingInformation } from '../data';

type Shipping = {
  address: string;
  city: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  selectedState: string;
  zipCode: string;
  email: string;
};

export default function PaymentPage({orderID}) {
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
    email: ''
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
  const [isEditing, setIsEditing] = useState(false);


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
    // if (orderID) {
    //   setIsEditing(true);
    // }
   getInfo();
  }, []);


  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if(!card || !email) {
      return;
    }

    navigate('/check-out');
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
              <label>
                Debit/Credit Card Number
                <input type="tel" className="input-box gray-border block" />
              </label>
            </div>

            <div className="pt-5">
              <p className="font-semibold">Shipping and billing address</p>
              <div className="pt-3">
                <p>Name: {firstName} {lastName}</p>
                <p>Address: {address}</p>
                <p>Phone: {phoneNumber}</p>
              </div>
            </div>

            <div className="pt-5">
              <p className="font-semibold">Order Contact Information</p>
              <label>
                Email
                <input type="email" className="input-box gray-border" />
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
