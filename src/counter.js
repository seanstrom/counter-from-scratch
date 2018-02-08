import { h, text } from './utils'


// Message

const Msg = {
  Increment: { type: Symbol('Msg.Increment') },
  Decrement: { type: Symbol('Msg.Decrement') }
}


// Model

const model = 0


// Init

const init = (model) => {
  return {
    model,
    command: null
  }
}


// Update

const update = (msg) => (model) => {
  if (msg === Msg.Increment) {
    return { model: model + 1, command: null }
  }

  if (msg === Msg.Decrement) {
    return { model: model - 1, command: null }
  }

  return { model, command: null }
}


// View

const view = (dispatch) => (model) => {
  const increment = () => {
    dispatch(Msg.Increment)
  }

  const decrement = () => {
    dispatch(Msg.Decrement)
  }

  return (
    h('main'
    , { class: 'main' }
    , [ h('h1'
        , { id: 'title' }
        , [ text('Counter Example') ]
        )

      , h('button'
        , { onclick: increment }
        , [ text('+') ]
        )

      , h('h2'
        , [ text(model) ]
        )

      , h('button'
        , { onclick: decrement }
        , [ text('-') ]
        )
      ]
    )
  )
}


export { init, model, update, view }
