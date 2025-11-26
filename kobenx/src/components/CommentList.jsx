import React from "react";
import Comment from "./Comment.jsx";

export default function CommentList ({comments}) {


return (
 
          <div className="comment-section">
          {comments.length === 0 ? (
            <p className="comment-placeholder-text">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((c) => <Comment key={c.id} comment={c} />)
          )}
    
    </div>

        );
    }