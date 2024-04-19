import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import ItemPage from '../pages/ItemPage';

interface SaleItemProps {
  data: {
    itemID: number;
    imageUrl: string;
    name: string;
    percentOff: number;
  };
}

export const SaleItem: React.FC<SaleItemProps> = ({ data }: SaleItemProps) => {
  const navigate = useNavigate();
  const { itemID, imageUrl, name, percentOff: percentOff } = data;

  function handleClick() {
    navigate('/');
  }

  return (
    <Link
      to={`/products/${itemID}`}
      className="basis-1/2 md:basis-1/3 lg:basis-1/4 text-sm pb-5">
      <img className="p-3" src={imageUrl} alt={name} onClick={handleClick} />
      <p className="font-semibold">
        {' '}
        <span className="sale-tag inline text-neutral-100 p-1">
          {percentOff}% off{' '}
        </span>
        <span className="m-3 inline text-rose-500">Limited Time</span>
      </p>
    </Link>
  );
};
