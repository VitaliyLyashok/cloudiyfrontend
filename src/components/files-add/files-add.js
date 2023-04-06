import './files-add.css'
import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import $ from 'jquery';
import cloud from '../../images/cloud.png'
import { Button } from '@mui/material';
import APIRoutes from '../../routes';
import Helper from '../../Helper';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import HTTPservice from '../../HTTPservice';

const FilesAdd = () => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function uploadFiles(e,inputId) {
    e.preventDefault();

      var input = document.getElementById(inputId);
      var files = input.files;
      var formData = new FormData();
  
    for (var i = 0; i != files.length; i++) {
      formData.append("files", files[i]);
    }   
    formData.append("folderId", Helper.getCookie('currentFolderID'));
    formData.append("userId", Helper.getCookie('userId'));
    

    $.ajax(
      {
        url: APIRoutes.UploadFile,
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
        success: function (data) {
          window.location.reload();
        }
        
      }
    ); 
    debugger;
  }



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
            <form id="form" name="form"  encType="multipart/form-data"  >
              <div className="buttons">
                <div className="upload-button">
                    <input id="files" name="files" type="file" size="1"/>
                </div>
              </div>
              <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              multiple onClick={(e) => uploadFiles(e, 'files')}
            >submit</Button>
            </form>
            </div>  
            
            </Box>
          </Modal>
      </div>
    )
}




export default FilesAdd