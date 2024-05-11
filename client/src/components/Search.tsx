import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Search({ setSearchKeyWords }) {
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    const form = e.target.querySelector('input[type="text"]').value;
    setSearchKeyWords(form);
    navigate('/search-result');
  }
  return (
    <div className="mt-2">
      <form className="flex justify-center" onSubmit={(e) => handleSearch(e)}>
        <input
          className="w-3/4 focus:outline-none pl-1 "
          type="text"
          placeholder="Search"
          name="searchInput"
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
