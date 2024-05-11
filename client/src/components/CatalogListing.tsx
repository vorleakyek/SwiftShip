import { Link } from 'react-router-dom';

export default function CatalogListing({ setCategory }) {
  const arrayList = [
    'Books',
    'Clothes',
    'PetSupplies',
    'Kitchens',
    'Toys',
    'Games',
  ];
  return (
    <div className="w-11/12 m-auto">
      <ul className="text-neutral-100 flex justify-around pt-2">
        {arrayList.map((item) => (
          <li key={item}>
            <Link onClick={() => setCategory(item)} to={`/${item}`}>
              {item === 'PetSupplies' ? 'Pet Supplies' : item}{' '}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
