import React, { useEffect, useState, crowdhound } from 'react'
import CommentsList from './Comments-List'
import './Comments.scss'

const Comments = () => {
  const [element, setElement] = useState({})
  useEffect(() => {
    async function selectFunction() {
      const reply = await crowdhound.select(this, {
        elementId: '1000',
        withChildren: true
      })
      console.log('reply', reply)
      setElement(reply.elements[0])
    }
    selectFunction()
  }, [])
  return (
    <div className='ch-comments'>
      <CommentsList elements={element.children} />
    </div>
  )
}

export default Comments
