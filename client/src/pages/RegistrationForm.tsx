import { type FormEvent, ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { states } from '../data';

export function RegistrationForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    phoneNumber: '',
    selectedState: '',
    email: '',
    password: '',
  });

  const {
    firstName,
    lastName,
    address,
    city,
    zipCode,
    phoneNumber,
    selectedState,
    email,
    password,
  } = formData;

  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

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

      try {
        const req = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        };
        const res = await fetch('/api/auth/registration', req);
        if (!res.ok) {
          alert('error');
          throw new Error(`fetch Error ${res.status}`);
        }
        const shippingInfo = await res.json();
        shippingInfo && navigate('/guest-checkout');
      } catch (err) {
        alert(`Error registering user: ${err}`);
      }
    }
  }

  return (
    <div className="max-w-5xl text-left mt-2">
      <h1 className="font-semibold my-3 text-lg">Registration</h1>
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
                  onChange={handleChange}
                />
                <span
                  className={`text-sm text-red-600 m-0 pl-2 ${
                    !email && isError ? '' : 'hidden'
                  }`}>
                  Email field is required
                </span>
              </div>
            </label>

            <label className="flex items-start" htmlFor="password">
              <span className="mr-2 mt-3">Password:</span>
              <div className="flex flex-col">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className={`input-box ${
                    !password && isError ? 'red-border' : 'gray-border'
                  } `}
                  value={password}
                  onChange={handleChange}
                />
                <span
                  className={`text-sm text-red-600 m-0 pl-2 ${
                    !password && isError ? '' : 'hidden'
                  }`}>
                  Password field is required
                </span>
              </div>
            </label>

            <div className="flex justify-center">
              <button className="bg-amber-400 rounded-3xl px-5 py-1 my-3">
                {' '}
                Sign-Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
