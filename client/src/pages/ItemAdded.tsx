export default function ItemAdded() {
  return (
    <>
      <div className="border-solid border-black border max-w-5xl">
        <div className="text-left p-3 text-xl">
          <p>Item added to cart</p>
        </div>
        <div className="flex justify-center py-3 px-10 ">
          <div className="basis-1/2">
            <img src="../images/HarvestMoon.jpg" alt="parrots" className="" />
          </div>
          <div className="basis-1/2 pt-5">
            <p className=" text-xl font-semibold mb-5">Lego Creator 3 in 1</p>
            <p className="text-base text-slate-500">Quantity: 2</p>
          </div>
        </div>
        <div>
          <button>Continue Shopping</button>
          <button>View Cart & Checkout</button>
        </div>
      </div>
    </>
  );
}
