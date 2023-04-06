import './filter.css'
import { Link } from 'react-router-dom';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ShareIcon from '@mui/icons-material/Share';
import PhonelinkIcon from '@mui/icons-material/Phonelink';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import APIRoutes from '../../routes';

const Filter = (props) => {
    const buttonData = [
        {name: 'all', route: 'GetFolder', label: 'My files', path:'/Home',  icon:  <FolderOpenIcon/>},
        {name: 'shared', route: APIRoutes.GetSharingFiles, label: 'Shared drives', path:'/Home/SelectedFiles',  icon:  <ShareIcon/>},
        {name: 'recent', route: APIRoutes.GetRecentFiles, label: 'Recent', path:'/Home/SelectedFiles',   icon:  <AccessTimeIcon/>},
        {name: 'noticed', route: APIRoutes.GetNoticedFiles, label: 'Noticed', path:'/Home/SelectedFiles', icon:  <StarBorderIcon/>},
        {name: 'deleted', route: APIRoutes.GetDeletedFiles, label: 'Trash', path:'/Home/SelectedFiles',   icon:  <DeleteOutlineIcon/>},  
    ];
    console.log("renderFilter")
    const buttons = buttonData.map(({name, route, label, path,icon}) =>{
        const style = sessionStorage.getItem('filter') === name ? 'btnListActive' : 'btn-list'
        return(
            <Link className={style} onClick={() => props.onFilterSelect(name, route)} to={path} key={name} >
                <div className='btn-menu'>
                    <div className="menu-content">  
                        <div className="menu-icon">{icon}</div>
                        <div className="menu-label">{label}</div>
                    </div>
                    </div>

            </Link> 
        )
    })

    return (
        <div className="btn-group">
            {buttons}
        </div>
    )
} 

export default Filter