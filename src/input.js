import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { TextField } from "@mui/material";

function EditInput(props) {
  const [valueOne, setValueOne] = React.useState("0");
  const [valueTwo, setValueTwo] = React.useState("0");

  const handleChangeOne = (event) => {
    setValueOne(event.target.value);
    setValueTwo(((props.twoCurrencyValue / props.oneCurrencyValue) * +event.target.value).toFixed(2));
  };
  const handleChangeTwo = (event) => {
    setValueTwo(event.target.value);
    setValueOne(((props.oneCurrencyValue / props.twoCurrencyValue) * +event.target.value).toFixed(2));
  };

  const LoopInput = () => {
    setValueOne(valueTwo);
    setValueTwo(valueOne);
  };

  useEffect(() => {
    LoopInput();
  }, [props.oneCurrencyValue, props.twoCurrencyValue]);

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        name="curone"
        id="standard-basic"
        variant="standard"
        sx={{ width: 260 }}
        style={{ marginRight: 30 }}
        value={valueOne}
        onChange={handleChangeOne}
      />
      
      <TextField
        name="curtwo"
        id="standard-basic"
        variant="standard"
        sx={{ width: 260 }}
        value={valueTwo}
        onChange={handleChangeTwo}
      />
    </Stack>
  );
}
export default EditInput;
