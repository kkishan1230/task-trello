import {
  AccessTimeOutlined,
  PersonOutlineOutlined,
  StyleOutlined,
} from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { FlexOnly, OptionsButtons } from "./ModalContentsStyles";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  allMembers,
  deadLine,
  openLabelModal,
} from "../../allStates/SliceActions";
import { Button, Popover, TextField } from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Label from "../Label/Label";

function AddOptions() {
  const [anchEl, setAnchEl] = useState(null);

  const dispatch = useDispatch();
  const [state, setState] = useState(true);
  const [addMember, setAddMember] = useState(true);
  const [mail, setMail] = useState("");
  const membersAllmail = useSelector((state) => {
    return state.inputStates.allMembers;
  });
  const openPopover = useSelector((state) => {
    return state.inputStates.openLabelModal;
  });

  return (
    <FlexOnly flexDirection={"column"}>
      {addMember ? (
        <OptionsButtons
          variant="text"
          startIcon={<PersonOutlineOutlined />}
          onClick={() => setAddMember(!addMember)}
        >
          Add Members
        </OptionsButtons>
      ) : (
        <>
          <TextField
            type="email"
            size="small"
            placeholder="Member Mail"
            autoFocus
            onClick={() => {
              console.log(membersAllmail);
            }}
            onChange={(el) => {
              setMail(el.target.value);
            }}
          />
          <Button
            size="small"
            variant="contained"
            onClick={(el) => {
              setAddMember(!addMember);
              dispatch(allMembers(mail));
              setMail("");
            }}
            disabled={mail.length === 0 ? true : false}
          >
            Add Member
          </Button>
        </>
      )}
      <>
        <OptionsButtons
          variant="text"
          startIcon={<StyleOutlined />}
          onClick={(el) => {
            dispatch(openLabelModal());
            setAnchEl(el.currentTarget);
          }}
        >
          Add Labels
        </OptionsButtons>
        <Popover
          open={Boolean(anchEl && openPopover)}
          anchorEl={anchEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            horizontal: "center",
          }}
          sx={{
            width: "400px",
          }}
        >
          <Label />
        </Popover>
      </>
      {state ? (
        <OptionsButtons
          variant="text"
          startIcon={<AccessTimeOutlined />}
          type="calender"
          onClick={() => setState(!state)}
        >
          Date
        </OptionsButtons>
      ) : (
        <DatePicker
          onClickOutside={() => setState(!state)}
          minDate={new Date()}
          open={!state}
          onChange={(startDate) => {
            dispatch(deadLine(`${startDate.toISOString().split("T")[0]}`));
            setState(!state);
          }}
        />
      )}
    </FlexOnly>
  );
}

export default AddOptions;
