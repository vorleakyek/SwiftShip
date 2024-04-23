import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { states } from '../data';

export default function ShippingPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedState, setSelectedState] = useState('');

  const navigate = useNavigate();

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
          <form
            onSubmit={() => {
              navigate('/payment');
            }}>
            <label className="block">
              First Name:
              <input
                type="text"
                className="input-box"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label className="block">
              Last Name:
              <input
                type="text"
                className="input-box"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label className="block">
              Street Address:
              <input
                type="text"
                className="input-box"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>

            <label className="block">
              State:
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="input-box">
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.value} value="state.value">
                    {state.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              City:
              <input
                type="text"
                className="input-box"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
            <label className="block">
              Zip Code:
              <input
                type="number"
                className="input-box"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </label>
            <label className="block">
              Phone Number:
              <input
                type="tel"
                className="input-box"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
