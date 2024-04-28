-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

-- Inserting sample data into "users" table
INSERT INTO "users" ("userID", "fullName", "email", "address") VALUES
(1, 'Homer Simpson', 'homer@example.com', '123 Main St'),
(2, 'Jane Smith', 'jane@example.com', '456 Elm St');

-- Inserting sample data into "categories" table
INSERT INTO "categories" ("categoryID", "categoryName") VALUES
(1, 'Books'),
(2, 'Clothes'),
(3, 'Pet supplies'),
(4, 'Kitchens'),
(5, 'Toys'),
(6, 'Games');

-- Inserting sample data into "products" table
INSERT INTO "products" ("itemID", "categoryID", "name", "description", "imageUrl", "originalPrice", "status", "salePrice", "percentOff", "currentlyOnSale")
VALUES
(100, 5, 'Exotic Parrot', 'The "Exotic Parrot LEGO 3-in-1" set offers the excitement of building three different models of exotic parrots using LEGO bricks. With this set, builders can create three unique parrot designs, each with its own distinctive features and characteristics. Whether it''s vibrant colors, intricate details, or imaginative poses, this set provides an engaging building experience for LEGO enthusiasts of all ages. From tropical jungles to imaginative play scenarios, the Exotic Parrot LEGO 3-in-1 set sparks creativity and encourages imaginative storytelling. With its versatility and endless possibilities, this set promises hours of fun and enjoyment for builders as they explore the world of LEGO construction.', 'https://www.lego.com/cdn/cs/set/assets/blt1e80dee5dde5c723/31136.png?format=webply&fit=bounds&quality=75&width=640&height=640&dpr=1', 19.99, 'available', 15.99, 20, true ),
(101, 6, 'Harvest Moon: The Winds of Anthos', 'The land of Anthos was a peaceful and harmonious land watched over by the Harvest Goddess and the Harvest Sprites, who protected the inhabitants of Anthos from natural disasters such as storms, earthquakes, and the like.', 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000053606/39d52fc510464498ee2c40c297ca8aa96e40454e27a3bc7ae0a6feaa9c4f41a6', 49.99, 'available', 39.99, 20, true ),
(102, 1, 'Supernatural: An Official Spooky Picture Book', 'Sam and Dean Winchester are more than brothers—they are brothers who hunt and fight demons together! They learned from the best and are practically pros, so when Dean finds their dad''s journal and the tale of the haunted Waverly Hills Boarding House, the brothers just have to check it out.', 'https://m.media-amazon.com/images/I/91FXhTNczdL._SY342_.jpg', 18.99, 'available', 18.04,5, false ),
(103, 2, 'Men''s Nike Powder Blue Milwaukee Brewers', 'Your Milwaukee Brewers are the perfect embodiment of Wisconsin''s most cherished values of family and fun! From racing sausages at the games, down to the fans with cheese on their heads and beer in their hands, the Brew Crew have always been an extremely lively bunch.', 'https://media.kohlsimg.com/is/image/kohls/5888155?wid=805&hei=805&op_sharpen=1', 219.99, 'available', 153.99, 30, TRUE),
(104, 3, 'Top Paw® Koala Comfy Character Cuddler Dog Bed', 'Your dog will love the time it spends relaxing in this adorable Top Paw Koala Comfy Character Cuddler Dog Bed. This fun bed comes in the shape of a cute koala bear, and is super squishy and comfortable so that your dog finds optimal comfort when he lays his head down to rest. It is also machine washable, making it a breeze to keep clean.', 'https://s7d2.scene7.com/is/image/PetSmart/5346362?$CLEARjpg$', 24.99, 'available', 18.67, 25, TRUE),
(105, 4, '12.25-INCH HARD ANODIZED CERAMIC NONSTICK FRYING PAN', 'Made for everyday cooking and beautiful kitchen-to-table presentations, KitchenAid Hard Anodized Ceramic Cookware is finished with an easy-clean, ceramic nonstick interior and a durable hard-anodized exterior, crafted with thick, forged aluminum bases and rims to deliver excellent heat conduction and durability.', 'https://cdn.shopify.com/s/files/1/0253/4735/8797/files/Square-84817_KA_KKH_12.25in_Fry_Pan_Blue_Velvet_MainWithShadow_600x.jpg?v=1683819705', 44.99, 'available', 38.24, 15, FALSE)







-- Inserting sample data into "orders" table

-- Inserting sample data into "order_items" table
