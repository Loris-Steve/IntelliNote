import React from 'react';

import { connect } from 'react-redux';

import Aside from '../components/layout/Aside';
import Note from '../components/Note';

import { listFolders, saveFolder , deleteFolder } from '../actions/folderActions';
import { listNotesUser, saveNote , deleteNote , getBasketDataSparql } from '../actions/noteActions';

import { AiFillCloseCircle } from 'react-icons/ai';

import { AiOutlineFolder } from 'react-icons/ai';
import { Alert } from 'bootstrap';

import ModalConfirm from '../components/ModalConfirm';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foldersUser : [],
      notesUser : [],
      pathsOpen : [],
      nameNewFolder : "",
      currentFolder : {
        idFolder : "",
        name : "",
        id_User : "",
        id_Folder : "",
      },
      currentNote : {
        idNote : "",
        name : "",
        content : "",
        pos : "",
        id_Folder : "",
      },
      showFormFolder: false,
      showNote : false,
      indexFolderDelete : null,
      indexNoteDelete : null,
      showModalConfirmFolder : false,
      showModalConfirmNote : false,
      searchBarre : "",
      alert: '',
      basketResult : {}
    };

    //this.changeFolder = this.changeFolder.bind(this);

    //this.handleSubmit = this.handleSubmit.bind(this);
  }



  componentDidMount = async () => {
    //console.log(" user Info : "+JSON.stringify(this.props.userInfo));
    if (!this.props.userInfo ) {
      this.props.history.push('/signIn');
    }
    else{
      this.props.listFolders("","",this.props.userInfo.idUser);
      this.props.listNotesUser();
    //  console.log(this.props.getBasketDataSparql());
    //   //http://localhost:8000/?module=sparql
    //   const res = await fetch(process.env.REACT_APP_API_LNK+`?module=sparql`, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json'
    //     },
    //   }).then(res => {
    //     console.log(" res : "+JSON.stringify(res));
    //     res.json()
    //   })

      // .catch( error => {
      //   console.error(" error : "+error.message);
      // })
        
    }


  }

  componentDidUpdate(prevProps) {
    if ( this.props.userInfo !== prevProps.userInfo) {
      if (!this.props.userInfo ) {
        this.props.history.push('/signIn');
      }
    }
    // Utilisation classique (pensez bien à comparer les props) :notesUser
    if ( this.props.foldersList !== prevProps.foldersList) {
      if(this.props.foldersList.error){
        alert("Erreur impossible de récupérer vos dossier");
      }
      else{
        const newFolderUser = [...this.props.foldersList.folders] ;
        const newCurrentFolder = this.getListItemByIdFolder("id_Folder", newFolderUser,null);
        console.log(" newCurrentFolder : "+JSON.stringify(newCurrentFolder[0]));
        var currentFolder = {...this.state.currentFolder};
        var newPathsOpens = [...this.state.pathsOpen];
        // si ils n'existent pas on les initialise
        if(!this.state.currentFolder.idFolder && newCurrentFolder[0] ){
          currentFolder = {...newCurrentFolder[0]};
          newPathsOpens = [currentFolder.idFolder];
        }
        
          console.log(JSON.stringify(newPathsOpens));
          this.setState({ ...this.state, pathsOpen : newPathsOpens, foldersUser : newFolderUser, 
            currentFolder
          });
          
    
      }
    }
    if (this.props.notesUser !== prevProps.notesUser) {
      if(this.props.notesUser.error){
        alert("Erreur impossible de récupérer vos notes");
      }
      else{
        console.log("notes : "+JSON.stringify(this.props.notesUser.notes))
        this.setState({ ...this.state, notesUser : [...this.props.notesUser.notes] });
      }
    }

    if (this.props.folderSave !== prevProps.folderSave) {
      this.props.listFolders("","",this.props.userInfo.idUser);
    }

    if (this.props.folderDelete !== prevProps.folderDelete) {

      this.props.listFolders("","",this.props.userInfo.idUser);
    }
    if (this.props.noteSave !== prevProps.noteSave) {
      this.props.listNotesUser();
    }

    if (this.props.noteDelete !== prevProps.noteDelete) {

      this.props.listNotesUser();
    }
     
  }

