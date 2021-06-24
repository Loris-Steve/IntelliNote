
import { remove } from 'js-cookie';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { update,deleteAccount} from '../actions/userActions';
//import config from '../../config/config';

import ModalConfirm from '../components/ModalConfirm';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  //rest.photo = "";
  //rest.password = "";

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false) ;
  });

  return valid;
};

export default function Account(props) {

  const [upadteActivate , setUpadteActivate] = useState(true);
  const userInfo = useSelector(state => state.userSignin.userInfo);
  const userUpdate = useSelector(state => state.userUpdate);
  const { loading, userInfo:user, error,success } = userUpdate;
  const [userPhoto, setUserPhoto] = useState();
  const [previewUserPhoto, setPreviewUserPhoto] = useState("");;
  const [showModal , setShowModal] = useState(false);

    const [state, setState] = useState({
      formErrors : {
        name: "",
        email: "",
        password:"",
        photo : "",
      }
    });

    const dispatch = useDispatch();

    const uploadFile = async () => {
      // const data = new FormData();
        
      // if(state.photo){
      //   console.log("proff")
      //   data.append('userPhoto', userPhoto);          
      // }

      // if(state.photo ){
      //   //console.log(" find token : "+userInfo.token);
      //   const res = await fetch(
      //     `${process.env.REACT_APP_API_LNK}upload/userPhoto`,
      //     {
      //       method: 'POST',
      //       body: data
      //       ,
      //       headers: {
      //         Authorization: 'Bearer ' + userInfo.token,
      //       }
      //     }
      //   )
      //   //const file = await res.json()
      // }
    } 

    const handleRemoveFile = (nameFile) => {
      setPreviewUserPhoto('');

      setState({...state, [nameFile] : "null"});

    }

    const removeFile = async (nameFile) => {
      
      console.log(" remove file !!! " + nameFile);

        const res = await fetch(
          `${process.env.REACT_APP_API_LNK}upload/${userInfo.email}/${nameFile}`,
          {
            method: 'DELETE',
            //body: nameFile,
            headers: {
              Authorization: 'Bearer ' + userInfo.token,
            }
          }
        )
        //const file = await res.json()
      }

  const handleSubmit = async e => {
    e.preventDefault();
    if (formValid(state) && !showModal) {
      const { formErrors,...rest} = state;
     // alert(" change "+JSON.stringify(rest));

      if(!rest.name && !rest.password ){
        alert(" vous n'avez éffectué aucune modifiaction");
      } 
      else{

        dispatch(update(state.name,state.email,state.password));
        //uploadFile();
        // remove file
        //if(userInfo.photo && !state.photo){
          //removeFile("userPhoto")
          //}
         } 
      console.log(`change : ${rest.length}
      --SUBMITTING--
      state : ${JSON.stringify(state)}`);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  const previewFile = (file,name) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      
          setPreviewUserPhoto(reader.result);
    };
};

  const  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    const { formErrors } = state;
    const file = e.target.files ? e.target.files[0] : null;
    switch (name) {
      case "name":
        formErrors.name =
          value.length < 3 ? "Minimum 3 characatères sont requis" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "Minimum 6 characatères sont requis" : "";
        break;
        case "photo":
          formErrors.photo =
          value.length < 1 ? "Minimum 6 characatères sont requis" : "";
          setUserPhoto(file);
          previewFile(file , name);
      break;
      default:
        break;
    }

    setState({ formErrors, [name]: value });// provoque une erreur -> , () => console.log(state)
  };

  const removeAccount = async () => {

    //const file = await res.json()
    dispatch(deleteAccount());
  }
  //console.log(" user info : "+ JSON.stringify(userInfo));
useEffect(() => {

  if (!userInfo ) {
    props.history.push('/signIn');
  }

  if(success){
    props.history.push('/');
  }
    
  }, [props,userInfo,success]);


    return (
      
      <form className="mt-4 mb-4 col-md-4 col-12 container form-connect" onSubmit={handleSubmit} noValidate>
          <div className="row">

            <div className="col-12 text-center ">
              <h1>Compte de {userInfo && userInfo.name} </h1>
            </div>

            {/* <div className="input-group mb-3">
                <input type="file" id="photo" name="photo" className="form-control"  onChange={handleChange}
                  disabled={!upadteActivate}
                  //defaultValue={userInfo && userInfo.photo}
                />
                <label className="input-group-text" htmlFor="photo">Photo de Profil</label>
            </div>
            {previewUserPhoto && (
                      <>
                      <img
                          src={previewUserPhoto}
                          alt="image1"
                          className="col-12 "
                      />
                      <button className="btn btn-dark" type="button"
                        onClick={() => handleRemoveFile("photo")}
                        disabled={!upadteActivate}
                        >
                          supprimer
                        </button>
                    </>
                    )} */}
                    
            <div className="col-12 text-center mb-3">
              <input
                className={' form-control ' + ( state.formErrors.name.length > 0 ? "error " : null ) }
                placeholder="Prénom"
                type="text"
                name="name"
                noValidate
                defaultValue={userInfo && userInfo.name}
                onChange={handleChange}
                disabled={!upadteActivate}
              />
            </div>
            <div className="col-12 text-center">
              {state.formErrors.name.length > 0 && (
                <span className="errorMessage">{state.formErrors.name}</span>
              )}
            </div>

            <div className="col-12 text-center mb-3">
              <input
                className={' form-control ' + ( state.formErrors.email.length > 0 ? "error " : null ) }
                placeholder="Adresse mail"
                type="email"
                name="email"
                noValidate
                value={userInfo && userInfo.email}
                readOnly
                //onChange={handleChange}
                disabled={!upadteActivate}
              />
            </div>
            <div className="col-12 text-center">
              {state.formErrors.email.length > 0 && (
                <span className="errorMessage">{state.formErrors.email}</span>
              )}
            </div>

            <div className="col-12 text-center mb-3">
              <input
                className={' form-control ' + ( state.formErrors.password.length > 0 ? "error " : null) }
                placeholder="Nouveau mot de passe"
                type="password"
                name="password"
                noValidate
                onChange={handleChange}
                disabled={!upadteActivate}
              />
            </div>
            <div className="col-12 text-center">
              {state.formErrors.password.length > 0 && (
                <span className="errorMessage">{state.formErrors.password}</span>
              )}
            </div>

            <button className="btn btn-primary ml-auto" type="submit">sauvegarder</button>
            <button className="btn btn-secondary ml-auto mt-2" 
            onClick={() => setShowModal(true)}
            >supprimer mon compte</button>

            <ModalConfirm 
              name="suppimer mon compte"
              title="Attention"
              body="Etes vous sur de vouloir supprimer votre compte utilisateur"
              action="suppimer mon compte"
              actionModal={() => removeAccount()}
              showModalConfirm={(val) => setShowModal(val)}
              show={showModal}
            />

            <div className="col-12 text-center " >
              {(loading && 'chargement')}
              {error && <div>{error}</div>}
              <div className="col-12 text-center " >
               { user && <div className="alert alert-success" role="alert">
                      modification éffectué
                  </div>
                   }
                </div>

              </div>
            </div>
        </form>
          )
        }
 