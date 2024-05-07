import { useEffect, useContext } from 'react';
import { type OrderSummary } from '../components/AppContext';
import { AppContext } from '../components/AppContext';
import { calculateOrderSummary } from '../data';

interface ItemsInCartProps {
  setOrderSummary: React.Dispatch<React.SetStateAction<OrderSummary>>;
}

export default function OrderSummary({ setOrderSummary }: ItemsInCartProps) {
  const { itemsInCart } = useContext(AppContext);
  const { totalItems, price, tax, shippingCost, totalAmount } =
    calculateOrderSummary(itemsInCart);

  useEffect(() => {
    setOrderSummary({
      totalItems,
      price: Number(price.toFixed(2)),
      tax: Number(tax.toFixed(2)),
      shippingCost,
      totalAmount: Number(totalAmount.toFixed(2)),
      earlyDeliveryDate: '',
      lateDeliveryDate: '',
    });
  }, []);

  return (
    <div className="flex pt-3">
      <div className="text-left">
        <h3 className="pl-3 font-semibold pb-2">Order Summary</h3>
        <div className="pl-10 text-sm">
          <p className="pb-1">Items: {totalItems}</p>
          <p className="pb-1">Price: ${price.toFixed(2)}</p>
          <p className="pb-1">Tax: ${tax.toFixed(2)}</p>
          <p className="pb-1">
            Shipping: {shippingCost === 0 ? 'Free' : '$8.99'}
          </p>
          <p className="pb-1">Total: ${totalAmount.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
