import styles from './files-list-item.css';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import { blue } from '@mui/material/colors';
import APIRoutes from '../../routes';


const FilesListItem = (props) => {
    const {name, isNoticed, isDeleted, onToggleProp, onDownload, onFolderOpen, onShare, isFile} = props;

    let deleted = isDeleted ? "btn-trash active btn-sm " : "btn-trash btn-sm ";
    let noticed = isNoticed ? "btn-star active btn-sm" : "btn-star btn-sm";
  

    const btns = isFile ? (
        <div className='icons'>
            <button type="button"
                className="btn-share btn-sm "
                onClick={onShare}>
                <i className="fas fa-share"></i>
            </button>
            <button type="button"
                className="btn-download btn-sm "
                onClick={onDownload}
                data-toggle={name}>
                <i className="fas fa-download"></i>
            </button>
            <button type="button"
                className={noticed}
                onClick={onToggleProp}
                data-toggle={APIRoutes.ToggleNoticed}>
                <i className="fas fa-star"></i>
            </button>
            <button type="button"
                className={deleted}
                onClick={onToggleProp}
                data-toggle={APIRoutes.ToggleDeleted}>
                <i className="fas fa-trash"></i>
            </button>
             <i className="fas fa-star"></i>
             </div> ) : <div className="icons"></div>
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