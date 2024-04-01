import React from 'react';

interface SaleItemProps {
  data: {
    imageUrl: string;
    name: string;
    percent_off: number;
  };
}

export const SaleItem: React.FC<SaleItemProps> = ({ data }: SaleItemProps) => {
  const { imageUrl: src, name: alt, percent_off: percentOff } = data;
  return (
    // <div className = 'flex flex-row justify-between'>
    <div className="basis-1/2 md:basis-1/3 lg:basis-1/4 text-sm pb-5">
      <img className="p-3" src={src} alt={alt} />
      <p className="font-semibold">
        {' '}
        <span className="sale-tag inline text-neutral-100 p-1">
          {percentOff}% off{' '}
        </span>
        <span className="m-3 inline text-rose-500">Limited Time</span>
      </p>
    </div>
    // </div>
  );
};
