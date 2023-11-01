import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./views/Home";
import About from './views/About';
import Contact from './views/Contact';
import Register from './views/Register';
import NavBar from './components/NavBar/NavBar';
import { Password } from './components/Password';
import Historia from './views/Historia';
import './styles.css';

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          exact
          element={<Home />}
        />
        <Route
          path="/historial"
          exact
          element={<Historia />}
        />
        <Route
          path="/registro"
          exact
          element={<Register />}
        />
        <Route
          path="/contacto"
          exact
          element={<Contact />}
        />
        <Route
          path="/nosotros"
          exact
          element={<About />}
        />
        <Route
          path="/olvidoContrasena"
          exact
          element={<Password />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
