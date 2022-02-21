import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      setUser(null)
      setUsername('')
      setPassword('')
      window.localStorage.clear()
    } catch (exception) {
      setErrorMessage('Not able to logout')
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
  }


  const addBlog = (event) => {
      event.preventDefault()

      const blogObject = {
        title : newTitle,
        author : newAuthor,
        url : newUrl
      }

      blogService.create(blogObject)
        .then(returnedBlog => setBlogs(blogs.concat(returnedBlog)))
        .then(returnedBlog =>
        {
        setErrorMessage(`A new blog ${blogObject.title} by ${blogObject.author}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        })
        .catch(error => {
          setErrorMessage(`${error.response.data.error}`)
          setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )


  const blogForm =() => (
    <form onSubmit={addBlog}>
      <div>
        title:
          <input
          type="text"
          value={newTitle}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
          />
      </div>
      <div>
        author: 
          <input
          type="text"
          value={newAuthor}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url: 
          <input
          type="text"
          value={newUrl}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>   

  )


  return (
  <>          
    <Notification message = {errorMessage}/>

    <div>   
      {user === null ?
        <div>
          <h2>Log in to application</h2>
          {loginForm()}
        </div>
          :
        <div>
          <h2>Blogs</h2>
          <div> {user.name} logged in       
            <button onClick={handleLogout}> logout </button>
          </div> 
          <h2> create new </h2>
            {blogForm()}
            <div>
              <h2>blogs list</h2>
              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
              )}
            </div>

        </div>
      }
    </div>
  </>
  )
}

export default App