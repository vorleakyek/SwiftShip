import { useEffect, useState } from 'react';
import { type Item, getSpecificProducts } from '../data';

// const books = [
//   {
//     "categoryID": 1,
//     "categoryName": "Books",
//     "currentlyOnSale": true,
//     "description": "Sam and Dean Winchester are more than brothers—they are brothers who hunt and fight demons together! They learned from the best and are practically pros, so when Dean finds their dad's journal and the tale of the haunted Waverly Hills Boarding House, the brothers just have to check it out.",
//     "imageUrl": "https://m.media-amazon.com/images/I/91FXhTNczdL._SY342_.jpg",
//     "itemID": 102,
//     "name": "Supernatural: An Official Spooky Picture Book",
//     "originalPrice": 19,
//     "percentOff": 5,
//     "salePrice": 18.04,
//     "status": "available"
//   },
//   {
//     "categoryID": 1,
//     "categoryName": "Books",
//     "currentlyOnSale": true,
//     "description": "This two-book set combines the titles HTML & CSS: Designing and Building Web Sites and JavaScript & jQuery: Interactive Front-End Development. Together these two books form an ideal platform for anyone who wants to master HTML and CSS before stepping up to JavaScript and jQuery. HTML & CSS covers structure, text, links, images, tables, forms, useful options, adding style with CSS, fonts, colors, thinking in boxes, styling lists and tables, layouts, grids, and even SEO, Google analytics, ftp, and HTML5. JavaScript & jQuery offers an excellent combined introduction to these two technologies using a clear and simple visual approach using diagrams, infographics, and photographs.",
//     "imageUrl": "https://m.media-amazon.com/images/I/811a1DHT8OL._SY466_.jpg",
//     "itemID": 106,
//     "name": "Web Design with HTML, CSS, JavaScript and jQuery Set",
//     "originalPrice": 58,
//     "percentOff": 38,
//     "salePrice": 35.9,
//     "status": "available"
//   },
//   {
//     "categoryID": 1,
//     "categoryName": "Books",
//     "currentlyOnSale": false,
//     "description": "Discover the current landscape of full-stack development and how to leverage modern web technologies for building production-ready React.js applications to deploy on AWS",
//     "imageUrl": "https://m.media-amazon.com/images/I/71m7dhO56ZL._SY466_.jpg",
//     "itemID": 107,
//     "name": "Full-Stack React, TypeScript, and Node: Build cloud-ready web applications using React 17 with Hooks and GraphQL",
//     "originalPrice": 49,
//     "percentOff": 0,
//     "salePrice": 48.99,
//     "status": "available"
//   }
// ]

export default function BookPage({ category }: { category: string }) {
  const [dataArray, setDataArray] = useState<Item[]>([]);

  useEffect(() => {
    async function fetchDataArray(category: string) {
      try {
        const result = await getSpecificProducts(category);
        setDataArray(result);
      } catch (err) {
        console.error(err);
      }
    }

    fetchDataArray(category);
  }, [category]);

  return (
    <div>
      {dataArray.map((item) => (
        <div className="flex" key={item.itemID}>
          <div>
            <img src={item.imageUrl} alt={item.name} />
          </div>
          <div>
            <p>{item.name}</p>
            <p>${item.salePrice} </p>
          </div>
        </div>
      ))}
    </div>
  );
}
