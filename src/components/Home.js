import React from 'react';
import Navbar from './Navbar/Navbar';
import Carousel from './Carousel/Carousel';
import {sliderdata} from './Carousel/SliderData';
import AboutUs from './AboutUS/Aboutus';
import ContactUs from './ContactUS/ContactUs';
import Footer from './Footer/Footer';
import Categories from './Categories/Categories';
import TopProducts from './TopProducts/Topproducts';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Carousel slides={sliderdata}/>
      <AboutUs />
      <Categories/>
      <TopProducts />
      <ContactUs />
      <Footer />
      
    </div>
  );
};

export default Home;
