import { Link, useNavigate } from 'react-router-dom';

export default function PaymentPage() {
  const navigate = useNavigate();

  function handleSubmit() {
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
                <input type="tel" className="input-box block" />
              </label>
            </div>

            <div className="pt-5">
              <p className="font-semibold">Shipping and billing address</p>
              <div className="pt-3">
                <p>First Last</p>
                <p>Address:</p>
                <p>(xxx) xxx-xxxx</p>
              </div>
            </div>

            <div className="pt-5">
              <p className="font-semibold">Order Contact Information</p>
              <label>
                Email
                <input type="email" className="input-box" />
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
