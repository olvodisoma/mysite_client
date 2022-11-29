import React,{useState} from 'react'
import {FileUploader} from 'react-drag-drop-files'

const fileTypes = ["JPEG", "PNG", "GIF", "JPG"];

export const FileDrop=()=> {
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
      setFile(file);
    };
    return (
      <div className="filedrop-holder">
        <h6>Drag & Drop Your Avatar</h6>
        <FileUploader
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
        <p>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
      </div>
    );
}
