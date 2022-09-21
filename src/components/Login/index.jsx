import React, { useState } from 'react'
import './Login.css'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [msg_login, setMsg_Login] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        axios.post('/login', {email, password})
            .then((res) => {
                const token = res.data.token;
                localStorage.setItem('token', token)

                setMsg_Login(true)
                setEmail('')
                setPassword('')
            })
            .catch((err) => setMessage(err.response.data))
    }

  return (
    <div className='login'>
        <div className="container">
            <div className="row justify-content-center mt-4">
                <div className="col-lg-6 pt-5 pb-3">

                    {
                        message.length ?
                        <div class="alert alert-danger" role="alert">
                            Error: {message}
                        </div> : ''
                    }

                    {
                        msg_login ?
                        <div className="alert alert-success">
                            Message: Your Login Is Success!
                        </div> : ''
                    }
                    
                    <h1 className='mb-4'>Login</h1>

                    <form onSubmit={handleSubmit}>
                        <div class="mb-3 row form-group">
                            <label for="email" class="col-sm-2 col-form-label form__label">Email</label>
                            <div class="col-sm-10">
                                <input type="email" class="form-control form__field" value={email} onChange={(e) => setEmail(e.target.value)} id="email" required />
                            </div>
                        </div>
                        <div class="mb-3 row">
                            <label for="password" class="col-sm-2 col-form-label form__label">Password</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control form__field" value={password} onChange={(e) => setPassword(e.target.value)} id="password" required />
                                </div>
                            </div>

                        <button type='submit' className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login