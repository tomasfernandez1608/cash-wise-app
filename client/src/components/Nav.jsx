const Nav = () => {
    return (
        <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu bg-secondary">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Core</div>
                        <a className="nav-link text-white" href="index.html">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-tachometer-alt"></i>
                            </div>
                            Dashboard
                        </a>
                        <div className="sb-sidenav-menu-heading">Addons</div>
                        <a className="nav-link text-white" href="charts.html">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-chart-area"></i>
                            </div>
                            Charts
                        </a>
                        <a className="nav-link text-white" href="tables.html">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-table"></i>
                            </div>
                            Historial
                        </a>
                        <div className="sb-sidenav-menu-heading">Nosotros</div>
                        <a className="nav-link text-white" href="charts.html">
                            <div className="sb-nav-link-icon">
                                <i className="fa-solid fa-star fa-flip"></i>
                            </div>
                            Premium
                        </a>
                        <a className="nav-link text-white" href="charts.html">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-chart-area"></i>
                            </div>
                            ¿Quienes Somos?
                        </a>
                        <a className="nav-link text-white" href="tables.html">
                            <div className="sb-nav-link-icon">
                                <i className="fas fa-table"></i>
                            </div>
                            Contacto
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
