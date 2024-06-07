import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface ConfirmationInterface {
  open: boolean;
  handle: any;
  onClick: any;
  heading?: string;
  body: string;
}

const Confirmation: React.FC<ConfirmationInterface> = ({
  open,
  handle,
  onClick,
  heading,
  body,
}) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="bg-primary-darken/20"
      >
        <DialogTitle id="alert-dialog-title">{heading}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <p className="text-black text-lg">{body}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handle}>Cancel</Button>
          <Button onClick={onClick} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default Confirmation;
