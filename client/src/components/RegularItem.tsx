import React from 'react';

interface RegularItemProps {
  data: {
    imageUrl: string;
    name: string;
    originalPrice: number;
  };
}

export const RegularItem: React.FC<RegularItemProps> = ({
  data,
}: RegularItemProps) => {
  const { imageUrl, name, originalPrice } = data;
  return (
    <div className="basis-1/2 md:basis-1/3 lg:basis-1/4 text-sm pb-5">
      <img className="p-3" src={imageUrl} alt={name} />
      <p>{name}</p>
      <p>${originalPrice}</p>
    </div>
  );
};
