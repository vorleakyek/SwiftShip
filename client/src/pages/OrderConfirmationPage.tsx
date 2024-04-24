import YellowButton from '../components/YellowButton';
import ReactDOMServer from 'react-dom/server';
import { useNavigate } from 'react-router-dom';
import OrderConfirmationContent from '../components/OrderConfirmationContent';

export default function OrderConfirmationPage() {
  const navigate = useNavigate();

  function handlePrint() {
    // Open a new window
    const printWindow = window.open('', '_blank');

    const content = (
      <div>
        <OrderConfirmationContent />
      </div>
    );

    // Convert JSX element to string
    const contentString = ReactDOMServer.renderToString(content);

    // Write content to the new window
    printWindow?.document.write(contentString);

    // Focus the new window
    printWindow?.focus();
  }
  return (
    <div>
      <OrderConfirmationContent />
      <YellowButton content="Print" handleClick={handlePrint} />
      <YellowButton content="Back to HOME" handleClick={() => navigate('/')} />
    </div>
  );
}
