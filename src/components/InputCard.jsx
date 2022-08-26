import { Close } from "@mui/icons-material";
import { Button, IconButton, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hide, addTitle } from "../allStates/SliceActions";

function InputCard() {
  const selector = useSelector((state) => {
    return state.inputStates.addTitle;
  });
  const dispatch = useDispatch();

  return (
    <div>
      <TextField
        placeholder="Enter list title"
        size="small"
        autoFocus={true}
        sx={{
          padding: "0px",
        }}
        onChange={(el) => {
          dispatch(addTitle(el.target.value));
        }}
      />

      <br />
      <Button
        variant="contained"
        sx={{
          display: "inline",
        }}
        onClick={() => {
          var data = JSON.parse(localStorage.getItem("Titles"));
          var x = {};
          x.Id = data.length + 1;
          x.TaskName = selector;
          x["addCardTitles"] = [];
          data.push(x);
          localStorage.setItem("Titles", JSON.stringify(data));
          dispatch(hide());
        }}
      >
        Add List
      </Button>
      <IconButton
        onClick={() => {
          dispatch(hide());
        }}
      >
        <Close />
      </IconButton>
    </div>
  );
}

export default InputCard;
