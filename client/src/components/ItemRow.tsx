import { Link } from 'react-router-dom';
import { type ItemInCart } from '../pages/ItemPage';
import { type Item } from '../data';

export default function ItemRow({ item }: { item: ItemInCart | Item }) {
  const displayPrice = item.currentlyOnSale ? (
    <p className="text-xs">
      <span className="inline text-base text-rose-500 font-medium">
        ${item.salePrice}
      </span>{' '}
      was <span className="inline line-through">${item.originalPrice}</span>
    </p>
  ) : (
    <p>${item.originalPrice.toFixed(2)}</p>
  );

  return (
    <div className="flex justify-center my-5 ">
      <div className="basis-1/4 flex">
        <Link to={`/products/${item.itemID}`}>
          <img src={item.imageUrl} alt={item.name} className="w-10/12" />
        </Link>
      </div>
      <div className="basis-2/4">
        <div className="text-left ml-5">
          <h2 className="font-medium mb-2 ">{item.name}</h2>
          {displayPrice}
        </div>
      </div>
    </div>
  );
}
