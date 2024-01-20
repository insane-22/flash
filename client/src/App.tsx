import { useEffect, useState } from "react";
import { NoteModel } from "./models/note";
// import axios from "axios";
import Note from "./components/Note";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./styles/Notepage.module.css";
import * as NotesApi from "./api/notes";
import Swal from "sweetalert2";
import AddEditNote from "./components/AddEditNote";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNote, setShowAddNote] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  const getAllNotes = async () => {
    try {
      const data = await NotesApi.fetchNotes();
      if (data.success) {
        setNotes(data?.notes);
      }
    } catch (error) {
      // console.log(error);
      // alert(error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const deleteNote = async (note: NoteModel) => {
    try {
      await NotesApi.deleteNote(note._id);
      Swal.fire({
        icon: "success",
        title: "Done",
        text: "Deleted note successfully",
        timer: 3000,
        timerProgressBar: true,
      });
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Couldn't deletee note",
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <Container>
      <Button className="mb-4" onClick={() => setShowAddNote(true)}>
        Add Note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes?.map((note) => (
          <Col key={note._id}>
            <Note
              note={note}
              className={styles.note}
              onDeleteNoteClicked={deleteNote}
              onNoteClicked={setNoteToEdit}
            />
          </Col>
        ))}
      </Row>
      {showAddNote && (
        <AddEditNote
          onDismiss={() => setShowAddNote(false)}
          onSave={() => {
            getAllNotes();
            setShowAddNote(false);
          }}
        />
      )}
      {noteToEdit && (
        <AddEditNote
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onSave={() => {
            // 
            getAllNotes();
            setNoteToEdit(null);
          }}
        />
      )}
    </Container>
  );
}

export default App;
