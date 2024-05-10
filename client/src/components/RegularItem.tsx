import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface RegularItemProps {
  data: {
    itemID: number;
    imageUrl: string;
    name: string;
    originalPrice: number;
  };
}

export const RegularItem: React.FC<RegularItemProps> = ({
  data,
}: RegularItemProps) => {
  const navigate = useNavigate();
  const { itemID, imageUrl, name, originalPrice } = data;
  return (
    <Link
      to={`/products/${itemID}`}
      className="basis-1/2 md:basis-1/3 lg:basis-1/4 text-sm pb-5">
      <img
        className="p-3"
        src={imageUrl}
        alt={name}
        onClick={() => navigate('/')}
      />
      <p className=" font-semibold">{name}</p>
      <p className="font-bold">${originalPrice}</p>
    </Link>
  );
};
