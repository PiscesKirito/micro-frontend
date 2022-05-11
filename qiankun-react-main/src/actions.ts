import { initGlobalState } from "qiankun";

const initialState = {};

const actions = initGlobalState(initialState);

actions.onGlobalStateChange((state, prevState) => {
  // console.log("变更前:" + prevState);
  // console.log("变更后:" + state);
});

export default actions;
