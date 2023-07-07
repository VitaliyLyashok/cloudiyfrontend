
import { memo } from 'react'
import APIRoutes from '../routes';

const sharingPoint = () => { 
debugger;
    var path = window.location.href;
    var lastItem = getRefFromUrl(path);
    console.log(lastItem); // Outputs: file.txt

    function getRefFromUrl(url) {
        var urlObj = new URL(url);
        var params = new URLSearchParams(urlObj.search);
        return params.get('ref');
    }

    var id = window.atob(lastItem);
    debugger;
    window.location.href = APIRoutes.DownloadFile + '/' + id;
    window.close();

}
    

export default memo(sharingPoint)