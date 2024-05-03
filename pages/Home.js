// src/App.js
import React from 'react';
import HomePage from './Homepage';
import Head from 'next/head';
import Footer from './Footer';
//import Navbar from './Navbar';


function App() {
    const appStyles = {
        backgroundImage: 'url("./images/bg_profile1.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh', // Ensure that the background covers the entire viewport height
        padding: '20px', // Add padding to center content
        boxSizing: 'border-box', // Include padding in total width/height
      };

  return (
    
    <div style={appStyles}>
       <Head>
                <title>Home</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <nav className="navbar" style={{ position: 'fixed' }}>
        <img src="./icons/img1.png" alt="Logo" className="navbar-logo" />
    <ul className="navbar-navb ">
      <li className="nav-item"><a href="./Home" className="nav-link">Home</a></li>
      <li className="nav-item"><a href="#services" className="nav-link">Services</a></li>
      <li className="nav-item"><a href="#about" className="nav-link">About Us</a></li>
      <li className="nav-item"><a href="#contact" className="nav-link">Contact</a></li>
      <li className="nav-item"><a href="./login" className="nav-link">LOGIN</a></li>
      
    </ul>
  </nav>
  
        
        <HomePage />
        <Footer />
      </div>
    );
  }
  
  export default App;

