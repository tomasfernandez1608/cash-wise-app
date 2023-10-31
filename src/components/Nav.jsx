import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    const [sessionId, setSessionId] = useState();
    const [usuario, setUsuario] = useState({});

    useEffect(() => {
        setSessionId(localStorage.getItem("sessionId"));
        setUsuario(JSON.parse(localStorage.getItem("user")));
    }, [sessionId]);

    return (
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav" id="sidenavAccordion" >
                <div className="sb-sidenav-menu bg-black">
                    <div className="nav">
                        <Link className="nav-link text-white mt-3" to="/">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-tachometer-alt"></i>
                            </div>
                            Inicio
                        </Link>
                        {sessionId && !usuario.admin ? (
                            <>
                                <div className="sb-sidenav-menu-heading text-white">Servicios</div>
                                <Link className="nav-link " to="/historial">
                                    <div className="sb-nav-link-icon">
                                        <i className="fas fa-table"></i>
                                    </div>
                                    Historial
                                </Link>
                            </>
                        ) : null}

                        <div className="sb-sidenav-menu-heading text-white">Nosotros</div>
                        <Link className="nav-link " to="/nosotros">
                            <div className="sb-nav-link-icon">
                                <i className="fa-solid fa-circle-info"></i>
                            </div>
                            ¿Quienes somos?
                        </Link>
                        <Link className="nav-link " to="/contacto">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-table"></i>
                            </div>
                            Contacto
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
