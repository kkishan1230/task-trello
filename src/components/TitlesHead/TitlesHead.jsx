import { Add, ResetTv } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  AddCardButton,
  CardContainer,
  CardContainerFlex,
} from "../../styles/InputCards/Styles";

function TitlesHead() {
  const selector = useSelector((state) => {
    return state.inputStates.show;
  });

  useEffect(() => {
    if (localStorage.getItem === null) {
      localStorage.setItem("Titles", JSON.stringify([]));
    } else {
      setData1(JSON.parse(localStorage.getItem("Titles")));
    }
  }, [selector]);
  const [state, setState] = useState(false);
  const [data1, setData1] = useState([]);

  return (
    data1 !== null && (
      <CardContainerFlex>
        {data1.map((dt) => {
          return (
            <form>
              <CardContainer>
                <TextField
                  variant={!state ? "standard" : "outlined"}
                  className="text-withoutBorder"
                  onFocus={() => {
                    setState(true);
                  }}
                  defaultValue={dt.TaskName}
                  size="small"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  sx={{
                    padding: !state ? "8px 14px 1px 14px" : null,
                    marginBottom: !state ? "20px" : "18px",
                    textDecoration: "none",
                  }}
                />
                <AddCardButton
                  startIcon={<Add />}
                  onClick={() => {
                    setState(!state);
                  }}
                  sx={{
                    padding: "0",
                    color: "rgba(0,0,0,0.5)",
                    "&:hover": {
                      color: "black",
                    },
                  }}
                >
                  Add Card
                </AddCardButton>
              </CardContainer>
            </form>
          );
        })}
      </CardContainerFlex>
    )
  );
}

export default TitlesHead;
