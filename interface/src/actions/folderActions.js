import {
    FOLDER_CREATE_SUCCESS,
    FOLDER_SAVE_REQUEST,
    FOLDER_SAVE_SUCCESS,
    FOLDER_SAVE_FAIL,
    FOLDER_LIST_REQUEST,
    FOLDER_LIST_SUCCESS,
    FOLDER_LIST_FAIL,
    FOLDER_LIST_USER_REQUEST,
    FOLDER_LIST_USER_SUCCESS,
    FOLDER_LIST_USER_FAIL,
    FOLDER_DETAILS_REQUEST ,
    FOLDER_DETAILS_SUCCESS ,
    FOLDER_DETAILS_FAIL ,
    FOLDER_DELETE_SUCCESS,
    FOLDER_DELETE_FAIL,
    FOLDER_DELETE_REQUEST
    } from '../constants/folderConstants';
  
    import Axios from 'axios';
    
    const listFolders = (
      idFolder = '',
      name = '',
      id_User = '',
      id_Folder = ''
    ) => async (dispatch, getState) => {
      try {
        dispatch({ type: FOLDER_LIST_REQUEST });
        console.log(" get parks params : " +
        idFolder + ' : ', name + ' : ',id_User + ' : ',
        id_Folder 
        );
        const {
          userSignin: { userInfo },
        } = getState();
        //alert("enter "+ JSON.stringify(userInfo))

        const headers = userInfo ? {
          Authorization: 'Bearer ' + userInfo.token
        } : {};
  
        const { data } = await Axios.get(
          `${process.env.REACT_APP_API_LNK}?module=folder&action=find&idFolder=${idFolder}&name=${name}&id_User=${id_User}&id_Folder=${id_Folder}`,
          {
            headers
            }
        );
        
        //console.log("List data recu : " + JSON.stringify(data));
        dispatch({ type: FOLDER_LIST_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: FOLDER_LIST_FAIL, payload: error.message });
      }
    };
  
    const saveFolder = (folder) => async (dispatch, getState) => {
        //console.log(" saveFolder !!" );
        //console.log(" creation d'un folder : " + JSON.stringify(folder));
      try {
        dispatch({ type: FOLDER_SAVE_REQUEST, payload: folder });
        const {
          userSignin: { userInfo },
        } = getState();
        if (!folder.idFolder) {
  
          const { data } = await Axios.post(process.env.REACT_APP_API_LNK+'?module=folder&action=create', folder, {
            headers: {
              Authorization: 'Bearer ' + userInfo.token
            }
          });
          console.log(" fiiin : " + JSON.stringify(data));
  
          dispatch({ type: FOLDER_CREATE_SUCCESS, payload: data });
        } else {
          console.log(" modification folder : " + JSON.stringify(folder));
  
          const { data } = await Axios.put(
            process.env.REACT_APP_API_LNK+'?module=folder&action=update',
            folder,
            {
              headers: {
                Authorization: 'Bearer ' + userInfo.token,
              },
            }
          );
          dispatch({ type: FOLDER_SAVE_SUCCESS, payload: data });
        }
      } catch (error) {
        console.log(" noon: " + JSON.stringify(folder));
  
        dispatch({ type: FOLDER_SAVE_FAIL, payload: error.message });
      }
    };
    
    const listFoldersUser = (
    ) => async (dispatch, getState) => {
        try {
          dispatch({ type: FOLDER_LIST_USER_REQUEST });
          const {
            userSignin: { userInfo },
          } = getState();
          const { data } = await Axios.get(
            process.env.REACT_APP_API_LNK+'/?module=folder&action=find'+userInfo.idUser,{
            headers: {
              Authorization: 'Bearer ' + userInfo.token
            }
          }
          );
         console.log(" data user recu : " + JSON.stringify(data));
    
          dispatch({ type: FOLDER_LIST_USER_SUCCESS, payload: data });
        } catch (error) {
          dispatch({ type: FOLDER_LIST_USER_FAIL, payload: error.message });
        }
      };
    
      const detailsFolder = (folderId) => async (dispatch,getState
        ) => {
        try {
          console.log(" action detail folder : " + JSON.stringify(folderId));
          const {
            userSignin: { userInfo },
          } = getState();
  
          dispatch({ type: FOLDER_DETAILS_REQUEST, payload: folderId });
          const { data } = await Axios.get(`${process.env.REACT_APP_API_LNK}folders/` + folderId,{
            headers: {
              Authorization: 'Bearer ' + userInfo.token
            }});
          console.log(" data detail user recu : " + JSON.stringify(data));
  
          dispatch({ type: FOLDER_DETAILS_SUCCESS, payload: data });
        } catch (error) {
          dispatch({ type: FOLDER_DETAILS_FAIL, payload: error.message });
        }
      };
  
    const deleteFolder = (folderId) => async (dispatch, getState) => {
      try {
        const {
          userSignin: { userInfo },
        } = getState();
       //console.log('supression '+folderId);
        dispatch({ type: FOLDER_DELETE_REQUEST, payload: folderId });
        const { data } = await Axios.delete(`${process.env.REACT_APP_API_LNK}?module=folder&action=delete&idFolder=${folderId}` , {
          headers: {
            Authorization: 'Bearer ' + userInfo.token,
          },
        });
        dispatch({ type: FOLDER_DELETE_SUCCESS, payload: data, success: true });
      } catch (error) {
        dispatch({ type: FOLDER_DELETE_FAIL, payload: error.message });
      }
  };
  
    export {
      listFolders,
      listFoldersUser,
      saveFolder,
      detailsFolder,
      deleteFolder
    };
    