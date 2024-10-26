const OneBlog = (props) => {
    const absoluteLink = props.blog.url.startsWith('http://') || props.blog.url.startsWith('https://')
    ? props.blog.url
    : `http://${props.blog.url}`

    return (
        <p>
            {props.blog.author && <>{props.blog.author}. </>} 
            <b>{props.blog.title}</b>
            <br />
            <a href={absoluteLink} target="_blank">{props.blog.url}</a>    {/* href value without quotation marks! */}
            <br />
            Rating: {props.blog.likes}
            &nbsp; &nbsp; &nbsp; <button onClick={props.remove}>Delete</button>
        </p>
    )
}

export default OneBlog