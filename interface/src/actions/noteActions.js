import {
  NOTE_CREATE_SUCCESS,
  NOTE_SAVE_REQUEST,
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
  NOTE_DELETE_SUCCESS,
  NOTE_DELETE_FAIL,
  NOTE_DELETE_REQUEST
  } from '../constants/noteConstants';

  import Axios from 'axios';
  
  const getBasketDataSparql = ( ) => async (dispatch, getState) => {
    try {
      const { data } = await Axios.get(
        `${process.env.REACT_APP_API_LNK}?module=sparql`,
        {}
      );
      return data;
    } catch (error) {
      return {error : error.message};
    }
  };

  const listNotes = (
    idNote = '',
    name = '',
    id_User = '',
    id_Note = ''
  ) => async (dispatch, getState) => {
    try {
      dispatch({ type: NOTE_LIST_REQUEST });
      console.log(" get parks params : " +
      idNote + ' : ', name + ' : ',id_User + ' : ',
      id_Note 
      );
      const {
        userSignin: { userInfo },
      } = getState();

      const headers = userInfo ? {
        Authorization: 'Bearer ' + userInfo.token
      } : {};

      const { data } = await Axios.get(
        `${process.env.REACT_APP_API_LNK}?module=note&action=find&idUser=${idNote}&name=${name}&id_User=${id_User}&id_Note=${id_Note}`,
        {
          headers
          }
      );
      
      console.log("List data recu : " + JSON.stringify(data));
      dispatch({ type: NOTE_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: NOTE_LIST_FAIL, payload: error.message });
    }
  };

  const saveNote = (note) => async (dispatch, getState) => {
      console.log(" saveNote !!" );
      console.log(" creation d'un note : " + JSON.stringify(note));
    try {
      dispatch({ type: NOTE_SAVE_REQUEST, payload: note });
      const {
        userSignin: { userInfo },
      } = getState();
      if (!note.idNote) {

        const { data } = await Axios.post(process.env.REACT_APP_API_LNK+'?module=note&action=create', note, {
          headers: {
            Authorization: 'Bearer ' + userInfo.token
          }
        });
        console.log(" fiiin : " + JSON.stringify(data));

        dispatch({ type: NOTE_CREATE_SUCCESS, payload: data });
      } else {
        console.log(" modification note : " + JSON.stringify(note));

        const { data } = await Axios.put(
          process.env.REACT_APP_API_LNK+'?module=note&action=update',
          note,
          {
            headers: {
              Authorization: 'Bearer ' + userInfo.token,
            },
          }
        );
        dispatch({ type: NOTE_SAVE_SUCCESS, payload: data });
      }
    } catch (error) {
      console.log(" noon: " + JSON.stringify(note));

      dispatch({ type: NOTE_SAVE_FAIL, payload: error.message });
    }
  };
  
  const listNotesUser = (
  ) => async (dispatch, getState) => {
      try {
        dispatch({ type: NOTE_LIST_USER_REQUEST });
        const {
          userSignin: { userInfo },
        } = getState();
        const { data } = await Axios.get(
          process.env.REACT_APP_API_LNK+'/?module=note&action=user_notes&id_User='+userInfo.idUser,{
          headers: {
            Authorization: 'Bearer ' + userInfo.token
          }
        }
        );
       console.log(" data user recu : " + JSON.stringify(data));
  
        dispatch({ type: NOTE_LIST_USER_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: NOTE_LIST_USER_FAIL, payload: error.message });
      }
    };
  
    const detailsNote = (noteId) => async (dispatch,getState
      ) => {
      try {
        console.log(" action detail note : " + JSON.stringify(noteId));
        const {
          userSignin: { userInfo },
        } = getState();

        dispatch({ type: NOTE_DETAILS_REQUEST, payload: noteId });
        const { data } = await Axios.get(`${process.env.REACT_APP_API_LNK}notes/` + noteId,{
          headers: {
            Authorization: 'Bearer ' + userInfo.token
          }});
        console.log(" data detail user recu : " + JSON.stringify(data));

        dispatch({ type: NOTE_DETAILS_SUCCESS, payload: data });
      } catch (error) {
        dispatch({ type: NOTE_DETAILS_FAIL, payload: error.message });
      }
    };

  const deleteNote = (noteId) => async (dispatch, getState) => {
    try {
      const {
        userSignin: { userInfo },
      } = getState();
     console.log('supression '+noteId);
      dispatch({ type: NOTE_DELETE_REQUEST, payload: noteId });
      const { data } = await Axios.delete(`${process.env.REACT_APP_API_LNK}?module=note&action=delete&idNote=${noteId}`, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      });
      dispatch({ type: NOTE_DELETE_SUCCESS, payload: data, success: true });
    } catch (error) {
      dispatch({ type: NOTE_DELETE_FAIL, payload: error.message });
    }
};

  export {
    listNotes,
    listNotesUser,
    saveNote,
    detailsNote,
    deleteNote,
    getBasketDataSparql
  };
  