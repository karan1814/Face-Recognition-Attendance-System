import React from "react";

export default function Features(){
    return(
        <>
        <section id="features" className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">Features</h2>
          <div className="row text-center">
            <div className="col-md-3">
              <img src="https://img.icons8.com/ios-filled/100/face-id.png"alt="Face Recognition" />
              <h5 className="mt-3">Face Recognition</h5>
              <p>Efficiently track attendance with our advanced face recognition system.</p>
            </div>
            <div className="col-md-3">
              <img src="https://img.icons8.com/ios-filled/100/calendar.png" alt="Automated Attendance" className="primary" />
              <h5 className="mt-3">Automated Attendance</h5>
              <p>Automatically record attendance without manual input.</p>
            </div>
            <div className="col-md-3">
              <img src="https://img.icons8.com/ios-filled/100/graph.png" alt="Real-time Monitoring" />
              <h5 className="mt-3">Real-time Monitoring</h5>
              <p>Live updates and monitoring during class sessions.</p>
            </div>
            <div className="col-md-3">
              <img src="https://img.icons8.com/ios-filled/100/report-card.png" alt="Detailed Reports" />
              <h5 className="mt-3">Detailed Reports</h5>
              <p>View attendance reports and statistics in one place.</p>
            </div>
          </div>
        </div>
      </section>
      </>
    )
}