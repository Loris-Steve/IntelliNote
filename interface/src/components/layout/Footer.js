import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  
  return (
    
    <footer className="container-fluid py-3 bg-light shad">
      <div className="row">
        <div className="col-12 col-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="d-block mb-2"><circle cx="12" cy="12" r="10"></circle><line x1="14.31" y1="8" x2="20.05" y2="17.94"></line><line x1="9.69" y1="8" x2="21.17" y2="8"></line><line x1="7.38" y1="12" x2="13.12" y2="2.06"></line><line x1="9.69" y1="16" x2="3.95" y2="6.06"></line><line x1="14.31" y1="16" x2="2.83" y2="16"></line><line x1="16.62" y1="12" x2="10.88" y2="21.94"></line></svg>
          <small className="d-block mb-3 text-muted">&copy; 2020-2021</small>
        </div>
         <div className="col-6 col-md">
          <h5>IntelliNote</h5>
          <ul className="list-unstyled text-small">
            <li><Link to="/" > Accueil </Link></li>
            <li><Link to="/" > Recherche </Link></li>
          </ul>
        </div>
      </div>
    </footer>

  );
}

export default Footer;

