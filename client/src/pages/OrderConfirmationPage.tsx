import YellowButton from '../components/YellowButton';
import { useNavigate } from 'react-router-dom';
import OrderConfirmationContent from '../components/OrderConfirmationContent';

export default function OrderConfirmationPage({
  setItemsInCart,
  setOrderSummary,
}) {
  const navigate = useNavigate();

  function handleClick() {
    localStorage.setItem('itemsInCart', JSON.stringify([]));
    setItemsInCart([]);
    setOrderSummary({
      totalItems: 0,
      price: '',
      tax: '',
      shippingCost: 0,
      totalAmount: '',
      earlyDeliveryDate: '',
      lateDeliveryDate: '',
    });
    navigate('/');
  }

  return (
    <div>
      <OrderConfirmationContent />
      <YellowButton content="Back to HOME" handleClick={handleClick} />
    </div>
  );
}
