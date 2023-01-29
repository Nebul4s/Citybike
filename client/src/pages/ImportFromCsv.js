import { useState, useRef, useEffect } from "react";

const ImportFromCsv = () => {
  const [file, setFile] = useState(null);
  const inputRef = useRef();

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setFile(e.dataTransfer.files);
  };

  const handleUpload = async () => {
    try {
      if (!file) alert("You need to select a csv file to upload");
      const formData = new FormData();
      formData.append("file", file[0], "file.csv");
      console.log(formData);

      const req = await fetch("http://localhost:5000/journeys/upload", {
        method: "POST",
        body: formData,
      });
      const res = await req.json();
      alert(res.message);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (!file) {
      document.getElementById("file--input").value = "";
    }
  }, [file]);

  return (
    <div className="ImportFromCsv">
      <div className="dropzone" onDragOver={handleDragOver} onDrop={handleDrop}>
        {!file && <h2>Drag and Drop File to Upload or</h2>}
        {file && (
          <div className="preview--files">
            <h2>Remove Selected file(s) by clicking on them</h2>
            <div className="file--box" onClick={() => setFile(null)}>
              <span>{file[0].name}</span>
            </div>
          </div>
        )}

        <input
          type="file"
          id="file--input"
          hidden
          onChange={(e) => setFile(e.target.files)}
          accept=".csv"
          ref={inputRef}
        />
        <button onClick={() => inputRef.current.click()}>Select File</button>
      </div>
      <div className="submit--container">
        <button className="submit--upload__btn" onClick={handleUpload}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default ImportFromCsv;
