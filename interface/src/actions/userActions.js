import Axios from "axios";
import Cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL
} from "../constants/userConstants";

const register = ( user ) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: {name : user.name, email : user.email, password : user.password, photo : user.photo } });
  try {
   const { data } = await Axios.post(`${process.env.REACT_APP_API_LNK}?module=user&action=create`, { name : user.name, email : user.email, password : user.password, photo : user.photo});
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
}

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    console.log("envoi : email : " + email + " password : " + password)
    
    const { data } = await Axios.post(`${process.env.REACT_APP_API_LNK}?module=user&action=singnIn` , {  email : email, password : password });
    
    console.log("creation du cookie sigin : ");
    console.log("recu : " + JSON.stringify(data));

    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
      
    var in4Hours = 8/48;
    Cookie.set('infoUser', JSON.stringify(data), {
        expires: in4Hours
    });

  } catch (error) {
    //console.log(Object.keys(error), error.message); 
    console.log("Message d'erreur cx: "+JSON.stringify(error.message));

    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
}

const update = (
  name,
  email,
  password,
//photo = '',
  ) => async (dispatch, getState) => {
  const { userSignin: { userInfo } } = getState();
  dispatch({ type: USER_UPDATE_REQUEST, payload: {name, email, password } });
  try {
    console.log(JSON.stringify({ idUser : userInfo.idUser, name,  password })+"update recu "+name+"\n"+
    "email : "+email+" password : "+password);
    const { data } = await Axios.put(process.env.REACT_APP_API_LNK+"?module=user&action=update",
      { idUser : userInfo.idUser, name,  password }, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token
      }
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    let newUser = {...userInfo};
    for (const property in newUser) {
      console.log(`${property}: ${newUser[property]}`);
      data[property] && (newUser[property] = data[property])
    }
    console.log("new : "+JSON.stringify(newUser));
    Cookie.set('infoUser', JSON.stringify(newUser));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
}

const deleteAccount = () => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: USER_DELETE_REQUEST });
    const { data } = await Axios.delete(`${process.env.REACT_APP_API_LNK}?module=user&action=delete&idUser=${userInfo.idUser}`, {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    });

    dispatch({ type: USER_DELETE_SUCCESS, payload: data, success: true });
    Cookie.remove("infoUser");
    dispatch({ type: USER_LOGOUT });
  } catch (error) {
    dispatch({ type: USER_DELETE_FAIL, payload: error.message });
  }
}

const logout = () => (dispatch) => {
   Cookie.remove("infoUser");
  dispatch({ type: USER_LOGOUT });

}

export { 
    register,
    signin,
    logout,
    update ,
    deleteAccount
  };