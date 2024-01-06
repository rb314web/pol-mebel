import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/style/navigation.scss";
import mainLogo from "../assets/img/logo.png";

export const Navigation = () => {

    useEffect( () => {
        const item = document.querySelectorAll('.navigation_list_item')

        item.forEach( (element) => {
            element.addEventListener('click', () => {
                document.querySelector('.navigation_list')?.classList.remove('navigation_list_active')
            })
        })
    },[])

    const navigationToogle = () => {
        document.querySelector('.navigation_list')?.classList.toggle('navigation_list_active')
    }

  return (
    <>
      <nav className="navigation">
        <div className="navigation_logo">
          <Link to='/'><img src={mainLogo} /></Link>
        </div>

        <ul className="navigation_list">
          <li className="navigation_list_item">
            <Link to="/">Strona Główna</Link>
          </li>
          <li className="navigation_list_item">
            <Link to="/offer">Oferta</Link>
          </li>
          <li className="navigation_list_item">
            <Link to="/realization">Realizacje</Link>
          </li>
          <li className="navigation_list_item">
            <Link to="/contact">Kontakt</Link>
          </li>
        </ul>

        <button onClick={navigationToogle} className="navigation_hamburger">
          <span></span>
        </button>

      </nav>
    </>
  );
};