closeAlert(){
  console.log(" alert : closeAlert");
  setTimeout(() => {
    this.setState({ alert : "" })
  },3000)
  
}

removeFolder(idFolder,theme) {
  if(theme == true){
    this.setState({...this.state , currentFolder : { ...this.state.currentFolder ,  idFolder : ""} });
  }

  this.props.deleteFolder(idFolder);
}

removeNote(idNote) {
  this.props.deleteNote(idNote);
}


HandleNameFolder = (e) => this.setState({...this.state, nameNewFolder : e.target.value});
handleNote = (e) => this.setState({...this.state,currentNote : {...this.state.currentNote, [e.target.name] : e.target.value } });
handleShowNote = (val) => this.setState({...this.state,showNote : val});
handleShowFormFolder = (val) => this.setState({ ...this.state, showFormFolder:val});

handleShowModalFolder = (val,ind) => {
  let newState = {...this.state};
  newState.showModalConfirmFolder = val;
  
  if(ind >= 0){
    newState.indexFolderDelete = ind;
  }
  this.setState(newState); 
  
};
handleShowModalNote = (val,ind) => {
  let newState = {...this.state};
  newState.showModalConfirmNote = val;
  
  if(ind >= 0){
    newState.indexNoteDelete = ind;
  }
  this.setState(newState);
};

saveNote () {
  this.props.saveNote({...this.state.currentNote, id_Folder : this.state.currentFolder.idFolder});
}

addFolder = async (name, idFolder) => {
  
  const newFolder =       {
    name : name,
    id_User : parseInt(this.props.userInfo.idUser),
    id_Folder : parseInt(idFolder)
  };
  
  //alert("newFolder : "+ JSON.stringify(newFolder));
  this.props.saveFolder(newFolder);
  this.setState({ ...this.state, showFormFolder: false});
  /*  
    const res = await fetch(process.env.REACT_APP_API_LNK+`?module=folder&action=create`,
      nov
    , {
      method: "POST",
      headers: {
        Authorization: 'Bearer ' + this.props.userInfo.token,
      },
    }).then(res => res.json())


  console.log(`${JSON.stringify(res)}`); */
  

}

changeFolder(folder,ind){
  const { pathsOpen } = this.state;
  
  let newPathsOpens = [...pathsOpen];
  if(ind){
    newPathsOpens.splice(ind,newPathsOpens.length);
  }
  else if(folder.id_Folder)
    newPathsOpens.push(folder.idFolder);
  else
    newPathsOpens = [...[folder.idFolder]];
  
  console.log("index : "+ind+" | "+folder.idFolder+"content : "+JSON.stringify(folder)+" paths : "+JSON.stringify(pathsOpen));
  this.setState({...this.state, pathsOpen : newPathsOpens , currentFolder : {...folder} , searchBarre :""});
}

changeNote(note){

  this.setState({...this.state, currentNote : note, showNote : true , searchBarre : ""});
}

getListItemByIdFolder(name,listItem,value){
  const { searchBarre } = this.state;

  //console.log(`name : id_Folder | value ${value}` + " new list : "+JSON.stringify(listItem));
  let newList = [];
  if(!searchBarre){
    newList = listItem.filter(item => 
      item[name] === value
    );
  }
  else{
    newList = listItem.filter(item => 
      item["name"].toUpperCase().includes(searchBarre.toUpperCase()) ||  item["content"] && item["content"].toUpperCase().includes(searchBarre.toUpperCase())
    );
  }
  //console.log(" new list : "+JSON.stringify(newList));
  return newList;
}

