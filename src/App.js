import './App.css';
// IMPORT COMPONENTS
import AllBlogs from './pages/AllBlogs';
import SingleBlog from './pages/SingleBlog';
import Form from './pages/Form';

// IMPORT HOOKS
import { useState, useEffect } from 'react';

// IMPORT from React Router
import { Route, Routes } from 'react-router-dom';

//The API URL
const apiURL = "https://hiro-blog-backend-466e72ea7e26.herokuapp.com"

function App() {
  const [posts, setPosts] = useState([])

  //grabing the data from the backend 
  const getBlogs = async () => {
    const response = await fetch(apiURL + "/blog/")
    const data = await response.json()
    console.log(data)
    setPosts(data)
  }

  const handleFormSubmisson = async (data, type) => {
    if (type === 'new') {
      const response = await fetch(`${apiURL}/blog/`, {
        method: 'post', 
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(data)
      })
      getBlogs()
    } else {
      const response = await fetch(`${apiURL}/blog/${data.id}/`, {
        method: 'put',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      getBlogs()
    }
  }

  const deleteBlog = async (id) => {
    const response = await fetch(`${apiURL}/blog/${id}/`, 
    {
      method: 'delete'
    })
    getBlogs()
  }

  useEffect(() => {
    getBlogs()
  }, [])

  return (
    <div className="App">
      <h1>Hiro's Private thoughts</h1>
      <Routes>
        <Route 
        exact
        path='/'
        element={<AllBlogs posts={posts} deleteBlog={deleteBlog} />}
        />
        <Route 
        exact
        path='/blog/:id'
        element={<SingleBlog posts={posts} />}
        />
         <Route 
        exact
        path='/new'
        element={<Form posts={posts} handleSubmit={handleFormSubmisson}
        buttonlabel="Add Blog" formType='new' />}
        />
        <Route
        exact 
        path="/edit/:id"
        element={<Form posts={posts} handleSubmit={handleFormSubmisson}
        buttonLabel='Edit Blog' formType='edit' />}
        />
      </Routes>
    </div>
  );
}

export default App;
