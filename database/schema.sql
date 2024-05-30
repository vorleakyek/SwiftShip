set client_min_messages to warning;

drop schema "public" cascade;

create schema "public";

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
  "firstName" varchar(50),
  "lastName" varchar(50),
  "address" varchar(100),
  "city" VARCHAR(50),
  "state" VARCHAR(50),
  "zipCode" VARCHAR(50),
  "phoneNumber" VARCHAR(50),
  "email" varchar(50) UNIQUE,
  "hashedPassword" text,
  "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE "categories" (
  "categoryID" int PRIMARY KEY,
  "categoryName" varchar
);

CREATE TABLE "orders" (
  "orderNumber" varchar(50) PRIMARY KEY,
  "userID" int,
  "cardNumber" varchar(25),
  "totalAmount" DECIMAL(10, 5),
  "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
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
);

CREATE TABLE "customerServiceMessages" (
  "messageNumber" serial PRIMARY KEY,
  "userID" int,
  "isMember" boolean,
  "message" VARCHAR(10000),
  "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
)
