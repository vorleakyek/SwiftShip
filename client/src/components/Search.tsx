import { FaSearch } from 'react-icons/fa';

export default function Search() {
  return (
    <div className="mt-2">
      <form className="flex justify-center">
        <input
          className="w-3/4 focus:outline-none pl-1 "
          type="text"
          placeholder="Search"
        />
        <div className="bg-amber-300 p-1">
          <button className="align-middle">
            <FaSearch className="seach-icon text-xl" />
          </button>
        </div>
      </form>
    </div>
  );
}
