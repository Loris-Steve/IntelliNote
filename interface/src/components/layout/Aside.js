import React, { useEffect, useState } from 'react';

import { IoIosAddCircle } from 'react-icons/io';

import { Link } from 'react-router-dom';

import { AiFillCloseCircle } from 'react-icons/ai';

import ModalConfirm from '../ModalConfirm';


function Aside(props) {

    const [showFormAddFolder, setFormAddFolder] = useState(false);
    const [nameNewFolder, setNameNewFolder] = useState("");
    const [showAside, setShowAside] = useState(false);
    const [index,setIndex]  = useState(null);
    const [showModal,setShowModal]  = useState(false);

    console.log(" list : "+JSON.stringify(props.themesList));
    const addTheme = () => {
        if(nameNewFolder.length > 0 ){
            setFormAddFolder(false);
            props.addFolder(nameNewFolder);
        }
        else{
            alert("minimum un caractère est requis");
        }
    }

    const isClient = typeof window === "object";

    function getSize() {
        console.log(window.innerWidth);
      return {
        width: isClient ? window.innerWidth : undefined,
        height: isClient ? window.innerHeight : undefined
      };
    }
  
    const [windowSize, setWindowSize] = useState(getSize);
  
    const showModalDelete = (ind) => {
      setIndex(ind);
      setShowModal(true);
    }

    useEffect(() => {
      if (!isClient) {
        return false;
      }
  
      function handleResize() {
        setWindowSize(getSize());
      }
  
      if(windowSize.width < 575){
          setShowAside(false);
      }
      else{
        setShowAside(true);
      }
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);

    }, [windowSize]); 

  return (
     <> 
     <ModalConfirm 
        name="suppimer le Theme"
        title="Attention"
        body={"Etes vous sur de vouloir supprimer le Theme : "+( props.themesList[index] !== undefined && props.themesList[index].name )}
        action="suppimer le Theme"
        actionModal={() => props.removeF(props.themesList[index] !== undefined && props.themesList[index].idFolder,true)}
        showModalConfirm={(val) => setShowModal(val)}
        show={showModal}
   />
   {showAside &&
    <aside className=" col-sm-3 col-10 bg-danger text-center text-light webSiteContent "
    style={{ position : windowSize.width < 575 ? 'absolute' : 'static', zIndex : 2}}
    >
            <div className="container-fluid webSiteContent  ">
              <div className="row">

                    <div className=" d-flex justify-content-between mt-3">
                        { windowSize.width < 575 &&
                        <button className="btn btn-secondary col-4 mb-2" onClick={() => setShowAside(!showAside)}>
                           X
                        </button> }

                            <p >Thèmes</p>
                            <IoIosAddCircle className="shad"
                                size={25}
                                cursor={"pointer"} 
                                color="white"
                                onClick={() => setFormAddFolder(!showFormAddFolder) }
                                onMouseOver={({target})=>target.style.color='grey'} 
                                onMouseOut={({target})=>target.style.color='white'}
                                />

                    </div>
                    
                    {showFormAddFolder &&

<div className="mb-2" >
                        <input className="form-control" name="addFolderA" placeholder="ajouter un dossier" 
                        onChange={e => setNameNewFolder(e.target.value)}
                        />
                       <button className=" btn btn-success mt-1 " 
                       onClick={() => addTheme()}
                       >
                         Ajouter
                          </button>
                        <button className="btn btn-secondary mt-1"
                        onClick={() => setFormAddFolder(false) }
                        >
                         Annuler
                       </button>
                     </div>
                    }

                        {props.themesList.length ? props.themesList.map((theme,index) =>
                        <div key={theme.idFolder} className=" text-end mt-2 "
                        >
                            {index > 0 &&
                                <AiFillCloseCircle  onClick={() => showModalDelete(index) }
                                size={20}
                                className=""
                                cursor={"pointer"} 
                                color="white"
                                onMouseOver={({target})=>target.style.color='yellow'} 
                                onMouseOut={({target})=>target.style.color='white'}
                                />
                              }
                                <button className="shad col-sm-10 col-12 btn btn-light "
                                  onClick={() => props.changeF(theme)}
                                  >{theme.name}</button> 
                        </div>
                        )
                    : ""}
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
 }
 {windowSize.width < 575 &&
 <button className="btn btn-danger col-4 " onClick={() => setShowAside(true)}>
 menu
</button>
 }
 </>
  );
}

export default Aside;

