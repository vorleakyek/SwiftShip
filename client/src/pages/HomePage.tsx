import Carousel from '../components/Carousel';
import { SaleItem } from '../components/SaleItem';
import { products } from '../data';
export default function Homepage() {
  return (
    <div className="max-w-5xl">
      <Carousel data={products} />
      <hr className="max-w-5xl" />
      <div>
        <p className="text-left font-medium py-3">Deals for you</p>
        <div className="flex flex-row justify-between flex-wrap items-center">
          {products.map((item) => (
            <SaleItem key={item.itemId} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
