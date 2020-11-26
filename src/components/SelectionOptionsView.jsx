import React from "react";
import { useParams } from "react-router-dom";

import SelectionOptionsList from "./SelectionOptionsList";

export default function SelectionOptionsView({ dispatch, selectionTypes }) {
  const { selectionType: type } = useParams();

  return <SelectionOptionsList {...{ dispatch, type, selectionTypes }} />;
}
