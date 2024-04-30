import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, signOut, getAuth } from "firebase/auth";
import {
  collection,
  onSnapshot,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";

import "../assets/style/adminpanel.scss";

const AdminPanel = () => {
  const [userId, setUserid] = useState<string>();
  const [database, setDatabase] = useState<any>([]);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [test, setTest] = useState<any>("");

  let ur: any = [];

  useEffect(() => {
    if (localStorage.getItem("key") != "") {
      setUserid(localStorage.getItem("key")?.toString());
    }
  }, []);

  useEffect(() => {
    const priceRef = collection(db, "database");
    const queryMessages = query(priceRef);

    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages: any[] = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });

      setDatabase(messages);
    });

    return () => unsuscribe();
  }, [userId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, login, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUserid(user.uid.toString());
        localStorage.setItem("key", user.uid);
        console.log(user.uid);
      })
      .catch(() => {
        alert("Błędny login lub hasło");
      });
  };

  const editData = async (e: any) => {
    e.preventDefault();
    
    const inputValue = e.target.previousElementSibling.value;
    const h1 = e.target.parentElement.parentElement.id
    const li = e.target.previousElementSibling.previousElementSibling.id.toLowerCase()
    
    
    
    const washingtonRef = doc(db, "database", h1);

    if (inputValue != 0) {
      await updateDoc(washingtonRef, {
        [li]: Number(inputValue),
      });

      e.target.previousElementSibling.value = "";
    }
  };

  const signOutUser = () => {
    console.log(ur);

    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("232323232");
        localStorage.setItem("key", "");
        setUserid("");
      })
      .catch(() => {
        // An error happened.
      });
  };

  return (
    <>
      {!!userId && (
        <>
          <div className="adminpanel">
            <h1>Panel administratora</h1>

            <div className="adminpanel_panel">
              {database?.map((item: any) => {

                                      const paryKluczWartość = Object.keys(item).map((klucz) => ({
                                        klucz,
                                        wartość: item[klucz],
                                      }));


                                      paryKluczWartość.sort((a, b) => a.klucz.localeCompare(b.klucz));

                                      const posortowanyObiekt:any = {};
                                      for (const { klucz, wartość } of paryKluczWartość) {
                                        posortowanyObiekt[klucz] = wartość;
                                      }



                return (
                  <div className="section" id={posortowanyObiekt.id}>
                    <h1>{posortowanyObiekt.id}</h1>

                    {Object.keys(posortowanyObiekt).map((e, index) => {
                      return (
                        <>
                          {e != "id" ? (
                            <div key={e} className="section_item">
                            <div id={e}><label key={e}>{e}</label><span>{`: ${item[e]} zł`}</span></div>
                              <input type='number'></input>
                              <button onClick={editData}>Aktualizuj </button>
                            </div>
                          ) : null}
                        </>
                      );
                    })}
                  </div>

                );
              })}
            </div>
            <button onClick={signOutUser}>Wyloguj</button>
          </div>
        </>
      )}

      {!userId && (
        <>
          <div className="adminpanel">
            {" "}
            <h1>Zaloguj się do panelu</h1>
            <div className="adminpanel_login">
              <form onSubmit={(e) => handleSubmit(e)}>
                <label>E-mail</label>
                <input
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                ></input>
                <label>Hasło</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <input type="submit" value="Zaloguj" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminPanel;
