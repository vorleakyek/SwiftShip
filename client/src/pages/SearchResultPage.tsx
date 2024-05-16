import { useEffect, useState } from 'react';
import ItemRow from '../components/ItemRow';
import { type Item, getSearchProducts } from '../data';

export default function SearchResultPage({
  searchKeyWords,
}: {
  searchKeyWords: string;
}) {
  const [result, setResult] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchDataArray(searchKeyWords: string) {
      try {
        const result = await getSearchProducts(searchKeyWords);
        setResult(result);
      } catch (err) {
        console.error(err);
      }
    }

    fetchDataArray(searchKeyWords);
  }, [searchKeyWords]);

  const displayResult = (result) => {
    if (result.length === 0) {
      return <div className="p-10 bg-blue-100 mt-3">No Result Found</div>;
    } else {
      return result.map((item) => <ItemRow key={item.itemID} item={item} />);
    }
  };

  return (
    <div className="max-w-5xl">
      <h1 className="font-bold font-xl text-left mt-3 ml-5">Search Result: </h1>
      {displayResult(result)}
    </div>
  );
}
