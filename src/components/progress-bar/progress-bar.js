import './progress-bar.css'
import { useState } from 'react';
import { Modal, TextField, Box, Button, Grid } from '@mui/material'
import cloud from '../../images/cloud.png'
import axios from 'axios';
import APIRoutes from '../../routes.js';
import Helper from '../../Helper.js';
import HTTPservice from '../../HTTPservice';
import { htmlPrefilter } from 'jquery';

const ProgressBar = ({totalSpace, usedSpace, isSubscribed}) => {
  const [open, setOpen] = useState(false);
  const [idcard, setIdCard] = useState('');
  const [date, setDate] = useState('');
  const [cvc, setCVC] = useState('');
     
   let total = totalSpace /1024/1024/1024;
   let SpaceUsed = `${usedSpace /1024/1024/1024}`;
   let used = SpaceUsed.slice(0,3);
   let percent = (SpaceUsed/total) * 100;  

   const progressBarPercent = {
     width: percent + "%",
     height: 10,
     borderRadius: 10,
     backgroundColor: '#0091df'
     };

    
  

  const onBuy = () =>{
   HTTPservice.get(APIRoutes.SetSub,{ id: Helper.getCookie('userid')} )
   .then((response) => { 
     })
   .catch(e => {
       console.log(e);
   });
  }

  let sub = <div></div>;
  if(isSubscribed === false){
     sub = <button type="button" onClick={() => setOpen(true)} className="subscription">Buy subscription 5$</button>
  }

  

   return(
       <div className="progressbar">
           <div className="labl">Storage</div>
           <div className="mybar">
               <div style={progressBarPercent}></div>
           </div>
           <div className="load">{used} GB / {total} GB</div>
           {sub}
           <Modal  
           open={open}
           onClose={() => setOpen(false)}
           aria-labelledby="modal-modal-title"
           aria-describedby="modal-modal-description"
         >
         <Box className='box-style'>
         <div className='header'>
             <div className="img">
                <img src={cloud} alt="cloud" width="60" height="60" />
             </div>
             <h1 className="title">Cloudiy</h1>            
           </div> 
           <p>The $5 Cloudiy plan provides you with 100 GB of storage space to store and 
            access your files, photos, and other digital content. This plan is ideal for 
            individuals who need a little extra space beyond what the free plan offers,
             but who do not require the higher storage limits of more expensive plans.</p>
             <p>With this plan, you can easily and securely back up your important files and 
              documents, share files with others, and access your content from anywhere, 
              on any device. You can also use Cloudiy's powerful search capabilities to
               quickly find the files you need.</p>
           <TextField
                   margin="normal"
                   required
                   fullWidth
                   id="idcard"
                   label="Number of Card"
                   name="idcard"
                   value={idcard}
                   onChange={e => setIdCard(e.target.value)}
                   autoComplete="off"
                   autoFocus
                   sx={{marginTop: 5}}
               />
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
               <TextField
                 autoComplete="given-name"
                 name="date"
                 required
                 fullWidth
                 id="date"
                 label="Date"
                 value={date}
                 onChange={e => setDate(e.target.value)}
                 autoFocus
               />
             </Grid>
             <Grid item xs={12} sm={6}>
               <TextField
                 required
                 fullWidth
                 id="cvc"
                 label="CVC"
                 name="cvc"
                 type="password"
                 value={cvc}
                 onChange={e => setCVC(e.target.value)}
               />
             </Grid>
             </Grid>
               <Button
                   type="submit"
                   fullWidth
                   onClick={onBuy}
                   variant="contained"
                   sx={{ mt: 3, mb: 2 }}
               >Buy Subscription</Button>
               </Box>
               </Modal>
       </div>
   )
}

export default ProgressBar