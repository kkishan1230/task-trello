import {
  Close,
  RemoveRedEyeOutlined,
  SubjectOutlined,
  VideoLabelOutlined,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  Paper,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { darkFilter } from "../../allStates/SliceActions";
import {
  AddDesPaper,
  FlexOnly,
  ModalContentBox,
  ModalFlex,
  TextAreaForDesc,
  TransparentButton,
} from "./ModalContentsStyles";

function ModalContents() {
  const [state, setState] = useState(false);
  const dispatch = useDispatch();
  const datafromClick = useSelector((state) => {
    return state.inputStates.dataFromClick;
  });
  return (
    <ModalContentBox>
      <ModalFlex alignItems="center">
        <ModalFlex
          sx={{
            gap: "20px",
          }}
          alignItems="center"
        >
          <VideoLabelOutlined />
          <TextField
            size="small"
            marginLeft="20px"
            defaultValue={datafromClick}
            placeholder={""}
          />
        </ModalFlex>
        <IconButton onClick={() => dispatch(darkFilter())}>
          <Close />
        </IconButton>
      </ModalFlex>
      <FlexOnly gap="10px">
        <Typography marginLeft="50px">in list in progress</Typography>
        <RemoveRedEyeOutlined />
      </FlexOnly>
      <ModalFlex>
        <ModalFlex gap="20px">
          <SubjectOutlined
            sx={{
              paddingTop: "10px",
            }}
          />
          <ModalFlex flexDirection={"column"}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
              }}
            >
              Description
            </Typography>
            {state ? (
              <FlexOnly flexDirection="column" gap="10px">
                <TextAreaForDesc
                  placeholder="Add a more detailed description..."
                  autoFocus
                />
                <FlexOnly gap="10px">
                  <Button variant="contained">Save</Button>
                  <TransparentButton variant="contained">
                    Cancel
                  </TransparentButton>
                </FlexOnly>
              </FlexOnly>
            ) : (
              <AddDesPaper onClick={() => setState(!state)}>
                <Typography
                  sx={{
                    padding: "8px 12px",
                    fontSize: "14px",
                  }}
                >
                  Add a more Detailed Description...
                </Typography>
              </AddDesPaper>
            )}
          </ModalFlex>
        </ModalFlex>
      </ModalFlex>
    </ModalContentBox>
  );
}

export default ModalContents;
