import {
  CREATE,
  REPLACE,
  UPDATE,
  REMOVE,
  SET_PROP,
  REMOVE_PROP
} from './consts'
import { createElement, setAttribute, removeAttribute } from './render'

const patchAttrs = (el, patches) => {
  for (const patch of patches) {
    const { type, key } = patch

    if (type === SET_PROP) {
      setAttribute(el, key, patch.value)
    }

    if (type === REMOVE_PROP) {
      removeAttribute(el, key)
    }
  }
}

/**
 * patch
 * @param {*} parent
 * @param {*} patches
 * @param {*} index
 */
export default function patch(parent, patches, index = 0) {
  if (!patches) return

  const el = parent.childNodes[index]

  switch (patches.type) {
    case CREATE: {
      const { newVNode } = patches
      const newEl = createElement(newVNode)
      parent.appendChild(newEl)
      break
    }

    case REPLACE: {
      const { newVNode } = patches
      const newEl = createElement(newVNode)
      parent.replaceChild(newEl, el)
      break
    }

    case REMOVE: {
      parent.removeChild(el)
      break
    }

    case UPDATE: {
      const { attrs, children } = patches
      patchAttrs(el, attrs)
      for (let i = 0, len = children.length; i < len; i++) {
        patch(el, children[i], i)
      }
      break
    }
  }
}
