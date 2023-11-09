import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./views/Home";
import Login from './views/Login';
import About from './views/About';
import Contact from './views/Contact';
import Register from './views/Register';
import Historial from './views/Historial';
import Categoria from './views/Categoria';
import Ingreso from './views/Ingreso'
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer';
import { Password } from './components/Password';
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
          path="/login"
          exact
          element={<Login />}
        />
        <Route
          path="/historial"
          exact
          element={<Historial />}
        />
        <Route
          path="/categoria"
          exact
          element={<Categoria />}
        />
        <Route
          path="/registro"
          exact
          element={<Register />}
        />
        <Route
          path="/ingreso"
          exact
          element={<Ingreso />}
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
      <Footer />
    </BrowserRouter>
  )
}

export default App
