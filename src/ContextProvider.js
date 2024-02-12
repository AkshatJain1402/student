import React, { useState } from "react";
import UIDContext from "./Context";

const UIDContextProvider = ({ children }) => {
  const [studentID, setStudentID] = useState(null);

  return (
    <UIDContext.Provider value={{ studentID, setStudentID }}>
      {children};
    </UIDContext.Provider>
  );
};

export default UIDContextProvider;
