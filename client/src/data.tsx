import { type ItemInCart } from './pages/ItemPage';

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

export function getLocalStorageItems() {
  const itemsAddedInCartString = localStorage.getItem('itemsInCart');
  const itemsAddedInCart: ItemInCart[] = itemsAddedInCartString
    ? JSON.parse(itemsAddedInCartString)
    : null;
  return itemsAddedInCart;
}

export function updateLocalStorageItemQuantity(
  item: ItemInCart,
  itemsAddedInCart: ItemInCart[],
  quantity: number
) {
  itemsAddedInCart.map((itemAdded) =>
    itemAdded.itemID === item.itemID
      ? (itemAdded['itemQuantity'] = quantity)
      : itemAdded
  );
  localStorage.setItem('itemsInCart', JSON.stringify(itemsAddedInCart));
}

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

export async function getSpecificProducts(category: string): Promise<Item[]> {
  const req = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
    },
  };

  const res = await fetch(`api/productsIn/${category}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function getSearchProducts(keywords: string): Promise<Item[]> {
  const req = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
    },
  };

  const res = await fetch(`api/products/search/${keywords}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

// export async function getShippingInformation () {
//   const req = {
//     method:'GET',
//     headers: {
//       'content-Type':'application/json'
//     }
//   }
//   const res = await fetch('api/guest-checkout/shipping',req);
//   if (!res.ok) {
//     alert('error');
//     throw new Error(`fetch Error ${res.status}`);
//   }
//   const shippingInfo = await res.json();
//   console.log(shippingInfo);
// }

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

export async function getUserInfo(userID: number) {
  const req = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
    },
  };
  const res = await fetch(
    `/api/login-user-checkout/info?userID=${userID}`,
    req
  );
  if (!res.ok) {
    alert('error');
    throw new Error(`fetch Error ${res.status}`);
  }
  const userInfo = await res.json();
  return userInfo;
}

export async function getUserOrderInfo(userID: number) {
  const req = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
    },
  };
  const res = await fetch(`/api/login-user-order/info?userID=${userID}`, req);
  if (!res.ok) {
    alert('error');
    throw new Error(`fetch Error ${res.status}`);
  }
  const userInfo = await res.json();
  return userInfo;
}

export async function getShippingInformation(orderID: number) {
  const req = {
    method: 'GET',
    headers: {
      'content-Type': 'application/json',
    },
  };
  const res = await fetch(
    `api/guest-checkout/shipping?orderID=${orderID}`,
    req
  );
  if (!res.ok) {
    alert('error');
    throw new Error(`fetch Error ${res.status}`);
  }
  const shippingInfo = await res.json();
  console.log(shippingInfo.orderID);
  // setOrderID(shippingInfo.orderID);
  return shippingInfo;
}

export function calculateOrderSummary(itemsInCart: ItemInCart[]) {
  let price = 0;
  let totalItems = 0;

  itemsInCart.map((itemInCart) => {
    price = price + itemInCart.itemQuantity * itemInCart.salePrice;
    totalItems = totalItems + itemInCart.itemQuantity;
  });

  const tax = price * 0.1;
  const shippingCost = price >= 35 ? 0 : 8.99;
  const totalAmount = price + tax + shippingCost;

  return {
    totalItems,
    price: Number(price.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    shippingCost,
    totalAmount: Number(totalAmount.toFixed(2)),
  };
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

export const states = [
  { label: 'Alaska', value: 'Alaska' },
  { label: 'Alabama', value: 'Alabama' },
  { label: 'Arkansas', value: 'Arkansas' },
  { label: 'Arizona', value: 'Arizona' },
  { label: 'California', value: 'California' },
  { label: 'Colorado', value: 'Colorado' },
  { label: 'Connecticut', value: 'Connecticut' },
  { label: 'District of Columbia', value: 'District of Columbia' },
  { label: 'Delaware', value: 'Delaware' },
  { label: 'Florida', value: 'Florida' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Hawaii', value: 'Hawaii' },
  { label: 'Iowa', value: 'Iowa' },
  { label: 'Idaho', value: 'Idaho' },
  { label: 'IL', value: 'Illinois' },
  { label: 'Illinois', value: 'Indiana' },
  { label: 'Kansas', value: 'Kansas' },
  { label: 'Kentucky', value: 'Kentucky' },
  { label: 'Louisiana', value: 'Louisiana' },
  { label: 'Massachusetts', value: 'Massachusetts' },
  { label: 'Maryland', value: 'Maryland' },
  { label: 'Maine', value: 'Maine' },
  { label: 'Michigan', value: 'Michigan' },
  { label: 'Minnesota', value: 'Minnesota' },
  { label: 'Missouri', value: 'Missouri' },
  { label: 'Mississippi', value: 'Mississippi' },
  { label: 'Montana', value: 'Montana' },
  { label: 'North Carolina', value: 'North Carolina' },
  { label: 'North Dakota', value: 'North Dakota' },
  { label: 'Nebraska', value: 'Nebraska' },
  { label: 'New Hampshire', value: 'New Hampshire' },
  { label: 'New Jersey', value: 'New Jersey' },
  { label: 'New Mexico', value: 'New Mexico' },
  { label: 'Nevada', value: 'Nevada' },
  { label: 'New York', value: 'NewYork' },
  { label: 'Ohio', value: 'Ohio' },
  { label: 'Oklahoma', value: 'Oklahoma' },
  { label: 'Oregon', value: 'Oregon' },
  { label: 'Pennsylvania', value: 'Pennsylvania' },
  { label: 'Rhode Island', value: 'Rhode Island' },
  { label: 'South Carolina', value: 'South Carolina' },
  { label: 'South Dakota', value: 'South Dakota' },
  { label: 'Tennessee', value: 'Tennessee' },
  { label: 'Texas', value: 'Texas' },
  { label: 'Utah', value: 'Utah' },
  { label: 'Virginia', value: 'Virginia' },
  { label: 'Vermont', value: 'Vermont' },
  { label: 'Washington', value: 'Washington' },
  { label: 'Wisconsin', value: 'Wisconsin' },
  { label: 'West Virginia', value: 'West Virginia' },
  { label: 'Wyoming', value: 'Wyoming' },
];
