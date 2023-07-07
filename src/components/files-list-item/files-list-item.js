import styles from './files-list-item.css';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import { blue } from '@mui/material/colors';
import APIRoutes from '../../routes';
import { Apartment } from '@mui/icons-material';


const FilesListItem = (props) => {
    const {name,id,  isNoticed, isDeleted, deleteFolder, onDelete, onToggleProp, onFolderOpen, onShare, isSubscribed, isFile} = props;
    let deletedEvent = isDeleted ? onDelete : onToggleProp;
    let preventDeleteIcon = props.preventDeleteIcon;    
    let deleted = isDeleted ? "btn-trash active btn-sm " : "btn-trash btn-sm ";
    let noticed = isNoticed ? "btn-star active btn-sm" : "btn-star btn-sm";
    let copy = isSubscribed ? <button type="button"
                className="btn-copy btn-sm "
                onClick={(e) => navigator.clipboard.writeText("http://localhost:3000/SharingPoint?ref=" + window.btoa(id))}>
                <i className="fas fa-copy"></i>
            </button> : null;
    let undoDeletedFile =  <button type="button"
                            className="btn-copy btn-sm  "
                            onClick={onToggleProp}
                            data-toggle={APIRoutes.ToggleDeleted}>
                            <i class="fas fa-undo"></i>
                        </button>
    let iconFunction = isDeleted ? undoDeletedFile : copy 


    const btns = isFile ? (
        <div className='icons'>
            {iconFunction}
            <button type="button"
                className="btn-share btn-sm "
                onClick={onShare}>
                <i className="fas fa-share"></i>
            </button>
            <a type="button"
                href = {APIRoutes.DownloadFile + '/' + id}
                className="btn-download btn-sm ">
                <i className="fas fa-download"></i>
            </a>
            <button type="button"
                className={noticed}
                onClick={onToggleProp}
                data-toggle={APIRoutes.ToggleNoticed}>
                <i className="fas fa-star"></i>
            </button>
            <button type="button"
                className={deleted}
                onClick={deletedEvent}
                data-toggle={APIRoutes.ToggleDeleted}>
                <i className="fas fa-trash"></i>
            </button>
             </div> ) : <div className="icons">
               {preventDeleteIcon ?(<></>): ( <button type="button"
                    className={deleted}
                    onClick={deleteFolder}
                    data-toggle={APIRoutes.DeleteFolder}>
                    <i className="fas fa-trash"></i>
                </button>)}
             </div>
    const event = isFile ? onToggleProp : onFolderOpen
    const icon = isFile ? <InsertDriveFileIcon sx={{ color: blue[500], fontSize: 35 }}/> : <FolderIcon onClick={onFolderOpen} sx={{ cursor: 'pointer',color: blue[500], fontSize: 35 }} />;
    
    let text = name.length > 40 ? `${name.slice(0, 40)}...` : name;

    return (
        <li className="list-group-item">
            <div className="iconLocation">
                {icon}
            </div>
            <span className="list-group-item-label" onClick={event} data-toggle={APIRoutes.ToggleNoticed}>{text}</span>
            {btns}
        </li>
    )
}

export default FilesListItem;