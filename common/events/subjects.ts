export enum Subjects {
    ProductCreated = 'product:created',
    ProductUpdate = 'product:updated',

    OrderCreated = 'order:created',
    OrderCancelled = 'order:cancelled',

    ExpirationCompleted = 'expiration:completed',

    PaymentCreated = 'payment-created',

    OrderConfirmedEmailCreated = 'order-confirmed-email:created', 

    UserCreated = 'user-created', 
    ProfileUpdated = 'profile-updated',
    UserVerified = 'user-verified',

    FebricCreated='febric-created',
    FebricUpdated='febric-updated',
    FebricDeleted='febric-deleted'
}