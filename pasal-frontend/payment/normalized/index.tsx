import React from "react";
import { camelCaseToNormal, Chip } from "@pasal/cio-component-library";

export enum colorsForTableFields {
    canceled = "lightred",
    completed = "green",
    inProgress = "lightbrown",
    pending = "skyblue",
    onHold = "skyblue",
    pendingVerification = "green"

}

export enum colorsForPaymentStatus {
    pending = "pending",
    paid = "green",
    failed = "lightbrown",
    canceled = "lightred",
    refunded = "green",
    partially_refunded = "lightred",
    chargeback = "green",
    expired = "lightred",
}


export function normalizeDataForVisual(data: any, field: string, filedColorEnum:any) {
    data.map((item: any) => {
        if (item[field] && Object.keys(filedColorEnum).indexOf(item[field]) !== -1) {
            
            const getKey = Object.keys(filedColorEnum).indexOf(item[field]);
            const getValue = Object.keys(filedColorEnum)[getKey];
            // @ts-ignore
            item[field] = <Chip label={camelCaseToNormal(item[field], true)} chipVariant={filedColorEnum[getValue]} />
        } 


        return item;

    });

    return data;
}