import "../assets/style/realization.scss";
import { useEffect, useState } from "react";

import FsLightbox from "fslightbox-react";

import Macy from "macy";

import { AsyncImage } from 'loadable-image'
import { Blur, Grow, Slide } from 'transitions-kit'

export const Realization = () => {
  const [toggler, setToggler] = useState(false);

  useEffect(() => {
    require("fslightbox");

    var macy = Macy({
      container: ".realization_gallery",
      trueOrder: false,
      waitForImages: false,
      margin: 24,
      columns: 4,
      breakAt: {
        1200: 3,
        940: 2,
        520: 1,
        400: 1,
      },
    });
  });

  const images = importAll(
    require.context("../assets/img/realization", false, /\.(png|jpe?g|svg)$/)
  );

  const imagesMini = importAll(
    require.context("../assets/img/realization/mini", false, /\.(png|jpe?g|svg)$/)
  );

  function importAll(r) {
    console.log(r.keys().map(r));
    return r.keys().map(r);
  }

  return (
    <div className="realization">
      <div className="realization_hero">
        <h1>Meble kuchenne na zamówienie</h1>
        <p>
          Zapraszamy do obejrzenia galerii zdjęć zrealizowanych przez nas
          projektów kuchni. Znajdziesz tu inspiracje dla każdego stylu – od
          klasycznych i eleganckich kuchni, po nowoczesne i minimalistyczne
          aranżacje.
        </p>
      </div>

      <div className="realization_gallery">
        {images.map((imagePath, index) => (
          <>
          {/* <a key={imagePath} data-fslightbox="gallery" href={imagePath}>
            <img key={imagePath} src={imagesMini[index]} alt="Zdjęcie mebli kuchennych" />
            </a> */}

            <a data-fslightbox="gallery" href={imagePath}>
            <AsyncImage
                    key={index}
                    src={imagePath}
                    style={{  borderRadius: 3 }}
                    loader={<div style={{ background: '#888' }} />}
                />
        </a>
        </>

        ))}

        <FsLightbox
          toggler={toggler}
          sources={images}
        />
      </div>
    </div>
  );
};
