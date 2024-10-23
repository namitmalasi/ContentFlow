import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { db } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [scheduleDate, setScheduleDate] = useState(null);
  const [error, setError] = useState("");

  const handlePostCreation = async (e) => {
    e.preventDefault();

    // Check if title or content is missing
    if (!title || !content) {
      setError("Title and content are required.");
      return;
    }

    try {
      // Create a new post document in Firestore
      await addDoc(collection(db, "posts"), {
        title,
        content,
        scheduleDate: scheduleDate ? scheduleDate.toISOString() : null,
        createdAt: new Date().toISOString(),
      });

      // Reset form
      setTitle("");
      setContent("");
      setScheduleDate(null);
      setError("");
      alert("Post created successfully!");
    } catch (err) {
      console.error("Error creating post:", err);
      setError("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Create Post</h2>
      <form onSubmit={handlePostCreation}>
        {error && <p className="text-red-500">{error}</p>}

        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Title"
          className="border p-2 w-full mb-4"
        />

        {/* Rich Text Editor for Content */}
        <ReactQuill
          value={content}
          onChange={setContent}
          placeholder="Write your post content here..."
          className="mb-4"
        />

        {/* Date-Time Picker for Scheduling */}
        <DatePicker
          selected={scheduleDate}
          onChange={(date) => setScheduleDate(date)}
          showTimeSelect
          dateFormat="Pp"
          placeholderText="Select schedule date & time"
          className="border p-2 w-full mb-4"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 w-full"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
