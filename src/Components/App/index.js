import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.scss";
import { apiCalls } from "../../apiCalls";
import User from "../User";
import Postings from '../Postings';

const App = () => {
  const [user, setUser] = useState(null);
  const [postings, setPostings] = useState([]);
  const [error, setError] = useState("");

  const getInfo = () => {
    Promise.all([apiCalls.getUser(), apiCalls.getPostings()])
      .then((data) => {
        setUser(data[0]);
        setPostings(data[1])
      })
      .catch((err) => setError(err.message));
  };

  useEffect(() => getInfo(), []);

  return (
    <main className="App">
      {error && <p>{error}</p>}
      {!user && <p>LOADIN'...</p>}
      {user && <User info={user} />}
      <Postings postings={postings}/>
    </main>
  );
};

export default App;
