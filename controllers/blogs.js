const blogsRouter = require('express').Router()
const { Blog } = require('../models/blogmodel')

blogsRouter.get('/', async (request, response) => {
    try { 
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

blogsRouter.get('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id)
        if (blog) {
            response.json(blog)
        } else {
            response.status(404).send({ error: 'document not found' })
        }
    } catch (error) {
        next(error)
    }
})

blogsRouter.get('/info', async (request, response, next) => {
    try { 
        const count = await Blog.countDocuments({})
        response.send(`
            <div>
                <p>The list contains ${count} blogs.</p>
                <p>${new Date()}</p>
            </div>
        `)
    } catch (error) {
        next(error)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)
    try {
        const result = await blog.save()
        response.status(201).json(result)
    } catch (error) {
        next(error)
    }
})
  
blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter