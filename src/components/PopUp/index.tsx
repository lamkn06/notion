import { Box, Modal, Typography } from '@mui/material';

interface PopupProps {
  open: boolean;
  content: string;
  setOpen: (value: boolean) => void;
}

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const Popup = (props: PopupProps) => {
  return (
    <Modal
      open={props.open}
      onClose={() => props.setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          This is modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.content}
        </Typography>
      </Box>
    </Modal>
  );
};
