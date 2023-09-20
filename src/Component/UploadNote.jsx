import React, { useState } from "react";

function UploadNote({ onNoteUpload }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [remainingChars, setRemainingChars] = useState(50);
  const [idCounter, setIdCounter] = useState(7);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setRemainingChars(50 - newTitle.length);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleNoteSubmit = () => {
    const newNoteId = idCounter;

    setIdCounter(idCounter + 1);

    const newNote = {
      id: newNoteId,
      title: title,
      body: content,
      createdAt: new Date().toISOString(),
      archived: false,
    };

    onNoteUpload(newNote);

    setTitle("");
    setContent("");
    setRemainingChars(50);
  };

  return (
    <>
      <div className="max-w-xl mx-auto p-4 bg-[#202124] text-white mt-8">
        <h1 className="text-2xl font-semibold mb-2">Buat Catatan</h1>
        <div className="mb-2 flex justify-end">
          <span className="text-gray-400 text-base">
            sisa karakter: {remainingChars}
          </span>
        </div>
        <input
          type="text"
          id="title"
          className="w-full bg-[#202124] border border-white text-white px-3 py-2 rounded-md"
          placeholder="Judul Catatan"
          maxLength="50"
          value={title}
          onChange={handleTitleChange}
        />
        <div className="mb-2 mt-2">
          <textarea
            id="content"
            className="w-full bg-[#202124] border border-white text-white rounded-md px-3 py-2"
            rows="8"
            placeholder="Tulis catatanmu disini"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <button
          className="w-full bg-[#202124] hover:bg-gray-600 border border-white rounded-md text-white py-2 px-4"
          onClick={handleNoteSubmit}
        >
          Buat
        </button>
      </div>
    </>
  );
}

export default UploadNote;
