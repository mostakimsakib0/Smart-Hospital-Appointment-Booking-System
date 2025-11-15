import React, { useState } from 'react'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  async function submit(e){
    e.preventDefault()
    setMsg('')
    try{
      const res = await fetch('/api/auth/register', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      const data = await res.json()
      if (res.ok) setMsg('Registered — you can log in')
      else setMsg(data.error || 'Error')
    }catch(err){
      setMsg('Network error')
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card p-4">
          <h3 className="mb-3">Create account</h3>
          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label">Full name</label>
              <input className="form-control" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input className="form-control" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input className="form-control" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            <button className="btn btn-primary">Register</button>
          </form>
          {msg && <div className="mt-3 alert alert-info">{msg}</div>}
        </div>
      </div>
    </div>
  )
}
