import Note from "../Component/CatatanAktiv";
import Header from "../Component/Header";
import React, { useState } from "react";
import UploadNote from "../Component/UploadNote";

function App() {
  const [notest, setNotes] = useState([]);

  const addNote = (newNote) => {
    setNotes([...notest, newNote]);
  };

  return (
    <div className="App">
      <Header />
      <UploadNote onNoteUpload={addNote} />
      <Note notest={notest} />
    </div>
  );
}

export default App;
