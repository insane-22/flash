import { Modal, Form, Button } from "react-bootstrap";
import { NoteModel } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "../api/notes";
import * as NotesApi from "../api/notes";
import Swal from "sweetalert2";

interface AddEditNoteProps {
  noteToEdit?:NoteModel;
  onDismiss: () => void;
  onSave: (note: NoteModel) => void;
}

const AddEditNote = ({noteToEdit, onDismiss, onSave }: AddEditNoteProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues:{
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    }
  });

  const onSubmit = async (input: NoteInput) => {
    try {
      let noteResponse: NoteModel;
      if(noteToEdit){
        noteResponse = await NotesApi.updateNote(noteToEdit._id,input)
      }else{
        noteResponse = await NotesApi.createNote(input);
      }
      onSave(noteResponse);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Couldn't create note",
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? "Edit Note" : "Add Note"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              isInvalid={!!errors.title}
              {...register("title", { required: "Required" })}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Text"
              {...register("text")}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditNote;
