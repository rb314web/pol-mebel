import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/style/navigation.scss";

export const Navigation = () => {
  useEffect(() => {
    const item = document.querySelectorAll(".navigation_wrapper_list_item");

    item.forEach((element) => {
      element.addEventListener("click", () => {
        document
          .querySelector(".navigation_wrapper_list")
          ?.classList.remove("navigation_wrapper_list_active");
      });
    });
  }, []);

  const navigationToogle = () => {
    document
      .querySelector(".navigation_wrapper_list")
      ?.classList.toggle("navigation_wrapper_list_active");
  };

  return (
    <>
      <nav className="navigation">
        <div className="navigation_wrapper">
          <div className="navigation_wrapper_logo"><Link to="/">POL-MEBEL</Link></div>

          <ul className="navigation_wrapper_list">
            <li className="navigation_wrapper_list_item">
              <Link to="/">Strona Główna123</Link>
            </li>
            {/* <li className="navigation_wrapper_list_item">
              <Link to="/offer">Oferta</Link>
            </li> */}
            <li className="navigation_wrapper_list_item">
              <Link to="/realization">Realizacje</Link>
            </li>
            <li className="navigation_wrapper_list_item">
              <Link to="/contact">Kontakt</Link>
            </li>
            <li className="navigation_wrapper_list_item navigation_wrapper_list_item_cta">
              <Link to="/quotation">Wycena online</Link>
            </li>
          </ul>

          <button id="hamburger" onClick={navigationToogle} className="navigation_wrapper_hamburger">
            <span></span>
          </button>
        </div>
      </nav>
    </>
  );
};
