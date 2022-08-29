import {
  AccessTimeOutlined,
  PersonOutlineOutlined,
  StyleOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import { FlexOnly, OptionsButtons } from "./ModalContentsStyles";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { allMembers, deadLine, memberMail } from "../../allStates/SliceActions";
import { Button, TextField } from "@mui/material";

function AddOptions() {
  const membersAllmail = useSelector((state) => {
    return state.inputStates.allMembers;
  });
  const dispatch = useDispatch();
  const [state, setState] = useState(true);
  const [addMember, setAddMember] = useState(true);
  const [mail, setMail] = useState("");
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
            onClick={() => {
              setAddMember(!addMember);
              dispatch(allMembers(mail));
            }}
          >
            Add Member
          </Button>
        </>
      )}
      <OptionsButtons variant="text" startIcon={<StyleOutlined />}>
        Add Labels
      </OptionsButtons>
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
