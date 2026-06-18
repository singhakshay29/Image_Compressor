import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [compressedImage, setCompressedImage] = useState("");
  const [quality, setQuality] = useState(0.7);

  const [originalSize, setOriginalSize] = useState("");
  const [compressedSize, setCompressedSize] = useState("");

  const handleImage = (e) => {
    const imageFile = e.target.files[0];

    if (!imageFile) return;

    setFile(imageFile);
    setPreview(URL.createObjectURL(imageFile));

    setOriginalSize(
      `${(imageFile.size / 1024).toFixed(2)} KB`
    );

    setCompressedImage("");
  };

  const compressImage = () => {
    if (!file) {
      alert("Please upload an image first");
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();

      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");

        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0);

        const compressedData = canvas.toDataURL(
          "image/jpeg",
          quality
        );

        setCompressedImage(compressedData);

        const sizeInBytes = Math.round(
          (compressedData.length * 3) / 4
        );

        setCompressedSize(
          `${(sizeInBytes / 1024).toFixed(2)} KB`
        );

      };
    };
  };

  const downloadImage = () => {
    const link = document.createElement("a");

    link.href = compressedImage;
    link.download = "compressed-image.jpg";

    link.click();
  };

  return (
    <div className="container">
      <div className="card">
        <div className="badge">
          Free • Secure • Browser Based
        </div>

        <h1>Image Compressor</h1>

        <p>
          Compress images instantly without uploading
          them to any server.
        </p>

        <h3 className="upload-title">
          Upload an image to compress
        </h3>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
        />

        <label>
          Compression Quality:{" "}
          {Math.round(quality * 100)}%
        </label>

        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={quality}
          onChange={(e) =>
            setQuality(Number(e.target.value))
          }
        />

        <button onClick={compressImage}>
          Compress Image
        </button>

        {preview && (
          <div className="preview">
            <img
              src={preview}
              alt="Preview"
            />
          </div>
        )}

        {compressedImage && (
          <>
            <div className="stats">
              <div className="stat-card">
                <h4>Original</h4>
                <p>{originalSize}</p>
              </div>

              <div className="stat-card">
                <h4>Compressed</h4>
                <p>{compressedSize}</p>
              </div>
            </div>

            <button
              style={{ marginTop: "20px" }}
              onClick={downloadImage}
            >
              Download Compressed Image
            </button>
          </>
        )}

        <footer>
          <h3>Akshay Singh</h3>

          <p>akshay2898.as@gmail.com</p>

          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noreferrer"
          >
            <button className="hero-btn">
              Built for Digital Heroes
            </button>
          </a>
        </footer>
      </div>
    </div>
  );
}

export default App;