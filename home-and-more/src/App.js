import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact component={Home} />
          <Route path="/Menu" exact component={Menu} />
          <Route path="/About" exact component={About} />
          <Route path="/Contact" exact component={Contact} />
        </Routes>
        <Home />
        <Menu />
        <About />
        <Contact />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
