import { crowdhound, appId } from 'react'
import { COMPONENT_ID } from './NewsFeed'

export function getActiveNewsFeed() {
  return crowdhound.select(this, {
    rootId: `$${appId}`,
    type: `${appId}-${COMPONENT_ID}`,
    status: 'active'
  })
}

export function addNewsFeed(post) {
  return crowdhound.create(this, {
    rootId: `$${appId}`,
    parentId: `$${appId}`,
    type: `${appId}-${COMPONENT_ID}`,
    delete: false,
    status: 'active',
    description: post
  })
}

export function updateNewsFeed(element, post) {
  return crowdhound.update(this, {
    ...element,
    description: post
  })
}

export function deleteNewsFeed(element) {
  return crowdhound.update(this, {
    ...element,
    status: 'deleted'
  })
}
