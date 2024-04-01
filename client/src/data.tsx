export type Item = {
  itemId: number;
  name: string;
  description: string;
  imageUrl: string;
  originalPrice: number;
  status: string;
  salePrice: number;
  percent_off: number;
};

export const products: Item[] = [
  {
    itemId: 1,
    name: 'Havest Moon Guide',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: '/images/HarvestMoon.jpg',
    originalPrice: 20,
    status: 'avaliable',
    salePrice: 10,
    percent_off: 50,
  },
  {
    itemId: 2,
    name: 'Lego Parrot Creator 3 in 1',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: '/images/legoParrot.jpg',
    originalPrice: 20,
    status: 'avaliable',
    salePrice: 10,
    percent_off: 50,
  },
  {
    itemId: 3,
    name: 'TypeScript Textbook',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: '/images/ReactTypeScriptBook.jpg',
    originalPrice: 20,
    status: 'avaliable',
    salePrice: 10,
    percent_off: 50,
  },
  {
    itemId: 4,
    name: 'Havest Moon Guide',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    imageUrl: '/images/HarvestMoon.jpg',
    originalPrice: 20,
    status: 'avaliable',
    salePrice: 10,
    percent_off: 50,
  },
];
