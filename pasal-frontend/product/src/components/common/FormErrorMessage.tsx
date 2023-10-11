import React from 'react';
import { FormHelperText } from '@mui/material';

interface FormErrorMessageInterface {
    message: string;
}
export default function FormErrorMessage({ message }: FormErrorMessageInterface) {

    const styles = {
        fontWeight: 400,
        fontSize: '0.75rem',
        lineHeight: 1.66,
        letterSpacing: '0.03333em',
        textAlign: 'left',
        marginTop: '3px',
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        color: '#d32f2f',
        FontFamily: 'Poppins, san-sarif'
    }
    return (
        <FormHelperText sx={styles}>
            {message}
        </FormHelperText>

    )
}
