export enum OrderStatusEnum {
    pending="pending",
    inProgress="inProgress",
    completed="completed",
    canceled="canceled",
    pendingVerification="pendingVerification",
    onHold="onHold"
}

export const OrderTypes = `${OrderStatusEnum}`;

export const OrderStatus = Object.keys(OrderStatusEnum);