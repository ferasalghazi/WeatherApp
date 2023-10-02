import "./App.css";
import Header from "./components/Header";
import Home from "./containers/Home";
import LiveWeather from "./containers/LiveWeather";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./containers/login";
import About from "./containers/About";
import { useTheme } from "./Router/ThemeContext";
import Charts from "./containers/chrats"
function App() {
  const { isDarkMode } = useTheme();

  return (
    <Router>
      <div className={isDarkMode ? "dark-mode" : "light-mode"}>
        <Header />

        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/live-temp" element={<LiveWeather />} />
          <Route path="/" element={<Login />} />
          <Route path="/Data" element={<Charts />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
