import { ItemInCart } from '../pages/ItemPage';

interface ItemsInCartProps {
  itemsInCart: ItemInCart[];
}

export default function OrderSummary({ itemsInCart }: ItemsInCartProps) {
  let price = 0;
  let totalItems = 0;

  itemsInCart.map((itemInCart) => {
    price = price + itemInCart.itemQuantity * itemInCart.salePrice;
    totalItems = totalItems + itemInCart.itemQuantity;
  });
  const tax = price * 0.1;
  const total = price + tax;

  return (
    <div className="flex">
      <div className="text-left">
        <h3 className="pl-3 font-semibold">Order Summary</h3>
        <div className="pl-10">
          <p>Items: {totalItems}</p>
          <p>Price: ${price.toFixed(2)}</p>
          <p>Tax: ${tax.toFixed(2)}</p>
          <p>Shipping: Free</p>
          <p>Total: ${total.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
