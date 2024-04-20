import YellowButton from '../components/YellowButton';
import { FiEye } from 'react-icons/fi';
// import { FiEyeOff } from "react-icons/fi";

export default function GuestCheckoutPage() {
  return (
    <div className="my-5 max-w-5xl border p-8 border-slate-400">
      <button className="px-10 py-1 rounded-md border border-slate-500">
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
              className="absolute top-0 left-0 -mt-4 ml-2 bg-white px-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border border-slate-500 px-2 py-1 w-full"
            />
          </div>
          <div className="mt-5 relative">
            <label htmlFor="email" className="hidden">
              Password
            </label>
            <input
              type="email"
              id="email"
              placeholder="Password"
              className="border border-slate-500 px-2 py-1 w-full"
            />
            <div className="absolute top-2 right-0 mr-2 text-sm">
              <FiEye className="text-lg" />{' '}
            </div>
          </div>
        </form>
      </div>

      <YellowButton
        content="Sign In"
        handleClick={() => console.log('click')}
      />
    </div>
  );
}
//https://dev.to/annaqharder/hideshow-password-in-react-513a example
