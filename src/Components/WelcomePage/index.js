import React from "react";
import { Link } from "react-router-dom";
import "./WelcomePage.scss";
import homepageButton from "../../Assets/homepage-button.png";

const WelcomePage = () => {
  return(
    <section className="welcome-page-container">
      <div className="welcome-page-titles-wrapper">
        <h1 className="welcome-page-title">Welcome to FaVo!</h1>
        <h2 className="welcome-page-tagline">toBee or not toBee, it’s your choice…</h2>
      </div>
      <div className="welcome-page-homepage-wrapper">
        <p className="welcome-page-button-text">go to your profile</p>
        <Link to="/postings" className="welcome-page-link">
          <img className="welcome-page-button" src={homepageButton} alt="homepage-button"/>
        </Link>
      </div>
    </section>
  )
}

export default WelcomePage;