import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LoginParams } from "../api/auth";
import Swal from "sweetalert2";
import * as AuthApi from "../api/auth";
import { Button, Form, Modal } from "react-bootstrap";
import InputField from "./form/InputField";
import { useAuth } from "../context/authContext";

interface LoginProps {
  onDismiss: () => void;
  onSuccess: (user: User) => void;
}

const LoginModal = ({ onDismiss, onSuccess }: LoginProps) => {
    const [auth, setAuth] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginParams>();
  const onSubmit = async (params: LoginParams) => {
    try {
      const newUser = await AuthApi.signin(params);
      if(newUser.success){
        setAuth({
          ...auth,
          user: newUser.user,
          token: newUser.token,
        });
        localStorage.setItem("auth", JSON.stringify(newUser));
      }
      onSuccess(newUser);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Couldn't signup",
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="email"
            label="Email"
            type="email"
            placeholder="Email"
            register={register}
            registerOptions={{ required: true }}
            error={errors.email}
          />

          <InputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: true }}
            error={errors.password}
          />

          <Button type="submit" disabled={isSubmitting}>
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
