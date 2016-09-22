import { createStore, applyMiddleware } from 'redux';
import newApp from './reducers';
import thunkMiddleware from 'redux-thunk'

let store = createStore(newApp, applyMiddleware(thunkMiddleware));

export default store;