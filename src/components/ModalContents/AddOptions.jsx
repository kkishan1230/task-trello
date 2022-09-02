import {
  AccessTimeOutlined,
  PersonOutlineOutlined,
  StyleOutlined,
} from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { FlexOnly, OptionsButtons } from "./ModalContentsStyles";
import "react-datepicker/dist/react-datepicker.min.css";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  deadLine,
  openLabelModal,
  dataLocal,
} from "../../allStates/SliceActions";
import { Button, Popover, TextField } from "@mui/material";
import Label from "../Label/Label";

function AddOptions() {
  const dispatch = useDispatch();
  // All states
  const [anchEl, setAnchEl] = useState(null);
  const [state, setState] = useState(true);
  const [addMember, setAddMember] = useState(true);
  const [mail, setMail] = useState("");
  const [deadLineState, setDeadLineState] = useState(new Date());

  // Selectors
  const membersAllmail = useSelector((state) => {
    return state.inputStates.allMembers;
  });
  const openPopover = useSelector((state) => {
    return state.inputStates.openLabelModal;
  });

  const dataOfLocalStorage = useSelector((state) => {
    return state.inputStates.titleData;
  });

  const tableData = useSelector((state) => {
    return state.inputStates.dataOfTable;
  });

  const deadLineDate = useSelector((state) => {
    return state.inputStates.deadLine;
  });

  // functions

  const setDueDateInLS = (smallObj, bigObj, deadDate) => {
    var x = JSON.parse(localStorage.getItem("Titles"));
    if (Boolean(x[bigObj.Id - 1].addCardTitles[smallObj.id - 1].dueDate)) {
      x[bigObj.Id - 1].addCardTitles[smallObj.id - 1].dueDate = deadDate;
    } else {
      x[bigObj.Id - 1].addCardTitles[smallObj.id - 1]["dueDate"] = deadDate;
    }
    // console.log(x[bigObj.Id - 1].addCardTitles[smallObj.id - 1].dueDate);
    localStorage.setItem("Titles", JSON.stringify(x));
    dispatch(dataLocal(x));
  };

  const addMem = (LsData, tableData) => {
    var x = JSON.parse(localStorage.getItem("Titles"));
    var y = x[tableData.Id - 1].addCardTitles[LsData.id - 1];
    if (Boolean(y.members)) {
      y.members.push(mail);
    } else {
      y["members"] = [];
      y.members.push(mail);
    }
    x[tableData.Id - 1].addCardTitles[LsData.id - 1] = y;
    dispatch(dataLocal(x));
    localStorage.setItem("Titles", JSON.stringify(x));
  };

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
            onChange={(el) => {
              setMail(el.target.value);
            }}
          />
          <Button
            size="small"
            variant="contained"
            onClick={(el) => {
              setAddMember(!addMember);
              addMem(dataOfLocalStorage, tableData);
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
            var dataLS = JSON.parse(localStorage.getItem("Titles"));
            dispatch(deadLine(`${startDate.toString().slice(0, 15)}`));
            setDeadLineState(startDate.toString().slice(0, 15));
            setState(!state);
            setDueDateInLS(
              dataOfLocalStorage,
              tableData,
              startDate.toString().slice(0, 15)
            );
          }}
        />
      )}
    </FlexOnly>
  );
}

export default AddOptions;
