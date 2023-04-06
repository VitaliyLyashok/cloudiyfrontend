import { useEffect, useState,  } from 'react';
import Head from '../header/header.js';
import ProgressBar from '../progress-bar/progress-bar.js';
import Filter from '../filter/filter.js';
import FilesList from '../files-list/files-list.js';
import Footer from '../footer/footer.js';
import FilesAdd from '../files-add/files-add.js';
import './app.css';
import axios from 'axios'
import APIRoutes from '../../routes.js';
import CreateFolder from '../create-folder/create-folder.js';
import Helper from '../../Helper.js';
import { ButtonGroup } from '@mui/material';
import HTTPservice from '../../HTTPservice.js';
import { Button } from '@mui/material';
import { Routes, Route, Outlet } from 'react-router-dom';
import Deleted from '../Menu/selectedFiles.js';
import SelectedFiles from '../Menu/selectedFiles.js';
import { htmlPrefilter } from 'jquery';
import Spinner from '../spinner/spinner.js';

const App = (props) => {
  const [data, setData] = useState([]);
  const [route, setRoute] = useState('');
  const [folderPath, setFolderPath] = useState(['./']);
  const [totalSpace, setTotalSpace] = useState('');
  const [usedSpace, setUsedSpace] = useState('');
  const [username, setUsername] = useState('');
  const [isSubscribed, setIsSubscribed] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    HTTPservice.get(APIRoutes.GetUser)
    .then((response) => { 
        GetFolderFiles(Helper.getCookie('currentFolderID'));
    }).catch(e => {
      console.log(e);
    });
    }, [])

    useEffect(() => {
      HTTPservice.get(APIRoutes.GetUser)
      .then((response) => { 

        setTotalSpace(response.data.spaceAvaliable);
        setUsedSpace(response.data.spaceUsed);
        setUsername(response.data.name);
        setIsSubscribed(response.data.isSubscribe);
      }).catch(e => {
        console.log(e);
      });
      }, [])
    
  

    const GetFolderFiles = async (id) => {
      try {
        const { data } = await HTTPservice.get(APIRoutes.GetFiles, { folderId: id });
      
        const { folderMetadataId, folderFiles, childFolders } = data;
       
        Helper.setCookie('masterFolderId', folderMetadataId);
    
        const files = folderFiles.map(el => ({ ...el, isFile: true }));
        const folders = childFolders.map(el => ({ ...el, isFile: false }));
       
        if (folderMetadataId) {
          folders.unshift({ isFile: false, name: '...', id: folderMetadataId });
        }
    
        const resultingData = folders.concat(files);
  
        setData(resultingData);
        setLoading(false)
      } catch (e) {
        console.log(e);
      }
    };

  const onFilterSelect = (filter, route) => {
    setRoute(route);
    sessionStorage.setItem('filter', filter);
  }

  const onToggleProp = (id,prop) =>{
    HTTPservice.post(prop,{fileId: id}).then(
    )
    .catch(e => {
    console.log(e);
    });    
  }

   const GetPathToFolder = (Id) => {
    HTTPservice.get(APIRoutes.GetFolderPath, { folderId: Id})
    .then(response => {
      setFolderPath(response.data)
    })
   .catch(e => {
       console.log(e);
   });
  }

  const onDownload = (id, name) =>{
    HTTPservice.get(APIRoutes.DownloadFile,{ params: { fileId: id},  observe: 'response',
    responseType: 'arraybuffer'})
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name); //or any other extension
      document.body.appendChild(link);
      link.click();
    })
   .catch(e => {
       console.log(e);
   });
  }

  const onFolderOpen = (id) => {
    Helper.setCookie('currentFolderID', id);
    GetFolderFiles(id);
    GetPathToFolder(id);
  }
  const onDataSearch = (searchData) => {
    setData(searchData)
  }


    return(
      <div className="app">
        <Head resultingData={onDataSearch} username={username}/>
        <div className="main">
          <div className="folders">
            {loading ? <Spinner/> : <ProgressBar totalSpace={totalSpace} usedSpace={usedSpace} isSubscribed={isSubscribed}/>}
            <Filter onFilterSelect={onFilterSelect}/>
          </div>
          <div className="files">
           
            <Routes>
              <Route exact path='/' element={ loading ? <Spinner/> :
                <FilesList 
                  data={data} 
                  onToggleProp={onToggleProp} 
                  onDownload={onDownload} 
                  onFolderOpen={onFolderOpen}
                  pathItems={folderPath}
                  onPathItemClick={onFolderOpen}
                />
              }/>
              <Route exact path='/SelectedFiles'  element={<SelectedFiles route = {route}/>}/> 
            </Routes>
          </div>
          <div className='btnGroup'>
            <ButtonGroup sx={{height: 50, }} disableElevation variant="contained">
              <FilesAdd/>
              <CreateFolder/>
            </ButtonGroup>
          </div>
        </div>
        <Footer/>   
      </div>
    )
  }
      
  

           
 

export default App;
