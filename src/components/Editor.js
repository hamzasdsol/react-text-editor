import React, { useRef, useState, useEffect } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { TrashIcon } from "@heroicons/react/24/outline";
import ImageResizer from "quill-image-resizer";
import "../App.css";

Quill.register("modules/imageResizer", ImageResizer);

const TextEditor = () => {
  const [editorContent, setEditorContent] = useState("");
  const quillRef = useRef(null);

  const handleChange = (value) => {
    setEditorContent(value);
  };

  const handleDeleteAll = () => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      quill.setText(""); 
  
      const resizerElements = document.querySelectorAll(".ql-image-resizer");
      resizerElements.forEach((element) => element.remove());
    }
  };
  

  
  
  
  
  useEffect(() => {
    const quill = quillRef.current?.getEditor();
  
    if (quill) {
      const container = quill.root;
  
      const handleImageClick = (event) => {
        if (event.target.tagName === "IMG") {
          const blot = Quill.find(event.target);
          if (blot) {
            const index = quill.getIndex(blot); 
            quill.setSelection(index, 1);
          }
        }
      };
  
      const handleTextChange = () => {
        const resizerElements = document.querySelectorAll(".ql-image-resizer");
        resizerElements.forEach((element) => element.remove());
      };
  
      container.addEventListener("click", handleImageClick);
      quill.on("text-change", handleTextChange);
  
      return () => {
        container.removeEventListener("click", handleImageClick);
        quill.off("text-change", handleTextChange);
      };
    }
  }, []);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"],
      [{ font: ["sans-serif", "serif", "monospace"] }],
      ["clean"],
    ],
    imageResizer: {},
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "align",
    "link",
    "image",
    "font",
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h2 className="text-3xl font-semibold text-black mt-4 mb-4">
        Text Editor
      </h2>
  
      <div className="flex justify-center w-full max-w-4xl flex-1">
        <div className="flex flex-col w-full h-[calc(100vh-92px)] bg-white shadow-lg rounded-lg">
          <div className="flex-1 overflow-y-auto ">
            <ReactQuill
              ref={quillRef}
              value={editorContent}
              onChange={handleChange}
              theme="snow"
              placeholder="Start typing here..."
              modules={modules}
              formats={formats}
            />
          </div>
  
          <div
            className="absolute bottom-4 right-4 p-2 bg-gray-400 text-white rounded-full shadow-lg cursor-pointer hover:bg-gray-500"
            onClick={handleDeleteAll}
          >
            <TrashIcon className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default TextEditor;


