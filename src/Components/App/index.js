import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.scss";
import { apiCalls } from "../../apiCalls";
import User from "../User";

const App = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const getUserInfo = () => {
    apiCalls
      .getUser()
      .then((data) => setUser(data))
      .catch((err) => setError(err.message));
  };

  useEffect(() => getUserInfo(), []);

  return (
    <main className="App">
      {error && <p>{error}</p>}
      {!user && <p>LOADIN'...</p>}
      {user && <User info={user} />}
    </main>
  );
};

export default App;
