import React from "react";
import imageSrc from '../assets/profile.png'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { faTelegram ,faFacebook , faInstagram ,faReact ,faPython } from '@fortawesome/free-brands-svg-icons';

const About = () => {
  return (
  <main className="about"> 
    <div className="wrapper">
    <div className="left">
   
        <img src={imageSrc}  alt="user" width="100" />
        <h4>Feras Al Ghazi</h4>
           <p>Student Developer</p>
<a href="https://www.htwsaar.de/studium-und-lehre/studienangebot/studiengaenge/kommunikationsinformatik_bachelor" target="_blank" >Kommunikationsinformatik B.Sc.</a>

  
    </div>
    <div className="right">
        <div className="info">
            <h3>Information</h3>
            <div className="info_data">
                 <div className="data">
                    <h4>Email</h4>
                    <p>fal-ghazi@htwsaar.de</p>
                 </div>
                 <div className="data">
                   <h4>Phone</h4>
                    <p>+49 174 5694307</p>
              </div>
            </div>
        </div>
      
      <div className="projects">
            <h3>Projects</h3>
            <div className="projects_data">
                 <div className="data">
                    <h4>weather app using AI</h4>
                    <p>Eine Wetter-App zur Visualisierung der Wetterdaten aus einem Wetterstation inklusive einer KI-gestützten Wetterprognose</p>
                 </div>
                 <div className="data">
                   <h4>Betreuung</h4>
                    <a href="https://www.htwsaar.de/ingwi/fakultaet/personen/profile/albrecht.kunz" target="_blank" >Prof. Dr. Albrecht Kunz</a>
              </div>
            </div>
        </div>
      
        <div className="social_media">
            <ul>
            <li> 
    <a href="t.me/feras_alghazi" target="_blank" >
    <FontAwesomeIcon icon={faTelegram} />
    </a>
    </li>
            <li> 
       <a href="https://www.facebook.com/profile.php?id=100005274877265" target="_blank">
    <FontAwesomeIcon icon={faFacebook} />
        </a>
    </li>
            <li> 
           <a href="https://www.instagram.com/feras_alghazi" target="_blank">
    <FontAwesomeIcon icon={faInstagram} />
       </a>
    </li>
  
          </ul>
      </div>
    </div>
</div>
<div className="cards">
<h1> Tools and Technology </h1>
<div>
  <fieldset>
    <legend>Frontend</legend>
    <FontAwesomeIcon icon={faReact} />
    <label>React.js </label>
  </fieldset>
</div>
<div>
  <fieldset>
    <legend>webserver</legend>
    <FontAwesomeIcon icon={faPython} />
    <label>python flask </label>
  </fieldset>
</div>
<div>
  <fieldset>
    <legend>Database</legend>
    <FontAwesomeIcon icon={faDatabase} />
    <label>mysql </label>
  </fieldset>
</div>
  <h1> Hardware </h1>  
<div>
  <fieldset>
    <legend>Board  </legend>
    
    <label> ARDUINO UNO R4 WiFi  </label>
  </fieldset>
</div>
<div>
  <fieldset>
    <legend> Board </legend>
    
    <label> WiFi ESP WROOM 32   </label>
  </fieldset>
</div>
<div>
  <fieldset>
    <legend> Sensor </legend>
    
    <label> BME 680   </label>
  </fieldset>
</div>

</div>
     </main>);
};
export default About;
