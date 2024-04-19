// import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './index.css';
import './App.css';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ItemPage from './pages/ItemPage';
import ViewCart from './pages/ViewCart';
// import { AppContext } from './components/AppContext';

export default function App() {
  // const updateSelectedQuantity = (quantity:number) => setSelectedQuantity(quantity);

  // const contextValue = {
  //   selectedQuantity,
  //   updateSelectedQuantity
  // };

  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<HomePage />} />
          <Route path="products/:itemID" element={<ItemPage />} />
          <Route path="view-cart" element={<ViewCart />}></Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}
