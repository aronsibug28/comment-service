import { crowdhound } from 'react'

export function saveLikes(element, likes) {
  return crowdhound.update(this, {
    ...element,
    extraProperties: JSON.stringify({ likes })
  })
}
