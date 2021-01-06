import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.scss";
import { apiCalls } from "../../apiCalls";

function App() {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const getUserInfo = () => {
    apiCalls
      .getUser()
      .then((data) => setUser(data))
      .catch((err) => setError(err.message));
  };

  useEffect(() => getUserInfo(), []);

  return (
    <main>
      <p>{user.name}</p>
    </main>
  );
}

export default App;
