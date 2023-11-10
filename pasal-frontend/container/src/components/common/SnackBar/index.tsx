import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Grow, { GrowProps } from '@mui/material/Grow';
import Snackbar from '@mui/material/Snackbar';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function GrowTransition(props: GrowProps) {
    return <Grow {...props} />;
}

// type AlertColor = "error" | "success" | "info" | "warning"

interface TransitionsSnackbar {
    severity: AlertColor
    message: string;
    open:boolean;
}

export default function TransitionsSnackbar({ severity, message, open }: TransitionsSnackbar) {
    const [state, setState] = React.useState<{
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

    const handleClick =
        (
            Transition: React.ComponentType<
                TransitionProps & {
                    children: React.ReactElement<any, any>;
                }
            >,
        ) =>
            () => {
                setState({
                    open: true,
                    Transition,
                });
            };

    const handleClose = () => {
        setState({
            ...state,
            open: false,
        });
    };

    return (
            <Snackbar
                open={state.open}
                onClose={handleClose}
                TransitionComponent={state.Transition}
                key={state.Transition.name}
            >
                <Alert onClose={handleClose}
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