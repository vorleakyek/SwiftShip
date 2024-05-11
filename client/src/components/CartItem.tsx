import { BsTrash } from 'react-icons/bs';
import { HiMiniMinusSmall, HiPlusSmall } from 'react-icons/hi2';
import { useEffect, useState, useContext } from 'react';
import { type ItemInCart } from '../pages/ItemPage';
import { updateLocalStorageItemQuantity } from '../data';
import { type OrderSummary, AppContext } from './AppContext';
import ItemRow from '../components/ItemRow';

interface CartItemProps {
  item: ItemInCart;
  setIsUpdated: (boolean) => void;
  setOrderSummary: React.Dispatch<React.SetStateAction<OrderSummary>>;
}

export default function CartItem({ item, setIsUpdated }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.itemQuantity);
  const { itemsInCart } = useContext(AppContext);

  useEffect(() => {
    updateLocalStorageItemQuantity(item, itemsInCart, quantity);
    setIsUpdated((prev) => !prev);
  }, [quantity]);

  function handleMinus() {
    setQuantity(quantity - 1);
  }

  function handlePlus() {
    setQuantity(quantity + 1);
  }

  function handleRemoveItem(removeItem: ItemInCart) {
    const updatedItemsInCart = itemsInCart.filter(
      (itemInCart) => itemInCart.itemID !== removeItem.itemID
    );

    localStorage.setItem('itemsInCart', JSON.stringify(updatedItemsInCart));
    setIsUpdated((prev) => !prev);
  }

  const isDisabledMinus = quantity === 1;
  const isDisabledPlus = quantity === 10;

  return (
    <>
      <ItemRow item={item} />
      <div className="flex px-5 ">
        <div className="basis-1/2 text-left">
          <button>
            <BsTrash onClick={() => handleRemoveItem(item)} />
          </button>
        </div>
        <div className="basis-1/2 text-right flex justify-end text-xl">
          <button
            disabled={isDisabledMinus}
            className={isDisabledMinus ? 'text-slate-400' : ''}
            onClick={handleMinus}>
            <HiMiniMinusSmall />
          </button>
          <div className="px-2">{quantity}</div>
          <button
            disabled={isDisabledPlus}
            className={isDisabledPlus ? 'text-slate-400' : ''}
            onClick={handlePlus}>
            <HiPlusSmall />
          </button>
        </div>
      </div>
      <hr />
    </>
  );
}
