import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatInterface = () => {
  const [query, setQuery] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Tambahkan efek untuk memulai dengan pesan default
  useEffect(() => {
    setChatHistory([{ user: null, ai: "Halo ada yang bisa saya bantu?" }]);
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilePreview(selectedFile.name);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setFilePreview(null);
  };

  const handleChat = async () => {
    if (!query.trim()) {
      alert("Please enter a question.");
      return;
    }

    setLoading(true);

    try {
      let res;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileQuery", query);

        res = await axios.post("http://localhost:8080/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await axios.post("http://localhost:8080/chat", { query });
      }

      const { answer } = res.data;

      setChatHistory((prev) => [...prev, { user: query, ai: answer }]);
      setQuery("");
      handleRemoveFile();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderResponse = (responseText) => {
    const lines = responseText.split("\n").filter((line) => line.trim() !== "");
    const numberedLines = [];
    const nonNumberedBefore = [];
    const nonNumberedAfter = [];

    let foundNumbered = false;

    lines.forEach((line) => {
      if (/^\d+\.\s/.test(line.trim())) {
        foundNumbered = true;
        numberedLines.push(line);
      } else if (!foundNumbered) {
        nonNumberedBefore.push(line);
      } else {
        nonNumberedAfter.push(line);
      }
    });

    return (
      <div>
        {nonNumberedBefore.map((line, index) => (
          <p key={`non-numbered-before-${index}`}>{line}</p>
        ))}
        {numberedLines.length > 0 && (
          <ol style={{ textAlign: "left", lineHeight: "1.6" }}>
            {numberedLines.map((line, index) => (
              <li key={`numbered-${index}`}>{line.replace(/^\d+\.\s/, "")}</li>
            ))}
          </ol>
        )}
        {nonNumberedAfter.map((line, index) => (
          <p key={`non-numbered-after-${index}`}>{line}</p>
        ))}
      </div>
    );
  };

  return (
    <section
      id="tools"
      className="flex flex-col items-center justify-center h-screen bg-sky-100"
    >
      {/* Chat Window */}
      <div className="relative w-3/4 lg:w-1/2 h-3/4 bg-white rounded-lg shadow-lg flex flex-col">
        {/* Header */}
        <div className="bg-indigo-600 text-white p-4 text-center rounded-t-lg">
          <h1 className="text-xl font-bold">Chat With AI</h1>
        </div>

        {/* Chat History */}
        <div className="flex-grow p-4 overflow-y-auto">
          {chatHistory.map((chat, index) => (
            <div key={index} className="mb-4">
              {/* User Message */}
              {chat.user && (
                <div className="flex justify-end">
                  <div className="bg-indigo-600 text-white p-3 rounded-lg max-w-md">
                    {chat.user}
                  </div>
                </div>
              )}
              {/* AI Response */}
              {chat.ai && (
                <div className="flex justify-start mt-2">
                  <div className="bg-gray-300 text-black p-3 rounded-lg max-w-md">
                    {renderResponse(chat.ai)}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-start mt-2">
              <div className="bg-gray-300 text-black p-3 rounded-lg max-w-md flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8z"
                  ></path>
                </svg>
                <span>Loading...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="p-4 bg-gray-100 border-t">
          {/* File Preview */}
          {filePreview && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-700">{filePreview}</span>
              <button
                onClick={handleRemoveFile}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          )}

          <div className="flex items-center gap-2 bg-white p-2 rounded-lg">
            {/* File Upload */}
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-gray-500 hover:text-gray-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
                />
              </svg>
            </label>

            {/* Text Input */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type something..."
              className="flex-grow outline-none"
            />

            {/* Send Button */}
            <button
              onClick={handleChat}
              className="p-2 bg-indigo-600 rounded-full text-white hover:bg-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;
