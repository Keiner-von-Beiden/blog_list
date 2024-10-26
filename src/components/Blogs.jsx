import React from 'react'
import OneBlog from './OneBlog'

const Blogs = (props) => {
  return (
    <div>
        {props.list.map(item =>
            <OneBlog 
                key={item.url}
                blog={item}
                remove={() => props.remove(item)}
                vote={() => props.vote(item)}
            />
        )}
    </div>
  )
}

export default Blogs