import React, { useState } from 'react';

import { IoIosAddCircle } from 'react-icons/io';

import { Link } from 'react-router-dom';

function Folder(props) {

    const [principalFolders, setPrincipalFolder] = useState([]);
    const [showFormAddFolder, setFormAddFolder] = useState(false);
console.log(" list : "+JSON.stringify(props.themesList));
    const addFolder = () => {
        alert("addFolder");
    }

  return (
    <aside className="col-2 bg-danger text-center text-light webSiteContent ">
            <div className="container-fluid webSiteContent">
                <div className="row">

                    <div className="d-flex justify-content-between mt-3">
                        <div></div>
                            <p >Thèmes</p>
                            <IoIosAddCircle className=""
                                size={25}
                                cursor={"pointer"} 
                                color="white"
                                onClick={() => this.addFolder(false) }
                                onMouseOver={({target})=>target.style.color='grey'} 
                                onMouseOut={({target})=>target.style.color='white'}
                                />
                    </div>
                    <div className="btn btn-light">
                        {props.themesList.map(theme =>
                            <button key={theme.idFolder} className="btn">{theme.name} </button> 
                        )}

                </div>
            </div>

            </div>
            <div className="mt-auto navbar-dark">

                <div className="text-center">
                    <ul className="navbar-nav">
                        <li className="nav-item" ><Link to="/" className="nav-link"> Accueil </Link></li>
                        <li className="nav-item" ><Link to="/" className="nav-link"> Recherche </Link></li>
                    </ul>
                </div>
                <div >
                    <small className="d-block mb-3 ">&copy; 2020-2021</small>
                </div>
            </div>
    </aside>
  );
}

export default Folder;

