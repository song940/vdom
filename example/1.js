import { h, diff, patch, createElement } from '../src';

const demo = count => {
  return h('div', {
    key: count,
    className: 'test',
    style: {
      textAlign: 'center',
      border: '1px solid red',
      width: (100 + count) + 'px',
      height: (100 + count) + 'px',
      lineHeight: (100 + count) + 'px',
    }
  }, String(count));
};

var count = 0;
var tree = demo(count);
var rootNode = document.getElementById('app');
rootNode.appendChild(createElement(tree));

const aa = () => {
  count++;
  var newTree = demo(count);
  var patches = diff(tree, newTree);
  patch(rootNode, patches);
  tree = newTree;
};

setInterval(aa, 1000);

document.querySelector('#btn').onclick = aa;