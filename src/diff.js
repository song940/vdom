import {
  CREATE,
  REPLACE,
  UPDATE,
  REMOVE,
  SET_PROP,
  REMOVE_PROP
} from './consts'

const isNull = obj => obj === undefined || obj === null

const diffVNodeChildren = (oldVNode, newVNode) => {
  const patches = []
  const len = Math.max(oldVNode.children.length, newVNode.children.length)
  for (let i = 0; i < len; i++) {
    patches[i] = diff(oldVNode.children[i], newVNode.children[i])
  }

  return patches
}

/**
 * diffVNodeAttrs
 * @param {*} oldVNode
 * @param {*} newVNode
 */
const diffVNodeAttrs = (oldVNode, newVNode) => {
  const patches = []
  const oldVNodeAttrs = oldVNode.attrs
  const newVNodeAttrs = newVNode.attrs
  const attrs = Object.assign({}, oldVNodeAttrs, newVNodeAttrs)

  Object.keys(attrs).map(key => {
    const oldValue = oldVNodeAttrs[key]
    const newVlaue = newVNodeAttrs[key]

    if (oldValue !== newVlaue) {
      patches.push({ type: SET_PROP, key, value: newVlaue })
    }

    if (!newVlaue) {
      patches.push({ type: REMOVE_PROP, key })
    }
  })

  return patches
}

/**
 * isDiffrentVNode
 * @param {*} oldVNode
 * @param {*} newVNode
 */
const isDiffrentVNode = (oldVNode, newVNode) => {
  return (
    (typeof oldVNode !== 'object' && oldVNode !== newVNode) ||
    (typeof newVNode !== 'object' && oldVNode !== newVNode) ||
    oldVNode.type !== newVNode.type
  )
}

/**
 * diff
 * @param {*} oldVNode
 * @param {*} newVNode
 */
export default function diff(oldVNode, newVNode) {
  if (isNull(oldVNode)) {
    return { type: CREATE, newVNode }
  }

  if (isNull(newVNode)) {
    return { type: REMOVE }
  }

  if (isDiffrentVNode(oldVNode, newVNode)) {
    return { type: REPLACE, newVNode }
  }

  if (newVNode.type) {
    return {
      type: UPDATE,
      attrs: diffVNodeAttrs(oldVNode, newVNode),
      children: diffVNodeChildren(oldVNode, newVNode),
    }
  }
}
