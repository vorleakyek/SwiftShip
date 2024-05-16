import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="bg-blue max-w-5xl p-3 text-neutral-100 text-left pl-5 text-sm">
      <Link to={'/sign-up'}>Create an account</Link>
      <Link className="block" to={'/view-cart'}>
        Your Orders
      </Link>
      <Link to={'customer-service'}>Customer Service</Link>
    </div>
  );
}
