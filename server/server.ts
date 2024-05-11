/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import {
  ClientError,
  defaultMiddleware,
  errorMiddleware,
} from './lib/index.js';

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const db = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/dist', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

type Item = {
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

app.get('/api/products', async (req, res, next) => {
  try {
    const sql = `
      select *
      from "products"
    `;

    const result = await db.query<Item>(sql);

    if (result.rows.length > 0) {
      res.status(201).json(result.rows);
    } else {
      res.status(404).json({ message: 'No products found!' });
    }
  } catch (err) {
    next(err);
  }
});

app.get('/api/productsIn/:category', async (req, res, next) => {
  try {
    const text = req.params.category;
    if (!text) {
      throw new ClientError(400, 'productId must be a positive integer');
    }

    const sql = `
      SELECT *
      FROM "products"
      JOIN "categories" USING ("categoryID")
      WHERE "categoryName" = $1
    `;

    const params = [text];
    const result = await db.query<Item>(sql, params);

    if (!result.rows[0]) {
      throw new ClientError(404, `cannot find product with the itemId ${text}`);
    }

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

// app.get('/api/productsIn/:category', async (req, res, next) => {
//   try {
//     const category = req.params.category;
//     if (!category) {
//       throw new ClientError(400, 'missing category as a parameter');
//     }

//     const sql = `
//       select *
//       from "products"
//       join "categories" using ("categoryID")
//       where "categoryName" = '${category}'
//     `;

//     const result = await db.query<Item>(sql);

//     if (result.rows.length > 0) {
//       res.status(201).json(result.rows);
//     } else {
//       res.status(404).json({ message: 'No products found!' });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// app.get('/api/productsIn/:category', async (req, res, next) => {
//   try {
//     const category = req.params.category;
//     if (!category) {
//       throw new ClientError(400, 'missing category as a parameter');
//     }

// const sql = `
//   SELECT *
//   FROM "products"
//   JOIN "categories" USING ("categoryID")
//   WHERE "categoryName" = '${category}'
// `;

//     // const params = [`${category}`];
//     const result = await db.query<Item>(sql);

//     // if (result.rows.length > 0) {
//     //   res.status(200).json(result.rows);
//     // } else {
//     //   res.status(404).json({ message: 'No products found!' });
//     // }

//     if (!result.rows[0]) {
//       throw new ClientError(
//         404,
//         `cannot find products`
//       );
//     }

//     res.json(result.rows[0]);

//   } catch (err) {
//     next(err);
//   }
// });

app.get('/api/products/:productId', async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    if (!productId) {
      throw new ClientError(400, 'productId must be a positive integer');
    }

    const sql = `
      select *
      from "products"
      where "itemID" = $1
    `;

    const params = [productId];
    const result = await db.query<Item>(sql, params);

    if (!result.rows[0]) {
      throw new ClientError(
        404,
        `cannot find product with the itemId ${productId}`
      );
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

type OrderSummary = {
  totalItems: number;
  price: number;
  tax: number;
  shippingCost: number;
  totalAmount: number;
  earlyDeliveryDate: string;
  lateDeliveryDate: string;
};

type Shipping = {
  orderID: number;
  address: string;
  city: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  selectedState: string;
  zipCode: string;
  email: string;
  card: number;
  orderSummary: OrderSummary;
};

app.get('/api/guest-checkout/shipping', async (req, res, next) => {
  try {
    const orderID = Number(req.query.orderID);
    console.log(req.query);

    const sql = `
      select *
      from "guestOrders"
      where "orderID" = $1
    `;

    const param = [orderID];
    const result = await db.query(sql, param);

    if (!result.rows[0]) {
      throw new ClientError(404, `cannot find product with the orderID`);
    }

    console.log(result.rows[0]);

    res.json(result.rows[0]);
  } catch (e) {
    console.log('cannot retrieved shipping info');
  }
});

app.post('/api/guest-checkout/shipping', async (req, res, next) => {
  try {
    const {
      address,
      city,
      firstName,
      lastName,
      phoneNumber,
      selectedState,
      zipCode,
    } = req.body as Partial<Shipping>;

    if (
      !address ||
      !city ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !selectedState ||
      !zipCode
    ) {
      throw new Error('All fields are required.');
    }
    const sql = `
      insert into "guestOrders" ("guestFirstName","guestLastName", "guestAddress", "guestCity", "guestState", "guestZipCode", "guestPhoneNumber")
      values ($1, $2, $3, $4, $5, $6, $7)
      returning *
    `;
    const params = [
      firstName,
      lastName,
      address,
      city,
      selectedState,
      zipCode,
      phoneNumber,
    ];
    console.log(params);
    const result = await db.query(sql, params);
    const response = result.rows[0];
    console.log(response);
    res.status(201).json(response);
  } catch (err) {
    console.log('error occur in the /api/guest-checkout/shipping route', err);
  }
});

app.put('/api/guest-checkout/shipping', async (req, res, next) => {
  try {
    const {
      orderID,
      address,
      city,
      firstName,
      lastName,
      phoneNumber,
      selectedState,
      zipCode,
    } = req.body as Partial<Shipping>;

    if (
      !orderID ||
      !address ||
      !city ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !selectedState ||
      !zipCode
    ) {
      throw new Error('All fields are required.');
    }
    const sql = `
      UPDATE "guestOrders"
      SET "guestFirstName" = $1,
          "guestLastName" = $2,
          "guestAddress" = $3,
          "guestCity" = $4,
          "guestState" = $5,
          "guestZipCode" = $6,
          "guestPhoneNumber" = $7
      WHERE "orderID" = $8
      RETURNING *
    `;
    const params = [
      firstName,
      lastName,
      address,
      city,
      selectedState,
      zipCode,
      phoneNumber,
      orderID,
    ];

    console.log(params);
    const result = await db.query(sql, params);
    const response = result.rows[0];
    console.log(response);
    res.status(201).json(response);
  } catch (err) {
    console.log('error occur in the /api/guest-checkout/shipping route', err);
  }
});

app.put('/api/guest-checkout/payment', async (req, res, next) => {
  try {
    const { orderID, card, email } = req.body as Partial<Shipping>;

    if (!orderID || !card || !email) {
      throw new Error('All fields are required.');
    }
    const sql = `
      UPDATE "guestOrders"
      SET "guestEmail" = $1,
          "guestCard" = $2
      WHERE "orderID" = $3
      RETURNING *
    `;
    const params = [email, card, orderID];

    console.log(params);
    const result = await db.query(sql, params);
    const response = result.rows[0];
    console.log(response);
    res.status(201).json(response);
  } catch (err) {
    console.log('error occur in the /api/guest-checkout/payment route', err);
  }
});

app.put('/api/guest-checkout/order', async (req, res, next) => {
  try {
    const { orderID, orderSummary } = req.body as Partial<Shipping>;

    const timeStamp = Date.now();
    const randomNumbers = Math.floor(Math.random() * 1000000);
    const orderNumber = `${timeStamp}${randomNumbers}`;

    if (!orderID || !orderSummary) {
      throw new Error('All fields are required.');
    }
    const sql = `
      UPDATE "guestOrders"
      SET "totalAmount" = $1,
          "orderNumber" = $2
      WHERE "orderID" = $3
      RETURNING *
    `;
    const params = [orderSummary.totalAmount, orderNumber, orderID];

    console.log(params);
    const result = await db.query(sql, params);
    const response = result.rows[0];
    console.log(response);
    res.status(201).json(response);
  } catch (err) {
    console.log('error occur in the /api/guest-checkout/payment route', err);
  }
});

app.delete('/api/guest-checkout/:orderID', async (req, res, next) => {
  try {
    const orderID = Number(req.params.orderID);
    if (!Number.isInteger(orderID)) {
      throw new ClientError(400, 'entryId must be an integer');
    }

    const sql = `
      delete from "guestOrders"
        where "orderID" = $1
        returning *;
    `;
    const params = [orderID];
    const result = await db.query(sql, params);
    if (result.rows.length === 0) {
      throw new ClientError(404, `OrderID ${orderID} is not found`);
    }

    const deleted = result.rows[0];
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
/*
 * Middleware that handles paths that aren't handled by static middleware
 * or API route handlers.
 * This must be the _last_ non-error middleware installed, after all the
 * get/post/put/etc. route handlers and just before errorMiddleware.
 */
app.use(defaultMiddleware(reactStaticDir));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
