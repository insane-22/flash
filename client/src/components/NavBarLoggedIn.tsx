import { User } from "../models/user";
import Swal from "sweetalert2";
import { Button, Navbar } from "react-bootstrap";
import { useAuth } from "../context/authContext";

interface NavLoggedInProps {
  loggedUser: User;
  onLogoutSuccessful: () => void;
}
const NavBarLoggedIn = ({
  loggedUser,
  onLogoutSuccessful,
}: NavLoggedInProps) => {
  const [auth, setAuth] = useAuth();
  const logout = async () => {
    try {
        setAuth({
          ...auth,
          user: null,
          token: "",
        });
        localStorage.removeItem("auth");
      onLogoutSuccessful();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Couldn't logout",
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <>
      <Navbar.Text className="ms-auto me-5">
        Signed in as {loggedUser.username}
      </Navbar.Text>
      <Button onClick={logout}>Log Out</Button>
    </>
  );
};

export default NavBarLoggedIn;
