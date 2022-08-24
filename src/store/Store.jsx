import { configureStore } from "@reduxjs/toolkit";
import inputStates from "../allStates/SliceActions";

export default configureStore({
  reducer: {
    inputStates: inputStates,
  },
});
