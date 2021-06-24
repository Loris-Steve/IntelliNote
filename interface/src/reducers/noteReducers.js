import {
    NOTE_SAVE_REQUEST,
    NOTE_CREATE_SUCCESS,
    NOTE_SAVE_SUCCESS,
    NOTE_SAVE_FAIL,
    NOTE_LIST_REQUEST,
    NOTE_LIST_SUCCESS,
    NOTE_LIST_FAIL,
    NOTE_LIST_USER_REQUEST,
    NOTE_LIST_USER_SUCCESS,
    NOTE_LIST_USER_FAIL,
    NOTE_DETAILS_REQUEST ,
    NOTE_DETAILS_SUCCESS ,
    NOTE_DETAILS_FAIL ,
    NOTE_DELETE_REQUEST,
    NOTE_DELETE_SUCCESS,
    NOTE_DELETE_FAIL
    } from '../constants/noteConstants';
  
      function noteSaveReducer(state = { note: {} }, action) {
        switch (action.type) {
          case NOTE_SAVE_REQUEST:
            return { loading: true };
          case NOTE_CREATE_SUCCESS:
            return { loading: false, create: true, note: action.payload };
          case NOTE_SAVE_SUCCESS:
            return { loading: false, save: true, note: action.payload };
          case NOTE_SAVE_FAIL:
            return { loading: false, error: action.payload };
          default:
            return state;
        }
      }
      
    function notesListReducer(state = { notes: [] }, action) {
      switch (action.type) {
        case NOTE_LIST_REQUEST:
          return { loading: true, notes: [] };
        case NOTE_LIST_SUCCESS:
          return { loading: false, notes: action.payload ,success : true};
        case NOTE_LIST_FAIL:
          return { loading: false, error: action.payload };
        default:
          return state;
      }
    }
    
    function notesUserListReducer(state = { notes: [] }, action) {
      switch (action.type) {
        case NOTE_LIST_USER_REQUEST:
          return { loading: true, notes: [] };
        case NOTE_LIST_USER_SUCCESS:
          return { loading: false, notes: action.payload , success : true};
        case NOTE_LIST_USER_FAIL:
          return { loading: false, error: action.payload };
        default:
          return state;
      }
    }
  
    function noteDetailsReducer(state = { note: {} }, action) {
      switch (action.type) {
        case NOTE_DETAILS_REQUEST:
          return { loading: true, note: {} };
        case NOTE_DETAILS_SUCCESS:
          return { loading: false, note: action.payload ,success: true};
        case NOTE_DETAILS_FAIL:
          return { loading: false, error: action.payload };
        default:
          return state;
      }
    }
  
    function noteDeleteReducer(state = { note: {} }, action) {
      switch (action.type) {
        case NOTE_DELETE_REQUEST:
          return { loading: true };
        case NOTE_DELETE_SUCCESS:
          return { loading: false, note: action.payload, success: true };
        case NOTE_DELETE_FAIL:
          return { loading: false, error: action.payload };
        default:
          return state;
      }
    }
  
    export {
      noteSaveReducer,
      notesListReducer,
      notesUserListReducer,
      noteDetailsReducer,
      noteDeleteReducer
    };
    