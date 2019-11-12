import Node from './vnode'

const flattern = arr => [].concat.apply([], arr)
export default function h(type, props, ...children) {
  const node = new Node()
  node.type = type
  node.props = props || {}
  node.children = flattern(children)
  return node
}
