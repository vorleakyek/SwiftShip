import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../components/AppContext';
import { getShippingInformation } from '../data';

type OrderDetails = {
  orderNumber: number;
  totalAmount: number;
  guestAddress: string;
  guestCity: string;
  guestState: string;
  guestZipCode: number;
  guestEmail: string;
};

export default function OrderConfirmationContent() {
  const { orderID, orderSummary } = useContext(AppContext);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    orderNumber: 0,
    totalAmount: 0,
    guestAddress: '',
    guestCity: '',
    guestState: '',
    guestZipCode: 0,
    guestEmail: '',
  });

  useEffect(() => {
    async function getInfo() {
      const existing = await getShippingInformation(orderID);
      setOrderDetails(existing);
    }

    getInfo();
  }, []);

  const {
    orderNumber,
    totalAmount,
    guestAddress,
    guestCity,
    guestState,
    guestZipCode,
    guestEmail,
  } = orderDetails;

  return (
    <div className="max-w-5xl m-5">
      <div>
        <div>
          <h1 className="font-bold">Thank you for your order</h1>
        </div>
        <div className="m-3">
          <p className="text-sm">
            An email confirmation has been sent to {guestEmail}.
          </p>
        </div>
        <div className=" text-sm flex justify-center">
          <div className="border border-current text-left flex-2 px-5">
            <p className="pt-3">Order number: {orderNumber}</p>
            <p className="pt-2">Order total: ${totalAmount}</p>
            <p className="pt-2">
              Deliver by: {orderSummary.earlyDeliveryDate} -{' '}
              {orderSummary.lateDeliveryDate}
            </p>
            <div className="flex pt-2 mb-3">
              <span className="inline m-0">Delivery Address: </span>
              <div className="inline-block ml-1">
                {guestAddress},
                <span className="m-0">
                  {guestCity}, {guestState} {guestZipCode}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
