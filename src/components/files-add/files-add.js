import './files-add.css'
import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import $ from 'jquery';
import cloud from '../../images/cloud1.png'
import { Button } from '@mui/material';
import APIRoutes from '../../routes';
import Helper from '../../Helper';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import HTTPservice from '../../HTTPservice';
import { useState, useRef } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import { DeblurOutlined } from '@mui/icons-material';
import { memo } from 'react';


const FilesAdd = () => {
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 

  const fileInputRef = useRef(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadChunk = async (file, start, end) => {
    const chunk = file.slice(start, end);
    const formData = new FormData();
    
    formData.append("FolderId", Helper.getCookie('currentFolderID'));
    formData.append("UserId", Helper.getCookie('userId'));
    formData.append("Filename", file.name);
    formData.append("Chunk", chunk);
    await axios.post("https://localhost:7258/FileManagement/UploadFile", formData, {headers: {
      "Content-Type": "multipart/form-data",
    }})};

  const handleUpload = async () => {
    const file = fileInputRef.current.files[0];
    const chunkSize = (1024 * 1024) * 10; // 1 MB
    for (let start = 0; start < file.size; start += chunkSize) {
      const end = start + chunkSize;
      await uploadChunk(file, start, end);

      const progress = Math.round((end / file.size) * 100);
      setUploadProgress(Math.min(progress, 100));
    }

    alert("File uploaded successfully.");
    window.location.reload()
  };

    return(
      
      <div className="btn-add">
          <button className="btn" onClick={handleOpen}><UploadFileIcon sx={{width: 30, height: 30 }}/></button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className='files-add-box'>
            <div className='header'>
              <div className="img">
                 <img src={cloud} alt="cloud" width="60" height="60" />
              </div>
              <h1 className="title">Cloudiy</h1>            
            </div> 
            <div className="sendFileBtn">

                <div className="upload-button">

                    <input className='inputFile' type="file" ref={fileInputRef} />

                  <div className='fileSpan'>
                    <span>Upload progress: {uploadProgress}%</span><br></br>
                    <progress value={uploadProgress} max="100" />
                  </div>
              </div>
              <Button   
              onClick={handleUpload}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >submit</Button>
            
            </div>  
            
            
            </Box>
          </Modal>
      </div>
    )
}




export default memo(FilesAdd)