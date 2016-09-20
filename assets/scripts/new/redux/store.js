import { createStore } from 'redux';
import newApp from './reducers';

let store = createStore(newApp);

export default store;