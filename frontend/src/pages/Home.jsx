import React from 'react'

export default function Home(){
  return (
    <div className="py-4">
      <div className="hero p-4 d-flex align-items-center gap-4">
        <div>
          <h1 className="mb-1">Medilink</h1>
          <p className="text-muted">Smart, fast appointment booking for hospitals and clinics.</p>
          <div className="mt-3">
            <a href="/doctors" className="btn btn-primary">Find Doctors</a>
            <a href="/register" className="btn btn-outline-primary ms-2">Get Started</a>
          </div>
        </div>
        <div className="ms-auto d-none d-md-block" style={{width:300}}>
          <img src="https://images.unsplash.com/photo-1580281657521-3f7a1d3b3a4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60" alt="clinic" className="img-fluid rounded" />
        </div>
      </div>

      <section className="mt-4">
        <h4>How it works</h4>
        <div className="row mt-3">
          <div className="col-md-4">
            <div className="card p-3">
              <h5>Browse Doctors</h5>
              <p className="text-muted">Search by specialty and view profiles.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3">
              <h5>Book Slot</h5>
              <p className="text-muted">Choose date and time that fits you.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card p-3">
              <h5>Manage Appointments</h5>
              <p className="text-muted">View, update or cancel anytime.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
