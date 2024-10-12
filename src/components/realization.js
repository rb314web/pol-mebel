import "../assets/style/realization.scss";
import { useEffect } from "react";

import FsLightbox from "fslightbox-react";

import { easeOut, motion } from "framer-motion";

import Macy from "macy";

import { AsyncImage } from 'loadable-image'

export const Realization = () => {

  useEffect(() => {
    require("fslightbox");

    // eslint-disable-next-line no-unused-vars
    const macy = Macy({
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
    require.context("../assets/img/realization", false, /\.(png|jpe?g|svg|webp)$/)
  );

  function importAll(r) {
    return r.keys().map(r);
  }

  return (
    <motion.div className="realization"  initial={{x:100, opacity:0}}
    animate={{ x: 0, opacity:1 }}
    transition={{ duration: .3, ease: easeOut }}>
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
            <a key={index} data-fslightbox="gallery" href={imagePath}>
            <AsyncImage
                    key={index}
                    src={imagePath}
                    alt='Zdjęcie realizacji'
                    style={{  borderRadius: 3 }}
                    loader={<div style={{ background: '#888' }} />}
                />
        </a>
        </>

        ))}

        <FsLightbox
          sources={images}
        />
      </div>
    </motion.div>
  );
};
