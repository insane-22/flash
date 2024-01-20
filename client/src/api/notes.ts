import axios, { AxiosError, AxiosResponse } from "axios";
import { NoteModel } from "../models/note";

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

export async function fetchNotes(): Promise<NoteModel[]> {
  const response = await fetchData<NoteModel[]>(
    "http://localhost:8000/api/v1/notes",
    "GET"
  );
  // console.log(typeof response.data)
  return response.data;
}

export interface NoteInput {
  title: string;
  text?: string;
}

export async function createNote(note: NoteInput): Promise<NoteModel> {
  const response = await fetchData<NoteModel>(
    "http://localhost:8000/api/v1/notes",
    "POST",
    note
  );
  return response.data;
}

export async function deleteNote(noteId: string) {
  await fetchData(`http://localhost:8000/api/v1/notes/${noteId}`, "DELETE");
}

export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<NoteModel> {
  const response = await fetchData<NoteModel>(
    `http://localhost:8000/api/v1/notes/${noteId}`,
    "PATCH",
    note
  );
  // console.log(response.data)
  return response.data;
}
