import { useNavigate } from 'react-router-dom';

export default function ItemAdded({ item, quantity, handleCloseButton }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white border-solid border-black border-2 max-w-5xl my-20 relative">
        <button
          className="bg-slate-200 rounded-full px-2 absolute top-0 right-0 m-2"
          onClick={() => {
            handleCloseButton();
          }}>
          X
        </button>
        <div className="text-left pt-5 pl-9 text-xl">
          <p>Item added to Cart</p>
        </div>
        <div className="flex justify-center py-3 px-12 ">
          <div className="basis-1/2 p-3">
            <img src={item.imageUrl} alt={item.name} />
          </div>
          <div className="basis-1/2 pt-5 px-3">
            <p className=" text-xs md:text-lg font-semibold mb-5">
              {item.name}
            </p>
            <p className="text-base text-slate-500">Quantity: {quantity}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div>
            <button
              className="block font-semibold border-solid border-black border rounded-3xl px-5 py-1 my-3"
              onClick={() => navigate('/')}>
              Continue Shopping
            </button>
            <button
              className="bg-amber-400 rounded-3xl px-5 py-1 my-3 font-semibold block"
              onClick={() => navigate('/view-cart')}>
              View Cart & Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
