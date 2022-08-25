import { createSlice } from "@reduxjs/toolkit";

export const SliceActions = createSlice({
  name: "inputCard",
  initialState: {
    show: true,
    titles: null,
    addTitle: "",
    allData: null,
    addButton: false,
  },
  reducers: {
    show: (state) => {
      state.show = !state.show;
    },
    hide: (state) => {
      state.show = !state.show;
    },
    titleData: (state) => {
      state.titles = JSON.parse(localStorage.getItem("Titles"));
    },
    addTitle: (state, action) => {
      state.addTitle = action.payload;
    },
    allData: (state, action) => {
      state.allData = action.payload;
    },
    addButton: (state) => {
      state.addButton = !state.addButton;
    },
  },
});

export const { show, hide, titleData, addTitle, addButton } =
  SliceActions.actions;
export default SliceActions.reducer;
