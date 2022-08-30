import {
  Close,
  RemoveRedEyeOutlined,
  SubjectOutlined,
  VideoLabelOutlined,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  Modal,
  Paper,
  Popover,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { darkFilter } from "../../allStates/SliceActions";
import AddOptions from "./AddOptions";
import {
  AddDesPaper,
  FlexOnly,
  ModalContentBox,
  ModalFlex,
  TextAreaForDesc,
  TransparentButton,
} from "./ModalContentsStyles";

function ModalContents() {
  // Selectors
  const open = useSelector((state) => {
    return state.inputStates.openLabelModal;
  });
  const allMembers = useSelector((state) => {
    return state.inputStates.allMembers;
  });
  const deadLineDate = useSelector((state) => {
    return state.inputStates.deadLine;
  });
  const datafromClick = useSelector((state) => {
    return state.inputStates.dataFromClick;
  });
  const dataFromLS = useSelector((state) => {
    return state.inputStates.titleData;
  });
  // All states
  const [state, setState] = useState(false);
  const dispatch = useDispatch();

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
      <FlexOnly>
        {allMembers.length > 0 &&
          allMembers.map((mem) => {
            return (
              <div
                style={{
                  textAlign: "center",
                  padding: "5px",
                  color: "white",
                  borderRadius: "50%",
                  background: "purple",
                  width: "20px",
                  height: "20px",
                }}
              >
                {mem[0]}
              </div>
            );
          })}
        <div>{deadLineDate}</div>
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
                  <Button
                    variant="contained"
                    onClick={() => {
                      console.log(dataFromLS);
                      dispatch(darkFilter());
                    }}
                  >
                    Save
                  </Button>
                  <TransparentButton
                    variant="contained"
                    onClick={() => dispatch(darkFilter())}
                  >
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
          <AddOptions />
        </ModalFlex>
      </ModalFlex>
    </ModalContentBox>
  );
}

export default ModalContents;
