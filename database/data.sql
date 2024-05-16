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
-- INSERT INTO "users" ("userID", "fullName", "email", "address") VALUES
-- (1, 'Homer Simpson', 'homer@example.com', '123 Main St'),
-- (2, 'Jane Smith', 'jane@example.com', '456 Elm St');


-- Inserting sample data into "guestOrders" table
INSERT INTO "guestOrders" ("orderID","guestFirstName","guestLastName", "guestEmail",  "guestAddress", "guestCity", "guestState","guestZipCode", "guestPhoneNumber",  "guestCard",  "totalAmount","orderNumber" ,"createdAt")
VALUES (3, 'Leslie', 'Hurray', 'leslie.hurray@gmail.com','31276 Rosella Views','West Gracie', 'New York', '51346','(551)309-0352', '122334-4566-112', '10.25', '7ADJ651PL', '2024-03-30 03:26:40.076619+00'),
(5, 'Arturo', 'Armstrong', null,'381 Gretchen Loop','West Perryhaven', 'California', '79202','(929)556-3655', null, null, null,'2024-03-30 03:26:40.076619+00');

-- Inserting sample data into "categories" table
INSERT INTO "categories" ("categoryID", "categoryName") VALUES
(1, 'Books'),
(2, 'Clothes'),
(3, 'PetSupplies'),
(4, 'Kitchens'),
(5, 'Toys'),
(6, 'Games');

