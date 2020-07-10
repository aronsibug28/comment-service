import { crowdhound, appId } from 'react'
import { COMPONENT_ID } from '../NewsFeed/NewsFeed'

export function addCount(elementId, type) {
  return crowdhound.create(this, {
    rootId: `$${appId}`,
    parentId: `$${appId}`,
    type: `${elementId}-${COMPONENT_ID}`,
    delete: false,
    status: 'active'
  })
}

export function getLikes(elementId, type) {
  return crowdhound.select(this, {
    rootId: `$${appId}`,
    type: `${elementId}-${type}`
  })
}

export function saveLikes(element, likes) {
  return crowdhound.update(this, {
    ...element,
    extraProperties: JSON.stringify({ likes })
  })
}
