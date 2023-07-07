import { useEffect, useState, useCallback,  memo   } from 'react';
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
import { useSearchParams } from "react-router-dom";
import SharingPoint from '../sharingPoint.js';

const App = (props) => {
  const [data, setData] = useState([]);
  const [route, setRoute] = useState('');
  const [folderPath, setFolderPath] = useState([{
    Name: './',
    preventDeleteIcon: true
  }]);
  const [totalSpace, setTotalSpace] = useState('');
  const [usedSpace, setUsedSpace] = useState('');
  const [username, setUsername] = useState('');
  const [isSubscribed, setIsSubscribed] = useState('');
  const [loading, setLoading] = useState(true);
  let [searchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true)
    HTTPservice.get(APIRoutes.GetUser)
    .then((response) => { 
      const params = new URLSearchParams(window.location.search);
      const fileIdParam = params.get('folderId');
      if (!fileIdParam) {
          GetFolderFiles(Helper.getCookie('currentFolderID'));
        } else {
          GetFolderFiles(fileIdParam); 
        }
       
    }).catch(e => {
      console.log(e);
    });
    }, [])

    const GetFolderFiles = useCallback(async (id) => {
      try {
        const { data } = await HTTPservice.get(APIRoutes.GetFiles, { folderId: id });
      
        const { folderMetadataId, folderFiles, childFolders } = data;
       
        Helper.setCookie('masterFolderId', folderMetadataId);
    
        const files = folderFiles.map(el => ({ ...el, isFile: true }));
        const folders = childFolders.map(el => ({ ...el, isFile: false }));
       
        if (folderMetadataId) {
          folders.unshift({ isFile: false, name: '...', id: folderMetadataId,preventDeleteIcon:true });
        }
    
        const resultingData = folders.concat(files);
    
        setData(resultingData);
        setLoading(false)
        console.log(data)
      } catch (e) {
        console.log(e);
      }
    }, [setData]);
    

    const onFilterSelect = (filter, route) => {
      setRoute(route);
      sessionStorage.setItem('filter', filter);
      GetFolderFiles(Helper.getCookie('currentFolderID'));
    }

    useEffect(() => {
      HTTPservice.get(APIRoutes.GetUser)
      .then((response) => { 
     
        setTotalSpace(response.data.spaceAvaliable);
        setUsedSpace(response.data.spaceUsed);
        setUsername(response.data.name);
        setIsSubscribed(response.data.isSubscribe);
        console.log(Helper.getCookie('userId')) 
        console.log(Helper.getCookie('access_token'));
      }).catch(e => {
        console.log(e);
      });
      }, [])
    
  

      

  const onToggleProp = useCallback((id, prop) =>{
    HTTPservice.post(prop,{fileId: id}).then((res) => {
      GetFolderFiles(Helper.getCookie('currentFolderID'));
    })
    .catch(e => {
      console.log(e);
    });    
  }, [GetFolderFiles]);

  const GetPathToFolder = useCallback((id) => {
    HTTPservice.get(APIRoutes.GetFolderPath, { folderId: id })
      .then(response => {
        setFolderPath(response.data)
      })
      .catch(e => {
        console.log(e);
      });
  }, [setFolderPath]);

  const onFolderOpen = (id) => {
    Helper.setCookie('currentFolderID', id);
    GetFolderFiles(id);
    GetPathToFolder(id);
  }
  const onDataSearch = useCallback((searchData) => {
    setData(searchData)
  }, []);

  const deleteFolder = (id) => {
    HTTPservice.post(APIRoutes.DeleteFolder + "/" + id).then((res) => {
      GetFolderFiles(Helper.getCookie('currentFolderID'));
    }).catch()
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
                  onFolderOpen={onFolderOpen}
                  pathItems={folderPath}
                  deleteFolder={deleteFolder}
                  onPathItemClick={onFolderOpen}
                  GetFolderFiles={GetFolderFiles}
                  isSubscribed={isSubscribed}
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
      
  

           
 

export default memo(App);
