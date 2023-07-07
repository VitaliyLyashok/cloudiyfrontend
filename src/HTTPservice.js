import axios from "axios";
import Helper from "./Helper";


const HTTPservice ={
    get : (url,data) => {
        const access_token = Helper.getCookie('access_token');
        const readyHeader = 'Bearer ' + access_token;
        return axios({
                method: 'get',
                url: url,
                params: data,
                headers: { Authorization: readyHeader}
              })
     },
     post : (url,data) => {
        const access_token = Helper.getCookie('access_token');
        const readyHeader = 'Bearer ' + access_token;
        return axios({
            method: 'post',
            url: url,
            data: data,
            headers: { Authorization: readyHeader, 'content-type': 'application/json'}
          })
      }
}

export default HTTPservice