import "./App.css";
import React, { useEffect, useState } from "react";
import { firebase } from "./utils/firebase";
import axios from "./utils/axios";
import Routes from "./Routes";

let UserContext = React.createContext();

function App() {
  let [user, setUser] = useState();

  useEffect(function () {
    firebase.auth().onAuthStateChanged((user) => {
      setUser(user);

      if (user) {
        user
          .getIdToken(/* forceRefresh */ true)
          .then(function (idToken) {
            axios.defaults.headers["Authorization"] = `Bearer ${idToken}`;
            console.log(axios.defaults.headers["Authorization"]);
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
      }
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
        <Routes />
    </UserContext.Provider>
  );
}

export { App, UserContext };
