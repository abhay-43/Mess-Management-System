import React from "react";
import Hero from "../../components/body/homeBody/HomeBody";
import Info from "../../components/body/info/Info";
import Banner from "../../components/banner/Banner";
import Header from "../../components/header/homeHeader/Header";
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