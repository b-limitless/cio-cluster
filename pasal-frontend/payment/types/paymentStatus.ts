export enum PaymentMethod {
  CreditCard = "creditCard",
  PayPal = "paypal",
  BankTransfer = "bankTransfer",
  // Add more payment methods as needed
}

export enum Currency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  // Add more currencies as needed
}

export enum PaymentStatus {
  Pending = "pending",
  Paid = "paid",
  Failed = "failed",
  Canceled = "canceled",
  Refunded = "refunded",
  PartiallyRefunded = "partially_refunded",
  Chargeback = "chargeback",
  Expired = "expired",
  // Add more payment statuses as needed
}

export const PaymentStatusType = `${PaymentStatus}`;

// Define the structure for the payment model
export interface PaymentModel {
  paymentMethod: PaymentMethod;
  amount: number;
  currency: Currency;
  paymentDate: string;
  transactionId: string;
  customerId: string;
  billingAddress: Address;
  shippingAddress: Address;
  description: string;
  metadata: Record<string, any>;
  paymentGateway: string;
  paymentStatusMessage: string;
  isRecurring: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}
