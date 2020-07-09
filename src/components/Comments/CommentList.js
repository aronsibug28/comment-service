import React from 'react'
import Comment from './Comment'

const CommentList = ({ comments = [], allowNested, onGetComments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          allowNested={allowNested}
          onGetComments={onGetComments}
        />
      ))}
    </div>
  )
}

export default CommentList
