import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getItem, type Item } from '../data';

export const ItemPage = () => {
  const { itemID } = useParams();
  const [item, setItem] = useState<Item>();

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
  const { name, imageUrl, description } = item;

  return (
    <div className="max-w-5xl my-5">
      <p className="text-left">back</p>
      <h1 className="font-medium py-5">{name}</h1>
      <div>
        <img className="mx-auto" src={imageUrl} alt={name} />
        <div>
          <div>
            <span>-20%</span> Now $15.99 was $19.99{' '}
          </div>
        </div>
      </div>
      <div className="pt-5">
        <p className="text-left">
          <span className="font-medium text-left">Description:</span>
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
      <button className="bg-amber-400 rounded-3xl px-5 py-1 my-3">
        Add to Cart
      </button>
    </div>
  );
};

export default ItemPage;
