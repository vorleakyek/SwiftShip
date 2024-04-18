import { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import { RegularItem } from '../components/RegularItem';
import { SaleItem } from '../components/SaleItem';
import { getProducts, type Item } from '../data';
import { FaAngleUp } from 'react-icons/fa6';

export default function HomePage() {
  const [products, setProducts] = useState<Item[]>();

  useEffect(() => {
    async function fetchProducts() {
      const products = await getProducts();
      setProducts(products);
    }

    const products = fetchProducts();
    console.log(products);
  }, []);

  return (
    <div className="max-w-5xl my-auto">
      {products && <Carousel data={products} />}
      <hr className="max-w-5xl" />
      <div>
        <p className="text-left font-medium py-3">Deals for you</p>
        <div className="flex flex-row justify-between flex-wrap items-center">
          {products?.map((item) => (
            <SaleItem data={item} key={item.itemID} />
          ))}
        </div>
      </div>
      <hr className="max-w-5xl" />
      <div>
        <p className="text-left font-medium py-3">
          Inspired by your shopping trends
        </p>
        <div className="flex flex-row justify-between flex-wrap items-center">
          {products?.map((item) => (
            <RegularItem key={item.itemID} data={item} />
          ))}
        </div>
      </div>
      <div className="bg-neutral-300 p-2">
        <p>
          <FaAngleUp className="inline" />
          <span className="inline">Back to top</span>
        </p>
      </div>
    </div>
  );
}
