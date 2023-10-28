import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav" id="sidenavAccordion" >
                <div className="sb-sidenav-menu bg-black">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading text-white">Core</div>
                        <Link className="nav-link text-white" to="/">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-tachometer-alt"></i>
                            </div>
                            Dashboard
                        </Link>
                        <div className="sb-sidenav-menu-heading text-white">Addons</div>
                        <Link className="nav-link " to="/graficos">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-chart-area"></i>
                            </div>
                            Charts
                        </Link>
                        <Link className="nav-link " to="/historial">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-table"></i>
                            </div>
                            Historial
                        </Link>
                        <div className="sb-sidenav-menu-heading text-white">Nosotros</div>
                        <Link className="nav-link " to="/premium">
                            <div className="sb-nav-link-icon">
                                <i className="fa-solid fa-star fa-flip"></i>
                            </div>
                            Premium
                        </Link>
                        <Link className="nav-link " to="/nosotros">
                            <div className="sb-nav-link-icon">
                                <i className="fa-solid fa-circle-info"></i>
                            </div>
                            About
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
