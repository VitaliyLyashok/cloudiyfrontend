import './progress-bar.css'
import { useState, memo } from 'react';
import { Modal, TextField, Box, Button, Grid } from '@mui/material'
import cloud from '../../images/cloud1.png'
import axios from 'axios';
import APIRoutes from '../../routes.js';
import Helper from '../../Helper.js';
import HTTPservice from '../../HTTPservice';
import { htmlPrefilter } from 'jquery';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const ProgressBar = ({totalSpace, usedSpace, isSubscribed}) => {
  const [open, setOpen] = useState(false);
  const [idcard, setIdCard] = useState('');
  const [date, setDate] = useState('');
  const [cvc, setCVC] = useState('');
  console.log('progress bar')
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
   HTTPservice.get(APIRoutes.SetSub,{ id: Helper.getCookie('userId')} )
   .then((response) => { 
     })
   .catch(e => {
       console.log(e);
   });
  }

  let sub = <div></div>;
  if(isSubscribed === false){
     sub = <button type="button" onClick={() => setOpen(true)} className="subscription">Subscription 5$</button>
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
            individuals who need a little extra space beyond what the free plan offers
            With this plan, you can easily and securely back up your important files and 
              documents, share files with others, You can also use Cloudiy's powerful search capabilities to
               quickly find the files you need. Also provides the ability to copy the link to the file so that unauthorized users can download it</p>
               <div className='paypalbtn'>
               <PayPalScriptProvider
        options={{
          "client-id": "AUgF8whMlEELD1KRrv3Bxo91aWaeLqn_4brIgErMQUrG-DZ0R_AjhnMiPVpNovwHyMOhjurBkyUcxLCg",
          locale: "en_US" // Змініть цей параметр на бажану мову
        }}
      >
        
        <PayPalButtons
        
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "4.99",
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
          
            const details = await actions.order.capture();
            const name = details.payer.name.given_name;
            
            onBuy();
            alert("Transaction completed by " + name);
          }}
        />
      </PayPalScriptProvider>
      </div>
          
           
               </Box>
               </Modal>
           
       </div>
   )
}

export default memo(ProgressBar)