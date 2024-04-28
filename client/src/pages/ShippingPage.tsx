import { Link, useNavigate } from 'react-router-dom';
import { useState, FormEvent } from 'react';
import { states } from '../data';

export default function ShippingPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    phoneNumber: '',
    selectedState: '',
  });
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();
  let displayClass = 'hidden';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const displayMessage = (formData) => {
    if (formData.firstName === '' && isError) {
      displayClass = '';
    }

    return displayClass;
  };

  displayClass = displayMessage(formData.firstName);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (formData.firstName === '') {
      setIsError(true);
    }

    if (!isError) {
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
        console.log(shippingInfo);
      } catch (err) {
        alert(`Error registering user: ${err}`);
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
                    formData.firstName === '' ? 'border-red-500' : ''
                  }`}
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <span
                  className={`text-sm text-red-600 m-0 pl-2 ${displayClass}`}>
                  Name field is required
                </span>
              </div>
            </label>

            <label className="block">
              Last Name:
              <input
                name="lastName"
                type="text"
                className="input-box"
                value={formData.lastName}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Street Address:
              <input
                name="address"
                type="text"
                className="input-box"
                value={formData.address}
                onChange={handleChange}
              />
            </label>

            <label className="block">
              State:
              <select
                name="state"
                value={formData.selectedState}
                onChange={handleChange}
                className="input-box">
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              City:
              <input
                name="city"
                type="text"
                className="input-box"
                value={formData.city}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Zip Code:
              <input
                name="zipCode"
                type="number"
                className="input-box"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </label>
            <label className="block">
              Phone Number:
              <input
                name="phoneNumber"
                type="tel"
                className="input-box"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
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
