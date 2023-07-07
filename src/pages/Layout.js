import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../index.css";
const Layout = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Sistema de Ensalamento</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="professor">Professores</Nav.Link>
              <Nav.Link href="periodo">Períodos</Nav.Link>
              <Nav.Link href="curso">Cursos</Nav.Link>
              <Nav.Link href="sala">Salas</Nav.Link>
              <Nav.Link href="horario">Horários</Nav.Link>
              <Nav.Link href="desafio">Desafios</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Olá, <b>Coordenador (a)</b>!
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
