import React, { useState } from "react";
import "../assets/style/contact.scss";

import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "emailjs-com";

import { easeOut, motion } from "framer-motion";

import { ReactComponent as FacebookSvg } from "../assets/img/facebook.svg";
import { ReactComponent as InstagramSvg } from "../assets/img/instagram.svg";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);

  const apikey: string = process.env.REACT_APP_CAPTCHA_API_KEY_EXT!.toString();

  const onCaptchaChange = (value: any) => {
    setCaptchaValue(value);
  };

  const sendEmail = (e: any) => {
    // Wyłączenie domyślnego odświeżania strony
    e.preventDefault();

    const showError = (element: any, id: number, text: string) => {
      // Tworzę element span
      const span = document.createElement("span");

      // Dodaję do stworzonego elementu spam klasę test
      span.classList.add("test");

      // Dodaję do elementu zawartość z podaną w parametrach
      span.innerText = text;

      // Dodaję delement na stronę
      e.target[id].parentElement.append(span);
    };

    // Funkcja sprawdzająca poprwanośc wypełnienia formularza
    const validateForm = (e: any) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,6}$/;
      const phoneRegex = /^(?:[0-9] ?){6,14}[0-9]$/;

      let error = 0;

      // document
      //   .querySelectorAll(".contact_form_box_input")
      //   .forEach((item: any) => {
      //     item.style.border = "1px solid black";
      //   });

      // const x = document.querySelector(
      //   ".contact_form_box_textarea"
      // ) as HTMLElement;
      // x.style.border = "1px solid black";

      // Usuwam informację o błędzie jesli takie są
      document.querySelectorAll(".test").forEach((item) => {
        item.remove();
      });

      // Sprawdzam poprawność wypełnienia i zgodności wpisanych danych
      if (!name) {
        // e.target.lastChild.form[0].style.border = "1px solid red";
        error++;
        showError(e, 0, "Pole jest wymagane");
      }
      if (!emailRegex.test(email)) {
        // e.target.lastChild.form[1].style.border = "1px solid red";
        error++;
        showError(e, 1, "Nieprawidłowy email");
      }
      if (!phoneRegex.test(phone)) {
        // e.target.lastChild.form[2].style.border = "1px solid red";
        error++;
        showError(e, 2, "Nieprawidłowy telefon");
      }
      if (subject === "") {
        // e.target.lastChild.form[3].style.border = "1px solid red";
        error++;
        showError(e, 3, "Pole jest wymagane");
      }
      if (!message) {
        // e.target.lastChild.form[4].style.border = "1px solid red";
        error++;
        showError(e, 4, "Pole jest wymagane");
      }
      if (!captchaValue) {
        error++;
        showError(e, 5, "Pole jest wymagane");
      }

      // Zwracam czy licznik błędów jest wiekszy od zera
      return error === 0 ? true : false;
    };

    //Jezeli dane sa poprawne wysyłane wysyłam formularz
    if (validateForm(e)) {
      const sendButton = document.querySelector(
        ".contact_forminfo_form_button"
      ) as HTMLElement;
      sendButton.style.backgroundColor = "silver";
      sendButton.innerText = ".................";

      emailjs
        .sendForm(
          "service_tp2r4tc",
          "template_96un6im",
          e.target,
          "uoa8cmJT5xHCmLk4H"
        )
        .then(
          (result) => {
            showResault("successful");
            setName("");
            setEmail("");
            setSubject("");
            setPhone("");
            setMessage("");
          },
          (error) => {
            console.log(error.text);
            showResault("error");
          }
        );
    }
  };

  // Funkcaj wyświetla wynik wysyłania formularza
  const showResault = (typeResault: string) => {
    const sendButton = document.querySelector(
      ".contact_forminfo_form_button"
    ) as HTMLElement;

    if (typeResault === "successful") {
      sendButton.style.backgroundColor = "green";
      sendButton.innerText = "Pomyślnie wysłano!";
      setTimeout(() => {
        sendButton.style.backgroundColor = "#365956";
        sendButton.innerText = "Wyślij";
      }, 3000);
    } else if (typeResault === "error") {
      sendButton.style.backgroundColor = "red";
      sendButton.innerText = "Błąd wysyłania";
      setTimeout(() => {
        sendButton.style.backgroundColor = "#8d7272";
        sendButton.innerText = "Wyślij";
      }, 3000);
    }
  };

  return (
    <motion.div
      className="contact"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: easeOut }}
    >
      <div className="contact_map">
        <iframe
          id="map"
          title="contact_map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1812.6956412520638!2d22.0384079579697!3d52.71659109291345!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471fa81ea1f65359%3A0x9d5c7be42a3942cc!2sPol-Mebel%20Polak%20Halina!5e0!3m2!1spl!2spl!4v1700518727366!5m2!1spl!2spl"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="contact_forminfo">
        <form className="contact_forminfo_form" onSubmit={(e) => sendEmail(e)}>
          <h2>Skontaktuj się z nami</h2>

          <p>
            Oferujemy szeroki wybór mebli na wymiar, wykonanych z najwyższej
            jakości materiałów. Nasz zespół fachowców pomoże Ci wybrać meble,
            które będą spełniały Twoje oczekiwania. Zadzwoń lub napisz do nas, a
            przygotujemy dla Ciebie bezpłatną wycenę!
          </p>

          <div className="contact_forminfo_form_box">
            <label htmlFor="user_name">Imię i nazwisko</label>
            <input
              type="text"
              className="contact_forminfo_form_box_input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="user_name"
              id="user_name"
            />
          </div>

          <div className="contact_forminfo_form_box">
            <label htmlFor="user_email">Adres e-mail </label>
            <input
              type="email"
              className="contact_forminfo_form_box_input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="user_email"
              id="user_email"
            />
          </div>

          <div className="contact_forminfo_form_box">
            <label htmlFor="user_phone">Numer telefonu</label>
            <input
              type="text"
              className="contact_forminfo_form_box_input"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              name="user_phone"
              id="user_phone"
            />
          </div>
          <div className="contact_forminfo_form_box">
            <label htmlFor="user_topic">Temat</label>
            <input
              type="text"
              className="contact_forminfo_form_box_input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              name="user_topic"
              id="user_topic"
            />
          </div>

          <div className="contact_forminfo_form_box">
            <label htmlFor="user_message">Wiadomość</label>
            <textarea
              className="contact_forminfo_form_box_textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              name="user_message"
              id="user_message"
            />
          </div>

          <div className="contact_forminfo_form_box">
            <ReCAPTCHA sitekey={apikey} onChange={onCaptchaChange} hl="pl" />
          </div>

          <button className="contact_forminfo_form_button" type="submit">
            Wyślij
          </button>
        </form>

        <div className="contact_forminfo_info">
          <h2>Dane firmy</h2>
          <p className="company">Pol-Mebel Halina Polak</p>
          <h3>Adres</h3>
          <p>Kańkowo 113a, 07-320 Małkinia Górna</p>
          <h3>Kontakt</h3>
          <p>
            E-mail:
            <a href="mailto:polmebel@polmebel.pl"> polmebel@polmebel.pl</a>
          </p>
          <p>
            Telefon:<a href="tel:+48 602 473 626"> +48 602 473 626</a>
          </p>

          <div className="contact_forminfo_info_social">
            <h2>Znajdź nas w internecie</h2>
            <a
              href="https://www.facebook.com/profile.php?id=100063695841909"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Odwiedź nas na Facebooku!"
            >
              <FacebookSvg />
            </a>
            <a
              href="https://www.instagram.com/pol_mebel/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Odwiedź nas na Instagramie!"
            >
              <InstagramSvg />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
