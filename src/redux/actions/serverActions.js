import {CHANGE_SERVER_OPTION} from '../actions/ACTIONTYPE';

export const changeOption = value => ({
  type: CHANGE_SERVER_OPTION,
  payload: value,
});
