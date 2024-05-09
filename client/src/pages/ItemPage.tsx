import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getItem, type Item } from '../data';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import ItemAdded from '../components/ItemAddedModal';
import { getLocalStorageItems, calculateOrderSummary } from '../data';
import { AppContext } from '../components/AppContext';

export type ItemInCart = Item & {
  itemQuantity: number;
};

export const ItemPage = ({ setItemsInCart, setOrderSummary }) => {
  const { itemID } = useParams();
  const [item, setItem] = useState<Item>();
  const [showAddedItem, setShowAddedItem] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { itemsInCart } = useContext(AppContext);

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

  useEffect(() => {
    const updateOrderSummary = calculateOrderSummary(itemsInCart);
    setOrderSummary(updateOrderSummary);
  }, [itemsInCart]);

  if (!item) return null;
  const { name, imageUrl, description, percentOff, originalPrice, salePrice } =
    item;

  function handleAddToCartClick(item: Item, quantity: number) {
    setShowAddedItem(true);

    const itemsAddedInCart = getLocalStorageItems();

    if (!itemsAddedInCart) {
      const addedItems: ItemInCart[] = [];
      const addedItem: ItemInCart = { ...item, itemQuantity: quantity };
      addedItems.push(addedItem);
      localStorage.setItem('itemsInCart', JSON.stringify(addedItems));
      setItemsInCart([addedItem]);
    } else {
      let isFound = false;
      itemsAddedInCart.map((itemAdded) => {
        if (itemAdded.itemID === item.itemID) {
          itemAdded['itemQuantity'] = quantity;
          isFound = true;
          localStorage.setItem('itemsInCart', JSON.stringify(itemsAddedInCart));
          setItemsInCart(itemsAddedInCart);
          return;
        }
      });

      if (!isFound) {
        const addedItem: ItemInCart = { ...item, itemQuantity: quantity };
        const addedItems: ItemInCart[] = [...itemsAddedInCart, addedItem];
        localStorage.setItem('itemsInCart', JSON.stringify(addedItems));
        setItemsInCart(addedItems);
      }
    }
  }

  const salePriceJSX = (
    <div className="flex items-center justify-center">
      <div>
        <p className="text-red-600 font-semibold pr-5">-{percentOff}%</p>
      </div>
      <div>
        <p className="text-slate-700">Now ${salePrice}</p>
        <p className="text-xs text-slate-600">
          Was
          <span className="line-through text-xs inline">${originalPrice}</span>
        </p>
      </div>
    </div>
  );

  const regularPriceJSX = (
    <div className="mt-2">
      <p>
        Price: <span className="font-bold inline">${originalPrice}</span>{' '}
      </p>
    </div>
  );

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
        {item.currentlyOnSale ? salePriceJSX : regularPriceJSX}
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
          onChange={(e) => setSelectedQuantity(Number(e.target.value))}>
          <option value={1}>Quantity: 1</option>
          <option value={2}>Quantity: 2</option>
          <option value={3}>Quantity: 3</option>
          <option value={4}>Quantity: 4</option>
          <option value={5}>Quantity: 5</option>
          <option value={6}>Quantity: 6</option>
          <option value={7}>Quantity: 7</option>
          <option value={8}>Quantity: 8</option>
          <option value={9}>Quantity: 9</option>
          <option value={10}>Quantity: 10</option>
        </select>
      </div>
      <button
        className="bg-amber-400 rounded-3xl px-5 py-1 my-3"
        onClick={() => handleAddToCartClick(item, selectedQuantity)}>
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
