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
  const [sortedPostings, setSortedPostings] = useState([]);

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

  const sortPostingsByDate = () => {
    let sortedAllPostings = [];
    if(!sortedPostings.length) {
      sortedAllPostings = postings.sort((a, b) => {
        return (a.date > b.date) ? -1 : 1;
     })
    } else {
      sortedPostings.reverse()
    } 
    setSortedPostings(sortedAllPostings);
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
            postings={
              searchedPostings.length ? searchedPostings 
              : sortedPostings.length ? sortedPostings
              : postings}
            searchByKeyWord={searchPostings}
            sortPostingsByDate={sortPostingsByDate}
          />
        )}
      />
      <Route path="/postings/:id" component={PostingView} />
    </main>
  );
};

export default App;
