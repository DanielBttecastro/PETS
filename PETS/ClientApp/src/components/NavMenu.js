import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link  } from 'react-router-dom';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
   
  componentDidMount() {
    // Usar setInterval para verificar la variable de sesión cada 5 segundos
    this.interval = setInterval(() => {
      const sesionIniciada = localStorage.getItem('SesionIniciada') || null;
      this.setState({ sesionIniciada });
    }, 1000);  
  }

  componentWillUnmount() {
    // Limpia el intervalo al desmontar el componente
    clearInterval(this.interval);
  }
  render() { 
    const { sesionIniciada } = this.state;
     
   
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
          <NavbarBrand tag={Link} className="nombre" to="/">PETS</NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
            {sesionIniciada  === null ? (
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="enlace"  to="/">Inicio</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="enlace" to="/Login">Iniciar sesión</NavLink>
                </NavItem>
              </ul>
            ) : (
              // Aquí coloca los elementos del menú que deseas mostrar cuando la sesión está iniciada
              // Ejemplo:
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="enlace" to="/AdminPrincipal">Mascotas</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="enlace" to="/Medicos">Medicos</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="enlace" to="/Medicamentos">Medicamentos</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="enlace" to="/Razas">Razas</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="enlace" to="/Clientes">Clientes</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="enlace" to="/Informes">Informes</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="enlace" to="/">Cerrar sesion</NavLink>
                </NavItem>
              </ul>
            )}
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
