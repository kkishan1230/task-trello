import { createSlice } from "@reduxjs/toolkit";

export const SliceActions = createSlice({
  name: "inputCard",
  initialState: {
    show: true,
    titles: null,
    addTitle: "",
    allData: null,
    addButton: false,
    addCardTitle: {},
    darkFilter: false,
    dataFromClick: "",
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
    addCardTitle: (state, action) => {
      state.addCardTitle["id"] = action.payload;
    },
    darkFilter: (state) => {
      state.darkFilter = !state.darkFilter;
    },
    dataFromClick: (state, action) => {
      state.dataFromClick = action.payload;
    },
  },
});

export const {
  show,
  hide,
  titleData,
  addTitle,
  addButton,
  addCardTitle,
  darkFilter,
  dataFromClick,
} = SliceActions.actions;
export default SliceActions.reducer;
