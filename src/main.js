import { init, model, update, view } from './counter'


// Render -- handles HMR replacement

const render = (document) => (node) => (elements) => {
  const initialRender = !node.hasChildNodes()
  const element = elements(document)

  if (initialRender) {
    node.appendChild(element)
  } else {
    node.replaceChild(element, node.firstChild)
  }

  return node
}


// Configure -- handles binding dispatch to state

const configure = (state) => (fn) => {
  const dispatch = (msg) => {
    if (typeof msg === 'function') {
      return msg(dispatch)
    }

    return fn(msg)(state)
  }

  return { dispatch, state }
}


// IO --

const io = (config) => (msg) => (model) => {
  const { render, update } = config
  const patch = update(msg)(model)
  const { dispatch, state } = configure(patch.model)(io(config))
  const element = view(dispatch)(state)
  render(element)
}


// Main

export const main = ({ window, node }) => {
  const document = window.document
  const xrender = render(document)(node)
  const initial = init(model)

  const IO = io({ update, render: xrender })
  const { state, dispatch } = configure(initial.model)(IO)
  const element = view(dispatch)(state)

  if (initial.command) {
    dispatch(initial.command)
  }

  xrender(element)
}
