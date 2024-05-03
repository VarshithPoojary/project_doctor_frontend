import React from 'react';
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
//import { position } from 'html2canvas/dist/types/css/property-descriptors/position';

function Footer() {
  return (
    
   
    <footer class="home_footer"  style={{backgroundColor:'#060822' }}>
  <div class="footer-content"  >
          <BsTwitter />&nbsp;&nbsp;&nbsp;
          <SiLinkedin />&nbsp;&nbsp;&nbsp;
          <BsYoutube />&nbsp;&nbsp;&nbsp;
          <FaFacebookF />&nbsp;&nbsp;&nbsp;
    <p>© 2024 Healthcare Plus. All rights reserved.</p>
    <nav class="footer-nav">
      <ul>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Use</a></li>
        <li><a href="#contact">Contact Us</a></li>
      </ul>
    </nav>
   <div>
   <h4>Emergency Contact</h4>
  <div className="emergency-info">
    <p>In case of emergency, call</p>
    <div className="emergency-number" style={{ color:'#e74c3c'}}>911</div>
</div>
</div>
</div>
</footer>

  );
}

export default Footer;
