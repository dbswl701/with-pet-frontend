// any 수정 필요
import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl/FormControl";
import { SelectWrapper } from "../../styles/main/MainPageStyle";

export default function Asynchronous({ options, setOptions }: any) {
  // const [open, setOpen] = React.useState(false);
  // const [region, setRegion] = useState('');
  // console.log(options);
  const onChange = (e: any) => {
    // console.log(e.target.value);
    setOptions({
      ...options,
      region: e.target.value,
    });
  };
  return (
    <SelectWrapper>
      <FormControl sx={{ m: 1, width: 4 / 5, display: "flex" }}>
        <p style={{ fontWeight: "bold" }}>지역</p>
        <TextField sx={{ width: 1 }} onChange={onChange} value={options.region} style={{ width: "250px" }} />
      </FormControl>
    </SelectWrapper>
  );
}
