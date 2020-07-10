import React from 'react'
import Comment from './Comment'

const CommentList = ({ comments = [], userData, onGetComments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          userData={userData}
          onGetComments={onGetComments}
        />
      ))}
    </div>
  )
}

export default CommentList
