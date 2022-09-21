import React, { useEffect, useState } from 'react'
import './Posts.css'
import axios from 'axios'

function Posts() {
  const [posts, setPosts] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if( !token ) setMessage('Please login first, we need ur token to access the posts!');
    else {
      axios.get('/posts', { headers: { bearer: token } })
        .then((res) => setPosts(res.data))
        .catch((err) => setMessage('Please re-login, your token is invalid!'))
    }
  }, [])

  return (
    <div className='posts'>
      <div className="container">
        {
          message.length ? 
          <div class="alert alert-danger mt-3" role="alert">
            {message}
          </div> : 
          <div className="row mt-4 justify-content-center">
            <div className="col-lg-6">
              <h1>Posts</h1>
              
              <div class="card mt-3">
                <ul class="list-group list-group-flush">
                  {
                    posts.map(({ title }) => <li class="list-group-item">{title}</li>)
                  }
                </ul>
              </div>
            </div>
          </div>
        }

        
      </div>
    </div>
  )
}

export default Posts