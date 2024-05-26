import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import { type ChangeEvent, useState, useEffect, useContext } from 'react';
import { AppContext } from '../components/AppContext';

export default function GuestCheckoutPage({
  showGuestCheckOut,
  setShowGuestCheckOut,
}) {
  const [isHidden, setIsHidden] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { handleSignIn } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    setShowGuestCheckOut(showGuestCheckOut);
    return () => {
      setShowGuestCheckOut(false);
    };
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

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const req = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      };
      const res = await fetch('/api/auth/sign-in', req);
      if (!res.ok) {
        alert('error');
        throw new Error(`fetch Error ${res.status}`);
      }
      const shippingInfo = await res.json();
      // setOrderID(shippingInfo.orderID);

      console.log('shippingInfo', shippingInfo);
      handleSignIn(shippingInfo);

      shippingInfo && navigate('/');
    } catch (err) {
      console.error(`Error registering user: ${err}`);
    }
  }

  return (
    <div className=" max-w-5xl border p-8 border-slate-400">
      {showGuestCheckOut && (
        <>
          <button
            className="px-10 py-1 rounded-md border border-slate-500"
            onClick={() => {
              navigate('/shipping');
            }}>
            Continue as Guest
          </button>

          <div className="flex items-center justify-center mt-3">
            <div className="basis-1/2 border-b-2"></div>
            <div className="mx-3">or</div>
            <div className="basis-1/2 border-b-2"></div>
          </div>
        </>
      )}

      <div className="my-5 flex justify-center">
        <div className="basis-full sm:basis-1/2">
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <label
                htmlFor="email"
                className="absolute top-0 left-0 -mt-4 ml-2 bg-white px-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border border-slate-500 py-1 w-full bg-white px-2"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mt-5 relative">
              <label htmlFor="password" className="hidden">
                Password
              </label>
              <input
                type={isHidden ? 'password' : 'text'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="border border-slate-500 px-2 py-1 w-full"
                required
              />
              <div className="absolute top-1 right-0 mr-2 text-sm">
                <span
                  onClick={() => {
                    setIsHidden(!isHidden);
                  }}>
                  {isHidden ? (
                    <FiEyeOff className="text-lg" />
                  ) : (
                    <FiEye className="text-lg" />
                  )}
                </span>
              </div>
            </div>

            <div className="text-right pt-2">
              <Link className="text-sky-800 font-semibold" to={'/sign-up'}>
                Create Account
              </Link>
            </div>

            <button className="bg-amber-400 rounded-3xl px-5 py-1 my-3">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
