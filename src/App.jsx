import React from 'react'
import { useState, useEffect } from 'react'

import blogService from './services/blog-operation'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'


const App = () => {
    const initialBlogState = {
        author: '',
        title: '',
        url: '',
        likes: 1
    }
    const createBlogObject = (data) => ({
        ...initialBlogState,
        ...data
    })
    const [blogList, setBlogList] = useState([]) 
    const [newBlog, setNewBlog] = useState(initialBlogState)
    // const [notificationMessage, setNotificationMessage] = useState(null)

    useEffect(() => {
        console.log('effect')
        blogService.getAll()
            .then(response => {
                console.log('request for getting all blogs')
                console.log('Reponse is', response.data)
                setBlogList(response.data)
            })
    }, [])
    console.log('There are', blogList.length, 'blogs rendered')
    console.log('which are', blogList)

    const addNew = (event) => {
        event.preventDefault()
    
        const blogObject = createBlogObject(newBlog)
        console.log('blogObject:', blogObject)
        console.log('newBlog:', newBlog)

        /*
        const addNew = (event) => {
            setNewBlog({
                ...newBlog,
                [event.target.name]: event.target.value
            })
        }
        */
    
        blogList.some((item) => item.url === blogObject.url)
          ? alert(`${blogObject.url} is already there`)
          : blogService
              .create(blogObject)
              .then(response => {
                /* setNotificationMessage(`${response.data.title} has been added to the list`)
                setTimeout(() => {
                  setNotificationMessage(null)
                }, 5000) */
                console.log('blogService respond:', response.data)
                setBlogList(blogList.concat(response.data))
                setNewBlog(initialBlogState)
                console.log('newBlog after submitting', newBlog)
                console.log('blogObject after submitting', blogObject)
              })          
    }

    const handleNewBlog = (event) => {
        console.log('handleNewBlog value:', event.target.value)
        const { name, value } = event.target
        setNewBlog(prevState => ({
            ...prevState,
            [name]: value
          }))
        
    }

    const deleteThisBlog = (blog) => {
        console.log('event content', blog)
        console.log(`\"${blog.title}\" with id ${blog.id} is going to be deleted`)
        
        return (
          window.confirm(`Do you really want to delete \"${blog.title}\"?`)
            ? blogService
              .remove(blog.id)
              .then(response => {
                setBlogList(blogList.filter(item => item.id !== blog.id))
                /* setNotificationMessage(`The entry has been successfully deleted`) // was ${response.data.title} which didn't work 
                setTimeout(() => {
                  setNotificationMessage(null)
                }, 5000) */
              })
            : (() => {
                /* setNotificationMessage(`${blog.name} has been left in the list`)
                setTimeout(() => {
                  setNotificationMessage(null)
                }, 5000) */
              })()
        ) 
    }

    return (
        <div>
            <h1>Blog collection</h1>
            <h4>Add a new blog</h4>
            <BlogForm
                add={addNew}
                handle={handleNewBlog}
                new={newBlog}
            />

            <h3>Current Blog List</h3>
            <Blogs 
                list={blogList} 
                remove={deleteThisBlog} 
                //vote={voteForBlog} 
            />
        </div>
    ) 
}

export default App