const mongoose = require('mongoose')
//const logger = require('./utils/logger')


const blogSchema = new mongoose.Schema({
    author: String,
    title: String,
    url: String,
    likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// module.exports = mongoose.model('Blog', blogSchema)

const Blog = mongoose.model('Blog', blogSchema)
const TestBlog = mongoose.model('TestBlog', blogSchema)

module.exports = { Blog, TestBlog }