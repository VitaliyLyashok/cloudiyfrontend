import host from "./config"

var APIRoutes = {
    SignUp: host + '/Account/SignUp',
    SignIn: host + '/Account/SignIn',
    GetUser: host + '/Account/GetUser',
    SetSub: host + '/Account/SetSub',
    CreateFolder: host + '/FileManagement/CreateFolder',
    NewSharing: host + '/FileManagement/NewSharing',
    Search: host + '/FileManagement/Search',
    GetFiles: host + '/FileManagement/GetFolder',
    ToggleNoticed: host + '/FileManagement/ToggleNoticed',
    ToggleDeleted: host + '/FileManagement/ToggleDeletedFile',
    UploadFile: host + '/FileManagement/UploadFile',
    DownloadFile: host + '/FileManagement/DownloadFile',
    GetDeletedFiles: host + '/FileManagement/GetDeletedFiles',
    GetSharingFiles: host + '/FileManagement/GetSharingFiles',
    GetNoticedFiles: host + '/FileManagement/GetNoticedFiles',
    GetFolderPath: host + '/FileManagement/GetFolderPath',
    GetRecentFiles: host + '/FileManagement/GetRecentFiles',
}

export default APIRoutes
