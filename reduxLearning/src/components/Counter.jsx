import { useDispatch, useSelector } from "react-redux";
import { addByAmount } from "../redux/counterSlice";
import { useState } from "react";

export const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [num, setNum] = useState(undefined);

  const submitNum = () => {
    dispatch(addByAmount(num));
  };

  return (
    <>
      <h1>{count}</h1>

      <input
        type="number"
        name="num"
        placeholder="enter a digit"
        value={num}
        onChange={(e) => {
          setNum(e.target.value);
        }}
      />
      <button onClick={submitNum}>submit</button>
      {/* <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(reset())}>Reset</button> */}
    </>
  );
};
