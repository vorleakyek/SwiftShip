import { FaCartShopping } from 'react-icons/fa6';
import Search from './Search';
import CatalogListing from './CatalogListing';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from './AppContext';

export default function NavBar({ setCategory }) {
  const navigate = useNavigate();
  const { orderSummary } = useContext(AppContext);

  return (
    <>
      <div className="bg-blue max-w-5xl p-3">
        <div className="flex flex-row justify-between">
          <Link to={`/`}>
            <h1 className="text-lg text-neutral-100">SwiftShip</h1>
          </Link>
          <div className="flex flex-row">
            <p className="text-base text-neutral-100 mr-2">Sign in</p>
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
        <Search />
        <CatalogListing setCategory={setCategory} />
      </div>
      <Outlet />
    </>
  );
}
