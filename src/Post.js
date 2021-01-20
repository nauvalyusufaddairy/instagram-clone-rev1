import React from 'react'

import './Post.css'
import Avatar from '@material-ui/core/Avatar'
function Post({username, caption, imageUrl})
{
    return(
        <div className="post">
            <div className="post_header">
                 <Avatar
                 className="post_avatar"
                 src="/static/images/avatar/1.jpg"
                 alt="Nauval"/>
            
             {/* Header -> Avatar */}
              <h3>{username}</h3>
            </div>
            

            {/* Image */}
            
            <img className="post_image"
            src={imageUrl}/>
            
         
            

            {/* Username -> caption */}
            <h4 className="post_text"><strong>{username}</strong> {caption}</h4>
        </div>
    )
}
export default Post