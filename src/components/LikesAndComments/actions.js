import { crowdhound } from 'react'

export function saveLikes(element, likes) {
  const { extraProperties = '' } = element
  const parsedExtraProperties = JSON.parse(extraProperties)
  return crowdhound.update(this, {
    ...element,
    extraProperties: JSON.stringify({
      ...parsedExtraProperties,
      likes
    })
  })
}

export function saveTotalComments(element, totalComments) {
  const { extraProperties = '' } = element
  const parsedExtraProperties = JSON.parse(extraProperties)
  return crowdhound.update(this, {
    ...element,
    extraProperties: JSON.stringify({
      ...parsedExtraProperties,
      totalComments
    })
  })
}
