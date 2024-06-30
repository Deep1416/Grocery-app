import React from 'react';
import { Alert, Slide, Snackbar } from "@mui/material";

const SuccessAlert = ({ message, state, severity }) => {
    const [open, setOpen] = state;

    // Handle close
    const handleClose = () => setOpen(false);

    return (
        <Snackbar
            TransitionComponent={SlideTransition}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert
                variant='filled'
                sx={{ width: '100%' }}
                onClose={handleClose}
                severity={severity}
            >
                {message}
            </Alert>
        </Snackbar>
    );
};

// This sub_component will add a slide animation on snackBar
function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

export default SuccessAlert;
