"use client";
import React, { useState } from "react";
import Note from "./Note";
import { MdOutlineAdd } from "react-icons/md";

interface Note {
  id: number;
  title: string;
  message: string;
}

const CreateNote = () => {
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNote: Note = { id: notes.length + 1, title, message };
    setNotes([...notes, newNote]);
    setTitle("");
    setMessage("");
  };

  return (
    <>
      <form className="max-w-sm mx-auto font-medium" onSubmit={handleSubmit}>
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Enter title
        </label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          id="title"
          className="outline-none	 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="relative">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Enter message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            id="message"
            rows={4}
            className="outline-none	 resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Leave a comment..."
          />
          <button
            className="absolute right-2 top-28 bg-gray-50 border rounded-full"
            type="submit"
          >
            <MdOutlineAdd size="1.5em" />
          </button>
        </div>
      </form>
      <div className="flex px-12 py-2 gap-4 flex-wrap ">
        {notes.length > 0 &&
          notes.map((note) => (
            <Note key={note.id} message={note.message} title={note.title} />
          ))}
      </div>
    </>
  );
};

export default CreateNote;
