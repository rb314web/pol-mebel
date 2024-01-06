import "../assets/style/footer.scss";
import { Link } from "react-router-dom";
import mainLogo from "../assets/img/logo.png";

export const Footer = () => {
  const year = () => {
    const now = new Date();
    const year = now.getFullYear();

    return year;
  };
  return (
    <>
      <div className="footer">
        <div className="footer_wrapper">
          <div className="footer_logo">POL-MEBEL</div>
          {/* <img src={mainLogo} /> */}

          <ul className="footer_wrapper_menu">
            <li className="footer_wrapper_menu_item">
              <Link to="/">Strona Główna</Link>
            </li>
            <li className="footer_wrapper_menu_item">
              <Link to="/offer">Oferta</Link>
            </li>
            <li className="footer_wrapper_menu_item">
              <Link to="realization/">Realizacje</Link>
            </li>
            <li className="footer_wrapper_menu_item">
              <Link to="/contact">Kontakt</Link>
            </li>
          </ul>
        </div>

        <div className="footer_copyright">
          <p>Copyright © {year()} pol-mebel.pl. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </>
  );
};
