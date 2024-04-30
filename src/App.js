import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { Home } from "./components/home";
import { Footer } from "./components/footer";
import { Realization } from "./components/realization";
import { Offer } from "./components/offer";
import { Contact } from "./components/contact";
import { Quotation } from "./components/quotation";
import React, { useEffect, useState } from "react";
import "./App.scss";
import Popup from "./components/popup";
import AdminPanel from "./components/adminplanel";

function App() {
  const [userTrustCookies, setUserTrustCookies] = useState(
    localStorage.getItem("userAccept")
  );

  const userCookies = (props) => {
    setUserTrustCookies(props);
    localStorage.setItem("userAccept", props.toString());
  };

  useEffect(() => {
    if (localStorage.getItem("userAccept") === "true") {
      setUserTrustCookies(true);
    } else if (localStorage.getItem("userAccept") === "false") {
      setUserTrustCookies(false);
    }
  }, []);
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/realization" element={<Realization />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quotation" element={<Quotation />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
      </Routes>

      {userTrustCookies === null && <Popup userCookies={userCookies} />}
      <Footer />
    </div>
  );
}

export default App;
