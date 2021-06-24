import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';

import {
  userSigninReducer,
  userRegisterReducer,
  userUpdateReducer,
} from './reducers/userReducers';

import {
  folderSaveReducer,
  foldersListReducer,
  foldersUserListReducer,
  folderDetailsReducer,
  folderDeleteReducer,
} from './reducers/folderReducers';

import {
  noteSaveReducer,
  notesListReducer,
  notesUserListReducer,
  noteDetailsReducer,
  noteDeleteReducer,
} from './reducers/noteReducers';

const userInfo = Cookie.getJSON('infoUser') || null;

 const initState = {
  userSignin: { userInfo },
}; 

const reducer = combineReducers({
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
  folderSave: folderSaveReducer,
  foldersList : foldersListReducer,
  foldersUser : foldersUserListReducer,
  folderDetails : folderDetailsReducer, 
  folderDelete : folderDeleteReducer, 
  noteSave: noteSaveReducer,
  notesList : notesListReducer,
  notesUser : notesUserListReducer,
  noteDetails : noteDetailsReducer, 
  noteDelete : noteDeleteReducer, 
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 
const store = createStore(
    reducer,
    initState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;