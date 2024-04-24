export default function OrderConfirmationContent() {
  return (
    <div className="max-w-5xl m-5">
      <div>
        <div>
          <h1 className="font-bold">Thank you for your order</h1>
        </div>
        <div className="m-3">
          <p className="text-sm">
            An email confirmation has been sent to ____.
          </p>
        </div>
        <div className=" text-sm flex justify-center">
          <div className="border border-current text-left flex-2 px-5">
            <p className="pt-3">Order number: 7ADJ651PL</p>
            <p className="pt-2">Order total: $216.59</p>
            <p className="pt-2">Deliver by: April 27, 2024</p>
            <p className="pt-2 pb-3">Delivery Address: </p>
          </div>
        </div>
      </div>
    </div>
  );
}
