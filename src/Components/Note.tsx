"use client";
import React from "react";
import { MdDelete } from "react-icons/md";
import { MdEditDocument } from "react-icons/md";
interface NoteProps {
    message:string
    title:string
  }
const Note:React.FC<NoteProps> = ({title,message}) => {
    const handleDelete = () => {
        console.log("delete")
    }
  return (
    <>
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500">
       
        <textarea
        value={message}
        onChange={()=>""}
          cols={32}
          rows={10}
          className="outline-none resize-none bg-gray-50 p-2.5 text-sm text-gray-900 "
        />
        <div className="flex justify-around">
          <span className="cursor-pointer bg-gray-200 rounded-full p-1">
            <MdEditDocument color="green" size="1.5em" />
          </span>
          <span onClick={handleDelete} className="cursor-pointer bg-gray-200 rounded-full p-1">
            <MdDelete color="red" size="1.5em" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Note;
