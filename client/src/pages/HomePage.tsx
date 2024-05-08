import { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import { RegularItem } from '../components/RegularItem';
import { SaleItem } from '../components/SaleItem';
import { getProducts, type Item } from '../data';
import { FaAngleUp } from 'react-icons/fa6';

export default function HomePage() {
  const [products, setProducts] = useState<Item[]>();
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      const products = await getProducts();
      setProducts(products);
    }

    const products = fetchProducts();
    console.log(products);
  }, []);

  function handleCloseButton() {
    setIsHidden(true);
  }

  function handleChatBot() {
    console.log('chatbot');
  }

  return (
    <div className="max-w-5xl my-auto relative">
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
      <div className="fixed bottom-5 right-3">
        <div>
          <div className={`chatDiv ${isHidden ? 'hidden' : ''}`}>
            <p className="mt-2 mr-2">Have a questions?</p>
            <p>Let's chat!</p>
            <button
              className="bg-slate-200 rounded-full m-1 px-1 absolute top-0 right-0 text-xs"
              onClick={() => {
                handleCloseButton();
              }}>
              X
            </button>
          </div>
          <div>
            <button
              className="bg-cyan-600 text-white font-bold px-10 py-1 rounded-lg"
              onClick={handleChatBot}>
              Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
