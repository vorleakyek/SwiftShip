import { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import { RegularItem } from '../components/RegularItem';
import { SaleItem } from '../components/SaleItem';
import { getProducts, type Item } from '../data';
import { FaAngleUp } from 'react-icons/fa6';

import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from '../bot/config';
import MessageParser from '../bot/MessageParser';
import ActionProvider from '../bot/ActionProvider';

export default function HomePage() {
  const [products, setProducts] = useState<Item[]>();
  const [isHidden, setIsHidden] = useState(false);
  const [openChatBot, setOpenChatBot] = useState(false);

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
    setIsHidden(true);
    setOpenChatBot(true);
    console.log('chatbot');
  }

  const displayChatBot = openChatBot ? (
    <div className="relative">
      <Chatbot
        config={config as any}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
      <div className="absolute top-2 right-5 bg-red-600 px-3 text-white font-semibold rounded-md">
        <button onClick={() => setOpenChatBot(false)}>End</button>
      </div>
    </div>
  ) : (
    <div>
      <button
        className="bg-cyan-600 text-white font-bold px-10 py-1 rounded-lg"
        onClick={handleChatBot}>
        Chat
      </button>
    </div>
  );

  const randomProductsList = (products: Item[]) => {
    const array: Item[] = [];

    for (let i = 0; i < 5; i++) {
      const randomNumber = Math.floor(
        Math.random() * (products.length - 1) + 1
      );
      array.push(products[randomNumber]);
    }
    console.log(array);
    return array;
  };

  function handleBackToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <div className="max-w-5xl my-auto relative">
      {products && <Carousel data={randomProductsList(products)} />}
      <hr className="max-w-5xl" />
      <div>
        <p className="text-left font-medium py-3">Deals for you</p>
        <div className="flex flex-row flex-wrap items-center">
          {products?.map(
            (item) =>
              item.currentlyOnSale && <SaleItem data={item} key={item.itemID} />
          )}
        </div>
      </div>
      <hr className="max-w-5xl" />
      <div>
        <p className="text-left font-medium py-3">
          Inspired by your shopping trends
        </p>
        <div className="flex flex-row flex-wrap items-center">
          {products?.map(
            (item) =>
              !item.currentlyOnSale && (
                <RegularItem key={item.itemID} data={item} />
              )
          )}
        </div>
      </div>
      <div className="bg-neutral-300 p-2">
        <button onClick={handleBackToTop}>
          <FaAngleUp className="inline" />
          <span className="inline">Back to top</span>
        </button>
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
          {displayChatBot}
        </div>
      </div>
    </div>
  );
}
