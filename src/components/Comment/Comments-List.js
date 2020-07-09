import React from 'react'
import CommentsSingle from './Comments-Single'

const CommentsList = ({ elements = [] }) => {
  return (
    <div>
      {elements.map((element, key) => (
        <CommentsSingle element={element} key={key} />
      ))}
    </div>
  )
}

export default CommentsList
