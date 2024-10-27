const fs = require('fs')
const mongoose = require('mongoose')
const { Blog } = require('./models/blogmodel')  // TestBlog

const password = process.argv[2]

const url = `mongodb+srv://db-admin:${password}@cluster0.orluu.mongodb.net/BlogDB?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
    
    Blog.find({})                                           // TestBlog
      .then(blogs => {
        const data = blogs.map(blog => {
          blog = blog.toObject()
          delete blog._id
          delete blog.__v
          return blog
        })
        const jsonData = JSON.stringify(data, null, 2)

        fs.writeFile('BlogBD.json', jsonData, (err) => {    // testBlogBD.json
          if (err) throw err
          console.log('Data written to JSON file')
          mongoose.connection.close()
        })
      })
      .catch(err => {
        console.error(err)
        mongoose.connection.close()
      })
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message)
  })