import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import "../assets/style/header.scss";
import { useEffect } from "react";

export const Header = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="header">
      <div
        data-aos="fade-right"
        data-aos-duration="1000"
        className="header_text"
      >
        <p>Witaj na stronie </p>
        <h1>POL-MEBEL</h1>
        <p>
          firmy produkującej meble na zamówienie
          przez ponad 20 lat. Jesteśmy dumni z naszej długiej historii tworzenia
          najwyższej jakości mebli, które spełniają oczekiwania naszych klientów
          w zakresie funkcjonalności, designu i trwałości.
        </p>
        <div className="header_text_buttons">
          <Link to="/contact">Skontaktuj się z Nami</Link>
          {/* <Link to='/offer'>Nasze realizacje</Link>  */}
        </div>
      </div>
      <div className="header_photo"></div>
    </div>
  );
};
