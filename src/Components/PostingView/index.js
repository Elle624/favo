import React, { useState, useEffect } from "react";
import { apiCalls } from "../../apiCalls";

const PostingView = ({ match }) => {
  const [chosenPosting, setChosenPosting] = useState(null);
  const { id } = match.params;

  const getSinglePostingInfo = (id) => {
    apiCalls.getSinglePosting(id).then((data) => setChosenPosting(data))
  }

  useEffect(() => getSinglePostingInfo(id), [])

  return (
    <section className="postings-container">
      <div className="postings-title-wrapper">
        <h1 className="postings-title">Event Details</h1>
      </div>

    </section>
  )
  
}

export default PostingView