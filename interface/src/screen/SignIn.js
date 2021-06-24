import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signin } from '../actions/userActions'
import { Link } from 'react-router-dom';

// import './SignIn.css'

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  );
  
  const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val === null && (valid = false);
    });
  
    return valid;
  };
  
function SignIn (props) {
  
  const forms = {
    email: null,
    password: null,
    formErrors: {
      email: "",
      password: ""
    } } ;

    const [state, setState] = useState(forms); 
    const [showError, setShowError] = useState(false); 
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo,message, error } = userSignin;

    const userRegister = useSelector(state => state.userRegister);
    const { loading:Register, message: messageRegister, error : errorRegister } = userRegister;
   // console.log("val userinfo : " + JSON.stringify(userInfo)+" send : "+statut);

    const dispatch = useDispatch();

      const handleSubmit = e => {
        e.preventDefault();
        console.log(" state : "+JSON.stringify(state));
        if (formValid(state)) {
          console.log(`
            --SUBMITTING--
            Email: ${state.email}
            Password: ${state.password}
          `);
          dispatch(signin(state.email,state.password));
        } else {
          console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }
      };
  
    const handleChange = e => {
      e.preventDefault();
      const { name, value } = e.target;
      let newState = { ...state };
  
      switch (name) {
        case "email":
          newState.formErrors.email = emailRegex.test(value)
            ? ""
            : "email invalide";
            newState.email = value;
          break;
        case "password":
          newState.formErrors.password =
            value.length < 6 ? "Minimum 6 caractères sont requis" : "";
            newState.password = value;
          break;
        default:
          break;
      }
  
      setState(newState);
    };
      
    useEffect(() => {
      if(error && !showError){
        setShowError(true);
        var alertError = setTimeout(() => {
          setShowError(false);
        },4000);
      }
      if (userInfo ) {
        console.log("userInfo : " +JSON.stringify(userInfo));
        props.history.push("/");
      }
      return () => clearTimeout(alertError);

    }, [userInfo,error]);

      return (
        <form className=" mb-4 col-md-4 col-12 container form-connect text-warning" onSubmit={handleSubmit} noValidate>
            <div className="row mt-5">

              <div className="col-12 text-center ">
                <h1 className=" mb-4" >Connexion</h1>
              </div>

              <div className="col-12 text-center mb-3">
                  <input
                    className={' form-control ' + ( state.formErrors.email.length > 0 ? "error" : null )}
                    placeholder="Adresse mail"
                    type="email"
                    name="email"
                    noValidate
                    onChange={handleChange}
                  />
              </div>
              <div className="col-12 text-center ">
                  {state.formErrors.email.length > 0 && (
                    <span className="errorMessage">{state.formErrors.email}</span>
                  )}
              </div>

              <div className="col-12 text-center mb-4">
                <input
                  className={ ' form-control ' + ( state.formErrors.password.length > 0 ? "error " : null)}
                  placeholder="mot de passe"
                  type="password"
                  name="password"
                  noValidate
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 text-center ">
                {state.formErrors.password.length > 0 && (
                  <span className="errorMessage">{state.formErrors.password}</span>
                )}
              </div>

              <div className="col-12 text-center ">
                <button className="btn btn-warning text-light" type="submit">Connexion</button>
              </div>

              <div className="col-12 text-center " >
                  <Link
                  to='/register'
                  className='nav-link'
                  >
                  je n'est pas encore de compte
                </Link>
                
                {(loading && 'chargement')}

                { showError && <div className="text-danger">Erreur veuillez vérifier vos identifiants</div> }

                  { message && 
                    <div className="alert alert-warning" role="alert">
                        {message}
                    </div>
                   }
                   <p>{messageRegister && "compte crée avec succès"}</p>
              </div>
                
            </div>
        </form>
          )
        }
      
export default SignIn