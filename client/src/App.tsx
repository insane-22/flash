import { useEffect, useState } from "react";
import { NoteModel } from "./models/note";
// import axios from "axios";
import Note from "./components/Note";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import styles from "./styles/Notepage.module.css";
import * as NotesApi from "./api/notes";
import Swal from "sweetalert2";
import AddEditNote from "./components/AddEditNote";

function App() {
  const [loading, setLoading] = useState(true);
  const [showLoadingError, setShowLoadingError] = useState(false);
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNote, setShowAddNote] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  const getAllNotes = async () => {
    try {
      setLoading(true);
      setShowLoadingError(false);
      const data = await NotesApi.fetchNotes();
      if (data.success) {
        setNotes(data?.notes);
      }
    } catch (error) {
      console.log(error);
      setShowLoadingError(true);
    } finally {
      setLoading(false);
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

  const noteArea = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteArea}`}>
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
  );

  return (
    <Container className={styles.notePage}>
      <Button className="mb-4" onClick={() => setShowAddNote(true)}>
        Add Note
      </Button>

      {loading && <Spinner animation="grow" variant="dark"/>}
      {showLoadingError && <p>Something Went Wrong. Please Try Again</p>}
      {!loading && !showLoadingError && 
      <>
      {notes.length>0 ? noteArea : <p>You don't have any notes yet!</p>}
      </>
      }

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
