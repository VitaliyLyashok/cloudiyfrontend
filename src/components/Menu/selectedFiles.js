import { Component, useEffect, useState } from 'react';
import Head from '../header/header.js';
import ProgressBar from '../progress-bar/progress-bar.js';
import Filter from '../filter/filter.js';
import FilesList from '../files-list/files-list.js';
import Footer from '../footer/footer.js';
import Helper  from '../../Helper.js';
import '../app/app.css';
import axios from 'axios'
import APIRoutes from '../../routes.js';
import HTTPservice from '../../HTTPservice.js';
import Spinner from '../spinner/spinner.js';


const SelectedFiles = (props) => {
   const [data, setData] = useState([]);
   const [folderPath, setFolderPath] = useState([]);
   const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    HTTPservice.get(APIRoutes.GetUser)
    .then((response) => { 
        GetSelectedFiles();
        console.log(response.data)
      })
    .catch(e => {
        console.log(e);
    });
  },[props.route])

  const GetSelectedFiles = () => {
  
    HTTPservice.get(props.route)
    
    .then(response => {
      var files = response.data.map((el)=>{
        return {
           ...el,
          isFile:true
        };
    });
       setData(files)
       setLoading(false);
    }) 
    .catch(e => {
        console.log(e);
    });
  }

  const onToggleProp = (id,prop) =>{
    HTTPservice.post(prop,{fileId: id}).then()
    .catch(e => {
    console.log(e,);
    });    
  }

  const onDownload = (id, name) =>{
    HTTPservice.get(APIRoutes.DownloadFile, { fileId: id})
    .then(response => { 
      let downloadLink = document.createElement('a');

      const blob = new Blob([response.data], {
        type: 'application/octet-stream',
      });
      const url = window.URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = name;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
  })
   .catch(e => {
       console.log(e);
   });
  }

    return(
            loading ? <Spinner/> :
            <FilesList 
            data={data} 
            onToggleProp={onToggleProp} 
            onDownload={onDownload} 
            pathItems={folderPath}
         />
    )
  
}         

export default SelectedFiles;
