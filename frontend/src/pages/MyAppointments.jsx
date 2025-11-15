import React, { useEffect, useState } from 'react'

export default function MyAppointments(){
  const [appts, setAppts] = useState([])
  const [msg, setMsg] = useState('')

  useEffect(()=>{
    const tok = localStorage.getItem('token')
    if (!tok) return
    fetch('/api/appointments', { headers: { Authorization: 'Bearer '+tok } }).then(r=>r.json()).then(setAppts)
  }, [])

  async function cancel(id){
    const tok = localStorage.getItem('token')
    if (!tok) { setMsg('Please login'); return }
    const res = await fetch('/api/appointments/'+id, { method: 'DELETE', headers: { Authorization: 'Bearer '+tok } })
    if (res.ok){ setAppts(a=>a.filter(x=>x.id!==id)); setMsg('Cancelled') }
    else setMsg('Error cancelling')
  }

  return (
    <div className="py-3">
      <h3>My Appointments</h3>
      {msg && <div className="alert alert-info">{msg}</div>}
      <div className="list-group mt-3">
        {appts.length === 0 && <div className="text-muted">No appointments found.</div>}
        {appts.map(a=> (
          <div className="list-group-item d-flex justify-content-between align-items-center" key={a.id}>
            <div>
              <div><strong>{a.doctor?.name || 'Doctor'} </strong><small className="text-muted"> — {a.doctor?.specialty}</small></div>
              <div className="text-muted">{a.date} at {a.time} — <em>{a.status}</em></div>
            </div>
            <div>
              <button className="btn btn-sm btn-outline-danger" onClick={()=>cancel(a.id)}>Cancel</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
