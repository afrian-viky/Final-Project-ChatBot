import React, { useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./App.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [fileQuery, setFileQuery] = useState("");
  const [response, setResponse] = useState("");
  const [responseChat, setResponseChat] = useState("");
  const [chartData, setChartData] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please upload a file.");
      return;
    }
    if (!fileQuery.trim()) {
      alert("Please enter a question related to the file.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileQuery", fileQuery);

    try {
      const res = await axios.post("http://localhost:8080/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResponse(res.data.answer);
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target.result;
      parseCSV(csv);
    };
    reader.readAsText(file);
  };

  const parseCSV = (csv) => {
    Papa.parse(csv, {
      header: true,
      complete: (results) => {
        generateChartData(results.data);
      },
    });
  };

  const generateChartData = (data) => {
    if (data.length === 0) return;

    const appliances = [...new Set(data.map((row) => row.Appliance))];
    const consumptionByAppliance = appliances.map((appliance) =>
      data
        .filter((row) => row.Appliance === appliance)
        .reduce((sum, row) => sum + parseFloat(row.Energy_Consumption || 0), 0)
    );

    setChartData({
      labels: appliances,
      datasets: [
        {
          label: "Total Energy Consumption (kWh)",
          data: consumptionByAppliance,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        },
      ],
    });
  };

  const handleChat = async () => {
    if (!query.trim()) {
      alert("Please enter a question.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8080/chat", { query });
      setResponseChat(res.data.answer);
    } catch (error) {
      console.error("Error querying chat:", error);
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
    <div id="App" className="App">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 px-20 text-center">
        Tools for Analyze File and Chat With AI
      </h2>
      <div className="main-container">
        <div className="content">
          <div className="file-upload-container">
            <h2>Analyze File With AI</h2>
            <input
              type="file"
              onChange={handleFileChange}
              className="file-input"
            />
            <input
              type="text"
              value={fileQuery}
              onChange={(e) => setFileQuery(e.target.value)}
              placeholder="Ask a question about the uploaded file..."
              className="file-query-input"
            />
            <button onClick={handleUpload} className="upload-button">
              Upload and Analyze
            </button>
            <div className="response-section">
              <h3 style={{ fontWeight: "bold" }}>File Response</h3>
              {renderResponse(response)}
            </div>
            {chartData && (
              <div className="chart-container">
                <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
                  Chart Visualization
                </h3>
                <Bar data={chartData} />
              </div>
            )}
          </div>

          <div className="chat-container">
            <h2>Chat With AI</h2>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question..."
              className="chat-input"
            />
            <button onClick={handleChat} className="send-button">
              Chat
            </button>
            <div className="chat-window">
              <h3 style={{ textAlign: "center", fontWeight: "bold" }}>
                Chat Response
              </h3>
              {renderResponse(responseChat)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
