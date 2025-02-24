"use client"

import { useState } from "react";
import FileUpload from "./FileUpload";

export default function NewChat() {
  const [isOpen, setIsOpen] = useState(false);
  // const [isDisabled, setIsDisabled] = useState(true);
  
  // isDisabled = "class"

  return (
    <>
      <button
      className="bg-neutral-950 text-white font-semibold rounded-2xl px-6 py-2 cursor-pointer"
      onClick={() => setIsOpen(true)}
      >
      New Chat
      </button>
      {isOpen && (
      <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <section className="bg-white rounded-lg max-w-6xl w-full">
          
          {/* Header */}
          <div className="flex justify-between items-center border-b border-black/30 p-4">
            <h2 className="text-xl font-semibold mb-4">Documents</h2>

            <input
              type="text"
              placeholder="Search for files"
              className="border border-black/30 rounded-2xl px-4 py-2"
            />

          </div>

          {/* Body */}
            <section className="p-2">
              <FileUpload />
            </section>


          {/* Footer */}
          <div className="flex justify-end p-4 items-center border-t border-black/30">
            <button
              className="font-semibold border border-black/30 rounded-2xl px-4 py-2 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </button>
            <button
              disabled
              className="bg-neutral-950 text-white font-semibold rounded-2xl px-4 py-2 ml-4 cursor-pointer disabled:opacity-20"
            >
              Start Conversation
            </button>
          </div>

        </section>
      </section>
      )}
    </>
  );
}