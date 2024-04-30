import { useEffect, useRef, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import "../assets/style/quotation.scss";

import emailjs from "emailjs-com";

export const Quotation = () => {

  interface formData {
    ogólne: {
      "Wysokosc pomieszczenia ( w centymetrach )": number;
      "Zabudowa do sufitu": boolean;
      "Rodzaj płyty na korpus szafek": string;
    };

    zabudowaDolna: {
      "Długość zabudowy ( w centymetrach )": number;
      "Ilość szafek": number;
      "Ilość szuflad": number;
      "Cargo nieskie": boolean;
      "Rodzaj frontów": string;
      "Rodzaj blatu": string;
    };

    zabudowaGorna: {
      "Długość zabudowy ( w centymetrach )": number;
      "Wysokość zabudowy ( w centymetrach )": number;
      "Ilość szafek": number;
      "Rodzaj frontów": string;
      "Oświtlenie LED": boolean;
    };

    zabudowaWysoka: {
      "Długość zabudowy ( w centymetrach)": number;
      "Wysokość zabudowy ( w centymetrach)": number;
      "Ilość szafek": number;
      "Ilość szufled": number;
      "Cargo wysokie": boolean;
      "Rodzaj frontów": string;
    };

    transportMontaz: {
      "Odległość w km": number;
      "Opcja montażu": boolean;
    };
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [database, setDatabase] = useState<object[]>();

  const [formData, setFormData] = useState<formData>({
    ogólne: {
      "Wysokosc pomieszczenia ( w centymetrach )": 0,
      "Zabudowa do sufitu": false,
      "Rodzaj płyty na korpus szafek": "",
    },

    zabudowaDolna: {
      "Długość zabudowy ( w centymetrach )": 0,
      "Ilość szafek": 0,
      "Ilość szuflad": 0,
      "Cargo nieskie": false,
      "Rodzaj frontów": "",
      "Rodzaj blatu": "",
    },

    zabudowaGorna: {
      "Długość zabudowy ( w centymetrach )": 0,
      "Wysokość zabudowy ( w centymetrach )": 0,
      "Ilość szafek": 0,
      "Rodzaj frontów": "",
      "Oświtlenie LED": false,
    },

    zabudowaWysoka: {
      "Długość zabudowy ( w centymetrach)": 0,
      "Wysokość zabudowy ( w centymetrach)": 0,
      "Ilość szafek": 0,
      "Ilość szufled": 0,
      "Cargo wysokie": false,
      "Rodzaj frontów": "",
    },

    transportMontaz: {
      "Odległość w km": 0,
      "Opcja montażu": false,
    },
  });

  // Pobieranie cen z bazy danych 

  useEffect(() => {
    const priceRef = collection(db, "database");
    const queryMessages = query(priceRef);

    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let data: any[] = [];
      snapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      console.log(data)
      setDatabase(data);
    });

    return () => unsuscribe();
  }, []);

  //

  const refUpper = useRef(null);
  const refLower = useRef(null);
  const refHigh = useRef(null);
  const refAdittional = useRef(null);

  const click = () => {
    const fixDiv = document.querySelector(".centered-fixed-div");

    fixDiv?.classList.add("centered-fixed-div-active");
  };

  const close = () => {
    const fixDiv = document.querySelector(".centered-fixed-div");

    fixDiv?.classList.remove("centered-fixed-div-active");
  };

  const sendForm = (e: any) => {
    e.preventDefault();

    const showError = (element: any, id: number, test: string) => {
      const span = document.createElement("span");

      span.classList.add("test");

      span.innerText = test;

      e.target.parentNode.children[id].append(span);
      // alert("sss");
      console.log(e);
    };

    // Funkcja sprawdzająca poprwanośc wypełnienia formularza
    const validateForm = (e: any) => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,6}$/;
      const phoneRegex = /^(?:[0-9] ?){6,14}[0-9]$/;

      let error = 0;

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

      // Zwracam czy licznik błędów jest wiekszy od zera
      return error === 0 ? true : false;
    };

    if (validateForm(e)) {
      const sendButton = document.querySelector(
        ".centered-fixed-div_button"
      ) as HTMLElement;

      sendButton.style.backgroundColor = "silver";
      sendButton.innerText = ".................";

      emailjs
        .sendForm(
          "service_tp2r4tc",
          "template_63cwz16",
          "xxxx",
          "uoa8cmJT5xHCmLk4H"
        )
        .then(
          (result) => {
            showResault("successful");
          },
          (error) => {
            showResault("error");
          }
        );
    }
  };

  // Funkcaj wyświetla wynik wysyłania formularza
  const showResault = (typeResault: string) => {
    const sendButton = document.querySelector(
      ".centered-fixed-div_button"
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

  const calculatePrice = () => {

    const montaz = () => {

      // Szukam obiektu z ceną za robocizne
      const robociznaObject: any = database?.find((obj: any) => obj.id === "robocizna");
      // Sprawdzam cenę opcji montazu
      const userMontaz = formData.transportMontaz["Opcja montażu"]
      // Zapisuje cene montazu
      const priceMontaz = robociznaObject?.['montaz']
      // Zwracam cenę jezeli uzytkownik wybrał opcję montazu
      return userMontaz ? priceMontaz : 0
    }

    const transport = () => {
      const robociznaObject: any = database?.find((obj: any) => obj.id === "robocizna");
      const cenaTransportu: number = Number(robociznaObject?.transport)
      const userTransport = formData.transportMontaz["Odległość w km"]

      return userTransport === 0 ? 0 : userTransport * cenaTransportu
    }

    const nozki = () => {
      const akcesoriaObject: any = database?.find((obj: any) => obj.id === "akcesoria");
      const cenaNozki = Number(akcesoriaObject?.nozka)
      const userTransport = formData.zabudowaDolna["Ilość szafek"]
      const userTransport1 = formData.zabudowaWysoka["Ilość szafek"]

      return ((userTransport + userTransport1) * 4) * cenaNozki
    }

    const zawiasy = () => {
      const akcesoriaObject: any = database?.find((obj: any) => obj.id === "akcesoria");
      const cenaZawaisy = Number(akcesoriaObject?.zawias)
      const userTransport = formData.zabudowaDolna["Ilość szafek"]
      const userTransport2 = formData.zabudowaGorna["Ilość szafek"]
      const userTransport3 = formData.zabudowaWysoka["Ilość szafek"]

      return ((userTransport + userTransport2 + (userTransport3 * 2)) * 2) * cenaZawaisy

    }

    const lightLed = () => {
      // Szukam objektu z id 'robocizna' w bazie 
      const findObjectR: any = database?.find((obj: any) => obj.id === "robocizna");
      // Szukam objektu z id 'akcesoria' w bazie 
      const findObjectA: any = database?.find((obj: any) => obj.id === "akcesoria");
      // Pobieram cene za klejenie LED
      const priceGluingLed = Number(findObjectR?.["klejenie led"])
      // Pobieram cene za taśme LED
      const priceLedStrip = Number(findObjectA?.["tasma led"])
      // Pobieram cene za profil LED
      const priceProfil = Number(findObjectA?.["profil led"])
      // Pobieram cene za zasilacz LED
      const pricePowerSupply = Number(findObjectA?.["zasilacz led"])
      // Pobieram cene za włącznik LED
      const priceLedSwitch = Number(findObjectA?.["wlacznik led"])
      // Pobieram wartość boolen czy został zaznaczony checkbox 'Oświtlenie LED'
      const userSelectLightLed = formData.zabudowaGorna["Oświtlenie LED"]
      // Pobieram długość zabudowy podanej przez uzytkownika
      const userInputConstructionLength = formData.zabudowaGorna["Długość zabudowy ( w centymetrach )"]


      // Obliczam i zwracam cenę za oświtlenie LED, jezeli uzytkownik nie wybrał to zwracam 0 i jezeli brak długości zabudowy zwracam 0

      return userSelectLightLed && userInputConstructionLength != 0 ? (userInputConstructionLength / 100 ) * (priceGluingLed + priceProfil + priceLedStrip) + pricePowerSupply + priceLedSwitch : 0

    }

    const highCargo = () => {

      const userSelectHightCargo = formData.zabudowaWysoka["Cargo wysokie"]

      const findObjectA: any = database?.find((obj: any) => obj.id === "akcesoria");

            // Pobieram cene za profil LED
            const priceProfil = Number(findObjectA?.["cargo wysokie"])


            return userSelectHightCargo ? priceProfil : 0

    }

    const lowCargo = () => {

      const userSelectHightCargo = formData.zabudowaDolna["Cargo nieskie"]

      const findObjectA: any = database?.find((obj: any) => obj.id === "akcesoria");

            // Pobieram cene za profil LED
            const priceProfil = Number(findObjectA?.["cargo niskie"])


            return userSelectHightCargo ? priceProfil : 0

    }

    const szuflady = () => {

      const findObjectA: any = database?.find((obj: any) => obj.id === "akcesoria");

      const pricePowerSupply = Number(findObjectA?.["szuflada"])

      const userInputConstructionLength = formData.zabudowaWysoka["Ilość szufled"]
      const userInputConstructionLength1 = formData.zabudowaDolna["Ilość szuflad"]


        return (userInputConstructionLength + userInputConstructionLength1) * pricePowerSupply
    }

    const blat = () => {
      // Szukam objektu 'blaty' z cenami 
      const findObjectA: any = database?.find((obj: any) => obj.id === "blaty");
      // Pobieram jaki rodzaj blatu wybrał uzytkownik 
      const userInputConstructionLength1 = formData.zabudowaDolna["Rodzaj blatu"].toLowerCase()
      // Pobieram cene blatu wybranego przez uzytkownika
      const tess = userInputConstructionLength1 && findObjectA[userInputConstructionLength1]


      const userInputConstructionLength = formData.zabudowaDolna["Długość zabudowy ( w centymetrach )"]

      return (userInputConstructionLength / 100) * tess
    }

    const obrzeza = () => {

      const userInputConstructionLength1 = formData.zabudowaDolna["Długość zabudowy ( w centymetrach )"]
      const userInputConstructionLength2 = formData.zabudowaDolna["Ilość szafek"]

      const zdd = (userInputConstructionLength1 * 3 + 2 * userInputConstructionLength2 * 72 )/ 100

      const userInputConstructionLength3 = formData.zabudowaGorna["Długość zabudowy ( w centymetrach )"]
      const userInputConstructionLength4 = formData.zabudowaGorna["Wysokość zabudowy ( w centymetrach )"]
      const userInputConstructionLength5 = formData.zabudowaGorna["Ilość szafek"]
      const userInputConstructionLength44 =  Math.floor(userInputConstructionLength4 /30);

      const sdas = (userInputConstructionLength3 * (2 + userInputConstructionLength44) + userInputConstructionLength4 * userInputConstructionLength5 * 2) / 100

      const userInputConstructionLength6 = formData.zabudowaWysoka["Długość zabudowy ( w centymetrach)"]
      const userInputConstructionLength7 = formData.zabudowaWysoka["Wysokość zabudowy ( w centymetrach)"]
      const userInputConstructionLength8 = formData.zabudowaWysoka["Ilość szafek"]

      const dgfsd = (userInputConstructionLength6 * 7 + userInputConstructionLength7 *  userInputConstructionLength8 * 2) / 100

      const dsfgs = (zdd + sdas + dgfsd) * 1.2

      const findObjectA: any = database?.find((obj: any) => obj.id === "blaty");

      const pricePowerSupply = Number(findObjectA?.["zasilacz led"])

      return dsfgs 

    }

    const frontyWysokie = () => {

      const userInputConstructionLength6 = formData.zabudowaWysoka["Długość zabudowy ( w centymetrach)"]
      const userInputConstructionLength7 = formData.zabudowaWysoka["Wysokość zabudowy ( w centymetrach)"]
      const userInputConstructionLength70 = formData.zabudowaWysoka["Rodzaj frontów"].toLowerCase()

      const fgh = userInputConstructionLength6 * (userInputConstructionLength7 -10)/10000

      const findObjectA: any = database?.find((obj: any) => obj.id === "fronty");

      const pricePowerSupply3 = Number(findObjectA?.["lakierowane"])
      const pricePowerSupply12 = Number(findObjectA?.["lakierowane z frezowanym uchwytem"])
      const pricePowerSupply = Number(findObjectA?.["laminowane"])
      const pricePowerSupply234 = Number(findObjectA?.["fornirowane"])
      const pricePowerSupply4 = Number(findObjectA?.["drewniane"])

      const sada = userInputConstructionLength70 != '' ? findObjectA?.[userInputConstructionLength70] : 0



      return Math.floor(fgh * sada * 100) / 100

    }



    console.log('xxx', montaz(), transport(), nozki(), zawiasy(), lightLed(), highCargo(), lowCargo(), szuflady(), blat(), obrzeza(), frontyWysokie())
    
    const robocizna = () => {
      
      // Szukam obiektu z ceną za robocizne
      const robociznaObject: any = database?.find((obj: any) => obj.id === "robocizna");
      const cenaMontazu: number = Number(robociznaObject?.transport)
      // Wyodrębniam ceny za robocizne
      const cenaTransportu: number = Number(robociznaObject?.transport)
      const cenaKlejenieLed: number = Number(robociznaObject?.['klejenie led'])
      const cenaZasilacz: number = Number(robociznaObject?.['montaz zasilacza led'])

      // Wyodrębniam dane wprowadzone przez uzytkownika
      const userTransport = formData.transportMontaz["Odległość w km"]
      const userSelectLed = formData.zabudowaGorna["Oświtlenie LED"]

      // Obliczam cenę

      const price = userSelectLed ? ((cenaZasilacz + cenaKlejenieLed) + (cenaTransportu * userTransport)) : (cenaTransportu * userTransport)
      
      
      console.log(userSelectLed)

      return price

    }

    robocizna()










    const dlugosc = formData.zabudowaGorna["Długość zabudowy ( w centymetrach )"];
    const wysokosc = formData.zabudowaGorna["Wysokość zabudowy ( w centymetrach )"];
    const szafki = 3;
    const fronty = 2;
    const szuflady1 = 2;

    const zabudowaGorna = () => {
      const poleZabudowyGornej = dlugosc * wysokosc;

      const rodzajFrontow = fronty * 50;

      const cenaSzuflady = szuflady1 * 150;

      const cenaFrontów = fronty * 300;

      return (
        poleZabudowyGornej * 500 + rodzajFrontow + cenaSzuflady + cenaFrontów
      );
    };

    const zabudowaDolna = () => {
      const polePowieszchniDolnej = 300 * 100;

      const nisieCargo = 1;

      const sustemNarozny = 1;

      const iloscSzafek = 10;

      const iloscSzuflad = 10;

      return (
        iloscSzuflad * 100 +
        iloscSzafek * 150 * (sustemNarozny * 400) +
        nisieCargo * 200 +
        polePowieszchniDolnej
      );
    };

    const zabudowaWysoka = () => {
      const lodowka = 1;
      const pikaznik = 1;
      const szerokosc = 1;
      const rodzajFrontow = 1;
      const szuflady = 5;
      const szafki = 5;

      return (
        lodowka * 400 +
        pikaznik * 500 +
        rodzajFrontow * 1000 +
        szuflady * 600 +
        szafki * 4000 +
        szerokosc * 1000
      );
    };

    const dodatkowe = () => {
      const cos = 555;

      return cos;
    };

    console.log(formData);

    return montaz() + transport() + nozki() + zawiasy();
  };

  return (
    <div className="quotation">
      <div className="quotation_photo">
        <h2>Wycena mebli kuchennych</h2>
        <img
          src={require("../assets/img/tttttjpgt.jpeg")}
          alt="Zdjęcie mebli kuchennych"
        />
      </div>

      <div className="quotation_calculator">
        <div className="quotation_calculator_upperconstruction">
          <h3>Ogólne</h3>

          <form className="quotation_calculator_upperconstruction_form">
            <label>Wysokość pomieszczenia ( w centymetrach )</label>
            <input
              type="number"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  ogólne: {
                    ...prevState.ogólne,
                    "Wysokosc pomieszczenia ( w centymetrach )": Number(
                      e.target.value
                    ),
                  },
                }))
              }
            ></input>

            <label>Zabudowa do sufitu</label>
            <input
              type="checkbox"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  ogólne: {
                    ...prevState.ogólne,
                    "Zabudowa do sufitu": Boolean(e.target.checked),
                  },
                }))
              }
            />

            <label>Rodzaj płyty na korpusy szafek</label>
            <select
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  ogólne: {
                    ...prevState.ogólne,
                    "Rodzaj płyty na korpus szafek": e.target.value,
                  },
                }))
              }
            >
              <option value="">wybierz ...</option>
              <option value="Drewniane">Drewniane</option>
              <option value="Korpusowa biała">Korpusowa biała</option>
            </select>
          </form>
        </div>

        <div className="quotation_calculator_upperconstruction">
          <h3>Zabudowa dolna</h3>

          <form
            ref={refUpper}
            className="quotation_calculator_upperconstruction_form"
          >
            <label>Długość dolnej zabudowy ( w centymetrach )</label>
            <input
              type="number"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  zabudowaDolna: {
                    ...prevState.zabudowaDolna,
                    "Długość zabudowy ( w centymetrach )": Number(
                      e.target.value
                    ),
                  },
                }))
              }
            ></input>

            <label>Ilość szafek</label>
            <input
              type="number"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  zabudowaDolna: {
                    ...prevState.zabudowaDolna,
                    "Ilość szafek": Number(e.target.value),
                  },
                }))
              }
            ></input>

            <label>Ilość szuflad</label>
            <input
              type="number"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  zabudowaDolna: {
                    ...prevState.zabudowaDolna,
                    "Ilość szuflad": Number(e.target.value),
                  },
                }))
              }
            ></input>

            <label>Cargo niskie</label>
            <input
              type="checkbox"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  zabudowaDolna: {
                    ...prevState.zabudowaDolna,
                    "Cargo nieskie": Boolean(e.target.checked),
                  },
                }))
              }
            />

            <label>Rodzaj frontów</label>
            <select
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  zabudowaDolna: {
                    ...prevState.zabudowaDolna,
                    "Rodzaj frontów": e.target.value,
                  },
                }))
              }
            >
              <option value="">wybierz ...</option>
              <option value="Lakierowane">Lakierowane</option>
              <option value="Lakierowane z frezowanym uchwytem">
                Lakierowane z frezowanym uchwytem
              </option>
              <option value="Laminowane">Laminowane</option>
              <option value="Fornirowane">Fornirowane</option>
              <option value="Drewniane">Drewniane</option>
            </select>

            <label>Rodzaj blatu</label>
            <select
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  zabudowaDolna: {
                    ...prevState.zabudowaDolna,
                    "Rodzaj blatu": e.target.value,
                  },
                }))
              }
            >
              <option value="">wybierz ...</option>
              <option value="Laminowany">Laminowany</option>
              <option value="Drewniany">Drewniany</option>
              <option value="Brak">Brak</option>
            </select>
          </form>
        </div>
        <div className="quotation_calculator_upperconstruction">
          <h3>Zabudowa górna</h3>
          <form
            ref={refLower}
            className="quotation_calculator_upperconstruction_form"
          >
            <label>Długość górnej zabudowy ( w centymetrach )</label>
            <input
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  zabudowaGorna: {
                    ...prevState.zabudowaGorna,
                    "Długość zabudowy ( w centymetrach )": Number(
                      e.target.value
                    ),
                  },
                }))
              }
            ></input>
            <label>Wysokość zabudowy ( w centymetrach )</label>
            <input
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  zabudowaGorna: {
                    ...prevState.zabudowaGorna,
                    "Wysokość zabudowy ( w centymetrach )": Number(
                      e.target.value
                    ),
                  },
                }))
              }
            ></input>

            <label>Ilość szafek</label>
            <input
              type="number"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  zabudowaGorna: {
                    ...prevState.zabudowaGorna,
                    "Ilość szafek": Number(e.target.value),
                  },
                }))
              }
            ></input>

            <label>Rodzaj frontów</label>
            <select
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  zabudowaGorna: {
                    ...prevState.zabudowaGorna,
                    "Rodzaj frontów": e.target.value,
                  },
                }))
              }
            >
              <option value="">wybierz ...</option>
              <option value="Lakierowane">Lakierowane</option>
              <option value="Lakierowane z frezowanym uchwytem">
                Lakierowane z frezowanym uchwytem
              </option>
              <option value="Laminowane">Laminowane</option>
              <option value="Fornirowane">Fornirowane</option>
              <option value="Drewniane">Drewniane</option>
            </select>

            <label>Oświetlenie LED</label>
            <input
              type="checkbox"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  zabudowaGorna: {
                    ...prevState.zabudowaGorna,
                    "Oświtlenie LED": Boolean(e.target.checked),
                  },
                }))
              }
            />
          </form>
        </div>
        <div className="quotation_calculator_highconstruction">
          <h3>Zabudowa wysoka</h3>
          <form
            ref={refHigh}
            className="quotation_calculator_highconstruction_form"
          >
            <label>Długość zabudowy ( w centymetrach )</label>
            <input
              type="number"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  zabudowaWysoka: {
                    ...prevState.zabudowaWysoka,
                    "Długość zabudowy ( w centymetrach)": Number(
                      e.target.value
                    ),
                  },
                }))
              }
            ></input>

            <label>Wysokość zabudowy ( w centymetrach )</label>
            <input
              type="number"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  zabudowaWysoka: {
                    ...prevState.zabudowaWysoka,
                    "Wysokość zabudowy ( w centymetrach)": Number(
                      e.target.value
                    ),
                  },
                }))
              }
            ></input>

            <label>Ilość szafek</label>
            <input
              type="number"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  zabudowaWysoka: {
                    ...prevState.zabudowaWysoka,
                    "Ilość szafek": Number(e.target.value),
                  },
                }))
              }
            ></input>

            <label>Ilość szuflad</label>
            <input
              type="number"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  zabudowaWysoka: {
                    ...prevState.zabudowaWysoka,
                    "Ilość szufled": Number(e.target.value),
                  },
                }))
              }
            ></input>

            <label>Cargo wysokie</label>
            <input
              type="checkbox"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  zabudowaWysoka: {
                    ...prevState.zabudowaWysoka,
                    "Cargo wysokie": Boolean(e.target.checked),
                  },
                }))
              }
            />

            <label>Rodzaj frontów</label>
            <select
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  zabudowaWysoka: {
                    ...prevState.zabudowaWysoka,
                    "Rodzaj frontów": e.target.value,
                  },
                }))
              }
            >
              <option value="">wybierz ...</option>
              <option value="Lakierowane">Lakierowane</option>
              <option value="Lakierowane z frezowanym uchwytem">
                Lakierowane z frezowanym uchwytem
              </option>
              <option value="Laminowane">Laminowane</option>
              <option value="Fornirowane">Fornirowane</option>
              <option value="Drewniane">Drewniane</option>
            </select>
          </form>
        </div>
        <div className="quotation_calculator_additional">
          <form
            ref={refAdittional}
            className="quotation_calculator_additional_form"
          >
            <h3>Transport i montaż</h3>
            <label>Odległość w km od miejscowaści Małkinia Górna</label>

            <input
              type="number"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  transportMontaz: {
                    ...prevState.transportMontaz,
                    "Odległość w km": Number(e.target.value),
                  },
                }))
              }
            ></input>

            <label>Opcja montażu</label>
            <input
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  transportMontaz: {
                    ...prevState.transportMontaz,
                    "Opcja montażu": Boolean(e.target.checked),
                  },
                }))
              }
              type="checkbox"
            />
          </form>
        </div>
        <div className="quotation_calculator_summary">
          <button
            className="quotation_calculator_summary_button"
            onClick={click}
          >
            Wyślij swoją wycenę, oddzwonimy do Ciebie
          </button>
          <div className="quotation_calculator_summary_price">
            <p>{calculatePrice()}</p>
            <span>* wycena nie stanowi oferty handlowej</span>
            <button onClick={calculatePrice}>TEST</button>
          </div>
        </div>
      </div>

      <div className="centered-fixed-div">
        <span onClick={close} className="centered-fixed-div-close">
          X
        </span>

        <h3>Wyślij wycenę</h3>

        <span>
          Prześlij nam swoją wycenę. Po zweryfikowaniu skontaktujemy się w celu
          omówienia dalszej współpracy.
        </span>

        <form>
          <div className="centered-fixed-div_form_box">
            <label>Imię i Nazwisko</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          <div className="centered-fixed-div_form_box">
            <label>Adres e-mail</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>

          <div className="centered-fixed-div_form_box">
            <label>Numer telefonu</label>
            <input
              type="number"
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </div>

          <div className="centered-fixed-div_form_box">
            <label>Dodatkowe informacje</label>
            <textarea onChange={(e) => setMessage(e.target.value)}></textarea>
          </div>

          <button
            className="centered-fixed-div_button"
            onClick={(e) => sendForm(e)}
          >
            Wyślij
          </button>
        </form>

        <span></span>
      </div>
    </div>
  );
};
