import { Button } from "react-bootstrap";

interface NavLoggedOutProps {
  onSignupClicked: () => void;
  onLoginClicked: () => void;
}

const NavBarLoggedOut = ({
  onLoginClicked,
  onSignupClicked,
}: NavLoggedOutProps) => {
  return (
    <>
      <Button className="ms-auto me-5" onClick={onSignupClicked}>Register</Button>
      <Button onClick={onLoginClicked}>Log In</Button>
    </>
  );
};

export default NavBarLoggedOut;
