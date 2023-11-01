import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./views/Home";
import About from './views/About';
import Contact from './views/Contact';
import Register from './views/Register';
import NavBar from './components/NavBar';
import CategoriasAdmin from './components/CategoriasAdmin';
import Nav from './components/Nav';
import './styles.css';
import { Password } from './components/Password';
import Historia from './views/Historia';
import Categoria from './views/Categoria';

const App = () => {
  return (
    <BrowserRouter>
      <div className="sb-nav-fixed">
        <NavBar />
        <div id="layoutSidenav">
          <Nav />
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
              path="/Categoria"
              exact
              element={<Categoria />}
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
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
