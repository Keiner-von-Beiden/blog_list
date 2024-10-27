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

    useEffect(() => {
        console.log('effect')
        blogService.getAll()
            .then(response => {
                console.log('request for getting all blogs')
                setBlogList(response.data)
            })
    }, [])
    console.log('There are', blogList.length, 'blogs rendered')

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
                setBlogList(blogList.concat(response.data))
                setNewBlog(initialBlogState)
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

    const deleteThisBlog = async (blog) => {
        console.log(`"${blog.title}" with id ${blog.id} is going to be deleted`)
      
        if (window.confirm(`Do you really want to delete "${blog.title}"?`)) {
          try {
            await blogService.remove(blog.id)
            setBlogList(blogList.filter(item => item.id !== blog.id))
          } catch (error) {
            console.error('Error deleting blog:', error)
          }
        } else {
          console.log('Action cancelled')
        }
    }

    const voteForBlog = async (blog) => {
        console.log(`"${blog.title}" has + 1 like`)
        console.log('blog id:', blog.id)
        const changedBlog = { ...blog, likes: blog.likes + 1 }
      
        try {
            const response = await blogService.update(blog.id, changedBlog)
            setBlogList(blogList.map(item => item.id !== blog.id ? item : response.data))
        } catch (error) {
            console.error('Error updating blog:', error)
            setBlogList(blogList.filter(n => n.id !== blog.id))
        }
    }

    const voteAgainstBlog = async (blog) => {
        console.log(`\"${blog.title}\" has - 1 like`)
        console.log('blog id:', blog.id)
        const changedBlog = { ...blog, likes: blog.likes - 1}

        try {
            const response = await blogService.update(blog.id, changedBlog)
            setBlogList(blogList.map(item => item.id !== blog.id ? item : response.data))
        } catch (error) {
            console.error('Error updating blog:', error)
            setBlogList(blogList.filter(n => n.id !== blog.id))
        }
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
                vote={voteForBlog}
                retract={voteAgainstBlog}
            />
        </div>
    ) 
}

export default App