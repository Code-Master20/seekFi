import { useSelector, useDispatch } from "react-redux";

export const InvalidInputTracker = () => {
  // const { success } = useSelector((state) => state.auth);
  // console.log(success);
  return <span>⚠️{inputErrorString}</span>;
};
