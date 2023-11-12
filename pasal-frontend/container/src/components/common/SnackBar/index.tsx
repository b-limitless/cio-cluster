import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import Fade from '@mui/material/Fade';
import Snackbar from '@mui/material/Snackbar';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


interface TransitionsSnackbar {
    severity: AlertColor
    message: string;
    open:boolean;
    handleCloseAlert?: any //Event | SyntheticEvent<any, Event>
}

export default function TransitionsSnackbar({ severity, message, open, handleCloseAlert }: TransitionsSnackbar) {
    const [state, ] = React.useState<{
        open: boolean;
        Transition: React.ComponentType<
            TransitionProps & {
                children: React.ReactElement<any, any>;
            }
        >;
    }>({
        open: false,
        Transition: Fade,
    });

    return (
            <Snackbar
                open={open}
                onClose={handleCloseAlert}
                TransitionComponent={state.Transition}
                key={state.Transition.name}
            >
                <Alert onClose={handleCloseAlert}
                    severity={severity}
                    sx={{
                        width: '100%',
                        fontFamily: 'Poppins, san-sarif',
                        fontSize: "14px !important"
                    }}>
                    {message}
                </Alert>
            </Snackbar>
    );
}