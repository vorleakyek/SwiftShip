import { FaCartShopping } from 'react-icons/fa6';
import Search from './Search';
import CatalogListing from './CatalogListing';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './AppContext';

export default function NavBar({ setCategory, setSearchKeyWords }) {
  const navigate = useNavigate();
  const { orderSummary, user, handleSignOut } = useContext(AppContext);

  return (
    <>
      <div className="bg-blue max-w-5xl p-3">
        <div className="flex flex-row justify-between">
          <Link to={`/`}>
            <h1 className="text-lg text-neutral-100">SwiftShip</h1>
          </Link>

          <div className="flex flex-row text-neutral-100 ">
            {!user && (
              <Link to={'/guest-checkout'} className="text-base  mr-2">
                Sign in
              </Link>
            )}
            {user && (
              <>
                <div className="pr-1 ">
                  <p>{user.email} |</p>
                </div>
                <Link
                  to={'/'}
                  onClick={handleSignOut}
                  className="text-base  mr-2">
                  Sign out
                </Link>
              </>
            )}
            <button className="relative" onClick={() => navigate('/view-cart')}>
              <FaCartShopping className="mt-1 text-2xl text-rose-200" />
              {orderSummary.totalItems !== 0 && (
                <div className="absolute top-1 right-1 ">
                  <p className="text-red-600 font-bold text-sm">
                    {orderSummary.totalItems}
                  </p>
                </div>
              )}
            </button>
          </div>
        </div>
        <Search setSearchKeyWords={setSearchKeyWords} />
        <CatalogListing setCategory={setCategory} />
      </div>
      <Outlet />
    </>
  );
}
