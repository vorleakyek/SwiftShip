set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";


-- CREATE TABLE "orders" (
--   "id" int PRIMARY KEY,
--   "user_id" int UNIQUE NOT NULL,
--   "status" varchar,
--   "created_at" varchar
-- );

-- CREATE TABLE "order_items" (
--   "order_id" int,
--   "product_id" int,
--   "quantity" int
-- );

CREATE TABLE "products" (
  "itemID" int PRIMARY KEY,
  "categoryID" int,
  "name" varchar,
  "description" varchar,
  "imageUrl" varchar,
  "originalPrice" int,
  "status" varchar,
  "salePrice" float,
  "percentOff" int,
  "currentlyOnSale" boolean
);

CREATE TABLE "users" (
  "userID" int PRIMARY KEY,
  "fullName" varchar,
  "email" varchar UNIQUE,
  "address" varchar
);

CREATE TABLE "categories" (
  "categoryID" int PRIMARY KEY,
  "categoryName" varchar
);
