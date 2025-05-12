import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import UpdateForm from "./UpdateForm";

const UpdatePackage = ({ open, handleClose, initialValues, onSubmit }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Cập nhật gói dịch vụ</DialogTitle>
      <Box>
        <DialogContent>
          <UpdateForm initialValues={initialValues} onSubmit={onSubmit} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ marginRight: "8px" }}>
            Hủy
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default UpdatePackage;
