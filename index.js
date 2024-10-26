const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')

//const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
//const logger = require('./utils/logger')
const mongoose = require('mongoose')

const Blog = require('./models/blogmodel')

mongoose.set('strictQuery', false)

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


app.use(cors())
// app.use(express.static('dist'))
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.get('/api/blogs/:id', (request, response, next) => {
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

app.get('/info', (request, response, next) => {
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

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.delete('/api/blogs/:id', (request, response, next) => {
  console.log('id to be deleted:', request.params.id)
  Blog
    .findByIdAndDelete(request.params.id)
    .then(result => {
      // console.log(result)
      response.status(204).end()
    })
    .catch(error => next(error))
})

// const PORT = 3003
app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})