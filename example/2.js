import { h, diff, render, patch } from '../src';

var root = h('ul', {},
  h('li', { key: 'uid1' }, 'Jerry'),
  h('li', { key: 'uid2' }, 'Tomy'),
  h('li', { key: 'uid3' }, 'Lucy'),
)


const btn = document.getElementById('btn');
const app = document.getElementById('app');

render(root, app);

btn.onclick = () => {

  var newRoot = h('ul', { key: 'newkey' },
    h('li', { key: 'uid1' }, 'Jerry'),
    h('li', { key: 'uid2' }, 'Tomy'),
    h('li', { key: 'uid4' }, 'Lily'),
    h('li', null, 'Lucy'),
  )

  var patches = diff(root, newRoot);

  patch(app, patches);

  root = newRoot
};

