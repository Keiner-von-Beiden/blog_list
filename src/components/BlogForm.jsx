import React from 'react'

const BlogForm = (props) => {
    return (
        <div className="frame">
            <form onSubmit={props.add}>
                <table>
                  <tbody>
                    <tr>
                        <td>Author</td>  
                        <td> <input name="author" value={props.new.author || ''} onChange={props.handle} /> </td>
                    </tr>
                    <tr>
                        <td>Title</td>  
                        <td> <input name="title" value={props.new.title || ''} onChange={props.handle} /> </td>
                    </tr>
                    <tr>
                        <td>Link</td>  
                        <td> <input name="url" value={props.new.url || ''} onChange={props.handle} /> </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td> <button type="submit">Submit</button> </td>
                    </tr>
                  </tbody>
                </table>
            </form>
        </div>
    )
}

export default BlogForm