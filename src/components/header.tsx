import { Link } from "react-router-dom";

import "../assets/style/header.scss";

export const Header = () => {

  return (
    <div className="header">
      <div
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
