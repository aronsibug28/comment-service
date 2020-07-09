import { crowdhound, appId } from 'react'
import { COMPONENT_ID } from './Comments'

export function getActiveComments(postId) {
  return crowdhound.select(this, {
    rootId: `$${appId}`,
    type: `${postId}-${COMPONENT_ID}`,
    status: 'active'
  })
}

export function addComment(postId, comment) {
  return crowdhound.create(this, {
    rootId: `$${appId}`,
    parentId: `$${appId}`,
    type: `${postId}-${COMPONENT_ID}`,
    delete: false,
    status: 'active',
    description: comment
  })
}

export function updateComment(element, comment) {
  return crowdhound.update(this, {
    ...element,
    description: comment
  })
}

export function deleteComment(element) {
  return crowdhound.update(this, {
    ...element,
    status: 'deleted'
  })
}
