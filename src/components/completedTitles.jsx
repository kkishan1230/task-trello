import React from "react";
import { TiTleContainer } from "../styles/Style";
import TitlesHead from "./TitlesHead/TitlesHead";

function CompletedTitles() {
  const localData = JSON.parse(localStorage.getItem("Titles"));

  return (
    <TiTleContainer>
      <TitlesHead />
    </TiTleContainer>
  );
}

export default CompletedTitles;