showNewNote = () => {
    this.setState({ showNote : true , currentNote : {
      idNote : "",
      name : "",
      content : "",
      pos : "",
      id_Folder : "",
    }
  })
}
  render() {
    const { foldersUser , notesUser, currentFolder , showFormFolder ,
       nameNewFolder, currentNote , pathsOpen,
       showModalConfirmFolder,showModalConfirmNote,
      showNote} = this.state;
    const { error : errorFolderList} = this.props.foldersList;
    const { error : errorNoteList } = this.props.notesUser;
    const foldersOfFolder = errorFolderList ? [] : this.getListItemByIdFolder("id_Folder",foldersUser,currentFolder.idFolder);
    const notesOfFolder = errorNoteList ? [] : this.getListItemByIdFolder("id_Folder",notesUser,currentFolder.idFolder);

    return (
      <div className="container-fluid bg-secondary webSiteContent ">
        <div className="row">
          <Aside themesList={this.getListItemByIdFolder("id_Folder",foldersUser,null)}
            addFolder={(name) => this.addFolder(name)}
            removeF={(id,theme) => this.removeFolder(id,theme) }
            changeF={(f) => this.changeFolder(f)}

          />
          <div className="col-sm-9 col-12 webSiteContent " >
            
            {/* all folders path */}
            <div className="  row ">
              <div className="col-10 d-flex bd-highlight mb-3">

              {pathsOpen.length > 0 && pathsOpen.map((p,index) => 
                <div key={p+index} className="p-2 bd-highlight" style={{ cursor : "pointer" }}
                onClick={() => this.changeFolder(
                  this.getListItemByIdFolder("idFolder",foldersUser,p).length > 0 ? 
                  this.getListItemByIdFolder("idFolder",foldersUser,p)[0] : {} ,
                   index+1)}
                >
                  <div className="shad text-light border p-1"> 
                    {this.getListItemByIdFolder("idFolder",foldersUser,p).length > 0 && this.getListItemByIdFolder("idFolder",foldersUser,p)[0].name+">"}
                  </div>
                </div>
                )
              }
              </div>
              <div className="col-2 p-2 bd-highlight text-center row">
                <div className="col-6">
                      <button className="shad btn btn-light"
                        onClick={() => this.setState({ ...this.state, showFormFolder: !showFormFolder})}
                      >
                        <AiOutlineFolder />
                      </button>

                  </div>

                <div className="col-6">
                  <Note currentNote={currentNote} 
                  handleN={(e) => this.handleNote(e)}
                  saveN={() => this.saveNote()}
                  showNote={showNote}
                  setShowNote={(val) => this.handleShowNote(val)}
                  onClick={() => this.showNewNote()}
                  />
                </div>

                    {showFormFolder &&
                    <div className="shad col-5 border rounded bg-secondary p-2 text-light" style={{position : "absolute", right:"3%", zIndex: 2}}>

                      <label>Dans {currentFolder.name}</label>
                      <input name="addFolder" className="shad form-control mb-1" 
                      placeholder="name..."
                      onChange={e => this.HandleNameFolder(e)}
                      />
                      <button className="btn btn-danger shad"
                       onClick={() => this.handleShowFormFolder(false)}
                       >
                        Annuler
                      </button>
                      <button className=" btn btn-success shad" 
                      onClick={() => this.addFolder(nameNewFolder ,currentFolder.idFolder)}
                     >
                        Ajouter
                      </button>
                    </div>
                    }
                  </div>
            </div>
            
            {/* Modal de confirmation et de suppression de dossier et de note */}
            <ModalConfirm 
                  name="suppimer le Dossier"
                  title="Attention"
                  body={"Etes vous sur de vouloir supprimer le Dossier : "+( foldersOfFolder[this.state.indexFolderDelete] !== undefined && foldersOfFolder[this.state.indexFolderDelete].name )}
                  action="suppimer le Dossier"
                  actionModal={() => this.removeFolder(foldersOfFolder[this.state.indexFolderDelete] !== undefined && foldersOfFolder[this.state.indexFolderDelete].idFolder)}
                  showModalConfirm={(val) => this.handleShowModalFolder(val)}
                  show={showModalConfirmFolder}
                />
                <ModalConfirm 
                  name="suppimer la Nnote"
                  title="Attention"
                  body={"Etes vous sur de vouloir supprimer la Note : " +( notesOfFolder[this.state.indexNoteDelete] !== undefined && notesOfFolder[this.state.indexNoteDelete].name )}
                  action="suppimer la Note"
                  actionModal={() => this.removeNote(notesOfFolder[this.state.indexNoteDelete] !== undefined && notesOfFolder[this.state.indexNoteDelete].idNote)}
                  showModalConfirm={(val) => this.handleShowModalNote(val)}
                  show={showModalConfirmNote}
                />
            <div>
            <div className="d-flex justify-content-center searchContent " >
                <input placeholder="rechercher..." className="text-light" 
                onChange={(e) => this.setState({...this.state, searchBarre : e.target.value})}/>
            </div>

            {/* current list folders */}
            <label className="text-light">Mes Dossiers </label>
            <div className="d-flex align-content-start flex-wrap mt-3">
              {foldersOfFolder && foldersOfFolder.map((f,ind) => 
                <div key={f.idFolder} className=" px-1"
                >
                  <div className="shad bd-highlight card px-2 "
                  style={{  backgroundColor : "rgb(242 178 16)"}}
                  >

                    <AiFillCloseCircle size={25} onClick={() => this.handleShowModalFolder(true,ind)}
                      cursor={"pointer"} 
                      color="white"
                      onMouseOver={({target})=>target.style.color='grey'} 
                      onMouseOut={({target})=>target.style.color='white'}
                      />
                    <div  onClick={() => this.changeFolder(f)}
                        style={{cursor : "pointer"}}>
                        <p >{f.name}</p>
                      </div>

                  </div>
                </div>
                )}


            </div>
            </div>

            {/* current list notes */}
            <div className="d-flex align-content-start flex-wrap mt-3">
              {notesOfFolder &&  notesOfFolder.map((n,ind) => 
                <div key={n.idNote}   className={"px-1  "
                +(n.name.length > 15 || n.content.length > 15 ? "col-4" : "col-32")}
                >
                 <div className="shad  px-2 text-light p-3 border rounded "
                >
                  <div className="d-flex ">
                        <div className=" col-10"> 
                          <p >{n.name && n.name.length > 15 ? n.name.substring(0,15)+"..." : n.name}</p>
                        </div>
                        
                        <div className=""> 
                          <AiFillCloseCircle size={25} onClick={() => this.handleShowModalNote(true,ind) }
                                      cursor={"pointer"} 
                                      color="white"
                                      onMouseOver={({target})=>target.style.color='grey'} 
                                      onMouseOut={({target})=>target.style.color='white'}
                                      className={n.name.length < 8 && n.content.length < 11 && "shad"}
                                      />
                        </div>
                      </div>
                  <div
                    onClick={() => this.changeNote(n)}
                    style={{cursor : "pointer"}}
                    className="textLong "
                    >
                      {n.content && n.content.length > 80 ? n.content.substring(0,80)+"..." : n.content}
               
                   </div>

                   </div>
                </div>
                )}
            </div>
          </div>
        </div> 
      </div>
  );

  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userSignin.userInfo,
    foldersList : state.foldersList,
    folderSave : state.folderSave,  
    folderDelete : state.folderDelete,  

    notesUser : state.notesUser,
    noteSave : state.noteSave,
    noteDelete : state.noteDelete,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    listFolders: (idFolder,name,id_User,id_Folder) => dispatch(listFolders(idFolder,name,id_User,id_Folder)),
    saveFolder: (folder) => dispatch(saveFolder(folder)),
    deleteFolder: (folderId) => dispatch(deleteFolder(folderId)),

    listNotesUser: () => dispatch(listNotesUser()),
    saveNote: (note) => dispatch(saveNote(note)),
    deleteNote: (noteId) => dispatch(deleteNote(noteId)),

    getBasketDataSparql: () => dispatch(getBasketDataSparql())



  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);

