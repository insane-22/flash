import { Container } from "react-bootstrap";
import styles from "./styles/Notepage.module.css";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar";
import { useState } from "react";
import HomeLoggedIn from "./components/HomeLoggedIn";
import HomeLoggedOut from "./components/HomeLoggedOut";
import { useAuth } from "./context/authContext";

function App() {
  const [auth, setAuth] = useAuth();
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
      <NavBar
        loggedInUser={auth?.user}
        onLogin={() => setShowLogin(true)}
        onLogout={() => {
          setAuth({
            ...auth,
            user: null,
            token: "",
          });
          localStorage.removeItem("auth");
        }}
        onRegister={() => setShowRegister(true)}
      />
      <Container className={styles.notePage}>
        <>
          {auth.user ? <HomeLoggedIn /> : <HomeLoggedOut />}
          {showRegister && (
            <RegisterModal
              onDismiss={() => setShowRegister(false)}
              onSuccess={(user) => {
                // setLoggedInUser(user);
                console.log(user);
                setShowRegister(false);
              }}
            />
          )}
          {showLogin && (
            <LoginModal
              onDismiss={() => setShowLogin(false)}
              onSuccess={(user) => {
                console.log(user);
                // setLoggedInUser(user);
                // console.log(loggedInUser)
                setShowLogin(false);
              }}
            />
          )}
        </>
      </Container>
    </div>
  );
}

export default App;
