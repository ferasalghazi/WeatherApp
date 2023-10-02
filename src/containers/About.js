import React from "react";
import imageSrc from '../assets/profile.png'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter ,faFacebook , faInstagram} from '@fortawesome/free-brands-svg-icons';

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
    
     </main>);
};
export default About;
