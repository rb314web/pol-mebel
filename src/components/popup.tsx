import "../assets/style/popup.scss";

const Popup = (props: any) => {





  return (
    <>
      <div className="popup">
        <h2>Informacja o plikach cookie</h2>
        <p>
          Nasza strona internetowa wykorzystuje pliki cookie. Pliki cookie to
          małe pliki tekstowe, które są zapisywane na Twoim komputerze lub
          urządzeniu mobilnym podczas odwiedzania naszej strony internetowej.
          Pliki cookie pozwalają nam rozpoznać Twoje urządzenie i ułatwić
          korzystanie z naszej strony internetowej.
        </p>
        <div className="popup_buttons">
          <button onClick={() => props.userCookies(false)}> Nie akceptuję </button>
          <button onClick={() => props.userCookies(true)}>Akceptuję</button>
        </div>
      </div>
    </>
  );
};

export default Popup;
