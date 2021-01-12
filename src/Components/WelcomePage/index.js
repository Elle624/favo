import React from "react";
import { Link } from "react-router-dom";
import "./WelcomePage.scss";
import homepageButton from "../../Assets/homepage-button.png";

const WelcomePage = () => {
  return(
    <section className="welcome-page-container">
      <div className="welcome-page-titles-wrapper">
        <h1 className="welcome-page-title">Welcome to iVolunteer!</h1>
        <h2 className="welcome-page-tagline">JUST DO IT!</h2>
      </div>
      <div>
        <p>go to your profile</p>
        <Link className="welcome-page-link">
          <img className="welcome-page-button" src={homepageButton} alt="homepage-button"/>
        </Link>
      </div>

    </section>
  )

}

export default WelcomePage;