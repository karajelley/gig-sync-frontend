import { Alert } from "@mui/material";

function Alerts({ errorMessage, successMessage }) {
  return (
    <>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
    </>
  );
}

export default Alerts;
