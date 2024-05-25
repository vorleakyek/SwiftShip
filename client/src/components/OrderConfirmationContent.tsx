import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../components/AppContext';
import { getShippingInformation, getUserOrderInfo } from '../data';

type OrderDetails = {
  orderNumber: number;
  totalAmount: number;
  address: string;
  city: string;
  state: string;
  zipCode: number;
  email: string;
};

export default function OrderConfirmationContent() {
  const { orderID, orderSummary, user } = useContext(AppContext);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({
    orderNumber: 0,
    totalAmount: 0,
    address: '',
    city: '',
    state: '',
    zipCode: 0,
    email: '',
  });

  useEffect(() => {
    async function getInfo() {
      const existing = await getShippingInformation(orderID);
      const {
        orderNumber,
        totalAmount,
        guestAddress,
        guestCity,
        guestState,
        guestZipCode,
        guestEmail,
      } = existing;
      setOrderDetails({
        orderNumber: orderNumber,
        totalAmount: totalAmount,
        address: guestAddress,
        city: guestCity,
        state: guestState,
        zipCode: guestZipCode,
        email: guestEmail,
      });
    }

    async function getLoginUserInfo() {
      const loginUser = await getUserOrderInfo(user.userID);
      console.log('loginUserInfo', loginUser);
      setOrderDetails(loginUser);
    }

    if (!user) {
      getInfo();
    } else {
      getLoginUserInfo();
    }
  }, []);

  const { orderNumber, totalAmount, address, city, state, zipCode, email } =
    orderDetails;

  return (
    <div className="max-w-5xl m-5">
      <div>
        <div>
          <h1 className="font-bold">Thank you for your order</h1>
        </div>
        <div className="m-3">
          <p className="text-sm">
            An email confirmation has been sent to {email}.
          </p>
        </div>
        <div className=" text-sm flex justify-center">
          <div className="border border-current text-left flex-2 px-5">
            <p className="pt-3">Order number: {orderNumber}</p>
            <p className="pt-2">
              Order total: ${Number(totalAmount).toFixed(2)}
            </p>
            <p className="pt-2">
              Deliver by: {orderSummary.earlyDeliveryDate} -{' '}
              {orderSummary.lateDeliveryDate}
            </p>
            <div className="flex pt-2 mb-3">
              <span className="inline m-0">Delivery Address: </span>
              <div className="inline-block ml-1">
                {address},
                <span className="m-0">
                  {city}, {state} {zipCode}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
