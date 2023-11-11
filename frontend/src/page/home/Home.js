import React from "react";
import Hero from "../../components/hero/Hero";
import Info from "../../components/info/Info";
import Banner from "../../components/banner/Banner";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";


const Home=()=>{
    
   
    return (
       <div>
           <Header/>
           <Hero/>
           <Info/>
           <Banner/>
           <Footer/>
         </div> 
       
    )
}

export default Home