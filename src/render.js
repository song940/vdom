export function setAttribute(target, key, value) {

  if (key === 'style') {
    return Object.keys(value).map(style => {
      target[key][style] = value[style]
    })
  }

  if (key === 'className') {
    key = 'class'
  }

  target.setAttribute(key, value)
}

export function removeAttribute(target, key) {
  if (key === 'className') {
    key = 'class'
  }

  target.removeAttribute(key)
}

function setAttributes(target, attrs) {
  Object.keys(attrs).forEach(key => {
    setAttribute(target, key, attrs[key])
  })
}

export function createElement(vnode) {
  if (typeof vnode !== 'object') // 文本节点
    return document.createTextNode(vnode);

  const { type, props, children } = vnode;
  const el = document.createElement(type)
  setAttributes(el, props);
  children
    .map(createElement)
    .forEach(el.appendChild.bind(el))
  return el;
}

export default function render(vnode, parent) {
  return parent.appendChild(createElement(vnode))
}
