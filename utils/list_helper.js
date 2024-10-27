const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs) {
        return blogs.reduce((sum, blog) => sum + blog.likes, 0)
    } else {
        return 0
    }
}
  
module.exports = {
    dummy,
    totalLikes
}