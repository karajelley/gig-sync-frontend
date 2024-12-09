import { useState, useEffect } from "react";
import { Alert } from "@mui/material";

function Alerts({ errorMessage, successMessage }) {
  const [showError, setShowError] = useState(!!errorMessage);
  const [showSuccess, setShowSuccess] = useState(!!successMessage);

  useEffect(() => {
    if (errorMessage) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 2500); // 2.5 seconds
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 2500); // 2.5 seconds
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <>
      {showError && <Alert severity="error">{errorMessage}</Alert>}
      {showSuccess && <Alert severity="success">{successMessage}</Alert>}
    </>
  );
}

export default Alerts;
