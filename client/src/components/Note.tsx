import { NoteModel } from "../models/note";
import { Card } from "react-bootstrap";
import styles from "../styles/Note.module.css";
import { formatDate } from "../utils/Date";
import { MdDelete } from "react-icons/md";

interface NoteProps {
  note: NoteModel;
  className?: string;
  onDeleteNoteClicked: (note: NoteModel) => void;
  onNoteClicked: (note: NoteModel) => void;
}

const Note = ({ note, className, onDeleteNoteClicked, onNoteClicked }: NoteProps) => {
  let text: string;
  if (note.updatedAt > note.createdAt) {
    text = "Updated: " + formatDate(note.updatedAt);
  } else {
    text = "Created: " + formatDate(note.createdAt);
  }
  return (
    <Card onClick={()=>onNoteClicked(note)}>
      <Card.Body
        className={`${styles.noteCard} ${styles.cardBody} ${className}`}
      >
        <Card.Title className={styles.flexCentre}>
          {note.title}
          <MdDelete
            className="text-muted ms-auto"
            onClick={(e) => {
              onDeleteNoteClicked(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{text}</Card.Subtitle>
        <Card.Text className={styles.cardText}>{note.text}</Card.Text>
      </Card.Body>
      {/* <Card.Footer className="text-muted">{note.createdAt}</Card.Footer> */}
    </Card>
  );
};

export default Note;
