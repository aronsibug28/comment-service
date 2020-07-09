import { crowdhound } from 'react'

export function saveAppRootElement(id) {
  return crowdhound.update(this, {
    id: `$${id}`,
    type: `${id}`,
    rootId: 0,
    parentId: 0,
    status: 'active',
    deleted: false
  })
}
