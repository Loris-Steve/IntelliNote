import React, { useEffect, useState } from 'react';

import { CgNotes } from 'react-icons/cg';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import dbpedia from '../config/dbpedia';

export default function Note(props) {
    const [searchBarre, setSearchBarre] = useState("");
    const handleNote = e => props.handleN(e);

    const saveNote = () => {
        if(props.currentNote.name.length > 0 && props.currentNote.name.length <= 500 ){
            props.saveN();
            props.setShowNote(false);
        }
        else if(props.currentNote.name.length > 0){
            alert("Un minimum de caractère est requis pour le titre ");
        }
        else{
            alert("500 caractères maximum");
        }
    }

    return (
        <>
        <Button variant="primary" className="shad" onClick={() => props.onClick()}>
            <CgNotes />
        </Button>

        <Modal
            show={props.showNote}
            onHide={() => props.setShowNote(false)}
            dialogClassName="modal-90w"
            aria-labelledby="example-custom-modal-styling-title"
        >
            <Modal.Header closeButton>
                <div className="col-8">
                <input 
                    name="name"
                    className=" form-control "
                    placeholder="titre..."
                    defaultValue={props.currentNote.name}
                    onChange={e => handleNote(e)}
                />
                </div>
            </Modal.Header>
            <Modal.Body className="row">
                <div className="col-7 ">
                    <textarea 
                    name="content"
                    className="form-control"
                    placeholder="contenu de la note..."
                    rows="14" 
                    defaultValue={props.currentNote.content}
                    onChange={handleNote}
                    >
                    </textarea>
                </div>
            <div className="col-5 text-center">
                <button className="btn btn-primary mb-2 "
                onClick={() => saveNote()}
                >
                    sauvegarder
                </button>
                <input className="form-control"
                placeholder="Draft..."
                onChange={(e) => setSearchBarre(e.target.value)}
                />
                <div className="mt-3 " style={{ height: "50vh", overflow : "scroll"}}>
                    <div className="border mt-1 p-1">
                    s | 0 | DP | DR | DT | DY <span className="text-primary">(Draft)</span> 
                    </div>
                    {
                    dbpedia.
                    filter(res => res.toLowerCase().includes(searchBarre.toLowerCase()))
                    .map(res => 
                        <div key={res} className="border mt-1 p-1">
                            {res}
                        </div>
                        )
                    }
                </div>
                <div>

                </div>
            </div>
            </Modal.Body>
        </Modal>
        </>
    );
}
  
  