import React, { useState, useEffect } from 'react'
import { getCount, addCount } from './actions'

export default ({ elementId, name, type }) => {
  const [count, setCount] = useState(0)

  const onGetCount = async () => {
    const reply = await getCount(elementId, type)
    setCount(reply.elements.length)
  }

  const onAddCount = async () => {
    setCount(count + 1)
    await addCount(elementId, type)
  }

  useEffect(() => {
    onGetCount()
  }, [])

  return (
    <span id='counter' style={{ width: '150px', fontSize: '12px' }}>
      {count}{' '}
      <span className='cursor-pointer' onClick={() => onAddCount()}>
        {name}
      </span>
    </span>
  )
}
