import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function DoctorProfile(){
  const { id } = useParams()
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(()=>{
    setLoading(true)
    fetch('/api/doctors').then(r=>r.json()).then(list=>{
      const d = list.find(x=>String(x.id)===String(id))
      setDoctor(d)
      setLoading(false)
    })
  }, [id])

  async function book(e){
    e.preventDefault()
    setMsg('')
    const token = localStorage.getItem('token')
    if (!token){ setMsg('Please login to book'); return }
    if (!date || !time){ setMsg('Please choose date and time'); return }
    try{
      const res = await fetch('/api/appointments', { method: 'POST', headers: { 'Content-Type':'application/json', Authorization: 'Bearer '+token }, body: JSON.stringify({ doctorId: doctor.id, date, time }) })
      const data = await res.json()
      if (res.ok) setMsg('Appointment booked')
      else setMsg(data.error || 'Error')
    }catch(err){ setMsg('Network error') }
  }

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
  if (!doctor) return <div className="alert alert-warning">Doctor not found</div>

  return (
    <div className="py-3">
      <div className="row">
        <div className="col-md-8">
          <div className="card p-3">
            <h3>{doctor.name}</h3>
            <div className="muted-small">{doctor.specialty}</div>
            <p className="mt-3">{doctor.bio}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Book appointment</h5>
            <form onSubmit={book}>
              <div className="mb-2">
                <label className="form-label">Date</label>
                <input className="form-control" type="date" value={date} onChange={e=>setDate(e.target.value)} />
              </div>
              <div className="mb-2">
                <label className="form-label">Time</label>
                <input className="form-control" type="time" value={time} onChange={e=>setTime(e.target.value)} />
              </div>
              <button className="btn btn-primary w-100">Book</button>
            </form>
            {msg && <div className="mt-3 alert alert-info">{msg}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
