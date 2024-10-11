import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import "../assets/style/quotation.scss";
import { db } from "../firebase";
import { easeOut, motion } from "framer-motion";

export const Quotation = () => {
  interface formDataInterface {
    ogólne: {
      "Wysokosc pomieszczenia ( w centymetrach )": string;
      "Zabudowa do sufitu": boolean;
      "Rodzaj płyty na korpus szafek": string;
    };

    zabudowaDolna: {
      "Długość zabudowy ( w centymetrach )": string;
      "Ilość szafek": string;
      "Ilość szuflad": string;
      "Cargo nieskie": boolean;
      "Rodzaj frontów": string;
      "Rodzaj blatu": string;
    };

    zabudowaGorna: {
      "Długość zabudowy ( w centymetrach )": string;
      "Wysokość zabudowy ( w centymetrach )": string;
      "Ilość szafek": string;
      "Rodzaj frontów": string;
      "Oświtlenie LED": boolean;
    };

    zabudowaWysoka: {
      "Długość zabudowy ( w centymetrach)": string;
      "Wysokość zabudowy ( w centymetrach)": string;
      "Ilość szafek": string;
      "Ilość szufled": string;
      "Cargo wysokie": boolean;
      "Rodzaj frontów": string;
    };

    transportMontaz: {
      "Odległość w km": string;
      "Opcja montażu": boolean;
    };
  }
  const [database, setDatabase] = useState<object[]>();
  const [summaryPrice, setSummaryPrice] = useState<number>(0);
  const [formData, setFormData] = useState<formDataInterface>({
    ogólne: {
      "Wysokosc pomieszczenia ( w centymetrach )": "",
      "Zabudowa do sufitu": false,
      "Rodzaj płyty na korpus szafek": "",
    },

    zabudowaDolna: {
      "Długość zabudowy ( w centymetrach )": "",
      "Ilość szafek": "",
      "Ilość szuflad": "",
      "Cargo nieskie": false,
      "Rodzaj frontów": "",
      "Rodzaj blatu": "",
    },

    zabudowaGorna: {
      "Długość zabudowy ( w centymetrach )": "",
      "Wysokość zabudowy ( w centymetrach )": "",
      "Ilość szafek": "",
      "Rodzaj frontów": "",
      "Oświtlenie LED": false,
    },

    zabudowaWysoka: {
      "Długość zabudowy ( w centymetrach)": "",
      "Wysokość zabudowy ( w centymetrach)": "",
      "Ilość szafek": "",
      "Ilość szufled": "",
      "Cargo wysokie": false,
      "Rodzaj frontów": "",
    },

    transportMontaz: {
      "Odległość w km": "",
      "Opcja montażu": false,
    },
  });

  useEffect(() => {
    calculatePrice();
    // eslint-disable-next-line
  }, [formData]);

  // Pobieranie cen z bazy danych

  useEffect(() => {
    const priceRef = collection(db, "database");
    const queryMessages = query(priceRef);

    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let data: any[] = [];
      snapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setDatabase(data);
      console.log(data)
    });

    return () => unsuscribe();
  }, []);

  const refUpper = useRef(null);
  const refLower = useRef(null);
  const refHigh = useRef(null);
  const refAdittional = useRef(null);

  const calculatePrice = () => {
    const findObjectR: any = database?.find(
      (obj: any) => obj.id === "robocizna"
    );

    const findObjectA: any = database?.find(
      (obj: any) => obj.id === "akcesoria"
    );

    const findObjectB: any = database?.find((obj: any) => obj.id === "blaty");

    const findObjectO: any = database?.find((obj: any) => obj.id === "obrzeze");

    const findObjectF: any = database?.find((obj: any) => obj.id === "fronty");

    const findObjectP: any = database?.find((obj: any) => obj.id === "plyty");

    // *** MONTAZ *** ok

    const installation = () => {
      // Sprawdzam czy uzytkownik wybrał opcję montazu
      const userInstallation = formData.transportMontaz["Opcja montażu"];
      // Zapisuje cene montazu
      const priceInstallation = findObjectR?.["montaz"];

      // Zwracam cenę jezeli uzytkownik wybrał opcję montazu, jezeli nie zwracam 0
      return userInstallation ? priceInstallation : 0;
    };

    // *** TRANSPORT *** ok

    const transport = () => {
      // Zapisuje cenę za transportu
      const priceTransport: number = Number(findObjectR?.transport);
      // Pobieram odległośc wpisaną przez uzytkownika
      const userInputTransport = Number(
        formData.transportMontaz["Odległość w km"]
      );

      // Zwracam obliczoną cenę za transport
      return userInputTransport === 0 ? 0 : userInputTransport * priceTransport;
    };

    // *** NOZKI *** ok

    const legs = () => {
      // Zapisuje cenę za nózek
      const priceLegs = Number(findObjectA?.nozka);
      // Pobieram podaną przez uzytkownika ilość szafek w zabudowie dolnej
      const userBuildLowerCabinet = Number(
        formData.zabudowaDolna["Ilość szafek"]
      );
      // Pobieram podaną przez uzytkownika ilość szafek w zabudowie wysokiej
      const userBuildHighCabinet = Number(
        formData.zabudowaWysoka["Ilość szafek"]
      );

      // Zwracam cenę za nózki
      return findObjectA
        ? (userBuildLowerCabinet + userBuildHighCabinet) * 4 * priceLegs
        : 0;
    };

    // *** ZAWIASY *** ok

    const cabinets = () => {
      // Zapisuje cenę za zawiasu
      const priceHinges = Number(findObjectA?.zawias);
      // Pobieram podaną przez uzytkownika ilość szafek w zabudowie dolnej
      const userBuildLowerCabinets = Number(
        formData.zabudowaDolna["Ilość szafek"]
      );
      // Pobieram podaną przez uzytkownika ilość szafek w zabudowie górnej
      const userBuildHihghCabinets = Number(
        formData.zabudowaGorna["Ilość szafek"]
      );
      // Pobieram podaną przez uzytkownika ilość szafek w zabudowie wysokiej
      const userBuildUpperCabinets = Number(
        formData.zabudowaWysoka["Ilość szafek"]
      );

      // Obliczam i zwracam cene za zawiasy
      return findObjectA
        ? (userBuildLowerCabinets +
            userBuildHihghCabinets +
            userBuildUpperCabinets * 2) *
            2 *
            priceHinges
        : 0;
    };

    // *** OŚWIETLENIE LED *** ok
    const lightLed = () => {
      // Pobieram cene za klejenie LED
      const priceGluingLed = Number(findObjectR?.["klejenie led"]);
      // Pobieram cene za taśme LED
      const priceLedStrip = Number(findObjectA?.["tasma led"]);
      // Pobieram cene za profil LED
      const priceProfil = Number(findObjectA?.["profil led"]);
      // Pobieram cene za zasilacz LED
      const pricePowerSupply = Number(findObjectA?.["zasilacz led"]);
      // Pobieram cene za włącznik LED
      const priceLedSwitch = Number(findObjectA?.["wlacznik led"]);
      // Pobieram wartość boolen czy został zaznaczony checkbox 'Oświtlenie LED'
      const userSelectLightLed = formData.zabudowaGorna["Oświtlenie LED"];
      // Pobieram długość zabudowy podanej przez uzytkownika
      const userInputConstructionLength = Number(
        formData.zabudowaGorna["Długość zabudowy ( w centymetrach )"]
      );

      // Obliczam i zwracam cenę za oświtlenie LED, jezeli uzytkownik nie wybrał to zwracam 0 i jezeli brak długości zabudowy zwracam 0
      return userSelectLightLed && userInputConstructionLength !== 0
        ? (userInputConstructionLength / 100) *
            (priceGluingLed + priceProfil + priceLedStrip) +
            pricePowerSupply +
            priceLedSwitch
        : 0;
    };

    // *** CARGO WYSOKIE *** ok

    const highCargo = () => {
      // Pobieram czy uzytkownik wybrał opcje wysokiego cargo
      const userSelectHightCargo = formData.zabudowaWysoka["Cargo wysokie"];

      // Pobieram cene za profil LED
      const priceProfil = Number(findObjectA?.["cargo wysokie"]);

      // Zwracam cenę wysokiego cargo
      return userSelectHightCargo ? priceProfil : 0;
    };

    // *** CARGO NISKIE *** ok

    const lowCargo = () => {
      // Pobieram czy uzytkownik wybrał opcje niskiego cargo
      const userSelectHightCargo = formData.zabudowaDolna["Cargo nieskie"];
      // Szukam objektu z id 'akcesoria' w bazie

      // Pobieram cene za profil LED
      const priceProfil = Number(findObjectA?.["cargo niskie"]);

      // Zwracam cenę niskiego cargo
      return userSelectHightCargo ? priceProfil : 0;
    };

    // *** SZUFLADY *** ok

    const drawers = () => {
      // Pobieram cenę szuflady
      const priceDrawers = Number(findObjectA?.["szuflada"]);
      // Pobieram podaną przez uzytkownika ilość szuflad w zabudowie wysokiej
      const userInputConstructionLength = Number(
        formData.zabudowaWysoka["Ilość szufled"]
      );
      // Pobieram podaną przez uzytkownika ilość szafek w zabudowie dolnej
      const userInputConstructionLength1 = Number(
        formData.zabudowaDolna["Ilość szuflad"]
      );

      // Zwracam cenę za szuflady
      return findObjectA
        ? (userInputConstructionLength + userInputConstructionLength1) *
            priceDrawers
        : 0;
    };

    // *** BLAT *** ok

    const countertop = () => {
      // Pobieram jaki rodzaj blatu wybrał uzytkownik
      const userInputCountertopType =
        formData.zabudowaDolna["Rodzaj blatu"].toLowerCase();
      // Pobieram cene blatu wybranego przez uzytkownika
      const priceCountertop =
        userInputCountertopType && findObjectB[userInputCountertopType];
      // Pobieram długość blatu
      const userInputConstructionLength = Number(
        formData.zabudowaDolna["Długość zabudowy ( w centymetrach )"]
      );

      // Obliczam i zwracam cenę blatu
      return (userInputConstructionLength / 100) * priceCountertop;
    };

    // *** OBRZEZA ok optymalizacja***

    const circumcision = () => {
      // Pobieram dane wprowadzone przez uzytkownika w zabudowie dolnej
      const userBuildLowerLenght = Number(
        formData.zabudowaDolna["Długość zabudowy ( w centymetrach )"]
      );
      const userBuildLowerCabinets = Number(
        formData.zabudowaDolna["Ilość szafek"]
      );
      // Oblicam sume obrzezy w zabudowie dolnej
      const circumcisionBuildLower =
        (userBuildLowerLenght * 3 + 2 * userBuildLowerCabinets * 72) / 100;

      // Pobieram dane wprowadzone przez uzytkownika w zabudowie górnej
      const userBuildHeightLength = Number(
        formData.zabudowaGorna["Długość zabudowy ( w centymetrach )"]
      );
      const userBuildHeightHeight = Number(
        formData.zabudowaGorna["Wysokość zabudowy ( w centymetrach )"]
      );
      const userBuildHeightCabinets = Number(
        formData.zabudowaGorna["Ilość szafek"]
      );
      const userInputConstructionLength44 = Math.floor(
        userBuildHeightHeight / 30
      );
      // Oblicam sume obrzezy w zabudowie górnej
      const circumcisionBuildHight =
        (userBuildHeightLength * (2 + userInputConstructionLength44) +
          userBuildHeightHeight * userBuildHeightCabinets * 2) /
        100;

      // Pobieram dane wprowadzone przez uzytkownika w zabudowie wysokiej
      const userBuildUpperLenght = Number(
        formData.zabudowaWysoka["Długość zabudowy ( w centymetrach)"]
      );
      const userBuildUpperHeight = Number(
        formData.zabudowaWysoka["Wysokość zabudowy ( w centymetrach)"]
      );
      const userBuildUpperCabinets = Number(
        formData.zabudowaWysoka["Ilość szafek"]
      );
      // Oblicam sume obrzezy w zabudowie wysokiej
      const circumcisionBuildUpper =
        (userBuildUpperLenght * 7 +
          userBuildUpperHeight * userBuildUpperCabinets * 2) /
        100;

      // Obliczam i zwracam łączną ilość obrzeza [MB]
      const circumcisionSummary =
        (circumcisionBuildLower +
          circumcisionBuildHight +
          circumcisionBuildUpper) *
        1.2;

      // Pobieram typy obrzeza

      const userBuildUpperCadfsgbinets =
        formData.ogólne["Rodzaj płyty na korpus szafek"].toLowerCase();

      const fedwf = findObjectO && findObjectO[userBuildUpperCadfsgbinets];

      // const userBsduildHeightLength = formData.

      return circumcisionSummary > 0 && userBuildUpperCadfsgbinets
        ? Math.round(circumcisionSummary * fedwf * 100) / 100
        : 0;
    };

    // *** FRONTY WYSOKIE ok **

    const frontsHigh = () => {
      // Pobieram dane wprowadzone przez uzytkownika
      const userBuildHeightLength = Number(
        formData.zabudowaWysoka["Długość zabudowy ( w centymetrach)"]
      );
      const userBuildHeightHeight = Number(
        formData.zabudowaWysoka["Wysokość zabudowy ( w centymetrach)"]
      );
      const userBuildHeightFrontsType =
        formData.zabudowaWysoka["Rodzaj frontów"].toLowerCase();

      // Powieszchnia frontów wysokich
      const surfaceFrontsHigh =
        (userBuildHeightLength * (userBuildHeightHeight - 10)) / 10000;

      // Pobieranie ceny wybranej opcji frontów
      const priceSelectSurface =
        userBuildHeightFrontsType !== ""
          ? findObjectF?.[userBuildHeightFrontsType]
          : 0;

      // Obliczam i zwracam cenę za fronty wysokie
      return surfaceFrontsHigh > 0
        ? Math.floor(surfaceFrontsHigh * priceSelectSurface * 100) / 100
        : 0;
    };

    // *** PŁYTA KORPUSOWA *** ok optymalizacja

    const bodyPlate = () => {
      // Pobieram dane wprowadzone przez uzytkownika
      const userBuildLowerLength: number = Number(
        formData.zabudowaDolna["Długość zabudowy ( w centymetrach )"]
      );
      const userBuildLowerCabinet: number = Number(
        formData.zabudowaDolna["Ilość szafek"]
      );
      const userBuildUpperLength: number = Number(
        formData.zabudowaGorna["Długość zabudowy ( w centymetrach )"]
      );
      const userBuildUpperCabinet: number = Number(
        formData.zabudowaGorna["Ilość szafek"]
      );
      const userBuildUpperHeight: number = Number(
        formData.zabudowaGorna["Wysokość zabudowy ( w centymetrach )"]
      );
      const userBuildHighLength: number = Number(
        formData.zabudowaWysoka["Długość zabudowy ( w centymetrach)"]
      );
      const userBuildHighHeight: number = Number(
        formData.zabudowaWysoka["Wysokość zabudowy ( w centymetrach)"]
      );
      const userBuildHighCabinet: number = Number(
        formData.zabudowaWysoka["Ilość szafek"]
      );

      // Ilość płyty zabudowa dolna [MB]
      const plateQuantityBuildLower: number =
        (userBuildLowerLength * 100 + 2 * userBuildLowerCabinet * 72 * 51) /
        10000;

      // Ilość płyty zabudowa górna [MB]
      const shelfQuantityBuildUpper: number = Math.floor(
        userBuildUpperHeight / 30
      );

      const plateQuantityBuildUpper: number =
        (userBuildUpperLength * (58 + shelfQuantityBuildUpper * 27) +
          userBuildUpperCabinet * 2 * userBuildUpperHeight * 30) /
        10000;

      // Ilość płyty zabudowa wysoka
      const plateQuantityBuildHeight: number =
        (userBuildHighLength * 350 +
          userBuildHighHeight * userBuildHighCabinet * 2) /
        10000;

      // Pobieram cenę obrzeza za [MB]

      const userBuildUpperCadfsgbinets =
        formData.ogólne["Rodzaj płyty na korpus szafek"].toLowerCase();
      const fedwf = findObjectP && findObjectP[userBuildUpperCadfsgbinets];

      // Obliczam i zwracam ilość plyty korpusowaj w metrach kwadratowych
      const dfds =
        (plateQuantityBuildHeight +
          plateQuantityBuildUpper +
          plateQuantityBuildLower) *
        1.2;

      const sdfsd = Math.round(dfds * fedwf * 100) / 100;

      return dfds > 0 && fedwf ? sdfsd : 0;
    };

    // *** PŁYTA HDF *** ok optymalizacja

    const plateHDF = () => {
      // Pobieram dane wprowadzone przez uzytkownika
      const userBuildUpperHight: number = Number(
        formData.zabudowaGorna["Wysokość zabudowy ( w centymetrach )"]
      );
      const userBuildUpperLength: number = Number(
        formData.zabudowaGorna["Długość zabudowy ( w centymetrach )"]
      );
      const userBuildLowerLength: number = Number(
        formData.zabudowaDolna["Długość zabudowy ( w centymetrach )"]
      );
      const userBuildHighLength: number = Number(
        formData.zabudowaWysoka["Długość zabudowy ( w centymetrach)"]
      );
      const userBuildHighHeight: number = Number(
        formData.zabudowaWysoka["Wysokość zabudowy ( w centymetrach)"]
      );

      const hdfdd = findObjectP && findObjectP["hdf"];

      // Zwracam obliczoną ilość płyty HDF [M2]
      return findObjectP
        ? Math.round(
            ((userBuildUpperHight * userBuildUpperLength +
              userBuildLowerLength * 72 +
              userBuildHighLength +
              userBuildHighHeight) /
              10000) *
              hdfdd *
              100
          ) / 100
        : 0;
    };

    // *** FRONTY DOLNE ok optymalizacja***

    const buildLower = () => {
      // Pobieram dane wpissane przez uytkownika
      const userBuildLowerlenght: number = Number(
        formData.zabudowaDolna["Długość zabudowy ( w centymetrach )"]
      );

      const userBuildUpperCadfsgbinets =
        formData.zabudowaDolna["Rodzaj frontów"].toLowerCase();

      const fedwf = findObjectF && findObjectF[userBuildUpperCadfsgbinets];

      // Zwracam obliczoną poweszchnię frontów dolnych w metrach kwadratowych
      return userBuildLowerlenght && userBuildUpperCadfsgbinets
        ? Math.round(((userBuildLowerlenght * 72) / 10000) * fedwf * 100) / 100
        : 0;
    };

    // *** FRONTY GÓRNE ok optymalizacja ***

    const buildUpper = () => {
      // Pobieram dane wpisane przez uytkownika
      const userBuildUpperLenght: number = Number(
        formData.zabudowaGorna["Długość zabudowy ( w centymetrach )"]
      );
      const userBuildUpperHigh: number = Number(
        formData.zabudowaGorna["Wysokość zabudowy ( w centymetrach )"]
      );

      const userBuildUpperCadfsgbinets =
        formData.zabudowaGorna["Rodzaj frontów"].toLowerCase();

      const fedwf = findObjectF && findObjectF[userBuildUpperCadfsgbinets];

      // Zwracam obliczoną cenę frontów górnych
      return userBuildUpperLenght > 0 &&
        userBuildUpperHigh > 0 &&
        userBuildUpperCadfsgbinets
        ? Math.round(
            ((userBuildUpperLenght * userBuildUpperHigh) / 10000) * fedwf * 100
          ) / 100
        : 0;
    };

    const summaryprice = () => {
      validInput();

      return (
        Math.ceil(
          (bodyPlate() +
            plateHDF() +
            buildLower() +
            buildUpper() +
            frontsHigh() +
            circumcision() +
            countertop() +
            drawers() +
            lowCargo() +
            highCargo() +
            lightLed() +
            cabinets() +
            legs() +
            transport() +
            installation()) *
            100
        ) / 100
      );
    };
    setSummaryPrice(summaryprice());

    return summaryprice() >= 0 ? summaryprice() : "Błąd";
  };

  function numberWithSpaces(x: number) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
  }

  const countDecimals = (string: string) => {
    const parts = string.split(".");
    return parts.length > 1 ? parts[1].length - 1 : 0;
  };

  const validInput = () => {

    // Szukam inputów które będą validowane
    const inputs = document.querySelectorAll("[data-validation]");

    let err = 0;

    inputs.forEach((item) => {
      if ((item as HTMLInputElement).type === "number") {
        if (Number((item as HTMLInputElement).value) > 0) {
          err++;
        }
      } else if ((item as HTMLInputElement).type === "select-one") {
        if ((item as HTMLInputElement).value !== "") {
          err++;
        }
      } else if ((item as HTMLInputElement).type === "select") {
      }

      if (Number((item as HTMLInputElement).value) > 0) {
        err++;
      }
    });

    if (err === 15) {
      const kkk = document.querySelector(
        ".quotation_calculator_summary_price span:nth-child(2)"
      ) as HTMLElement;

      if (kkk) {
        kkk.style.opacity = "0";
      }
    } else {
      const kkk = document.querySelector(
        ".quotation_calculator_summary_price span:nth-child(2)"
      ) as HTMLElement;

      if (kkk) {
        kkk.style.opacity = "1";
      }
    }
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: easeOut }}
      className="quotation"
    >
      <div className="quotation_photo">
        <h2>Wycena mebli kuchennych</h2>
        <img
          src={require("../assets/img/tttttjpgt.webp")}
          alt="Zdjęcie mebli kuchennych"
        />
      </div>

      <div className="quotation_calculator">
        <div className="quotation_calculator_upperconstruction">
          <h3>Ogólne</h3>

          <form className="quotation_calculator_upperconstruction_form">
            <label htmlFor="wysokosc_pomieszczenia">
              Wysokość pomieszczenia ( w centymetrach ) *
            </label>
            <input
              data-validation
              type="text"
              inputMode="numeric"
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
              value={
                formData.ogólne["Wysokosc pomieszczenia ( w centymetrach )"]
              }
              onChange={(e) => {
                if (
                  Number(Number(e.target.value).toFixed(2)) < 10000 &&
                  countDecimals(e.target.value) < 2
                ) {
                  if (formData.ogólne["Zabudowa do sufitu"]) {
                    setFormData((prevState) => ({
                      ...prevState,
                      ogólne: {
                        ...prevState.ogólne,
                        "Wysokosc pomieszczenia ( w centymetrach )":
                          e.target.value,
                      },
                      zabudowaWysoka: {
                        ...prevState.zabudowaWysoka,
                        "Wysokość zabudowy ( w centymetrach)": e.target.value,
                      },
                      zabudowaGorna: {
                        ...prevState.zabudowaGorna,
                        "Wysokość zabudowy ( w centymetrach )":
                          Number(e.target.value) > 146
                            ? (Number(e.target.value) - 146).toString()
                            : "",
                      },
                    }));
                  } else {
                    setFormData((prevState) => ({
                      ...prevState,
                      ogólne: {
                        ...prevState.ogólne,
                        "Wysokosc pomieszczenia ( w centymetrach )":
                          e.target.value,
                      },
                    }));
                  }
                }
              }}
            ></input>

            <label htmlFor="zabudowa_do_sufitu">Zabudowa do sufitu</label>
            <input
              id="zabudowa_do_sufitu"
              type="checkbox"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  ogólne: {
                    ...prevState.ogólne,
                    "Zabudowa do sufitu": Boolean(e.target.checked),
                  },
                  zabudowaWysoka: {
                    ...prevState.zabudowaWysoka,
                    "Wysokość zabudowy ( w centymetrach)":
                      formData.ogólne[
                        "Wysokosc pomieszczenia ( w centymetrach )"
                      ],
                  },
                  zabudowaGorna: {
                    ...prevState.zabudowaGorna,
                    "Wysokość zabudowy ( w centymetrach )":
                      Number(
                        formData.ogólne[
                          "Wysokosc pomieszczenia ( w centymetrach )"
                        ]
                      ) > 146
                        ? (
                            Number(
                              formData.ogólne[
                                "Wysokosc pomieszczenia ( w centymetrach )"
                              ]
                            ) - 146
                          ).toString()
                        : "",
                  },
                }))
              }
            />

            <label htmlFor="rodzaj_plyty_na_korpusy_szafek">
              Rodzaj płyty na korpusy szafek *
            </label>
            <select
              data-validation
              id="rodzaj_plyty_na_korpusy_szafek"
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
            <label htmlFor="dlugość_dolnej_zabudowy">
              Długość dolnej zabudowy ( w centymetrach ) *
            </label>
            <input
              data-validation
              id="dlugość_dolnej_zabudowy"
              type="text"
              inputMode="numeric"
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
              value={
                formData.zabudowaDolna["Długość zabudowy ( w centymetrach )"]
              }
              onChange={(e) => {
                if (
                  Number(Number(e.target.value).toFixed(2)) < 10000 &&
                  countDecimals(e.target.value) < 2
                ) {
                  setFormData((prevState) => ({
                    ...prevState,
                    zabudowaDolna: {
                      ...prevState.zabudowaDolna,
                      "Długość zabudowy ( w centymetrach )": e.target.value,
                    },
                  }));
                }
              }}
            ></input>

            <label htmlFor="ilość_szafek">Ilość szafek *</label>
            <input
              data-validation
              id="ilość_szafek"
              type="text"
              inputMode="numeric"
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
              value={formData.zabudowaDolna["Ilość szafek"]}
              onChange={(e) => {
                if (
                  Number(e.target.value) < 1000 &&
                  e.target.value[e.target.value.length - 1] !== "."
                ) {
                  setFormData((prevState) => ({
                    ...prevState,
                    zabudowaDolna: {
                      ...prevState.zabudowaDolna,
                      "Ilość szafek": e.target.value,
                    },
                  }));
                }
              }}
            ></input>

            <label htmlFor="ilosc_szuflad">Ilość szuflad *</label>
            <input
              data-validation
              id="ilosc_szuflad"
              type="text"
              inputMode="numeric"
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
              value={formData.zabudowaDolna["Ilość szuflad"]}
              onChange={(e) => {
                if (
                  Number(e.target.value) < 1000 &&
                  e.target.value[e.target.value.length - 1] !== "."
                ) {
                  setFormData((prevState) => ({
                    ...prevState,
                    zabudowaDolna: {
                      ...prevState.zabudowaDolna,
                      "Ilość szuflad": e.target.value,
                    },
                  }));
                }
              }}
            ></input>

            <label htmlFor="cargo_niskie">Cargo niskie</label>
            <input
              id="cargo_niskie"
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

            <label htmlFor="rodzaj_frontow">Rodzaj frontów *</label>
            <select
              data-validation
              id="rodzaj_frontow"
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

            <label htmlFor="rodzaj_blatu">Rodzaj blatu</label>
            <select
              id="rodzaj_blatu"
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
            <label htmlFor="dlugosc_gornej_zabudowy">
              Długość górnej zabudowy ( w centymetrach ) *
            </label>
            <input
              data-validation
              id="dlugosc_gornej_zabudowy"
              type="text"
              inputMode="numeric"
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
              value={
                formData.zabudowaGorna["Długość zabudowy ( w centymetrach )"]
              }
              onChange={(e) => {
                if (
                  Number(Number(e.target.value).toFixed(2)) < 10000 &&
                  countDecimals(e.target.value) < 2
                ) {
                  setFormData((prevState) => ({
                    ...prevState,
                    zabudowaGorna: {
                      ...prevState.zabudowaGorna,
                      "Długość zabudowy ( w centymetrach )": e.target.value,
                    },
                  }));
                }
              }}
            ></input>
            <label htmlFor="wysokosc_zabudowy">
              Wysokość zabudowy ( w centymetrach ) *
            </label>
            <input
              data-validation
              id="wysokosc_zabudowy"
              type="text"
              inputMode="numeric"
              disabled={formData.ogólne["Zabudowa do sufitu"]}
              style={
                formData.ogólne["Zabudowa do sufitu"]
                  ? { backgroundColor: "#cdcdcd", cursor: "no-drop" }
                  : {}
              }
              value={
                formData.zabudowaGorna["Wysokość zabudowy ( w centymetrach )"]
              }
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
              onChange={(e) => {
                if (
                  Number(Number(e.target.value).toFixed(2)) < 10000 &&
                  countDecimals(e.target.value) < 2
                ) {
                  setFormData((prevState) => ({
                    ...prevState,
                    zabudowaGorna: {
                      ...prevState.zabudowaGorna,
                      "Wysokość zabudowy ( w centymetrach )": e.target.value,
                    },
                  }));
                }
              }}
            ></input>

            <label htmlFor="ilosc_szafek">Ilość szafek *</label>
            <input
              data-validation
              id="ilosc_szafek"
              type="text"
              inputMode="numeric"
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
              value={formData.zabudowaGorna["Ilość szafek"]}
              onChange={(e) => {
                if (
                  Number(e.target.value) < 1000 &&
                  e.target.value[e.target.value.length - 1] !== "."
                ) {
                  setFormData((prevState) => ({
                    ...prevState,
                    zabudowaGorna: {
                      ...prevState.zabudowaGorna,
                      "Ilość szafek": e.target.value,
                    },
                  }));
                }
              }}
            ></input>

            <label htmlFor="rodzaj_frontow">Rodzaj frontów *</label>
            <select
              data-validation
              id="rodzaj_frontow"
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

            <label htmlFor="oswietlenie_led">Oświetlenie LED</label>
            <input
              id="oswietlenie_led"
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
            <label htmlFor="dlugosc_zabudowy">
              Długość zabudowy ( w centymetrach ) *
            </label>
            <input
              data-validation
              id="dlugosc_zabudowy"
              type="text"
              inputMode="numeric"
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
              value={
                formData.zabudowaWysoka["Długość zabudowy ( w centymetrach)"]
              }
              onChange={(e) => {
                if (
                  Number(Number(e.target.value).toFixed(2)) < 10000 &&
                  countDecimals(e.target.value) < 2
                ) {
                  setFormData((prevState) => ({
                    ...prevState,
                    zabudowaWysoka: {
                      ...prevState.zabudowaWysoka,
                      "Długość zabudowy ( w centymetrach)": e.target.value,
                    },
                  }));
                }
              }}
            ></input>

            <label htmlFor="wysokosc_zabudowy">
              Wysokość zabudowy ( w centymetrach ) *
            </label>
            <input
              data-validation
              id="wysokosc_zabudowy"
              inputMode="numeric"
              disabled={formData.ogólne["Zabudowa do sufitu"]}
              style={
                formData.ogólne["Zabudowa do sufitu"]
                  ? { backgroundColor: "#cdcdcd", cursor: "no-drop" }
                  : {}
              }
              value={
                formData.zabudowaWysoka["Wysokość zabudowy ( w centymetrach)"]
              }
              type="text"
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
              onChange={(e) => {
                if (
                  Number(Number(e.target.value).toFixed(2)) < 10000 &&
                  countDecimals(e.target.value) < 2
                ) {
                  setFormData((prevState) => ({
                    ...prevState,
                    zabudowaWysoka: {
                      ...prevState.zabudowaWysoka,
                      "Wysokość zabudowy ( w centymetrach)": e.target.value,
                    },
                  }));
                }
              }}
            ></input>

            <label htmlFor="ilosc_szafek">Ilość szafek *</label>
            <input
              data-validation
              id="ilosc_szafek"
              type="text"
              inputMode="numeric"
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
              value={formData.zabudowaWysoka["Ilość szafek"]}
              onChange={(e) => {
                if (
                  Number(e.target.value) < 1000 &&
                  e.target.value[e.target.value.length - 1] !== "."
                ) {
                  setFormData((prevState) => ({
                    ...prevState,
                    zabudowaWysoka: {
                      ...prevState.zabudowaWysoka,
                      "Ilość szafek": e.target.value,
                    },
                  }));
                }
              }}
            ></input>

            <label htmlFor="ilosc_szuflad">Ilość szuflad *</label>
            <input
              data-validation
              id="ilosc_szuflad"
              type="text"
              inputMode="numeric"
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
              value={formData.zabudowaWysoka["Ilość szufled"]}
              onChange={(e) => {
                if (Number(e.target.value) < 1000) {
                  setFormData((prevState) => ({
                    ...prevState,
                    zabudowaWysoka: {
                      ...prevState.zabudowaWysoka,
                      "Ilość szufled": e.target.value,
                    },
                  }));
                }
              }}
            ></input>

            <label htmlFor="cargo_wysokie">Cargo wysokie</label>
            <input
              id="cargo_wysokie"
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

            <label htmlFor="rodzaj_frontow">Rodzaj frontów *</label>
            <select
              data-validation
              id="rodzaj_frontow"
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
          <h3>Transport i montaż</h3>
          <form
            ref={refAdittional}
            className="quotation_calculator_additional_form"
          >
            <label htmlFor="odległosc">
              Odległość w km od miejscowaści {""}
              <a href="https://maps.app.goo.gl/jAbnqcRqexbd3Q387">
                Małkinia Górna
              </a>
            </label>

            <input
              type="text"
              inputMode="numeric"
              onFocus={(e) =>
                e.target.addEventListener(
                  "wheel",
                  function (e) {
                    e.preventDefault();
                  },
                  { passive: false }
                )
              }
              value={formData.transportMontaz["Odległość w km"]}
              onChange={(e) => {
                if (Number(e.target.value) < 1000) {
                  setFormData((prevState) => ({
                    ...prevState,
                    transportMontaz: {
                      ...prevState.transportMontaz,
                      "Odległość w km": e.target.value,
                    },
                  }));
                }
              }}
            ></input>

            <label htmlFor="opcja_montazu">Opcja montażu</label>
            <input
              id="opcja_montazu"
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
          <div className="quotation_calculator_summary_price">
            <p key={summaryPrice} className="roll-out">
              {Number(summaryPrice) > 0
                ? `${numberWithSpaces(summaryPrice)} zł`
                : "-"}
            </p>

            <span>Wprowadź wymagane pola </span>
            <span>* wycena nie stanowi oferty handlowej</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
