import React from "react";
import { useUserContext } from "../Router/UserContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faMoon,
  faTemperatureQuarter,
  faIdCard,
  faSun,
  faLineChart,
  faSignOut
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../Router/ThemeContext";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const { user  , setUser} = useUserContext();
  const { isDarkMode, toggleTheme } = useTheme();
const signout = () => {
  setUser(null);
}
    const logging = () => {
    if(!user){
      navigate("/");
    }
  }
  const iconTheme = isDarkMode ? faSun : faMoon;
  useEffect(() => {
  const intervalId = setInterval(logging, 1000);
  return () => clearInterval(intervalId);
}, [user]);
  return (
    <header>
      <div>
        <h1> Weather App</h1>
      </div>
      {user ? (
      <nav>
        <ul>
          <li>
            <Link to="/home">
              <FontAwesomeIcon icon={faHome} />
            </Link>
          </li>
          <li>
            <Link to="/live-temp">
              <FontAwesomeIcon icon={faTemperatureQuarter} />
            </Link>
          </li>
          <li>
            <Link to="/Data">
              <FontAwesomeIcon icon={faLineChart} />
            </Link>
          </li>

          <li>
            <Link to="/about">
              <FontAwesomeIcon icon={faIdCard} />
            </Link>
          </li>
        </ul>
      </nav>
      ) : <div>
         
        </div>
        }
              {user ? (  
      <div className="final">
      
        <Link to="/">
         <label>Welocme {user.firstname} </label>
          <FontAwesomeIcon icon={faSignOut}  onClick={signout} />
        </Link>
        <FontAwesomeIcon icon={iconTheme} onClick={toggleTheme} />
      </div>
              ) :
              <div className="final">
 
              <Link to="/">

                <FontAwesomeIcon icon={faUser} />
              </Link>
              <FontAwesomeIcon icon={iconTheme} onClick={toggleTheme} />
            </div>
}
    </header>
  );
};

export default Header;
