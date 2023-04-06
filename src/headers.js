const token = sessionStorage.getItem("tokenKey");
 
const  headers =  {
    "Accept": "application/json",
    "Authorization": "Bearer " + token 
}
export default headers