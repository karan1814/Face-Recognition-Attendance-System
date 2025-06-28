import React from "react";
import heroimage from "../assets/heroimage1.webp";

export default function HeroPage() {
    return (
        <>
            <section className="bg-dark text-white text-center d-flex align-items-center" style={{ minHeight: "100vh" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-md-start mb-4 mb-md-0">
              <h1 className="display-4 fw-bold">Face Recognition & Attendance Management</h1>
              <p className="lead mt-3 mb-4">
                Efficiently track attendance with our advanced face recognition system.
              </p>
              <a href="/login" className="btn btn-primary btn-lg">Get Started</a>
            </div>
            <div className="col-md-6">
              <img
                src={heroimage}
                alt="Face Recognition"
                className="img-fluid"
                style={{ maxWidth: "100%" }}
              />
            </div>
          </div>
        </div>
      </section>
        </>
    )
}