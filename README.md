# match-master

A full-stack e-commerce web application for online shopping.

## why I Built This

I want to build an e-commerce website to enhance and maintain my development skills in both frontend and backend development.

## Technologies Used

- React
- CSS3
- Tailwind CSS 
- TypeScript
- Node.js
- Express
- PostgreSQL
- React-chatbot-kit
- Figma (for a wireframe) 


## Live Demo



## Features

- Users can sign up, log in, or shop online as guests.
- Users can chat with a chatbot.
- Users can add items with a specific quantity to their cart.
- Users can view the items in their cart, update the item quantity, or delete items.
- Users can check out as guests or as logged-in users.
- Users can search for specific items or categories.
- Users can send messages to customer service.

## Preview
SwiftShip (Homepage) <br>
<img src="client/src/assets/SwiftShip%20(part%201).gif" alt="SwiftShip (Homepage)" width="650" height="auto"> <br><br>
SwiftShip (Chatbot + Adding items to the cart) <br>
<img src="client/src/assets/SwiftShip%20(part%202).gif" alt="SwiftShip (Homepage)" width="650" height="auto"> <br><br>
SwiftShip (Guest checkout) <br>
<img src="client/src/assets/SwiftShip%20guest%20checkout.gif" alt="SwiftShip (Homepage)" width="650" height="auto"> <br><br>
SwiftShip (Login checkout) <br>
<img src="client/src/assets/SwiftShip%20login%20checkout%20.gif" alt="SwiftShip (Homepage)" width="650" height="auto"> <br>

## Development

- Working on deployment to AWS
- Update the search functionality
- Refactoring the code and update any logic issue

### System Requirements

- Node.js 18 or higher
- NPM 8 or higher
- PostgreSQL

### Getting Started

1. Clone the repository

   ```shell
   git clone https://github.com/vorleakyek/SwiftShip.git
   ```

2. Install all dependencies with NPM

   ```shell
   npm install
   ```

3. Start PostgreSQL

   ```shell
   sudo service postgresql start
   ```

4. Start all the development servers with the `"dev"` script:

   ```shell
   npm run dev
   ```

5. Run this command to view the data on the database

   ```shell
   pgweb --db matchMaster
   ```
