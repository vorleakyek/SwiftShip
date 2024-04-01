import { FaCartShopping } from 'react-icons/fa6';
import Search from './Search';
import CatalogListing from './CatalogListing';

export default function NavBar() {
  return (
    <div className="bg-blue max-w-5xl p-3">
      <div className="flex flex-row justify-between">
        <h1 className="text-lg text-neutral-100">SwiftShip</h1>
        <div className="flex flex-row">
          <p className="text-base text-neutral-100 mr-2">Sign in</p>
          <FaCartShopping className="text-2xl text-rose-200" />
        </div>
      </div>
      <Search />
      <CatalogListing />
    </div>
  );
}
