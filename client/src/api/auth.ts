import axios, { AxiosError, AxiosResponse } from "axios";
import { User } from "../models/user";

interface ErrorResponse {
  status: number;
  message: string;
}

async function fetchData<T>(
  url: string,
  method: string,
  data?: object
): Promise<AxiosResponse<T>> {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError<ErrorResponse> = error;
      const status = axiosError.response?.status || 500;
      const message =
        axiosError.response?.data?.message || "Internal Server Error";

      console.error(
        `Request failed with status: ${status}, message: ${message}`
      );
    } else {
      console.error("Network error:", error);
    }
    return Promise.reject(error);
  }
}

export interface RegisterParams {
  username: string;
  email: string;
  password: string;
}

export async function signup(params: RegisterParams) {
  const response = await fetchData<User>(
    "http://localhost:8000/api/v1/auth/register",
    "POST",
    params
  );
  return response.data;
}

export interface LoginParams {
  email: string;
  password: string;
}

export async function signin(params: LoginParams) {
  const response = await fetchData<User>(
    "http://localhost:8000/api/v1/auth/login",
    "POST",
    params
  );
  return response.data;
}