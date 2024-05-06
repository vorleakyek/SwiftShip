import { Link, useNavigate } from 'react-router-dom';
import { useState, FormEvent, ChangeEvent, useEffect, useContext } from 'react';
import { states, getShippingInformation } from '../data';
import { AppContext } from '../components/AppContext';

export default function ShippingPage({ setOrderID }) {
  const { orderID } = useContext(AppContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    phoneNumber: '',
    selectedState: '',
  });

  const {
    firstName,
    lastName,
    address,
    city,
    zipCode,
    phoneNumber,
    selectedState,
  } = formData;

  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function getInfo() {
      const existing = await getShippingInformation(orderID);
      console.log('existing', existing);
      // console.log('guest', existing.guestState)

      if (existing)
        setFormData({
          firstName: existing.guestFirstName,
          lastName: existing.guestLastName,
          address: existing.guestAddress,
          city: existing.guestCity,
          zipCode: existing.guestZipCode,
          phoneNumber: existing.guestPhoneNumber,
          selectedState: existing.guestState,
        });

      // console.log('isEditing', isEditing)
      return existing;
    }
    if (orderID) {
      setIsEditing(true);
    }

    orderID && getInfo();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // setIsEditing(true)

    if (
      !firstName ||
      !lastName ||
      !address ||
      !city ||
      !zipCode ||
      !phoneNumber ||
      !selectedState
    ) {
      setIsError(true);
    } else {
      setIsError(false);

      console.log('isEditing in handleSubmit', isEditing);

      if (!isEditing) {
        try {
          const req = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          };
          const res = await fetch('api/guest-checkout/shipping', req);
          if (!res.ok) {
            alert('error');
            throw new Error(`fetch Error ${res.status}`);
          }
          const shippingInfo = await res.json();
          setOrderID(shippingInfo.orderID);
          console.log('shipping info', shippingInfo, shippingInfo.orderID);
        } catch (err) {
          alert(`Error registering user: ${err}`);
        }
      } else {
        //update the info
        try {
          const req = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderID: orderID, ...formData }),
          };

          console.log('update req', req);
          const res = await fetch('api/guest-checkout/shipping', req);
          if (!res.ok) {
            alert('error');
            throw new Error(`fetch Error ${res.status}`);
          }
          const shippingInfo = await res.json();
          setOrderID(shippingInfo.orderID);
          console.log('shipping info', shippingInfo, shippingInfo.orderID);
        } catch (err) {
          alert(`Error registering user: ${err}`);
        }
      }

      navigate('/payment');
    }
  }

  return (
    <div className="max-w-5xl text-left mt-2">
      <Link to={'/view-cart'}>
        <p className="text-left text-sm mb-1 text-blue-700">Return to Cart</p>
      </Link>

      <div className="bg-neutral-300 py-1 px-3 font-semibold">
        <h1>1. Shipping</h1>
      </div>
      <div className="flex ml-7">
        <div>
          <form onSubmit={handleSubmit}>
            <label className="flex items-start" htmlFor="firstName">
              <span className="mr-2 mt-3">First Name:</span>
              <div className="flex flex-col">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className={`input-box ${
                    !firstName && isError ? 'red-border' : 'gray-border'
                  } `}
                  value={firstName}
                  onChange={handleChange}
                />
                <span
                  className={`text-sm text-red-600 m-0 pl-2 ${
                    !firstName && isError ? '' : 'hidden'
                  }`}>
                  First name field is required
                </span>
              </div>
            </label>
            <label className="flex items-start" htmlFor="lastName">
              <span className="mr-2 mt-3">Last Name:</span>
              <div className="flex flex-col">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className={`input-box ${
                    !lastName && isError ? 'red-border' : 'gray-border'
                  } `}
                  value={lastName}
                  onChange={handleChange}
                />
                <span
                  className={`text-sm text-red-600 m-0 pl-2 ${
                    !lastName && isError ? '' : 'hidden'
                  }`}>
                  Last name field is required
                </span>
              </div>
            </label>

            {/* <label className="flex items-start" htmlFor="">
              <span className="mr-2 mt-3">:</span>
              <div className="flex flex-col">
                <input
                  id=""
                  name=""
                  type="text"
                  className={`input-box ${! && isError ? 'red-border' : 'gray-border'} `}
                  value={}
                  onChange={handleChange}
                />
                <span
                  className={`text-sm text-red-600 m-0 pl-2 ${! && isError ? '' : 'hidden'}`}>
                   field is required
                </span>
              </div>
            </label> */}

            <label className="flex items-start" htmlFor="address">
              <span className="mr-2 mt-3"> Street Address:</span>
              <div className="flex flex-col">
                <input
                  id="address"
                  name="address"
                  type="text"
                  className={`input-box ${
                    !address && isError ? 'red-border' : 'gray-border'
                  } `}
                  value={address}
                  onChange={handleChange}
                />
                <span
                  className={`text-sm text-red-600 m-0 pl-2 ${
                    !address && isError ? '' : 'hidden'
                  }`}>
                  Address field is required
                </span>
              </div>
            </label>
            <label className="flex items-start" htmlFor="selectedState">
              <span className="mr-2 mt-3">State:</span>
              <div className="flex flex-col">
                <select
                  id="selectedState"
                  name="selectedState"
                  value={selectedState}
                  onChange={handleChange}
                  className={`input-box ${
                    !selectedState && isError ? 'red-border' : 'gray-border'
                  } `}>
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.value} value={state.value}>
                      {state.label}
                    </option>
                  ))}
                </select>
                <span
                  className={`text-sm text-red-600 m-0 pl-2 ${
                    !selectedState && isError ? '' : 'hidden'
                  }`}>
                  State field is required
                </span>
              </div>
            </label>
            <label className="flex items-start" htmlFor="city">
              <span className="mr-2 mt-3">City:</span>
              <div className="flex flex-col">
                <input
                  id="city"
                  name="city"
                  type="text"
                  className={`input-box ${
                    !city && isError ? 'red-border' : 'gray-border'
                  } `}
                  value={city}
                  onChange={handleChange}
                />
                <span
                  className={`text-sm text-red-600 m-0 pl-2 ${
                    !city && isError ? '' : 'hidden'
                  }`}>
                  City field is required
                </span>
              </div>
            </label>
            <label className="flex items-start" htmlFor="zipCode">
              <span className="mr-2 mt-3">Zip Code:</span>
              <div className="flex flex-col">
                <input
                  id="zipCode"
                  name="zipCode"
                  type="number"
                  className={`input-box ${
                    !zipCode && isError ? 'red-border' : 'gray-border'
                  } `}
                  value={zipCode}
                  onChange={handleChange}
                />
                <span
                  className={`text-sm text-red-600 m-0 pl-2 ${
                    !zipCode && isError ? '' : 'hidden'
                  }`}>
                  Zip Code field is required
                </span>
              </div>
            </label>
            <label className="flex items-start" htmlFor="phoneNumber">
              <span className="mr-2 mt-3">Phone Number:</span>
              <div className="flex flex-col">
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  className={`input-box ${
                    !phoneNumber && isError ? 'red-border' : 'gray-border'
                  } `}
                  value={phoneNumber}
                  onChange={handleChange}
                />
                <span
                  className={`text-sm text-red-600 m-0 pl-2 ${
                    !phoneNumber && isError ? '' : 'hidden'
                  }`}>
                  Phone number field is required
                </span>
              </div>
            </label>

            <div className="flex justify-center">
              <button className="bg-amber-400 rounded-3xl px-5 py-1 my-3">
                {' '}
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
