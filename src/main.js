import * as Counter from './counter'
import { program } from './program'


// render -- handles patching the DOM

const render = (document) => (mountNode) => (elements) => {
  const initialRender = !mountNode.hasChildNodes()
  const nodes = elements(document)

  initialRender
    ? mountNode.appendChild(nodes)
    : mountNode.replaceChild(nodes, mountNode.firstChild)

  return nodes
}


// main -- handles creating and running the program

const main = ({ mountNode, window: { document } }) => {
  const renderToDom = render(document)(mountNode)

  program({
    init: Counter.init,
    model: Counter.model,
    view: Counter.view,
    update: Counter.update,
    render: renderToDom
  })
}


export { main }
