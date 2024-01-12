import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.style.css';
import Logo from '../../img/logopngwhite.png';


function Menu() {
  return (
    <Navbar expand="lg" className="menu">
      <Container>
        <Navbar.Brand href="#home" className='logo'>
          <img src={Logo} alt="logo" />
          </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Menu;