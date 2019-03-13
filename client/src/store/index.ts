import { createStore, applyMiddleware, Middleware } from 'redux';
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import rootSaga from './sagas';

const initialState = {};

const sagaMiddleware: SagaMiddleware<Middleware> = createSagaMiddleware();
const middleware: Middleware[] = [ thunk, sagaMiddleware ];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware)
  )
);

sagaMiddleware.run(rootSaga);

export default store;