// main.js
import "babel-polyfill"
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
// @ts-ignore
import createSagaMiddleware from 'redux-saga'
import Counter from './Counter'
import reducer from './reducers'
import rootSaga from "./sagas"

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga) // start the saga 

const action = (type) => store.dispatch({type})

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')}
      />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
