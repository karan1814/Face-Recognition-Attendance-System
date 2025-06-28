import React from "react";

export default function work(){
    return(
        <>
        <section id="how-it-works" className="py-5 text-center bg-white">
  <div className="container">
    <h2 className="fw-bold mb-5 display-6">How It Works</h2>
    <div className="row justify-content-center">
      <div className="col-md-4 mb-4">
        <div className="p-4 border rounded shadow-sm h-100">
          <span className="display-4 fw-bold text-primary">1</span>
          <h4 className="mt-3 fw-semibold">Face Enrollment</h4>
          <p>Users upload their face image once during registration.</p>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="p-4 border rounded shadow-sm h-100">
          <span className="display-4 fw-bold text-primary">2</span>
          <h4 className="mt-3 fw-semibold">Live Detection</h4>
          <p>Camera detects and matches face during check-in/out.</p>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="p-4 border rounded shadow-sm h-100">
          <span className="display-4 fw-bold text-primary">3</span>
          <h4 className="mt-3 fw-semibold">Attendance Marked</h4>
          <p>System logs time and status automatically in real time.</p>
        </div>
      </div>
    </div>
  </div>
</section></>
    )
}