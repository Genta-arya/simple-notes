import React, { useState, useEffect } from "react";
import { getInitialData, showFormattedDate } from "../Utils/index";
import { useSearch } from "../Utils/SearchContext";
import ArchivedNotes from "./Arsip";

function Note({ notest }) {
  const [notes, setNotes] = useState([]);
  const [deletedNoteId, setDeletedNoteId] = useState(null);
  const { searchTerm } = useSearch();
  const [archivedNotes, setArchivedNotes] = useState([]);

  useEffect(() => {
    const initialData = getInitialData().concat(notest);
    setNotes(initialData);
  }, [notest, archivedNotes]);

  const filteredNotes = notes.filter(
    (note) =>
      note &&
      note.title &&
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !archivedNotes.some((archivedNote) => archivedNote.id === note.id)
  );
  const handleDelete = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    setDeletedNoteId(id);
  };

  const handleArchive = (id) => {
    const archivedNote = notes.find((note) => note.id === id);

    setArchivedNotes((prevArchivedNotes) => [
      ...prevArchivedNotes,
      archivedNote,
    ]);

    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
  };

  const moveFromArchive = (id) => {
    const archivedNote = archivedNotes.find((note) => note.id === id);
    setArchivedNotes((prevArchivedNotes) =>
      prevArchivedNotes.filter((note) => note.id !== id)
    );
    setNotes([...notest, archivedNote]);
  };

  return (
    <div className="mt-12 flex items-center justify-center">
      <div className="container mx-auto p-5">
        <h1 className="text-2xl font-semibold mb-4 text-white">
          Catatan aktif
        </h1>
        {filteredNotes.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-white border border-white p-5 rounded-full">
              Tidak ada Catatan
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="shadow-md rounded-md overflow-hidden h-full border border-white"
              >
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 text-white">
                    {note.title}
                  </h2>
                  <p className="text-gray-400 mt-2 mb-4 text-sm">
                    Dibuat pada {showFormattedDate(note.createdAt)}
                  </p>
                  <p className="text-white">{note.body}</p>
                </div>
                <div className=" flex justify-center ">
                  <button
                    className="text-lg font-serif font-extrabold hover:text-red-800 py-2 px-4 rounded w-full border border-white text-orange-700"
                    onClick={() => handleDelete(note.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-lg font-serif font-extrabold hover:text-yellow-700 text-yellow-500 py-2 px-4 rounded w-full border border-white"
                    onClick={() => handleArchive(note.id)}
                  >
                    Arsipkan
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <ArchivedNotes
          archivedNotes={archivedNotes}
          onMoveFromArchive={moveFromArchive}
        />
      </div>
    </div>
  );
}

export default Note;
