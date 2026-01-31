import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/Footer';
import Banner from '../components/banner';
import Freebook from '../components/Freebook';
function Home(){
  return (
    <>
      <Navbar/>
      <Banner/>
      <Freebook />
      <Footer />
    </>
  )
}

export default Home;