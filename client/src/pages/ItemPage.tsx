import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItem, type Item } from '../data';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import ItemAdded from './ItemAdded';

export const ItemPage = () => {
  const { itemID } = useParams();
  const [item, setItem] = useState<Item>();
  const [showAddedItem, setShowAddedItem] = useState(false);

  // const navigate = useNavigate();

  useEffect(() => {
    async function fetchItem(itemID: number) {
      try {
        const product = await getItem(itemID);
        setItem(product);
      } catch (err) {
        console.error(err);
      }
    }
    if (itemID) fetchItem(+itemID);
  }, [itemID]);

  if (!item) return null;
  const { name, imageUrl, description, percentOff, originalPrice, salePrice } =
    item;

  return (
    <div className="max-w-5xl my-5 relative ">
      <Link to={`/`}>
        <p className="text-left">
          <IoIosArrowBack className="inline text-slate-300" />
          back
        </p>
      </Link>
      <h1 className="font-medium py-5">{name}</h1>
      <div className="max-w-72 mx-auto">
        <img src={imageUrl} alt={name} />
        <div className="flex items-center justify-center">
          <div>
            <p className="text-red-600 font-semibold pr-5">-{percentOff}%</p>
          </div>
          <div>
            <p className="text-slate-700">Now ${salePrice}</p>
            <p className="text-xs text-slate-600">
              Was
              <span className="line-through text-xs inline">
                ${originalPrice}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <p className="text-left">
          <span className="font-medium text-left ml-0">Description:</span>
          {description}
        </p>
      </div>
      <div className="pt-5">
        <select
          className="bg-zinc-100 p-2"
          name="quantityOfItem"
          defaultValue="oneItem">
          <option value="oneItem">Quantity: 1</option>
          <option value="twoItem">Quantity: 2</option>
          <option value="threeItem">Quantity: 3</option>
          <option value="fourItem">Quantity: 4</option>
          <option value="fiveItem">Quantity: 5</option>
          <option value="sixItem">Quantity: 6</option>
          <option value="sevenItem">Quantity: 7</option>
          <option value="eightItem">Quantity: 8</option>
          <option value="nineItem">Quantity: 9</option>
          <option value="tenItem">Quantity: 10</option>
        </select>
      </div>
      <button
        className="bg-amber-400 rounded-3xl px-5 py-1 my-3"
        onClick={() => setShowAddedItem(true)}>
        Add to Cart
      </button>

      {showAddedItem && (
        <>
          <div className="absolute inset-0 bg-zinc-100 opacity-90"></div>
          <div className="absolute top-0">
            <ItemAdded
              item={item}
              handleCloseButton={() => {
                setShowAddedItem(false);
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ItemPage;
