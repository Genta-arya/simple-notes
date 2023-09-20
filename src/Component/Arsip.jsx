import React, { useState, useEffect } from "react";
import { useSearch } from "../Utils/SearchContext";
import { showFormattedDate } from "../Utils/index";
function ArchivedNotes({ archivedNotes, onMoveFromArchive }) {
  const [notes, setNotes] = useState([]);
  const { searchTerm } = useSearch();

  useEffect(() => {
    setNotes(archivedNotes);
  }, [archivedNotes]);

  const filteredNotes = notes.filter(
    (note) =>
      note &&
      note.title &&
      note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-12 flex items-center justify-center">
      <div className="container mx-auto p-5">
        <h1 className="text-2xl font-semibold mb-4 text-white">Arsip</h1>
        {filteredNotes.length === 0 ? (
          <div className="flex items-center justify-center h-64 p-5">
            <p className="text-white border border-white p-5 rounded-full">
              Tidak ada arsip.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="shadow-md rounded-md overflow-hidden h-full border border-white relative"
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
                <div className="p-4 flex justify-center">
                  <button
                    className="text-lg font-serif font-extrabold hover:text-yellow-700 text-yellow-500 py-2 px-4 rounded w-full border border-white"
                    onClick={() => onMoveFromArchive(note.id)}
                  >
                    Pindahkan
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ArchivedNotes;
