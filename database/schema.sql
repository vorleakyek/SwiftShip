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
  "userID" serial PRIMARY KEY,
  "fullName" varchar(50),
  "email" varchar(50) UNIQUE,
  "address" varchar(100)
);

CREATE TABLE "categories" (
  "categoryID" int PRIMARY KEY,
  "categoryName" varchar
);

CREATE TABLE orders (
  orderID SERIAL PRIMARY KEY,
  userID INT, -- Foreign key referencing users.userID,
  orderNumber INT,
  orderDate TIMESTAMP,
  totalAmount DECIMAL(10, 2)
  -- Other order-related fields
);

CREATE TABLE "guestOrders" (
  "orderID" SERIAL PRIMARY KEY,
  "guestFirstName" VARCHAR(50),
  "guestLastName" VARCHAR(50),
  "guestEmail" VARCHAR(50),
  "guestAddress" VARCHAR(100),
  "guestCity" VARCHAR(50),
  "guestState" VARCHAR(50),
  "guestZipCode" VARCHAR(50),
  "guestPhoneNumber" VARCHAR(50),
  "guestCard" VARCHAR(50),
  "totalAmount" DECIMAL(10, 2),
  "orderNumber" VARCHAR(50),
  "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
  -- Other order-related fields
);
