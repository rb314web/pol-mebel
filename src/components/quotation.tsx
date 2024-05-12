import {
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import "../assets/style/quotation.scss";
import { db } from "../firebase";

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

    // *** MONTAZ ***

    const installation = () => {

      // Szukam obiektu danych z ceną za robocizne
      const findObjectR: any = database?.find((obj: any) => obj.id === "robocizna");
      // Sprawdzam czy uzytkownik wybrał opcję montazu
      const userInstallation = formData.transportMontaz["Opcja montażu"]
      // Zapisuje cene montazu
      const priceInstallation = findObjectR?.['montaz']

      // Zwracam cenę jezeli uzytkownik wybrał opcję montazu, jezeli nie zwracam 0 
      return userInstallation ? priceInstallation : 0
    }

    // *** TRANSPORT ***

    const transport = () => {

      // Szukam obiektu danych z ceną za robocizne
      const findObjectR: any = database?.find((obj: any) => obj.id === "robocizna");
      // Zapisuje cenę za transportu
      const priceTransport: number = Number(findObjectR?.transport)
      // Pobieram odległośc wpisaną przez uzytkownika 
      const userInputTransport = formData.transportMontaz["Odległość w km"]

      // Zwracam obliczoną cenę za transport
      return userInputTransport === 0 ? 0 : userInputTransport * priceTransport
    }

    // *** NOZKI ***

    const legs = () => {

      // Szukam obiektu danych z ceną za akcesoria
      const findObjectA: any = database?.find((obj: any) => obj.id === "akcesoria");
      // Zapisuje cenę za nózek
      const priceLegs = Number(findObjectA?.nozka)
      // Pobieram podaną przez uzytkownika ilość szafek w zabudowie dolnej
      const userBuildLowerCabinet = formData.zabudowaDolna["Ilość szafek"]
      // Pobieram podaną przez uzytkownika ilość szafek w zabudowie wysokiej
      const userBuildHighCabinet = formData.zabudowaWysoka["Ilość szafek"]

      // Zwracam cenę za nózki 
      return ((userBuildLowerCabinet + userBuildHighCabinet) * 4) * priceLegs
    }

    // *** ZAWIASY ***

    const cabinets = () => {

      // Szukam obiektu danych z ceną za akcesoria
      const findObjectA: any = database?.find((obj: any) => obj.id === "akcesoria");
      // Zapisuje cenę za zawiasu
      const priceHinges = Number(findObjectA?.zawias)
      // Pobieram podaną przez uzytkownika ilość szafek w zabudowie dolnej
      const userBuildLowerCabinets = formData.zabudowaDolna["Ilość szafek"]
      // Pobieram podaną przez uzytkownika ilość szafek w zabudowie górnej
      const userBuildHihghCabinets = formData.zabudowaGorna["Ilość szafek"]
      // Pobieram podaną przez uzytkownika ilość szafek w zabudowie wysokiej
      const userBuildUpperCabinets = formData.zabudowaWysoka["Ilość szafek"]

      // Obliczam i zwracam cene za zawiasy
      return ((userBuildLowerCabinets + userBuildHihghCabinets + (userBuildUpperCabinets * 2)) * 2) * priceHinges
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

    // *** CARGO WYSOKIE ***

    const highCargo = () => {

      // Pobieram czy uzytkownik wybrał opcje wysokiego cargo
      const userSelectHightCargo = formData.zabudowaWysoka["Cargo wysokie"]
      // Szukam objektu z id 'akcesoria' w bazie 
      const findObjectA: any = database?.find((obj: any) => obj.id === "akcesoria");
      // Pobieram cene za profil LED
      const priceProfil = Number(findObjectA?.["cargo wysokie"])

      // Zwracam cenę wysokiego cargo
      return userSelectHightCargo ? priceProfil : 0
    }

    // *** CARGO NISKIE ***

    const lowCargo = () => {

      // Pobieram czy uzytkownik wybrał opcje niskiego cargo
      const userSelectHightCargo = formData.zabudowaDolna["Cargo nieskie"]
      // Szukam objektu z id 'akcesoria' w bazie 
      const findObjectA: any = database?.find((obj: any) => obj.id === "akcesoria");
      // Pobieram cene za profil LED
      const priceProfil = Number(findObjectA?.["cargo niskie"])

      // Zwracam cenę niskiego cargo
      return userSelectHightCargo ? priceProfil : 0
    }

    // *** SZUFLADY ***

    const drawers = () => {

      // Szukam objektu z id 'akcesoria' w bazie 
      const findObjectA: any = database?.find((obj: any) => obj.id === "akcesoria");
      // Pobieram cenę szuflady
      const priceDrawers = Number(findObjectA?.["szuflada"])
      // Pobieram podaną przez uzytkownika ilość szuflad w zabudowie wysokiej
      const userInputConstructionLength = formData.zabudowaWysoka["Ilość szufled"]
      // Pobieram podaną przez uzytkownika ilość szafek w zabudowie dolnej
      const userInputConstructionLength1 = formData.zabudowaDolna["Ilość szuflad"]

      // Zwracam cenę za szuflady
        return (userInputConstructionLength + userInputConstructionLength1) * priceDrawers
    }

    // *** BLAT ***

    const countertop = () => {
      // Szukam objektu 'blaty' z cenami 
      const findObjectA: any = database?.find((obj: any) => obj.id === "blaty");
      // Pobieram jaki rodzaj blatu wybrał uzytkownik 
      const userInputCountertopType = formData.zabudowaDolna["Rodzaj blatu"].toLowerCase()
      // Pobieram cene blatu wybranego przez uzytkownika
      const priceCountertop = userInputCountertopType && findObjectA[userInputCountertopType]
      // Pobieram długość blatu
      const userInputConstructionLength = formData.zabudowaDolna["Długość zabudowy ( w centymetrach )"]

      // Obliczam i zwracam cenę blatu
      return (userInputConstructionLength / 100) * priceCountertop
    }

    // *** OBRZEZA ***

    const circumcision = () => {

      // Pobieram dane wprowadzone przez uzytkownika w zabudowie dolnej
      const userBuildLowerLenght = formData.zabudowaDolna["Długość zabudowy ( w centymetrach )"]
      const userBuildLowerCabinets = formData.zabudowaDolna["Ilość szafek"]
      // Oblicam sume obrzezy w zabudowie dolnej
      const circumcisionBuildLower = (userBuildLowerLenght * 3 + 2 * userBuildLowerCabinets * 72 )/ 100

      // Pobieram dane wprowadzone przez uzytkownika w zabudowie górnej
      const userBuildHeightLength = formData.zabudowaGorna["Długość zabudowy ( w centymetrach )"]
      const userBuildHeightHeight = formData.zabudowaGorna["Wysokość zabudowy ( w centymetrach )"]
      const userBuildHeightCabinets = formData.zabudowaGorna["Ilość szafek"]
      const userInputConstructionLength44 =  Math.floor(userBuildHeightHeight /30);
      // Oblicam sume obrzezy w zabudowie górnej
      const circumcisionBuildHight = (userBuildHeightLength * (2 + userInputConstructionLength44) + userBuildHeightHeight * userBuildHeightCabinets * 2) / 100

      // Pobieram dane wprowadzone przez uzytkownika w zabudowie wysokiej
      const userBuildUpperLenght = formData.zabudowaWysoka["Długość zabudowy ( w centymetrach)"]
      const userBuildUpperHeight = formData.zabudowaWysoka["Wysokość zabudowy ( w centymetrach)"]
      const userBuildUpperCabinets = formData.zabudowaWysoka["Ilość szafek"]
      // Oblicam sume obrzezy w zabudowie wysokiej
      const circumcisionBuildUpper = (userBuildUpperLenght * 7 + userBuildUpperHeight *  userBuildUpperCabinets * 2) / 100

      // Obliczam i zwracam łączną ilość obrzeza [MB]
      const circumcisionSummary = (circumcisionBuildLower + circumcisionBuildHight + circumcisionBuildUpper) * 1.2

      // Pobieram cenę obrzeza za [MB]
            // Szukam objektu z id 'akcesoria' w bazie 
            const findObjectA: any = database?.find((obj: any) => obj.id === "obrzeze");
            
            // Pobieram typy obrzeza 
            const dsf = findObjectA && findObjectA["drewniane"]
            const ddsf = findObjectA && findObjectA["korpusowa biala"]

            const userBuildUpperCadfsgbinets = formData.ogólne["Rodzaj płyty na korpus szafek"].toLowerCase()

            const fedwf = findObjectA && findObjectA[userBuildUpperCadfsgbinets]




            // const userBsduildHeightLength = formData.


      return (circumcisionSummary * fedwf).toFixed(2)
    }

    // *** FRONTY WYSOKIE ** 

    const frontsHigh = () => {

      // Pobieram dane wprowadzone przez uzytkownika
      const userBuildHeightLength = formData.zabudowaWysoka["Długość zabudowy ( w centymetrach)"]
      const userBuildHeightHeight = formData.zabudowaWysoka["Wysokość zabudowy ( w centymetrach)"]
      const userBuildHeightFrontsType = formData.zabudowaWysoka["Rodzaj frontów"].toLowerCase()

      // Powieszchnia frontów wysokich
      const surfaceFrontsHigh = userBuildHeightLength * (userBuildHeightHeight -10)/10000

      // Pobieram objekt z id fronty w celu uzyskania ceny
      const findObjectF: any = database?.find((obj: any) => obj.id === "fronty");

      // Pobieranie ceny wybranej opcji frontów
      const priceSelectSurface = userBuildHeightFrontsType != '' ? findObjectF?.[userBuildHeightFrontsType] : 0

      // Obliczam i zwracam cenę za fronty wysokie
      return Math.floor(surfaceFrontsHigh * priceSelectSurface * 100) / 100
    }

    // *** PŁYTA KORPUSOWA ***

    const bodyPlate = () => {

      // Pobieram dane wprowadzone przez uzytkownika 
      const userBuildLowerLength: number = formData.zabudowaDolna["Długość zabudowy ( w centymetrach )"]
      const userBuildLowerCabinet: number = formData.zabudowaDolna["Ilość szafek"]
      const userBuildUpperLength: number = formData.zabudowaGorna["Długość zabudowy ( w centymetrach )"]
      const userBuildUpperCabinet: number = formData.zabudowaGorna["Ilość szafek"]
      const userBuildUpperHeight: number = formData.zabudowaGorna["Wysokość zabudowy ( w centymetrach )"]
      const userBuildHighLength: number = formData.zabudowaWysoka["Długość zabudowy ( w centymetrach)"]
      const userBuildHighHeight: number = formData.zabudowaWysoka["Wysokość zabudowy ( w centymetrach)"]
      const userBuildHighCabinet: number = formData.zabudowaWysoka["Ilość szafek"]

      // Ilość płyty zabudowa dolna [MB]
      const plateQuantityBuildLower: number = (userBuildLowerLength * 100 + 2 * userBuildLowerCabinet * 72 *51) / 10000

      // Ilość płyty zabudowa górna [MB]
      const shelfQuantityBuildUpper: number =  Math.floor(userBuildUpperHeight / 30)

      const plateQuantityBuildUpper: number = (userBuildUpperLength * (58 + shelfQuantityBuildUpper * 27) + userBuildUpperCabinet *2 *  userBuildUpperHeight * 30 ) / 10000

      // Ilość płyty zabudowa wysoka
       const plateQuantityBuildHeight: number = (userBuildHighLength * 350 + userBuildHighHeight * userBuildHighCabinet *2) / 10000

            // Pobieram cenę obrzeza za [MB]
            // Szukam objektu z id 'akcesoria' w bazie 
            const findObjectA: any = database?.find((obj: any) => obj.id === "plyty");
            const userBuildUpperCadfsgbinets = formData.ogólne["Rodzaj płyty na korpus szafek"].toLowerCase()
            const fedwf = findObjectA && findObjectA[userBuildUpperCadfsgbinets]



      // Obliczam i zwracam ilość plyty korpusowaj w metrach kwadratowych
      const dfds  = (plateQuantityBuildHeight + plateQuantityBuildUpper + plateQuantityBuildLower) * 1.2

      const sdfsd = (dfds * fedwf).toFixed(2)

      return dfds > 0 && fedwf  ? Number(sdfsd) : 0
    }

    // *** PŁYTA HDF ***

    const plateHDF = () => {

      // Pobieram dane wprowadzone przez uzytkownika 
      const userBuildUpperHight: number = formData.zabudowaGorna["Wysokość zabudowy ( w centymetrach )"]
      const userBuildUpperLength: number = formData.zabudowaGorna["Długość zabudowy ( w centymetrach )"]
      const userBuildLowerLength: number = formData.zabudowaDolna["Długość zabudowy ( w centymetrach )"]
      const userBuildHighLength: number = formData.zabudowaWysoka["Długość zabudowy ( w centymetrach)"]
      const userBuildHighHeight: number = formData.zabudowaWysoka["Wysokość zabudowy ( w centymetrach)"]

      // Zwracam obliczoną ilość płyty HDF [M2]
      return (userBuildUpperHight * userBuildUpperLength + userBuildLowerLength * 72 + userBuildHighLength + userBuildHighHeight) / 10000
    }

    // *** FRONTY DOLNE ***

    const buildLower = () => {

      // Pobieram dane wpissane przez uytkownika
      const userBuildLowerlenght: number = formData.zabudowaDolna["Długość zabudowy ( w centymetrach )"]

      // Zwracam obliczoną poweszchnię frontów dolnych w metrach kwadratowych
      return (userBuildLowerlenght * 72) / 10000
    }

    // *** FRONTY GÓRNE ok optymalizacja ***

    const buildUpper = () => {

      // Pobieram dane wpisane przez uytkownika
      const userBuildUpperLenght: number = formData.zabudowaGorna["Długość zabudowy ( w centymetrach )"]
      const userBuildUpperHigh: number = formData.zabudowaGorna["Wysokość zabudowy ( w centymetrach )"]
      


                  // Szukam objektu z id 'akcesoria' w bazie 
                  const findObjectA: any = database?.find((obj: any) => obj.id === "fronty");

          // Pobieram typy obrzeza 
          const dsf = findObjectA && findObjectA["drewniane"]
          const ddsf = findObjectA && findObjectA["korpusowa biala"]

          const userBuildUpperCadfsgbinets = formData.zabudowaGorna["Rodzaj frontów"].toLowerCase()

          const fedwf = findObjectA && findObjectA[userBuildUpperCadfsgbinets]



      
      // Zwracam obliczoną cenę frontów górnych
      return (((userBuildUpperLenght * userBuildUpperHigh) / 10000) * fedwf).toFixed(2)
    }

    // *** ROBOCIZNA *** ok
    
    const robocizna = () => {
      
      // Szukam obiektu z ceną za robocizne
      const findObjectR: any = database?.find((obj: any) => obj.id === "robocizna");
      // Wyodrębniam ceny za robocizne
      const priceTransport: number = Number(findObjectR?.transport)
      const priceInstallationLED: number = Number(findObjectR?.['klejenie led'])
      const priceInstallationPowerSuply: number = Number(findObjectR?.['montaz zasilacza led'])

      // Wyodrębniam dane wprowadzone przez uzytkownika
      const userTransport = formData.transportMontaz["Odległość w km"]
      const userSelectLed = formData.zabudowaGorna["Oświtlenie LED"]

      // Obliczam i zwracam cenę
      return userSelectLed ? ((priceInstallationPowerSuply + priceInstallationLED) + (priceTransport * userTransport)) : (priceTransport * userTransport)
    }

    const summaryprice = () => {
      return bodyPlate() + plateHDF() + buildLower() + buildUpper() + frontsHigh() + circumcision() + countertop() + drawers() + lowCargo() + highCargo() + lightLed() + cabinets() + legs() + transport() + installation() + robocizna()
    }

    console.log(buildUpper())

    return summaryprice()

  }

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
              <option value="drewniane">Drewniane</option>
              <option value="korpusowa biala">Korpusowa biała</option>
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
