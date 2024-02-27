import React from "react";
import imageSrc from '../assets/profile.png'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { faTwitter ,faFacebook , faInstagram ,faReact ,faPython } from '@fortawesome/free-brands-svg-icons';

const About = () => {
  return (
  <main className="about"> 
    <div className="wrapper">
    <div className="left">
   
        <img src={imageSrc}  alt="user" width="100" />
        <h4>Feras .AA.</h4>
         <p>Student Developer</p>
    </div>
    <div className="right">
        <div className="info">
            <h3>Information</h3>
            <div className="info_data">
                 <div className="data">
                    <h4>Email</h4>
                    <p>Feras@gmail.com</p>
                 </div>
                 <div className="data">
                   <h4>Phone</h4>
                    <p>+4911111111</p>
              </div>
            </div>
        </div>
      
      <div className="projects">
            <h3>Projects</h3>
            <div className="projects_data">
                 <div className="data">
                    <h4>Recent</h4>
                    <p>Lorem ipsum dolor sit amet.</p>
                 </div>
                 <div className="data">
                   <h4>Most Viewed</h4>
                    <p>dolor sit amet.</p>
              </div>
            </div>
        </div>
      
        <div className="social_media">
            <ul>
            <li>  <FontAwesomeIcon icon={faTwitter} /></li>
            <li>  <FontAwesomeIcon icon={faFacebook} /></li>
            <li>  <FontAwesomeIcon icon={faInstagram} /></li>

          </ul>
      </div>
    </div>
</div>
<div className="cards">
<h1> Tools and Technology and frameworks</h1>
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




</div>
     </main>);
};
export default About;
