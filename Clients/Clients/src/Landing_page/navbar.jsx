import React from "react";

export default function Navbar(){
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3" style={{position: "fixed", width: "100%", zIndex: 1}}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">FacTrack</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end " id="navbarNav">
                <ul className="navbar-nav px-3">
                    <li className="nav-item px-3">
                          <a className="nav-link active" aria-current="page" href="#">Home</a>
                    </li>
                    <li className="nav-item px-3">
                        <a className="nav-link" href="#">Features</a>
                    </li>
                    <li className="nav-item px-3">
                        <a className="nav-link" href="#">How it works</a>
                    </li>
                    <li className="nav-item px-3">
                        <a className="nav-link disabled" aria-disabled="true">Testimonials</a>
                    </li>
                    <li className="nav-item px-3">
                        <a className="nav-link" href="#">Contact</a>
                    </li>
                    <li className="nav-item px-3">
                        <a className="btn btn-primary" href="/login">Login</a>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
        </>
    )
}