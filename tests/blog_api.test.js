jest.setTimeout(60000)

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const { Blog } = require('../models/blogmodel')

const initialBlogs = [
    {
      "author": "John F. Kennedy",
      "title": "How to save the world",
      "url": "www.1960s.gov.us",
      "likes": 5
    },
    {
      "author": "Donald Trump",
      "title": "Make America great again",
      "url": "www.2010s.gov.us",
      "likes": 1
    },
    {
      "author": "Pablo Picasso",
      "title": "Draw like a pro",
      "url": "www.theworldofarts.com",
      "likes": 10
    },
    {
      "author": "Johann Sebastian Bach",
      "title": "Music telling",
      "url": "www.musiccollection.de",
      "likes": 13
    },
    {
      "author": "Charles Aznavour",
      "title": "C'est la vie",
      "url": "www.chansons.fr",
      "likes": 4
    },
    {
      "author": "Leonardo da Vinci",
      "title": "Renaissance en Italie",
      "url": "www.beauxarts.it",
      "likes": 5
    },
    {
      "author": "",
      "title": "All around me",
      "url": "www.blogs.io",
      "likes": 5
    },
    {
      "author": "Coco Channel",
      "title": "La robe noire",
      "url": "www.fashion.com/blogs",
      "likes": 7
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject
    for (let i = 0; i < initialBlogs.length; i++) {
        blogObject = new Blog(initialBlogs[i])
        await blogObject.save()
    }
})

test('The blog list is returned successfully', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})

test('All blog posts are returned', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(async () => {
    await mongoose.connection.close()
})