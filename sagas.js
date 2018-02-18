// https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html?q=

import { delay } from 'redux-saga'
import { put, takeEvery, all } from "redux-saga/effects"
// put is one example of what we call an Effect. Effects are simple JavaScript objects which contain instructions to be fulfilled by the middleware. When a middleware retrieves an Effect yielded by a Saga, the Saga is paused until the Effect is fulfilled.

function* helloSaga() {
  return console.log("Hello Saga Yo!")
}

// worker Saga to perform the asynch task
function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

// Now we have 2 Sagas, and we need to start them both at once. To do that, we'll add a rootSaga that is responsible for starting our other Sagas.

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
}


