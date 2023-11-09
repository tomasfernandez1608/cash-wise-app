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
                    <ul>
                        {
                            sessionId
                                ? <>
                                    <li>
                                        <Link to='/perfil' className="btn btn-secondary ms-auto ms-md-0 me-3 me-lg-3">Ver perfil</Link>
                                    </li>
                                    <li>
                                        <button className="btn btn-danger" onClick={cerrarSesion}>Cerrar sesión</button>
                                    </li>
                                </>
                                : <>
                                    <li>
                                        <Link to='/login' className="btn btn-secondary ms-auto ms-md-0 me-3 me-lg-3">Iniciar sesión</Link>
                                    </li>
                                    <li>
                                        <Link to='/registro' className="btn btn-primary">Registrarse</Link>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
                <ul className='nav'>
                    <li><NavLink to="/">Inicio</NavLink></li>
                    {sessionId && !usuario.admin
                        ? (<>
                            <li><NavLink to='/historial'>Historial</NavLink></li>
                            <li><NavLink to='/ingresos'>Ingresos</NavLink></li>
                        </>)
                        : null
                    }
                    {sessionId && usuario.admin
                        ? <li><NavLink to='/categoria'>Categorías</NavLink></li>
                        : null
                    }
                    <li><NavLink to="/nosotros">¿Quiénes somos?</NavLink></li>
                    <li><NavLink to="/contacto">Contacto</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar;