import React, { useState } from 'react'
import { addComment } from './actions'
import CommentList from './CommentList'

import './index.scss'

export const COMPONENT_ID = 'comment'

const Comments = ({
  postId,
  isMainComment,
  userData,
  comments,
  isShowTextArea,
  onGetComments
}) => {
  const [comment, setComment] = useState('')

  const onAddComment = async (e) => {
    if (e.keyCode === 13) {
      setComment('')
      await addComment(postId, e.target.value)
      await onGetComments()
    }
  }

  return (
    <div id='ch-comments'>
      <CommentList
        isMainComment={isMainComment}
        comments={comments}
        userData={userData}
        onGetComments={onGetComments}
      />
      {isShowTextArea && (
        <textarea
          id={postId}
          style={{
            border: '1px solid #dedede'
          }}
          className='textarea is-small'
          onChange={(e) => setComment(e.target.value)}
          onKeyUp={(e) => onAddComment(e)}
          value={comment}
          placeholder='Write a comment...'
          rows='1'
        />
      )}
    </div>
  )
}

Comments.defaultProps = {
  isMainComment: true,
  isShowTextArea: true
}

export default Comments
