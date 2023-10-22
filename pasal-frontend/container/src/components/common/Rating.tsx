import { Rating } from "@mui/material";

import React from 'react'

interface StartInterface {
    value: number | null;
}

export default function Star({ value }: StartInterface) {
    return (
        <Rating name="read-only" value={value} readOnly />
    )
}