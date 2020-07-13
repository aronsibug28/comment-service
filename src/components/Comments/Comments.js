import React, { useState } from 'react'
import { addComment } from './actions'
import CommentList from './CommentList'

import './index.scss'

export const COMPONENT_ID = 'comment'

const Comments = ({
  postId,
  userData,
  comments,
  isReply,
  isShowTextArea,
  onGetComments,
  onBlurComment,
  styles
}) => {
  const { newsFeedCommentTextArea } = styles || {}
  const [comment, setComment] = useState('')

  const onAddComment = async (e) => {
    if (e.keyCode === 13) {
      setComment('')
      await addComment(postId, e.target.value)
      await onGetComments()
    }
  }

  const onBlurComments = () => {
    if (isReply) {
      setTimeout(() => {
        onBlurComment()
      }, 500)
    }
  }

  return (
    <div id='ch-comments'>
      <CommentList
        comments={comments}
        userData={userData}
        onGetComments={onGetComments}
        styles={styles}
      />
      {isShowTextArea && (
        <textarea
          id={postId}
          style={{
            border: '1px solid #dedede',
            ...newsFeedCommentTextArea
          }}
          className='textarea is-small'
          onChange={(e) => setComment(e.target.value)}
          onKeyUp={(e) => onAddComment(e)}
          onBlur={() => onBlurComments()}
          value={comment}
          placeholder='Write a comment...'
          rows='1'
        />
      )}
    </div>
  )
}

Comments.defaultProps = {
  isShowTextArea: true
}

export default Comments
