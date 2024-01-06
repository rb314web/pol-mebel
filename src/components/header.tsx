import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

import "../assets/style/header.scss";
import { useEffect } from "react";

export const Header = () => {

    useEffect( () => {
        AOS.init();
    }, [])

    return(
        <div className="header">
        <div data-aos="fade-right" data-aos-duration="1000" className="header_text">
          <h1>
            Wprowadź Unikalność do Swojego Domu z Naszymi Meblami na Zamówienie
          </h1>
          <p>
            W POL-MEBEL wierzymy, że Twoje otoczenie wpływa na Twoje
            samopoczucie. Dlatego tworzymy meble na zamówienie, które nie tylko
            ozdabiają, ale także przekształcają Twoje wnętrze w oazę komfortu.
          </p>
          <div className="header_text_buttons">
          <Link to='/contact'>Skontaktuj się z Nami</Link>         
          <Link to='/offer'>Nasze realizacje</Link> 
          </div>

        </div>
        <div className="header_photo"></div>
      </div>
    )
}