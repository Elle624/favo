import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.scss";
import { apiCalls } from "../../apiCalls";
import WelcomePage from "../WelcomePage";
import User from "../User";
import Postings from "../Postings";
import PostingView from "../PostingView";

const App = () => {
  const [user, setUser] = useState(null);
  const [postings, setPostings] = useState([]);
  const [error, setError] = useState("");
  const [queriedPostings, setQueriedPostings] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

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
    const queriedPostings = postings.filter(
      (posting) =>
        posting.name.toLowerCase().includes(lowerCaseKeyword) ||
        posting.organization.toLowerCase().includes(keyWord)
    );
    setQueriedPostings(queriedPostings);
  };

  const sortPostingsByDate = () => {
    if(!isSorted) {
      postings.sort((a, b) => {
        return (a.date > b.date) ? -1 : 1;
      })
    } else {
      postings.reverse();
    } 
    setIsSorted((prevSortState) => !prevSortState);
    setPostings(postings);
  };

  const filterPostings = (category) => {
    const filteredPostings = postings.filter(posting => posting.category === category);
    setQueriedPostings(filteredPostings);
  }

  useEffect(() => getInfo(), []);

  return (
    <main className="App">
       <Route 
        exact path="/" 
        component={WelcomePage} 
      />

      {error && 
        <Route 
          path="/postings" 
          render={() => ({error})}
        />}
  
      {!user && 
        <Route 
          path="/postings" 
          render={() => (<p>LOADIN'...</p>)}
       />}

      {user && 
        <Route 
          path="/postings"
          render={() => (
            <User info={user} />
          )}
        />}

      {postings.length && 
        <Route
          exact path="/postings"
          render={() => (
            <Postings
              isSorted={isSorted}
              postings={queriedPostings.length ? queriedPostings : postings}
              searchByKeyWord={searchPostings}
              sortPostingsByDate={sortPostingsByDate}
              filterByCategory={filterPostings}
            />
          )}
      />}

      <Route 
        path="/postings/:id" 
        render={({ match }) => <PostingView match={match} getUserInfo={getInfo}/>} 
      />
    </main>
  );
};

export default App;
