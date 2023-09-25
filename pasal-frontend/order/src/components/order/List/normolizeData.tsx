import React from "react";
import { OrderStatusEnum } from "../../../../enums&Types/order";
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
    Paid = "green",
    Pending="skyblue",
    due="lightbrown",
    failedOrDeclined="lightred",
    Refunded="green"
}




export function normalizeDataForVisual(data: any, field: string, filedColorEnum:any) {
    data.map((item: any) => {
        if (item[field] && Object.keys(filedColorEnum).indexOf(item[field]) !== -1) {
            
            const getKey = Object.keys(filedColorEnum).indexOf(item[field]);
            const getValue = Object.keys(filedColorEnum)[getKey];
            // @ts-ignore
            item[field] = <Chip label={camelCaseToNormal(item[field], true)} chipVariant={filedColorEnum[getValue]} />
        } 

        if(item[field] === 'undefined') {
            console.log(`${item[field]} is undefined`)
        }

        return item;

    });

    return data;
}