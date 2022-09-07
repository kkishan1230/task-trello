import {
  AccessTimeOutlined,
  PersonOutlineOutlined,
  StyleOutlined,
} from "@mui/icons-material";
import React, { useState } from "react";
import { FlexOnly, OptionsButtons } from "./ModalContentsStyles";
import "react-datepicker/dist/react-datepicker.min.css";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  deadLine,
  openLabelModal,
  contentId,
  subContentId,
  dataLocal,
  memberMail,
} from "../../allStates/SliceActions";
import { Button, Popover, TextField } from "@mui/material";
import Label from "../Label/Label";
import { useEffect } from "react";

function AddOptions() {
  const dispatch = useDispatch();
  // All states
  const [anchEl, setAnchEl] = useState(null);
  const [state, setState] = useState(true);
  const [addMember, setAddMember] = useState(true);
  const [mail, setMail] = useState("");
  const [deadLineState, setDeadLineState] = useState(new Date());

  // Selectors
  const memMail = useSelector((state) => {
    return state.inputStates.memberMail;
  });
  const subContentsId = useSelector((state) => {
    return state.inputStates.subContentId;
  });

  const contentsId = useSelector((state) => {
    return state.inputStates.contentId;
  });

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

  const dataLocal_data = useSelector((state) => {
    return state.inputStates.dataLocal;
  });

  // functions

  const setDueDateInLS = (e) => {
    var x = JSON.stringify(dataLocal_data);
    x = JSON.parse(x);
    x[contentsId - 1].addCardTitles.forEach((element) => {
      console.log(subContentsId.id);
      if (element.duDate === undefined && element.id === subContentsId.id) {
        element["dueDate"] = e;
      } else if (element.id === subContentsId.id) {
        element.dueDate = e;
      }
    });

    localStorage.setItem("Titles", JSON.stringify(x));
    dispatch(dataLocal(x));
  };

  const addMem = () => {
    var x = JSON.parse(localStorage.getItem("Titles"));
    for (var a = 0; a < x[contentsId - 1].addCardTitles.length; a++) {
      if (
        Boolean(x[contentsId - 1].addCardTitles[a].id == subContentsId.id) &&
        Boolean(x[contentsId - 1].addCardTitles[a].member)
      ) {
        x[contentsId - 1].addCardTitles[a].member.push(memMail);
        localStorage.setItem("Titles", JSON.stringify(x));
        dispatch(dataLocal(x));
        return;
      } else if (
        Boolean(x[contentsId - 1].addCardTitles[a].id == subContentsId.id)
      ) {
        x[contentsId - 1].addCardTitles[a]["member"] = [];
        x[contentsId - 1].addCardTitles[a].member.push(memMail);
        localStorage.setItem("Titles", JSON.stringify(x));
        dispatch(dataLocal(x));
        return;
      }
    }
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
              dispatch(memberMail(el.target.value));
            }}
          />
          <Button
            size="small"
            variant="contained"
            onClick={(el) => {
              setAddMember(!addMember);
              addMem();
            }}
            disabled={memMail.length === 0 ? true : false}
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
            dispatch(deadLine(`${startDate.toString().slice(0, 15)}`));
            setDeadLineState(startDate.toString().slice(0, 15));
            setState(!state);
            setDueDateInLS(startDate.toString().slice(0, 15));
          }}
        />
      )}
    </FlexOnly>
  );
}

export default AddOptions;
