import { createStore } from 'redux';
import herosApp from './reducers';

let store = createStore(herosApp);

export default store;