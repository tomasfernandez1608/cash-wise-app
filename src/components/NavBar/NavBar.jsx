import { useState, useEffect } from "react";
import { Link, NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const [sessionId, setSessionId] = useState();
    const [usuario, setUsuario] = useState({});

    useEffect(() => {
        setSessionId(localStorage.getItem("sessionId"));
        setUsuario(JSON.parse(localStorage.getItem("user")))
    }, [sessionId]);


    const cerrarSesion = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    return (
        <header>
            <nav>
                <div className='navbar'>
                    <Link to="/" className="logo">
                        <div className="logo-holder">
                            <h1>Cashwise</h1>
                            <p>App</p>
                        </div>
                    </Link>
                    {sessionId ? <ul>
                        <li>
                            <button className="btn btn-secondary ms-auto ms-md-0 me-3 me-lg-3">Ver perfil</button>
                        </li>
                        <li>
                            <button className="btn btn-danger" onClick={cerrarSesion}>Cerrar sesión</button>
                        </li>
                    </ul> : null}
                </div>
                <ul className='nav'>
                    <li><NavLink to="/">Inicio</NavLink></li>
                    {sessionId && !usuario.admin
                        ? <li><NavLink to='/historial'>Historial</NavLink></li>
                        : null
                    }
                    {sessionId && usuario.admin
                        ? <li><NavLink to='/categoria'>Categorías</NavLink></li>
                        : null
                    }
                    <li><NavLink to="/nosotros">¿Quiénes somos?</NavLink></li>
                    <li><NavLink to="/contacto">Contacto</NavLink></li>
                    {!sessionId ? (
                        <li><NavLink to="/registro">Registrarse</NavLink></li>
                    ) : null}
                </ul>
            </nav>
        </header>
    )
}

export default NavBar;