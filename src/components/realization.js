import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import "../assets/style/realization.scss";

import imgKitchenMini from "../assets/img/mini/kitchen-mini.jpg";
import imgKitchen from "../assets/img/kitchen.jpg";
import imgKRoomMini from "../assets/img/room.jpg";
import imgKRoom from "../assets/img/room.jpg";

import { useEffect } from "react";

export const Realization = () => {
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: "#my-gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
  }, []);

  return (
    <div className="realization">
      <div className="realization_box">
        <div className="realization_box_info">
          <h2>Meble kuchenne</h2>
          <p>
            Dzięki precyzyjnemu rzemiosłu i starannie wybranym materiałom, nasze
            meble zapewniają trwałość na lata. Każdy element jest starannie
            skonstruowany, by sprostać Twoim oczekiwaniom odnośnie jakości.
          </p>
        </div>
        <div id="my-gallery" className="realization_box_image">
          <a
            href={imgKitchen}
            data-pswp-width="1920"
            data-pswp-height="1080"
            target="_blank"
          >
            <img src={imgKitchen} alt="" />
          </a>
        </div>
      </div>

      <div className="realization_box">
        <div className="realization_box_info">
          <h2>Salon</h2>
          <p>
            Zapraszamy do stworzenia salonu marzeń, gdzie spotkania rodzinne
            nabiorą nowego wymiaru, a wieczory spędzone w gronie bliskich będą
            niezapomniane. Nasze meble to nie tylko zakup, to inwestycja w
            wyjątkową przestrzeń domową.
          </p>
        </div>
        <div id="my-gallery" className="realization_box_image">
          <a
            href={imgKRoom}
            data-pswp-width="1920"
            data-pswp-height="1080"
            target="_blank"
          >
            <img src={imgKRoom} alt="" />
          </a>
        </div>
      </div>
    </div>
  );
};
