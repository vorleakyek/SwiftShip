import YellowButton from '../components/YellowButton';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function GuestCheckoutPage() {
  const [isHidden, setIsHidden] = useState(true);

  const navigate = useNavigate();
  return (
    <div className="my-5 max-w-5xl border p-8 border-slate-400">
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

      <div className="my-5">
        <form>
          <div className="relative">
            <label
              htmlFor="email"
              className="absolute top-0 left-0 -mt-4 ml-2 bg-white px-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border border-slate-500 py-1 w-full bg-white px-2"
              required
            />
          </div>
          <div className="mt-5 relative">
            <label htmlFor="password" className="hidden">
              Password
            </label>
            <input
              type={isHidden ? 'password' : 'text'}
              id="password"
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

          <div className="text-right pt-2">Create Account</div>

          <YellowButton
            content="Sign In"
            handleClick={() => console.log('click')}
          />
        </form>
      </div>
    </div>
  );
}
