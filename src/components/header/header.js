import { TextField } from '@mui/material'
import { Avatar } from '@mui/material'
import { blue } from '@mui/material/colors'
import './header.css'
import cloud from '../../images/cloud.png'
import { Component, useState } from 'react'
import axios from 'axios'
import APIRoutes from '../../routes'
import Helper from '../../Helper'
import HTTPservice from '../../HTTPservice.js';


const Head = (props) =>{  
    const [value, setValue] = useState('');
    console.log('renderHeader')
  
    const onSearch = (e) => {
        
        if(e.key === 'Enter'){
            HTTPservice.get(APIRoutes.GetUser)
            .then(() => { 
                HTTPservice.post(APIRoutes.Search,{fileName: value}).then( e => {
                    var files = e.data.map((el)=>{
                        return {
                           ...el,
                           isFile: true
                        };
                    });
                    props.resultingData(files);
                    
                })
            .catch(e => {
               console.log(e);
             });    
            })
            .catch(e => {
                console.log(e);
            })
        }
    }
    
        return(
            <div className='header'>
                <div className="img">
                    <img src={cloud} alt="cloud" width="60" height="60" />
                </div>
                <h1 className="title">Cloudiy</h1>
                <div className="search">
                <TextField
                      style = {{width: 500}}
                      margin="normal"
                      required
                      fullWidth
                      onChange={(e) => setValue(e.currentTarget.value)}
                      value ={value}
                      onKeyDown={onSearch}
                      id="search"
                      label="Search"
                      name="search"
                      autoComplete="off"
                      size='small'
                    />
                </div>
                <div className="avatar">
                    <h3  className='username'>{props.username ? props.username : "Loading..."}</h3>
                    <Avatar sx={{ bgcolor: blue[500], width: 45, height: 45, fontSize: 26,  }}>{props.username.slice(0,1)}</Avatar>
                </div>
            </div>   
        )
}

export default Head