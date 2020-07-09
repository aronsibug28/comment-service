import React, { useEffect, useState } from 'react'
import { getActiveComments, addComment } from './actions'
import CommentList from './CommentList'

import './index.scss'

export const COMPONENT_ID = 'comment'

const Comments = ({ postId, isMainComment, allowNested, isShowTextArea }) => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])

  const getCommentsHandler = async () => {
    const response = await getActiveComments(postId)

    response.elements.sort(function (a, b) {
      return a.id - b.id
    })
    setComments(response.elements)
  }

  const onAddComment = async (e) => {
    if (e.keyCode === 13) {
      setComment('')
      await addComment(postId, e.target.value)
      await getCommentsHandler()
    }
  }

  useEffect(() => {
    getCommentsHandler()
  }, [])

  return (
    <div id='ch-comments' style={!isMainComment ? { marginLeft: '40px' } : {}}>
      <CommentList
        isMainComment={isMainComment}
        allowNested={allowNested}
        comments={comments}
        onGetComments={getCommentsHandler}
      />
      {isShowTextArea && (
        <textarea
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
  isShowTextArea: true,
  allowNested: true
}

export default Comments
