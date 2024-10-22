import "../assets/style/card.scss";

export const Card = () => {
  return (
    <>
      <div className="cards">
        <section className="container">
          <div className="card">
            <div className="content">
              <p className="logo">Indywidualność</p>
              <div className="h6">Dostosowane do Twojego wnętrza</div>
              <div className="hover_content">
                <p>
                Nasze meble to idealny sposób na stworzenie wnętrza, które będzie odzwierciedlało Twoją osobowość.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container">
          <div className="card">
            <div className="content">
              <p className="logo">Funkcjonalność</p>
              <div className="h6">Meble które ułatwiają zycie</div>
              <div className="hover_content">
                <p>
                Meble na wymiar pozwolą Ci wykorzystać każdą przestrzeń w Twoim domu.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container">
          <div className="card">
            <div className="content">
              <p className="logo">Jakość</p>
              <div className="h6"><span style={{whiteSpace: 'pre-line'}}>Wieloletnie <br/> doświadczenie</span></div>
              <div className="hover_content">
                <p>
                Wykonujemy meble z trwałych materiałów które będą służyć Ci przez wiele lat.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
