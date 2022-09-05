import { createSlice } from "@reduxjs/toolkit";

export const SliceActions = createSlice({
  name: "inputCard",
  initialState: {
    show: true,
    titles: null,
    addTitle: null,
    allData: null,
    addButton: false,
    addCardTitle: {},
    darkFilter: false,
    dataFromClick: "",
    deadLine: null,
    titleData: null,
    memberMail: "",
    allMembers: [],
    openLabelModal: false,
    dataOfTable: null,
    contentId: null,
    subContentId: null,
    dataLocal: JSON.parse(localStorage.getItem("Titles")),
  },
  reducers: {
    show: (state) => {
      state.show = !state.show;
    },
    hide: (state) => {
      state.show = !state.show;
    },
    titleData: (state, action) => {
      state.titleData = action.payload;
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
      state.addCardTitle = action.payload;
    },
    darkFilter: (state) => {
      state.darkFilter = !state.darkFilter;
    },
    dataFromClick: (state, action) => {
      state.dataFromClick = action.payload;
    },
    deadLine: (state, action) => {
      state.deadLine = action.payload;
    },
    memberMail: (state, action) => {
      state.memberMail = action.payload;
    },
    allMembers: (state, action) => {
      state.allMembers.push(action.payload);
    },
    openLabelModal: (state) => {
      state.openLabelModal = !state.openLabelModal;
    },
    dataOfTable: (state, action) => {
      state.dataOfTable = action.payload;
    },
    contentId: (state, action) => {
      state.contentId = action.payload;
    },
    subContentId: (state, action) => {
      state.subContentId = action.payload;
    },
    dataLocal: (state, action) => {
      state.dataLocal = action.payload;
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
  deadLine,
  memberMail,
  allMembers,
  openLabelModal,
  dataOfTable,
  contentId,
  subContentId,
  dataLocal,
} = SliceActions.actions;
export default SliceActions.reducer;
