import React, { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [passwordIncludes, setPasswordIncludes] = useState({
    password_length: 0,
    Inlude_UpperCase_Letter: false,
    Inlude_LowerCase_Letter: false,
    Inlude_Numbers: false,
    Inlude_Symbols: false,
  });

  const [generatedPassword, setGeneratedPassword] = useState("");

  return (
    <DataContext.Provider
      value={{ passwordIncludes, setPasswordIncludes, generatedPassword, setGeneratedPassword }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useGlobalData = () => {
  return useContext(DataContext);
};
