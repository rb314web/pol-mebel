import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

import '../assets/style/home.scss'

import "../assets/style/header.scss";
import { useEffect } from "react";
import { Header } from "./header";
import { Second } from "./second";
import { Review } from "./review";

export const Home = () => {

    useEffect( () => {
        AOS.init();
    }, [])

  return (
    <div className="home">
      <Header/>
      <Second/>
      {/* <Review/> */}
      </div>
  );
};
