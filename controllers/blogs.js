const blogsRouter = require('express').Router()
const Blog = require('../models/blogmodel')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
})
  
blogsRouter.get('/:id', (request, response, next) => {
    Blog
      .findById(request.params.id)
      .then(blog => {
          if (blog) {
            response.json(blog)
          } else {
            response.status(404).send({ error: 'document not found'})
          }
      })
      .catch(error => next(error))
})
  
blogsRouter.get('/info', (request, response, next) => {
    Blog
      .countDocuments({})
      .then(count => {
        response.send(`
          <div>
            <p>The list contains ${count} blogs.</p>
            <p>${new Date()}</p>
          </div>
        `)
      })
      .catch(error => next(error))
})
  
blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
})
  
blogsRouter.delete('/:id', (request, response, next) => {
    // console.log('id to be deleted:', request.params.id)
    Blog
      .findByIdAndDelete(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
})

module.exports = blogsRouter