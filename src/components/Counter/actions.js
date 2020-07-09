import { crowdhound, appId } from 'react'

export function addCount(elementId, type) {
  return crowdhound.create(this, {
    rootId: `$${appId}`,
    parentId: `$${appId}`,
    type: `${elementId}-${type}`,
    delete: false,
    status: 'active'
  })
}

export function getCount(elementId, type) {
  return crowdhound.select(this, {
    rootId: `$${appId}`,
    type: `${elementId}-${type}`
  })
}
