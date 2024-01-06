import { useEffect } from "react";
import Glide from "@glidejs/glide";

import "../assets/style/review.scss";

import imgKRoom from "../assets/img/room.jpg";
import "@glidejs/glide/dist/css/glide.core.min.css";

import img1 from '../assets/img/review/1.jpg'
import img2 from '../assets/img/review/2.jpg'
import img3 from '../assets/img/review/3.jpg'

export const Review = () => {
  useEffect(() => {
    const slider = new Glide(".glide", {
      type: "carousel",
      startAt: 0,
      perView: 1,
      autoplay: 3000,
      hoverpause: true,
    }).mount();
  }, []);

  return (
    <>
      <div className="review">
        <h2>Tak oceniają nas klienci</h2>
        <div className="review_image">
          <div className="glide">
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides">
                <li className="glide__slide">
                  <div className="glide__slide_wrapper">
                  <span className="customer_review">
                    Mam przyjemność polecić firmę [nazwa firmy] wszystkim,
                    którzy szukają mebli kuchennych na wymiar. Meble, które
                    zamówiłam, są wykonane z najwyższej jakości materiałów i
                    wyglądają przepięknie. Jestem bardzo zadowolona z ich
                    funkcjonalności i trwałości.
                  </span>
                  <h3>⭐⭐⭐⭐⭐ Bogdan Nowak</h3>
                  </div>
                  <img src={img1}></img>
                </li>
                <li className="glide__slide">
                  <div className="glide__slide_wrapper">
                  <span className="customer_review">
                    Współpraca z firmą [nazwa firmy] była bardzo przyjemna.
                    Zespół fachowców dołożył wszelkich starań, aby spełnić moje
                    oczekiwania. Meble zostały wykonane zgodnie z moim
                    projektem, a wszystkie szczegóły zostały dopracowane.
                  </span>
                <h3>Zuzanna Kowalska</h3>
                <span>⭐⭐⭐⭐⭐ </span>
                  </div>
                  <img src={img2}></img>
                </li>
                <li className="glide__slide">
                  <div className="glide__slide_wrapper">
                  <span className="customer_review">
                    Jestem bardzo zadowolona z zakupu i z czystym sumieniem mogę
                    polecić firmę [nazwa firmy] wszystkim, którzy szukają mebli
                    kuchennych, które będą służyć przez wiele lat.
                  </span>
                  <h3>⭐⭐⭐⭐⭐ Iga Wiśniewska</h3>
                  </div>
                  <img src={img3}></img>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
