import React from "react"
import './Footer.css'
export const Footer = ()=>(
    <footer className="footer bg-dark mt-auto py-3">
    <div className="container-fluid bg-success text-white text-center py-3" >
        <h4>Welcome to Event Management App</h4>
        <button className="btn btn-warning btn-lg">Contact Us</button>
    </div>
    <div className="container centerdiv">
       <a href="" className="alert-class"><i className="fa fa-2x fa-facebook"></i></a>
       <a href="" className="alert-class"><i className="fa fa-2x fa-instagram"></i></a>
       <a href="" className="alert-class"><i className="fa fa-2x fa-linkedin"></i></a>
       <a href="" className="alert-class"><i className="fa fa-2x fa-twitter"></i></a>
       <a href="" className="alert-class"><i className="fa fa-2x fa-youtube"></i></a>

    </div>
    </footer>
);
