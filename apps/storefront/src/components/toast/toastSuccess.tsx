import { Button, Snackbar, Alert } from "@mui/material";
interface Props {
  message: string
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}
export default function ToastSuccess({message, isOpen, setIsOpen}: Props) {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpen(false);
  };
  return(
    <div>
    <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
      <Alert

        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  </div>
  )
}
