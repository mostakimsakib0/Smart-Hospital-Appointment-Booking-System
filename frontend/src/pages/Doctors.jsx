import React, { useEffect, useState } from 'react'

export default function Doctors(){
  const [doctors, setDoctors] = useState([])
  const [doctorId, setDoctorId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [msg, setMsg] = useState('')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    setLoading(true)
    fetch('/api/doctors').then(r=>r.json()).then(data=>{ setDoctors(data); setLoading(false) })
  }, [])

  async function book(e){
    e.preventDefault()
    setMsg('')
    const token = localStorage.getItem('token')
    if (!token){ setMsg('Please login first'); return }
    try{
      const res = await fetch('/api/appointments', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+token },
        body: JSON.stringify({ doctorId, date, time })
      })
      const data = await res.json()
      if (res.ok) setMsg('Booked successfully')
      else setMsg(data.error || 'Error')
    }catch(err){ setMsg('Network error') }
  }

  return (
    <div className="py-3">
      <div className="d-flex mb-3 gap-2 align-items-center">
        <input className="form-control w-50" placeholder="Search doctors by name or specialty" value={query} onChange={e=>setQuery(e.target.value)} />
        <button className="btn btn-outline-secondary" onClick={()=>setQuery('')} title="Clear"><i className="bi bi-x-lg"></i></button>
      </div>
      {loading ? <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div> : null}
      <h3>Available Doctors</h3>
      <div className="row">
        {doctors.filter(d=>{
          if (!query) return true
          const q = query.toLowerCase()
          return d.name.toLowerCase().includes(q) || (d.specialty||'').toLowerCase().includes(q)
        }).map(d=> (
          <div className="col-md-4 mb-3" key={d.id}>
            <div className="card p-3 doctor-card">
              <div className="d-flex align-items-start">
                <div className="flex-grow-1">
                  <h5 className="mb-1">{d.name}</h5>
                  <div className="muted-small">{d.specialty}</div>
                  <p className="mt-2">{d.bio}</p>
                </div>
                <div className="ms-3">
                  <a href={`/doctors/${d.id}`} className="btn btn-sm btn-outline-primary">View</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-3 mt-4">
        <h5>Book an appointment</h5>
        <form className="row g-2 align-items-end" onSubmit={book}>
          <div className="col-md-4">
            <label className="form-label">Doctor</label>
            <select className="form-select" value={doctorId} onChange={e=>setDoctorId(e.target.value)}>
              <option value="">Select doctor</option>
              {doctors.map(d=> <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>)}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Date</label>
            <input className="form-control" type="date" value={date} onChange={e=>setDate(e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Time</label>
            <input className="form-control" type="time" value={time} onChange={e=>setTime(e.target.value)} />
          </div>
          <div className="col-md-2">
            <button className="btn btn-primary w-100">Book</button>
          </div>
        </form>
        {msg && <div className="mt-3 alert alert-info">{msg}</div>}
      </div>
    </div>
  )
}
