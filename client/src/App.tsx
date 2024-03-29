// import { useEffect, useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './index.css';
import './App.css';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Homepage from './pages/HomePage';

export default function App() {
  // const [serverData, setServerData] = useState('');

  // useEffect(() => {
  //   async function readServerData() {
  //     const resp = await fetch('/api/hello');
  //     const data = await resp.json();

  //     console.log('Data from server:', data);

  //     setServerData(data.message);
  //   }

  //   readServerData();
  // }, []);

  return (
    <>
      <NavBar />
      <Homepage />
      <Footer />
    </>
  );
}
