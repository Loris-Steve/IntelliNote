import {
    FOLDER_SAVE_REQUEST,
    FOLDER_CREATE_SUCCESS,
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
    FOLDER_DELETE_REQUEST,
    FOLDER_DELETE_SUCCESS,
    FOLDER_DELETE_FAIL
    } from '../constants/folderConstants';
  
      function folderSaveReducer(state = { folder: {} }, action) {
        switch (action.type) {
          case FOLDER_SAVE_REQUEST:
            return { loading: true };
          case FOLDER_CREATE_SUCCESS:
            return { loading: false, create: true, folder: action.payload };
          case FOLDER_SAVE_SUCCESS:
            return { loading: false, save: true, folder: action.payload };
          case FOLDER_SAVE_FAIL:
            return { loading: false, error: action.payload };
          default:
            return state;
        }
      }
      
    function foldersListReducer(state = { folders: [] }, action) {
      switch (action.type) {
        case FOLDER_LIST_REQUEST:
          return { loading: true, folders: [] };
        case FOLDER_LIST_SUCCESS:
          return { loading: false, folders: action.payload ,success : true};
        case FOLDER_LIST_FAIL:
          return { loading: false, error: action.payload };
        default:
          return state;
      }
    }
    
    function foldersUserListReducer(state = { folders: [] }, action) {
      switch (action.type) {
        case FOLDER_LIST_USER_REQUEST:
          return { loading: true, folders: [] };
        case FOLDER_LIST_USER_SUCCESS:
          return { loading: false, folders: action.payload , success : true};
        case FOLDER_LIST_USER_FAIL:
          return { loading: false, error: action.payload };
        default:
          return state;
      }
    }
  
    function folderDetailsReducer(state = { folder: {} }, action) {
      switch (action.type) {
        case FOLDER_DETAILS_REQUEST:
          return { loading: true, folder: {} };
        case FOLDER_DETAILS_SUCCESS:
          return { loading: false, folder: action.payload ,success: true};
        case FOLDER_DETAILS_FAIL:
          return { loading: false, error: action.payload };
        default:
          return state;
      }
    }
  
    function folderDeleteReducer(state = { folder: {} }, action) {
      switch (action.type) {
        case FOLDER_DELETE_REQUEST:
          return { loading: true };
        case FOLDER_DELETE_SUCCESS:
          return { loading: false, folder: action.payload, success: true };
        case FOLDER_DELETE_FAIL:
          return { loading: false, error: action.payload };
        default:
          return state;
      }
    }
  
    export {
      folderSaveReducer,
      foldersListReducer,
      foldersUserListReducer,
      folderDetailsReducer,
      folderDeleteReducer
    };
    