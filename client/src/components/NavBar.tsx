import { User } from "../models/user";
import { Container, Nav, Navbar } from "react-bootstrap";
import NavBarLoggedIn from "./NavBarLoggedIn";
import NavBarLoggedOut from "./NavBarLoggedOut";

interface LoginInfo {
  loggedInUser?: User | null;
  onRegister: () => void;
  onLogin: () => void;
  onLogout: () => void;
}
const NavBar = ({
  loggedInUser,
  onRegister,
  onLogin,
  onLogout,
}: LoginInfo) => {
  return (
    <Navbar bg="light" data-bs-theme="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand>Flash</Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav>
            {loggedInUser ? (
              <NavBarLoggedIn
                loggedUser={loggedInUser}
                onLogoutSuccessful={onLogout}
              />
            ) : (
              <NavBarLoggedOut
                onLoginClicked={onLogin}
                onSignupClicked={onRegister}
              />
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
