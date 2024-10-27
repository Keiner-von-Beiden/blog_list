
const mongoose = require('mongoose')
const { TestBlog } = require('./models/blogmodel')

if (process.argv.length < 7 && process.argv.length !== 3) {
    console.log("Give the password and optionally blog's data as arguments")
    console.log("Example: node mongo.js <password> \"Author's name\" \"Blog's title\" \"Blog's URL\" likesAmount")
    process.exit(1)
}


const password = process.argv[2]

const url =
  `mongodb+srv://db-admin:${password}@cluster0.orluu.mongodb.net/testBlogDB?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)


/*const blogSchema = new mongoose.Schema({
    author: String,
    title: String,
    url: String,
    likes: Number
})

const TestBlog = mongoose.model('TestBlog', blogSchema)  */

const testBlog = new TestBlog({
    author: process.argv[3],
    title: process.argv[4],
    url: process.argv[5],
    likes: process.argv[6]
})

process.argv.length === 3
    ? TestBlog.find({}).then(result => {
        console.log('Blog list:')
        result.forEach(blog => {
          console.log('-', blog.author, blog.title, blog.url, blog.likes, 'likes')
        })
        mongoose.connection.close()
    })
    : testBlog.save().then(result => {
        console.log(`Added ${process.argv[3]}'s blog \"${process.argv[4]}\" to the list`)
        mongoose.connection.close()  
    })

