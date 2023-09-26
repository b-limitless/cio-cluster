export enum paymentStatusEnum {
    paid="paid",
    pending="pending",
    due="due",
    failedOrDeclined="failedOrDeclined",
    refunded="refunded"
}

export type paymentStatusType = `${paymentStatusEnum}`

export const paymentStatus = Object.keys(paymentStatusEnum);