import FilesListItem from "../files-list-item/files-list-item";
import './files-list.css'
import { Modal, Box, TextField, Button } from "@mui/material"; 
import { useState } from "react";
import cloud from '../../images/cloud.png'
import axios from "axios";
import APIRoutes from "../../routes";
import HTTPservice from "../../HTTPservice";


const FilesList = ({onFolderOpen, onDownload, data, onToggleProp,pathItems}) => {
    const elements = data.map(item => {
        const {id, ...itemProps} = item;
    
        return (
            
            <FilesListItem key={id} {...itemProps} 
            onFolderOpen={(e) => onFolderOpen(id,e.currentTarget)}
            onDownload={(e) => onDownload(id, e.currentTarget.getAttribute('data-toggle'))} 
            onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
            onShare={(e) => onShare(id, e.currentTarget)}
            onClassnameAdd={(e) => (id, e.currentTarget)}/>
            
            
        )
        
    })

    const onShareFile = () =>{
        var ID = sessionStorage.getItem('fileID')
        HTTPservice.post(APIRoutes.NewSharing,{fileId: ID, emailAddres: value}).then(() => {
            window.location.reload();
        })
        .catch(e => {
        console.log(e);
        });    
      }

    const onShare = (id) => {
        setOpen(true);
        sessionStorage.setItem('fileID', id);
    };

    const handleClose = () => {
        setOpen(false);
        sessionStorage.clear();
    };

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    var path =  pathItems.map(x =>{
        return <><span>{x.Name}</span><span>  /  </span></>
        })
    return (
        <>
        <div className="path">
            {path}
        </div>
        <div className="folder-add">
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <Box className="share-box">
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
                    label="Enter email"
                    name="email"
                    autoComplete="off"
                    value={value}
                    onChange={event => setValue(event.target.value)}
                    autoFocus
                    sx={{marginTop: 5}}
                />
                <Button
                    onClick={onShareFile}
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >Share file</Button>
                </Box>
                </Modal>
                 
            </div>
            <div className="scroll">
                <ul className="files-list list-group">
                {elements}
                </ul>
            </div>
        </>
        
    )
}

export default FilesList