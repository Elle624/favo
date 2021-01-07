import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.scss";
import { apiCalls } from "../../apiCalls";
import User from "../User";
import Postings from "../Postings";
import PostingView from "../PostingView";

const App = () => {
  const [user, setUser] = useState(null);
  const [postings, setPostings] = useState([]);
  const [error, setError] = useState("");
  const [searchedPostings, setSearchedPostings] = useState([]);

  const getInfo = () => {
    Promise.all([apiCalls.getUser(), apiCalls.getPostings()])
      .then((data) => {
        setUser(data[0]);
        setPostings(data[1]);
      })
      .catch((err) => setError(err.message));
  };

  const searchPostings = (keyWord) => {
    const lowerCaseKeyword = keyWord.toLowerCase();
    const filteredPostings = postings.filter(
      (posting) =>
        posting.name.toLowerCase().includes(lowerCaseKeyword) ||
        posting.organization.toLowerCase().includes(keyWord)
    );
    setSearchedPostings(filteredPostings);
  };

  useEffect(() => getInfo(), []);

  return (
    <main className="App">
      {error && <p>{error}</p>}
      {!user && <p>LOADIN'...</p>}
      {user && <User info={user} />}
      <Route
        exact
        path="/"
        render={() => (
          <Postings
            postings={searchedPostings.length ? searchedPostings : postings}
            searchByKeyWord={searchPostings}
          />
        )}
      />
      <Route 
        path="/postings/:id" 
        render={({ match }) => <PostingView match={match} getUserInfo={getInfo}/>} 
      />
    </main>
  );
};

export default App;
