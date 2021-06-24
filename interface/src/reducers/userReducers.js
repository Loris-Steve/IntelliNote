import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,
    USER_SEND_SUCCESS,
     USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
     USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL }
     from "../constants/userConstants";
  
  import { combineReducers } from 'redux';
  
  function userRegisterReducer(state = {}, action) {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { loading: true };
      case USER_REGISTER_SUCCESS:
        return { loading: false, message: action.payload , success: true};
      case USER_REGISTER_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

  function userSigninReducer(state = {}, action) {
    console.log(" test  : ");
    switch (action.type) {
      case USER_SIGNIN_REQUEST:
        return { loading: true };
      case USER_SIGNIN_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case USER_SEND_SUCCESS :
        return { loading: false, message: action.payload };
      case USER_SIGNIN_FAIL:
        return { loading: false, error: action.payload };
      case USER_LOGOUT:
         return { loading: false, error: action.payload };
      default: return state;
    }
  }
  
  function userUpdateReducer(state = {}, action) {
    switch (action.type) {
      case USER_UPDATE_REQUEST:
        return { loading: true };
      case USER_UPDATE_SUCCESS:
        return { loading: false, userInfo: action.payload , success:true};
      case USER_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }
  
  
  export {
    userSigninReducer, userRegisterReducer, userUpdateReducer
  }