import React, { useState } from "react";
import "./Upload.css";
import { FaImages } from "react-icons/fa6";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

export const Upload = () => {
  const [files, setFiles] = useState([]);
  const [dbImages, setDbImages] = useState([]);

  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_URL;
  const handleFileChange = (e) => {
    console.log(e.target.files)
    const selectedFiles = Array.from(e.target.files);
    
    setFiles(selectedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("Please select files");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      setLoading(true);

      const res = await fetch(`${backendUrl}/img-upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);

      toast.success("Upload success");
      setFiles([]);
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };
  const handleGet = async () => {
    try {
      const res = await fetch(`${backendUrl}/get-img`, {
        method: "GET",
      });

      const data = await res.json();
      setDbImages(data.images);
 if (data.images.length===0) {
      toast.error("No data is present");
        return
      }
      toast.success("Successfully Get Photo");
     
    } catch (error) {
      toast.error(" Failed to get photos");
    }
  };
  return (
    <div className="upload-main">
      <div className="upload-card">
        <div className="upload-header">
          <span>Media</span>
          <FaImages className="media-icon" />
        </div>

        <div className="upload-box">
          <FaCloudUploadAlt className="cloud-icon" />
          <p>Upload Files Between 0 To 6</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {files.length > 0 && (
          <div className="preview-grid">
            {files.map((file, index) => (
              <div className="preview-item" key={index}>
                <img src={URL.createObjectURL(file)} alt="preview" />
                <span>{file.name}</span>
              </div>
            ))}
          </div>
        )}

        <div className="upload-action">
          <button onClick={handleUpload} disabled={loading}>
            {loading ? <span className="loader"></span> : "Save"}
          </button>
        </div>
      </div>
      <div>
        <button className="upload-action" onClick={handleGet}>My photo</button>
      {dbImages.length > 0 && (
  <>
    <h3 className="gallery-title">My Uploaded Photos(Get From DB)</h3>
    <div className="db-preview-grid">
      {dbImages
        .filter((img) => img !== null)
        .map((img, index) => (
          <div className="preview-item" key={index}>
            <img src={img.url} alt="db" />
          </div>
        ))}
    </div>
  </>
)}

      </div>
    </div>
  );
};
