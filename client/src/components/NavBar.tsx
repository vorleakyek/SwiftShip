import { FaCartShopping } from 'react-icons/fa6';
import Search from './Search';
import CatalogListing from './CatalogListing';
import { Outlet, Link, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-blue max-w-5xl p-3">
        <div className="flex flex-row justify-between">
          <Link to={`/`}>
            <h1 className="text-lg text-neutral-100">SwiftShip</h1>
          </Link>
          <div className="flex flex-row">
            <p className="text-base text-neutral-100 mr-2">Sign in</p>
            <button onClick={() => navigate('/view-cart')}>
              <FaCartShopping className="text-2xl text-rose-200" />
            </button>
          </div>
        </div>
        <Search />
        <CatalogListing />
      </div>
      <Outlet />
    </>
  );
}
