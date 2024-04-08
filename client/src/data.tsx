export type Item = {
  itemID: number;
  name: string;
  description: string;
  imageUrl: string;
  originalPrice: number;
  status: string;
  salePrice: number;
  percentOff: number;
  currentlyOnSale: boolean;
};

export async function getProducts(): Promise<Item[]> {
  const req = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
    },
  };
  const res = await fetch('api/products', req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function getItem(itemID: number): Promise<Item> {
  const req = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
    },
  };
  const res = await fetch(`/api/products/${itemID}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

// export const products: Item[] = [
//   {
//     itemId: 1,
//     name: 'Havest Moon Guide',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     imageUrl: '/images/HarvestMoon.jpg',
//     originalPrice: 20,
//     status: 'avaliable',
//     salePrice: 10,
//     percent_off: 50,
//   },
//   {
//     itemId: 2,
//     name: 'Lego Parrot Creator 3 in 1',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     imageUrl: '/images/legoParrot.jpg',
//     originalPrice: 20,
//     status: 'avaliable',
//     salePrice: 10,
//     percent_off: 50,
//   },
//   {
//     itemId: 3,
//     name: 'TypeScript Textbook',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     imageUrl: '/images/ReactTypeScriptBook.jpg',
//     originalPrice: 20,
//     status: 'avaliable',
//     salePrice: 10,
//     percent_off: 50,
//   },
//   {
//     itemId: 4,
//     name: 'Havest Moon Guide',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     imageUrl: '/images/HarvestMoon.jpg',
//     originalPrice: 20,
//     status: 'avaliable',
//     salePrice: 10,
//     percent_off: 50,
//   },
//   {
//     itemId: 5,
//     name: 'Havest Moon Guide',
//     description:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//     imageUrl: 'https://m.media-amazon.com/images/I/8180p7Z96FL.__AC_SX300_SY300_QL70_FMwebp_.jpg',
//     originalPrice: 20,
//     status: 'avaliable',
//     salePrice: 10,
//     percent_off: 50,
//   },
// ];