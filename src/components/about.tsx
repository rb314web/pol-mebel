import { useEffect } from "react";
import "../assets/style/about.scss";

import AOS from "aos";
import "aos/dist/aos.css";

export const About = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="about">
      <h2 data-aos="fade-down" data-aos-duration="1000">
        Trochę o nas
      </h2>

      <div className="about_content">
        <div className="about_content_box">
          <h3>Historia</h3>
          <p>
            Nasza firma powstała z pasji do tworzenia unikalnych i
            spersonalizowanych mebli, które doskonale wpisują się w indywidualne
            potrzeby każdego klienta. Bez względu na to, czy szukasz mebli do
            swojego domu, biura, restauracji czy hotelu, jesteśmy gotowy, by
            przekształcić Twoje wizje w rzeczywistość.
          </p>
        </div>
        <div className="about_content_box">
          <h3>Misja</h3>
          <p>
            Misją firmy POL-MEBEL jest spełnianie potrzeb i oczekiwania
            klientów. Firma chce, aby jej meble były nie tylko piękne, ale też
            funkcjonalne i trwałe. Firma chce, aby jej klienci byli zadowoleni z
            zakupionych mebli i polecali je swoim znajomym.
          </p>
        </div>
        <div className="about_content_box">
          <h3>Wizja</h3>
          <p>
            Wizją firmy jest tworzenie mebli, które będą zmieniać
            wnętrza na lepsze. Firma chce być liderem w zakresie mebli na
            wymiar, oferując swoim klientom najwyższą jakość, funkcjonalność i
            indywidualność.
          </p>
        </div>
      </div>
    </div>
  );
};
