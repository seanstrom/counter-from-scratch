// init -- handles app init

const init = (app) => {
  const { model, command } = app.init(app.model)
  effects(app)(command)(model)
}


// update -- handles app updates

const update = (app) => (dispatch) => (msg) => (model) => {
  const { command, model: newModel } = app.update(msg)(model)
  effects(app)(command)(newModel)
}


// effects -- handles app (re-)rendering and command dispatch

const effects = (app) => (dispatchable) => (model) => {
  const dispatch = configure(model)(update(app))
  const elements = app.view(dispatch)(model)

  if (dispatchable) {
    dispatch(dispatchable)
  }

  app.render(elements)
}


// configure -- handles binding dispatch to the model

const configure = (model) => (update) => {
  const dispatch = (msg) => {
    if (typeof msg === 'function') {
      return msg(dispatch)
    }

    return update(dispatch)(msg)(model)
  }

  return dispatch
}


export { init as program }
