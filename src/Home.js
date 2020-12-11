import React from "react";
import { useState } from "react";
import "./Home.css";
import Product from "./Product";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function Home() {
  const imgArr = [
    "https://images-eu.ssl-images-amazon.com/images/G/31/prime/Gateway/2020/May/gaming_1500x600._CB431281464_.jpg",
    "https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/Cnnjpp/OnePlus/OnePlus_BAU/4thdec/D18734439_BAU_OnePlus_8T_Tall_hero_1500x600._CB414727933_.jpg",
    'https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2020/X-site/Multititle/Aug/1500x600_Hero-Tall_np._CB404803728_.jpg'
  ];

  let counter = 0;
  const [img, setImg] = useState(imgArr[counter]);

  const prevImg = () => {
    if (counter <= 0)
      counter = imgArr.length - 1;
    else
      --counter;
    console.log(counter);
    console.log(imgArr[counter]);
    // setImg(imgArr[counter]);
  }

  const nextImg = () => {
    if (counter >= imgArr.length - 1)
      counter = 0;
    else
      counter = counter + 1;
    console.log(counter);
    console.log(imgArr[counter]);
    setImg(imgArr[counter]);
  }

  /*  setInterval(() => {
     counter++;
     if (counter >= imgArr.length)
       counter = 0;
     console.log(counter);
     setCurrImg(imgArr[counter]);
     //console.log(imgArr[counter]);
     /* if (counter > imgArr.length)
     console.log(imgArr[counter]);
       counter = 0;
     else {
       counter++;
     }
     setCurrImg(imgArr[counter])
     console.log(currImg); 
   }, 5000); */


  return (
    <div className="home">

      <div className="home_container">
        <img
          className="home_image"
          src={img}
          //src="https://images-eu.ssl-images-amazon.com/images/G/31/AmazonVideo/2020/X-site/Multititle/Aug/1500x600_Hero-Tall_np._CB404803728_.jpg"
          alt=""
        />
        <button className="left_arrow button" onClick={prevImg}><ArrowBackIosIcon fontSize="large" /></button>
        <button className="right_arrow button" onClick={nextImg}><ArrowForwardIosIcon fontSize="large" /></button>

        <div className="home_row">
          <Product
            id="12345"
            title="Apple MacBook Pro (16-inch, 16GB RAM, 512GB Storage, 2.6GHz 9th Gen Intel Core i7) - Space Grey "
            price={149999}
            image="https://images-eu.ssl-images-amazon.com/images/I/41Y2Vs8NgSL._AC_SY200_.jpg"
            rating={3}
          />

          <Product
            id="12346"
            title="OnePlus 8 (Glacial Green 6GB RAM+128GB Storage)"
            price={39999}
            image="https://images-eu.ssl-images-amazon.com/images/I/412Yk7LIQzL._AC_US240_QL65_.jpg"
            rating={5}
          />
        </div>

        <div className="home_row">
          <Product
            id="12347"
            title="Web Design with HTML, CSS, JavaScript and jQuery Set"
            price={2187}
            image="https://m.media-amazon.com/images/I/41T53nRtyoL._AC_UY327_QL65_.jpg"
            rating={4}
          />
          <Product
            id="12348"
            title="Amazon Echo (2nd Gen) - Powered by Dolby – White"
            price={24999}
            image="https://m.media-amazon.com/images/I/61UnzwX+4NL._AC_UY327_QL65_.jpg"
            rating={5}
          />
          <Product
            id="12349"
            title="Samsung Galaxy Watch Active 2 (Bluetooth, 44 mm) - Black, Aluminium Dial, Silicon Straps"
            price={20000}
            image="https://m.media-amazon.com/images/I/61uej9efKYL._AC_UY327_QL65_.jpg"
            rating={4}
          />
        </div>

        <div className="home_row">
          <Product
            id="12344"
            title="ASUS ROG Swift PG348Q 34-inch (86.36 cm) Curved Gaming Monitor - 90LM02A0-B01370 (Black)"
            price={145999}
            image="https://m.media-amazon.com/images/I/81UTBqxeyFL._AC_UY327_QL65_.jpg"
            rating={4}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
