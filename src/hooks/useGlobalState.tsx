import { useContext } from "react";
import { Context } from "../context/Context";

const useGlobalState = () => useContext(Context);

export { useGlobalState }