-- Inserting sample data into "products" table
INSERT INTO "products" ("itemID", "categoryID", "name", "description", "imageUrl", "originalPrice", "status", "salePrice", "percentOff", "currentlyOnSale")
VALUES
(100, 5, 'Exotic Parrot', 'The "Exotic Parrot LEGO 3-in-1" set offers the excitement of building three different models of exotic parrots using LEGO bricks. With this set, builders can create three unique parrot designs, each with its own distinctive features and characteristics. Whether it''s vibrant colors, intricate details, or imaginative poses, this set provides an engaging building experience for LEGO enthusiasts of all ages. From tropical jungles to imaginative play scenarios, the Exotic Parrot LEGO 3-in-1 set sparks creativity and encourages imaginative storytelling. With its versatility and endless possibilities, this set promises hours of fun and enjoyment for builders as they explore the world of LEGO construction.', 'https://www.lego.com/cdn/cs/set/assets/blt1e80dee5dde5c723/31136.png?format=webply&fit=bounds&quality=75&width=640&height=640&dpr=1', 19.99, 'available', 15.99, 20, true ),
(101, 6, 'Harvest Moon: The Winds of Anthos', 'The land of Anthos was a peaceful and harmonious land watched over by the Harvest Goddess and the Harvest Sprites, who protected the inhabitants of Anthos from natural disasters such as storms, earthquakes, and the like.', 'https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_656/b_white/f_auto/q_auto/ncom/software/switch/70010000053606/39d52fc510464498ee2c40c297ca8aa96e40454e27a3bc7ae0a6feaa9c4f41a6', 49.99, 'available', 39.99, 20, true ),
(102, 1, 'Supernatural: An Official Spooky Picture Book', 'Sam and Dean Winchester are more than brothers—they are brothers who hunt and fight demons together! They learned from the best and are practically pros, so when Dean finds their dad''s journal and the tale of the haunted Waverly Hills Boarding House, the brothers just have to check it out.', 'https://m.media-amazon.com/images/I/91FXhTNczdL._SY342_.jpg', 18.99, 'available', 18.04,5, true),
(103, 2, 'Men''s Nike Powder Blue Milwaukee Brewers', 'Your Milwaukee Brewers are the perfect embodiment of Wisconsin''s most cherished values of family and fun! From racing sausages at the games, down to the fans with cheese on their heads and beer in their hands, the Brew Crew have always been an extremely lively bunch.', 'https://media.kohlsimg.com/is/image/kohls/5888155?wid=805&hei=805&op_sharpen=1', 219.99, 'available', 153.99, 30, TRUE),
(104, 3, 'Top Paw® Koala Comfy Character Cuddler Dog Bed', 'Your dog will love the time it spends relaxing in this adorable Top Paw Koala Comfy Character Cuddler Dog Bed. This fun bed comes in the shape of a cute koala bear, and is super squishy and comfortable so that your dog finds optimal comfort when he lays his head down to rest. It is also machine washable, making it a breeze to keep clean.', 'https://s7d2.scene7.com/is/image/PetSmart/5346362?$CLEARjpg$', 24.99, 'available', 18.67, 25, TRUE),
(105, 4, '12.25-INCH HARD ANODIZED CERAMIC NONSTICK FRYING PAN', 'Made for everyday cooking and beautiful kitchen-to-table presentations, KitchenAid Hard Anodized Ceramic Cookware is finished with an easy-clean, ceramic nonstick interior and a durable hard-anodized exterior, crafted with thick, forged aluminum bases and rims to deliver excellent heat conduction and durability.', 'https://cdn.shopify.com/s/files/1/0253/4735/8797/files/Square-84817_KA_KKH_12.25in_Fry_Pan_Blue_Velvet_MainWithShadow_600x.jpg?v=1683819705', 44.99, 'available', 38.24, 15, true),
(106,1, 'Web Design with HTML, CSS, JavaScript and jQuery Set', 'This two-book set combines the titles HTML & CSS: Designing and Building Web Sites and JavaScript & jQuery: Interactive Front-End Development. Together these two books form an ideal platform for anyone who wants to master HTML and CSS before stepping up to JavaScript and jQuery. HTML & CSS covers structure, text, links, images, tables, forms, useful options, adding style with CSS, fonts, colors, thinking in boxes, styling lists and tables, layouts, grids, and even SEO, Google analytics, ftp, and HTML5. JavaScript & jQuery offers an excellent combined introduction to these two technologies using a clear and simple visual approach using diagrams, infographics, and photographs.', 'https://m.media-amazon.com/images/I/811a1DHT8OL._SY466_.jpg',58.00, 'available', 35.90, 38, true),
(107, 1, 'Full-Stack React, TypeScript, and Node: Build cloud-ready web applications using React 17 with Hooks and GraphQL', 'Discover the current landscape of full-stack development and how to leverage modern web technologies for building production-ready React.js applications to deploy on AWS', 'https://m.media-amazon.com/images/I/71m7dhO56ZL._SY466_.jpg', 48.99, 'available', 48.99, 0, false),
(108,2,'3-Stripes Double Knit Full-Zip','Waffle texture knit construction, moisture management properties, self-mock collar. Two side pockets, bold 3-Stripes on right chest, performance logo on the right hip', 'https://m.media-amazon.com/images/I/61f5kXT+A4L._AC_SY550_.jpg', 54.00, 'available', 54.00, 0, false),
(109,2, 'I Love USA T-Shirt White United States of America Flag Heart', 'USA USA USA! Perfect gift idea for any American patriot. Forget politics, republicans and democrats unite. If you love USA wear this t-shirt with pride!', 'https://m.media-amazon.com/images/I/B1qmQK-r4OS._CLa%7C2140%2C2000%7C71cgeE3wEsL.png%7C0%2C0%2C2140%2C2000%2B0.0%2C0.0%2C2140.0%2C2000.0_AC_SX466_.png', 19.99, 'available', 19.99, 0, false),
(110,3,'Pet Bath Massage Brush Puppy Dog Cat Grooming Cleaning Soft', 'Soft Silicone Material: our pet dog bath brush comb is made of quality food grade silicone, which has the advantage of High-temperature proof, easy to clean, and quick-drying. Our silicone rubber bathing brush can bring good interaction for you and your dog or cat to massage her skin, remove the dust, loose and shedding her hair.','https://m.media-amazon.com/images/I/41qKTF+q+eL._SX466_.jpg', 5.41, 'available', 5.41, 0, false),
(111,3, 'Awpland Dog Brushes for Grooming, Cute Frog Shape Groom and Clean Dog Comb with Release Button, Self Cleaning Dog Slicker Brush for Long Short Haired Dogs Cats Rabbits Bunny', '🐸High Quality: Awpland doodle brush are made of stainless steel, each bristle steel needle has a round resin protection point on the ends, durable, anti-rust, and highly flexible-resistant to bending.', 'https://m.media-amazon.com/images/I/51rY4cpTzqL._SX466_.jpg',11.99, 'available', 11.99, 0, false),
(112,4,'BLUE GINKGO Over the Sink Colander Strainer Basket - Wash Vegetables and Fruits, Drain Cooked Pasta and Dry Dishes','Multipurpose - Easy to use and versatile. Stretch over your kitchen sink to rinse veggies and fruit, drain pasta, thaw frozen food or use as a dish rack to air dry utensils, cups and small plates.', 'https://m.media-amazon.com/images/I/71wfcTtaptL._AC_SX679_.jpg', 19.99, 'available', 17.99, 10,true),
(113, 4, 'Cuisinart Large Spin Stop Salad Spinner- Wash, Spin & Dry Salad Greens, Fruits & Vegetables, 5qt', 'The Cuisinart® Salad spinner allows you to wash and dry salad greens, fruits, and vegetables without removing the spinner lid. Add and drain water through the opening on top. Turn the handle to spin the basket and press the brake button to instantly stop the spinning action. Quick, easy, dishwasher safe, and countertops stay dry!','https://m.media-amazon.com/images/I/51VOvnxIJHL._AC_.jpg', 24.99,'available',24.99,0,false),
(114,5,'Zoomer 2.0 - Bentley','Zoomer is playful, funny and he will steal your heart in an instant. Just like a real dog you will need to teach him everything a puppy needs to know. Call his name, teach him lots tricks and watch how excited he gets when you reward him with a real good belly scratch. Kids can run play and laugh as Zoomer excitedly wags his tail and responds to their commands. Zoomer is smart as a whip and can understand English, Spanish and French. He even follows your movement with his cute puppy eyes. Download the free iOS or Android app to learn everything there is to know about training Zoomer.','https://m.media-amazon.com/images/I/61Kor8TD7PL._AC_SX679_.jpg', 158.88, 'available', 158.88,0,false),
(115,5,'Perfect Petzzz ® The Original Breathing Pet Cavalier King Charles New Huggable Soft Version Plush Toy Gift Bundle','Product Description: Cavalier King 100% synthetic realistic plush with breathing movement Perfect Petzzz Cavalier King Charles The Original Breathing Pet New Soft Hug Version Product Description: 100% synthetic Cavalier King realistic plush with breathing movement Batteries required: 1 x D (included) Minimum age: 3 years Dimensions: 23x19x10cm Package Content Regal: 1 dog adoption, brush, cloth bed','https://m.media-amazon.com/images/I/61CuXbtoODL._AC_SX679_.jpg',49.00,'available',49.00,0,false),
(116,6,'Buffalo Games - Dowdle - Amish Country - 1000 Piece Jigsaw Puzzle for Adults Challenging Puzzle Perfect for Game Nights - Finished Size 26.75 x 19.75','This 1000-piece jigsaw puzzle titled “Amish Country” is based on the artwork of Eric Dowdle. This image showcases the current life of many Amish people still living in the Lancaster region of Pennsylvania. These tight-knit communities are known for their work ethic, hand-crafted wares, and simple, faithful lives. Enjoy piecing together this scene of barns, horse and buggies, and rolling hills of crops and livestock. Eric Dowdle was born the tenth of 12 children to a family of storytellers. He has traveled the world to discover fascinating people and places to include in his art. Each Dowdle puzzle has a colorful story to tell.','https://m.media-amazon.com/images/I/81lVe5AB5hL._AC_SX679_.jpg',14.99,'available',14.99,0,false),
(117,6,'3 otters Mini Basketball Game, 29PCS Tabletop Game Set Desktop Toys Arcade Basketball Game or Kids Basketball Shooting Game, Sports Gifts for Boys 8-12','Engaging Tabletop Basketball Game - Our indoor tabletop basketball game is a thrilling basketball shooting game that promises endless fun. Simply place a ball on the launcher, press the spring, release it, and watch as the basketball bounces into the hoop.', 'https://m.media-amazon.com/images/I/71t+z-vV8JL._AC_SX679_.jpg',11.99,'available',11.99,0,false)











-- Inserting sample data into "orders" table

-- Inserting sample data into "order_items" table
