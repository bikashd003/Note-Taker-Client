"use client";
import React, { useState, useEffect } from "react";
import { MdOutlineAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
import axios from "axios";
import { API } from "@/Services/Api";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Note {
  id: number;
  title: string;
  message: string;
  _id: string;
}

const CreateNote = () => {
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [edit, setEdit] = useState<boolean>(false);
  const [id, setId] = useState<string>("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!edit) {
      await axios.post(
        `${API}/notes/create`,
        { title, message },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );
      toast("Note created successfully");
      setTitle("");
      setMessage("");
      getNotes();
    } else if (edit) {
      await axios.put(
        `${API}/notes/update/${id}`,
        { title, message },
        {
          headers: { Authorization: `${localStorage.getItem("token")}` },
        }
      );
      toast("Note updated successfully");
      setTitle("");
      setMessage("");
      setEdit(false);
      getNotes();
    }
  };
  const handleDelete = async (id: string) => {
    await axios.delete(`${API}/notes/delete/${id}`, {
      headers: { Authorization: `${localStorage.getItem("token")}` },
    });
    toast("Note deleted successfully");
    getNotes();
  };
  const handleEdit = async (id: string) => {
    const editedNote = notes.find((note) => note._id === id);
    if (editedNote) {
      setTitle(editedNote.title);
      setMessage(editedNote.message);
      setEdit(true);
      setId(id);
    }
  };

  const getNotes = async () => {
    await axios
      .get(`${API}/notes/get-notes`, {
        headers: { Authorization: `${localStorage.getItem("token")}` },
      })
      .then((res) => {
        setNotes(res.data);
      })
      .catch((err:any) => {
       console.log(err.message);
      });
  };
  useEffect(() => {
    getNotes();
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, []);

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
      <div className="flex px-12 py-6 gap-4 flex-wrap ">
        {notes.length > 0 &&
          notes.map((note, id) => (
            <div
              key={id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            >
              <h1 className="bg-yellow-300 p-2 rounded-t-md font-semibold">
                {note.title || "..."}
              </h1>
              <textarea
                readOnly
                value={note.message}
                onChange={() => ""}
                cols={32}
                rows={10}
                className="outline-none resize-none bg-yellow-200 rounded-b-md p-2.5 text-base text-gray-900 "
              />
              <div className="flex justify-around">
                <span
                  className="cursor-pointer bg-gray-200 rounded-full p-1"
                  onClick={() => handleEdit(note._id)}
                >
                  <MdEditDocument color="green" size="1.5em" />
                </span>
                <span
                  className="cursor-pointer bg-gray-200 rounded-full p-1"
                  onClick={() => handleDelete(note._id)}
                >
                  <MdDelete color="red" size="1.5em" />
                </span>
              </div>
            </div>
          ))}
      </div>
      <ToastContainer />
    </>
  );
};

export default CreateNote;
