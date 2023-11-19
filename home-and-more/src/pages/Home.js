import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/Banner.jpg";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
        <h1> Bidding Buzz </h1>
        <p> Don't hesitate, participate.</p>
        <Link to="/menu">
          <button> BID NOW </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
