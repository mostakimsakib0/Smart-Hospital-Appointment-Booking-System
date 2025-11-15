import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    setMsg('')
    try{
      const res = await fetch('/api/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (res.ok){
        localStorage.setItem('token', data.token)
        setMsg('Logged in')
        navigate('/doctors')
      }else setMsg(data.error || 'Login error')
    }catch(err){
      setMsg('Network error')
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card p-4">
          <h3 className="mb-3">Sign in</h3>
          <form onSubmit={submit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input className="form-control" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input className="form-control" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
            </div>
            <button className="btn btn-primary">Login</button>
          </form>
          {msg && <div className="mt-3 alert alert-warning">{msg}</div>}
        </div>
      </div>
    </div>
  )
}
