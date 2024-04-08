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

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

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
