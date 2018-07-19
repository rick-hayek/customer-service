import { createStore } from 'redux';
import rootReducer from './scripts/reducers';

const redux_global_store = createStore(rootReducer);
export default redux_global_store;