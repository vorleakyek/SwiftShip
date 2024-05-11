import { useEffect, useState } from 'react';
import { type Item, getSpecificProducts } from '../data';
import ItemRow from '../components/ItemRow';

export default function BookPage({ category }: { category: string }) {
  const [dataArray, setDataArray] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchDataArray(category: string) {
      try {
        const result = await getSpecificProducts(category);
        setDataArray(result);
      } catch (err) {
        console.error(err);
      }
    }

    fetchDataArray(category);
  }, [category]);

  return (
    <div className="max-w-5xl">
      <h1 className="font-bold text-xl text-left ml-5 mt-3 text-slate-800">
        {category === 'PetSupplies' ? 'Pet Supplies' : category}
      </h1>
      {dataArray.map((item) => (
        <ItemRow key={item.itemID} item={item} />
      ))}
    </div>
  );
}
