import { combineReducers } from 'redux';
import sdkProps from './sdkProps.js';
import server from './server.js';

export default combineReducers({sdkProps, server});
