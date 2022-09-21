import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const [isLogin, setIsLogin] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')

        if( token ) setIsLogin(true)
        else setIsLogin(false)
    }, [localStorage.getItem('token')])

    const resetToken = () => {
        localStorage.setItem('token', '')
        navigate('/login')
    }

  return (
    <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
            <span className="navbar-brand mb-0 h1">JsonWebToken</span>

            <ul class="navbar-nav position-relative">
                <li class="nav-item">
                    <Link to="/">
                        <button className='btn btn-secondary position-relative'>Check Posts</button>
                    </Link>
                </li>
                <li class="nav-item">
                    {
                        !isLogin ?
                        <Link to="/login">
                            <button className='btn btn-primary'>Login</button>
                        </Link>
                        : <button className='btn btn-secondary' onClick={resetToken}>Reset Token!</button>
                    }
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar