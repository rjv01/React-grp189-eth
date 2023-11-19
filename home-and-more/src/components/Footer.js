import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import{
  faInstagram,
  faTwitter,
  faFacebook,
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import "../styles/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="socialMedia">
        <a href="instagram.com" className="social"><FontAwesomeIcon icon={faInstagram} color="white" /></a>
        <a href="twitter.com" className="social"><FontAwesomeIcon icon={faTwitter} color="white"  /></a>
        <a href="facebook.com" className="social"><FontAwesomeIcon icon={faFacebook} color="white"  /></a>
        <a href="linkedin.com" className="social"><FontAwesomeIcon icon={faLinkedin} color="white"  /></a>
      </div>
      <p> &copy; 2023 biddingbuzz.com</p>
    </div>
  );
}

export default Footer;
