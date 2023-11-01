import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    const [sidebarToggle, setSidebarToggle] = useState(false);
    const [sessionId, setSessionId] = useState();

    useEffect(() => {
        setSessionId(localStorage.getItem("sessionId"));
    }, [sessionId]);

    const handleBtn = () => {
        setSidebarToggle(!sidebarToggle);
    };

    const cerrarSesion = () => {
        localStorage.clear();
        window.location.href = '/';
    }

    sidebarToggle ? document.body.classList.add('sb-sidenav-toggled') : document.body.classList.remove('sb-sidenav-toggled');

    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <Link className="navbar-brand ps-3 text-white" to="/">Cashwise</Link>
            <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!" onClick={handleBtn}><i className="fas fa-bars"></i></button>
            <div className="ms-auto"></div>
            {sessionId ? <div className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                {/* <button className="btn btn-info ms-auto ms-md-0 me-3 me-lg-3">Ver perfil</button> */}
                <button className="btn btn-secondary" onClick={cerrarSesion}>Cerrar sesión</button>
            </div> : null}

        </nav>
    )
}

export default NavBar;