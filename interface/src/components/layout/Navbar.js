import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../actions/userActions'
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function INavbar() {
  const user = useSelector((state) => state.userSignin);
  const connectActive = user.userInfo ? user.userInfo.name && user.userInfo.name.length > 0 : false; 

      
  const dispatch = useDispatch();

  const disconnect = () => {
    console.log("déconnexion");
    //$('#logoutModal').modal('toggle');
    dispatch(logout());
  }

  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container >
        <Navbar.Brand href="/" className="">IntelliNote</Navbar.Brand>


          <div className="">
              <Nav className="">
                { !connectActive ?
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">Inscription</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signIn">Connexion</Link>
                  </li>
                </>
              :
              
              <DropdownButton
                align="end"
                title={connectActive && user.userInfo.name}
                id="dropdown-menu-align-end"
                variant="light"
              >
                <Dropdown.Item href="/account" >
                  compte
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="/SignIn" onClick={disconnect}>Déconnexion</Dropdown.Item>
              </DropdownButton>

                }
              </Nav>
          </div>
      </Container>
    </Navbar>
  );
}

export default INavbar;

