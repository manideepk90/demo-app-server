import { CHANGE_SDK_PROPS_OPTION } from "./ACTIONTYPE";

const changeOption = value => ({type: CHANGE_SDK_PROPS_OPTION, payload: value});

export {changeOption}