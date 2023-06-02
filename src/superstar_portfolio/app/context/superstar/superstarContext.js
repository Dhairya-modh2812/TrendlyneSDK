import { createContext } from "react";

const superstarContext = createContext({
  superstarName: " ",
  setSuperstarName: () => {},
});

export default superstarContext;
