import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
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
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addBlog = (async (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      url: newUrl,
    }

    try {
      await blogService.create(newBlog)
      setErrorMessage(`New blog ${newBlog.title} added!`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    catch (exception) {
      setErrorMessage(`Error: ${exception}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  })

  const handleLogout = (() => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  })

  const handleTitleChange = (event => {
    setNewTitle(event.target.value)
  })


  const handleUrlChange = (event => {
    setNewUrl(event.target.value)
  })


  if (user === null) {
    return (
      <div>
        <h2>log in first you bastard</h2>

        <div class="message">
          {errorMessage}
        </div>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <div class="message">
        {errorMessage}
      </div>

      <p>{user.username} logged in
      <button onClick={handleLogout}>Logout</button></p>
      <BlogForm
        addBlog={addBlog}
        newTitle={newTitle}
        newUrl={newUrl}
        handleTitleChange={handleTitleChange}
        handleUrlChange={handleUrlChange}
      />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App