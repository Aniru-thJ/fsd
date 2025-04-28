// StyledTextField.js
import { TextField } from "@mui/material";
import { styled } from "styled-components";

const StyledTextField = styled(TextField)`
  && {
    label {
      color: #39ff14;
    }
    input {
      color: white;
    }
    .MuiOutlinedInput-root {
      fieldset {
        border-color: #39ff14;
      }
      &:hover fieldset {
        border-color: #2fd310;
      }
      &.Mui-focused fieldset {
        border-color: #39ff14;
      }
    }
  }
`;

export default StyledTextField;
