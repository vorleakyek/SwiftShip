import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItem, type Item } from '../data';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import ItemAdded from '../components/ItemAddedModal';

export const ItemPage = () => {
  const { itemID } = useParams();
  const [item, setItem] = useState<Item>();
  const [showAddedItem, setShowAddedItem] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState('1');

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

  function handleAddToCartClick(item: Item, quantity: number) {
    setShowAddedItem(true);
    //check if "itemQuanity exist in the localstorage"

    const itemsInCartString = localStorage.getItem('itemsInCart');
    const itemsInCart: string | null = itemsInCartString
      ? JSON.parse(itemsInCartString)
      : null;

    if (!itemsInCart) {
      item['itemQuantity'] = quantity;
      const addedItems = [item];
      localStorage.setItem('itemsInCart', JSON.stringify(addedItems));
    } else {
      //ensure same item should be updated the quanity instead of adding a new obj in the array
      item['itemQuantity'] = quantity;
      const addedItems = [...itemsInCart, item];
      localStorage.setItem('itemsInCart', JSON.stringify(addedItems));
    }
  }

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
          value={selectedQuantity}
          onChange={(e) => setSelectedQuantity(e.target.value)}>
          <option value="1">Quantity: 1</option>
          <option value="2">Quantity: 2</option>
          <option value="3">Quantity: 3</option>
          <option value="4">Quantity: 4</option>
          <option value="5">Quantity: 5</option>
          <option value="6">Quantity: 6</option>
          <option value="7">Quantity: 7</option>
          <option value="8">Quantity: 8</option>
          <option value="9">Quantity: 9</option>
          <option value="10">Quantity: 10</option>
        </select>
      </div>
      <button
        className="bg-amber-400 rounded-3xl px-5 py-1 my-3"
        onClick={() => handleAddToCartClick(item, Number(selectedQuantity))}>
        Add to Cart
      </button>

      {showAddedItem && (
        <>
          <div className="absolute inset-0 bg-zinc-100 opacity-90"></div>
          <div className="fixed inset-0 flex justify-center items-center w-4/6 md:w-6/12 xl:w-2/6 mx-auto">
            <ItemAdded
              item={item}
              quantity={selectedQuantity}
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
