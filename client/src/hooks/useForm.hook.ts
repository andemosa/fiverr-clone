import { useState } from "react";

export default function useForm() {
  const [formState, setFormState] = useState({
    submitting: false,
    error: "",
    successMsg: "",
  });

  const submittingForm = () => {
    setFormState({
      submitting: true,
      error: "",
      successMsg: "",
    });
  };

  const formError = (error: string) => {
    setFormState({
      submitting: false,
      error: error,
      successMsg: "",
    });
  };

  const formSuccess = (message: string) => {
    setFormState({
      submitting: false,
      error: "",
      successMsg: message,
    });
  };

  return { formState, submittingForm, formError, formSuccess };
}
