
import React, { Component} from 'react';
//import { useSelector, useDispatch } from 'react-redux';

import { connect } from 'react-redux';
import { register} from '../actions/userActions'
import { Link } from 'react-router-dom';

// import './Register.css'

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;
  rest.photo = "";
  rest.previewPhoto = "";
  rest.selectedPhoto = "";
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

class Register extends Component {


  constructor(props) {
    super(props);

    this.state = {
      photo: null,
      selectedPhoto : '',
      previewPhoto : "",
      name: null,
      email: null,
      password: null,
      confirm_password: null,
      formErrors: {
        name: "",
        lastName: "",
        email: "",
        password: "",
        confirm_password: ""
      }
    };
    
  }
  
  componentDidUpdate(prevProps) {
    // Utilisation classique (pensez bien à comparer les props) :
    if (this.props.userRegister.success !== prevProps.userRegister.success) {
      this.props.history.push("/signIn");
    }
  }

  handleSubmit = e => {
    const { selectedPhoto } = this.state;
    console.log("data : "+ JSON.stringify(selectedPhoto));
    e.preventDefault();
    if (formValid(this.state)) {
      const data = new FormData();
      data.append('photo', selectedPhoto);          

      console.log(`
        --SUBMITTING--
        First Photo: ${this.state.photo}
        First name: ${this.state.name}
        Email: ${this.state.email}
        Password: ${this.state.password}
        confirm_password: ${this.state.confirm_password}
        file : ${selectedPhoto}
      `);
      this.props.register(
        {
        photo : this.state.photo,
        name : this.state.name,
        email : this.state.email,
        password :  this.state.password
        }
        );
        
        if(selectedPhoto){
          this.uploadImage(data);
        }
      console.log("q : " + JSON.stringify(this.userRegister));
      //this.props.history.push('/');

    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  
  uploadImage = async (data) => {
    console.log(" voici")
    const res = await fetch(
      `${process.env.REACT_APP_API_LNK}upload/parkingPhoto`,
      {
        method: 'POST',
        body: data
      }
    )
    //const file = await res.json()
      console.log( "files send : ")
  }


  previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {

          this.setState({ ...this.state, selectedPhoto : file , previewPhoto : reader.result });
    };
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    const file = e.target.files ?  e.target.files[0] : null;
    console.log("handle data : "+ JSON.stringify(this.state.selectedPhoto));
    
    switch (name) {
      case "photo":
        console.log("enter")
        this.previewFile(file);
      break;
      case "name":
        formErrors.name =
          value.length < 3 ? "Minimum 3 caractères sont requis" : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "email invalide";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "Minimum 6 caractères sont requis" : "";
        break;
      case "confirm_password":
          formErrors.confirm_password =
            value !== this.state.password ? "Les mots de passe doivent être identiques" : "";
          break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;
    const { loading, message , error } = this.props.userRegister;
    
    return (
      <form className="mt-5 mb-4 col-md-4 col-12 container form-connect text-warning" onSubmit={this.handleSubmit} noValidate>
          <div className="row">

            <div className="col-12 text-center ">
              <h1>Inscription</h1>
            </div>

            {/* <div className="input-group mb-3">
                  <input onChange={this.handleChange} type="file" name="photo" className="form-control" id="photo" />
                  <label className="input-group-text" htmlFor="photo">photo de profil</label>
                  {this.state.previewPhoto && (
                      <img
                          src={this.state.previewPhoto}
                          alt="photo"
                          className="col-12 "
                          height="100"
                      />
                    )}
            </div> */}

            <div className="col-12 text-center mb-3">
              <input
                className={' form-control ' + ( formErrors.name.length > 0 ? "error " : null ) }
                placeholder="nom ou pseudo ..."
                type="text"
                name="name"
                noValidate
                onChange={this.handleChange}
              />
            </div>
            <div className="col-12 text-center">
              {formErrors.name.length > 0 && (
                <span className="errorMessage">{formErrors.name}</span>
              )}
            </div>

            <div className="col-12 text-center mb-3">
              <input
                className={' form-control ' + ( formErrors.email.length > 0 ? "error " : null ) }
                placeholder="Adresse mail"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
            </div>
            <div className="col-12 text-center">
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>

            <div className="col-12 text-center mb-3">
              <input
                className={' form-control ' + ( formErrors.password.length > 0 ? "error " : null) }
                placeholder="Mot de passe"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
            </div>
            <div className="col-12 text-center">
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>

            <div className="col-12 text-center mb-3">
              <input
                className={' form-control ' + ( formErrors.confirm_password.length > 0 ? "error " : null) }
                placeholder="Confirmez votre mot de passe"
                type="password"
                name="confirm_password"
                noValidate
                onChange={this.handleChange}
              />
            </div>
            <div className="col-12 text-center">
              {formErrors.confirm_password.length > 0 && (
                <span className="errorMessage">{formErrors.confirm_password}</span>
              )}
            </div>

            <div className="col-12 text-center ">
              <button className="btn btn-primary btn-warning text-light" type="submit">Créer un compte</button>
            </div>
                
            <div className="col-12 text-center " >
              {(loading && 'chargement')}
              {error && <div>{error}</div>}
              
              {message}
              
              <Link
                  to='/signIn'
                  className='nav-link'
                >
                  j'ai déjà compte
                </Link>

              </div>
            </div>
        </form>
          )
        }
    }
    
  // rend la props disponible  au composant
  const mapStateToProps = (state) => {
      return {
        userRegister: state.userRegister
      }
  }



  // rend les fonctions disponibles au composant
  const mapDispatchToProps = (dispatch) => {
    return {
        register: (name,lastName,email,password) => dispatch(register(name,lastName,email,password))
    }
  }
      
      
export default connect(mapStateToProps,mapDispatchToProps)(Register)