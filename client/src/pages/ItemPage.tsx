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
    <div>
      <h1>{name}</h1>
      <div>
        <img src={imageUrl} alt={name} />
      </div>
      <div>
        <h2>Description:</h2>
        <p>{description} </p>
      </div>
      <div>
        <select name="quantityOfItem" defaultValue="oneItem">
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
    </div>
  );
};

export default ItemPage;
