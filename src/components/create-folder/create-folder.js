import { Component, useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import APIRoutes from "../../routes";
import axios from "axios";
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Modal } from "@mui/material";
import { Box } from "@mui/material";
import './create-folder.css'
import Helper from "../../Helper";
import cloud from '../../images/cloud1.png'
import HTTPservice from "../../HTTPservice";
import { memo } from 'react';


const CreateFolder = (props) => {
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false); 

    const onCreateFolder = () => {
        HTTPservice.post(APIRoutes.CreateFolder,{masterFolderId: Helper.getCookie('currentFolderID'), name: name}).then(() => {
            window.location.reload();
        })
    .catch(e => {
       console.log(e);
     });
    }
    
          

        return(
        <div className="folder-add">
          <button className="folder" onClick={() => setOpen(true)}><CreateNewFolderIcon sx={{width: 30, height: 30 }}/></button>
          <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <Box className="create-folder-box">
          <div className='header'>
              <div className="img">
                 <img src={cloud} alt="cloud" width="60" height="60" />
              </div>
              <h1 className="title">Cloudiy</h1>            
            </div> 
            <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Create folder"
                    name="name"
                    value={name}
                    autoComplete="off"
                    autoFocus
                    onChange={e => setName(e.target.value)}
                    sx={{marginTop: 5}}
                />
                <Button
                    onClick={onCreateFolder}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >Create folder</Button>
                </Box>
                </Modal>
                 
            </div>
        )
}

export default memo(CreateFolder)