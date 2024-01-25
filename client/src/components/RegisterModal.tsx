import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { RegisterParams } from "../api/auth";
import Swal from "sweetalert2";
import * as AuthApi from "../api/auth";
import { Button, Form, Modal } from "react-bootstrap";
import InputField from "./form/InputField";
import { useAuth } from "../context/authContext";

interface RegisterProps {
  onDismiss: () => void;
  onSuccess: (user: User) => void;
}

const RegisterModal = ({ onDismiss, onSuccess }: RegisterProps) => {
  const [auth, setAuth] = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterParams>();
  const onSubmit = async (params: RegisterParams) => {
    try {
      const newUser = await AuthApi.signup(params);
      if (newUser.success) {
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
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: true }}
            error={errors.username}
          />

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
            Register
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;
