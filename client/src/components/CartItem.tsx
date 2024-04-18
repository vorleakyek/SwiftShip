import { BsTrash } from 'react-icons/bs';
import { HiMiniMinusSmall, HiPlusSmall } from 'react-icons/hi2';
import { useState } from 'react';

export default function CartItem() {
  const [quantity, setQuantity] = useState(1);

  function handleMinus() {
    setQuantity(quantity - 1);
  }

  function handlePlus() {
    setQuantity(quantity + 1);
  }

  const isDisabledMinus = quantity === 1;
  const isDisabledPlus = quantity === 10;

  return (
    <>
      <div className="flex justify-center my-5 ">
        <div className="basis-1/4 flex">
          <img
            src="../../images/legoParrot.jpg"
            alt="parrot"
            className="w-10/12"
          />
        </div>
        <div className="basis-2/4">
          <div className="text-left ml-5">
            <h2 className="font-medium mb-2 ">Lego Parrot</h2>
            <p className="text-xs">
              <span className="inline text-base text-rose-500 font-medium">
                $15.99
              </span>{' '}
              was <span className="inline line-through">$19.99</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex px-5 ">
        <div className="basis-1/2 text-left">
          <button>
            <BsTrash />
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